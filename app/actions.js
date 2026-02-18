'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '@/sanity/env';

const resend = new Resend(process.env.RESEND_API_KEY);

// Client with write token for server-side operations
const sanityClient = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
    token: process.env.SANITY_API_WRITE_TOKEN, // Needed for write operations
});

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    zip: z.string().min(1, 'Zip Code is required'),
    membership: z.string().optional(),
});

export async function submitContactForm(prevState, formData) {
    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        zip: formData.get('zip'),
        membership: formData.get('membership'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check the form for errors.',
        };
    }

    const { name, email, phone, zip, membership } = validatedFields.data;

    try {
        // 1. Save to Sanity
        await sanityClient.create({
            _type: 'submission',
            name,
            email,
            phone,
            zip,
            membership,
            status: 'new',
        });
    } catch (sanityError) {
        console.error('Sanity Error:', sanityError);
        // Continue to send email even if Sanity fails
    }

    try {
        // 2. Send Email
        const { error } = await resend.emails.send({
            from: 'Adhoc <notifications@adhoc-co.com>',
            to: [process.env.EMAIL_TO || 'hello@adhoc-co.com'],
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <h1>New Clean House Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Zip Code:</strong> ${zip}</p>
        <p><strong>Membership Interest:</strong> ${membership || 'Not specified'}</p>
      `,
        });

        if (error) {
            console.error('Resend Error:', error);
            // If Sanity succeeded but email failed, we might still want to return success or a warning
            return { message: 'Form submitted, but email notification failed. We have received your details.' };
        }

        return { success: true, message: 'Thank you! We will be in touch shortly.' };
    } catch (err) {
        console.error('Server Error:', err);
        return { message: 'Something went wrong. Please try again.' };
    }
}
