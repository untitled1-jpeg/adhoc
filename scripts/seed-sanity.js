const { createClient } = require('next-sanity');
const path = require('path');
const fs = require('fs');

// Load environment variables manually
const envPath = path.resolve(__dirname, '../.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-01-01',
    token: env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

async function seed() {
    console.log('Starting Sanity seeding...');

    // 1. Seed Homepage
    const homepage = {
        _id: 'homepage',
        _type: 'homepage',
        title: 'Homepage',
        heroHeadline: 'Your life.',
        heroHeadlineItalic: 'Intelligently coordinated.',
        heroSubheadline: 'Latin for “for this purpose,” Adhoc exists to keep complex lives running without friction. We oversee the details others miss. From logistics to schedules and contingencies, everything is handled with thought and intention. Through your dedicated coordinator, life stays aligned, on time, and under control. Nothing escalates. Nothing surprises. It is simply handled. Intelligently.',
        heroCtaText: 'GET ON THE LIST',
        membershipsIntro: 'A private membership that pairs individuals and families with a dedicated coordinator to manage all of the moving parts of their lives.',
        membershipTiers: [
            {
                _key: 'essential',
                title: 'Essential',
                hours: '50 hours per month',
                description: 'Consistent support from a dedicated life coordinator.'
            },
            {
                _key: 'elevated',
                title: 'Elevated',
                hours: '80 hours per month',
                description: 'Expanded support from a dedicated life coordinator.'
            },
            {
                _key: 'exclusive',
                title: 'Exclusive',
                hours: 'Full-time coordination',
                description: 'Upscaled support from a dedicated life coordinator, structured entirely around your family.'
            }
        ],
        scopeIntro: 'Across personal, family, home, and professional life, we bring order, foresight, and intention. We anticipate and intelligently coordinate the many moving parts, so our members can stay focused on what matters most.',
        scopeCategories: [
            {
                _key: 'personal',
                title: 'Personal',
                listItems: [
                    'Schedule management and personal logistics',
                    'Travel planning and execution (domestic & international)',
                    'Personal purchases, gifting, and special arrangements',
                    'Leisure planning, experiences, and personal projects'
                ]
            },
            {
                _key: 'family',
                title: 'Family',
                listItems: [
                    "Children's schedules, school coordination, and activities",
                    'Family holidays and milestone events',
                    'Household staffing coordination and oversight',
                    'Family logistics, transitions, and special circumstances',
                    'Support during periods of change, growth, or crisis',
                    'Long-term family planning'
                ]
            },
            {
                _key: 'home',
                title: 'Home',
                listItems: [
                    'Property and residence coordination',
                    'Vendor sourcing, management, and accountability',
                    'Maintenance schedules and planning',
                    'Home projects',
                    'Seasonal preparation'
                ]
            },
            {
                _key: 'professional',
                title: 'Professional',
                listItems: [
                    'High-level calendar oversight',
                    'Travel, event, and meeting coordination',
                    'Liaison with the Advisory Team and office staff'
                ]
            }
        ],
        leadershipHeadline: 'We believe life works best when the right people are at the helm. Adhoc is built around a highly selective team of Life Coordinators chosen for their judgment, discretion, and emotional intelligence as much as their expertise.',
        leadershipDescription: 'Our coordinators think holistically, act proactively, and operate with intention. These are not task rabbits, but strategic partners who understand the rhythms of the lives they support, and they handle the details accordingly.',
        leadershipCtaText: 'OUR LEADERSHIP',
        contactHeadline: 'Get on the list and',
        contactHeadlineItalic: 'get your life back.',
        nameHint: 'Full name',
        emailHint: 'john@example.com',
        phoneHint: '+1 (555) 000-0000',
        zipHint: '90210'
    };

    // 2. Seed Settings
    const settings = {
        _id: 'settings',
        _type: 'settings',
        title: 'Global Settings',
        contactEmail: 'hello@adhoc-co.com',
        metaTitle: 'Adhoc | Private Life Coordination',
        metaDescription: 'Adhoc provides private life coordination for individuals and families, bringing order, foresight, and intention to complex lives.',
        socialLinks: [
            {
                _key: 'instagram',
                platform: 'Instagram',
                url: 'https://instagram.com/adhoc.co'
            }
        ]
    };

    // 3. Seed Leadership Page
    const leadershipPage = {
        _id: 'leadershipPage',
        _type: 'leadershipPage',
        title: 'Our Leadership',
        pageTitle: 'Our Leadership',
        headline: 'Holly Moon is the President & CEO of Adhoc and a trusted operator with more than a decade of experience supporting executives, entrepreneurs, and families with complex lives.',
        bioHeadline: 'President & CEO',
        bio: [
            {
                _key: 'bio1',
                _type: 'block',
                style: 'normal',
                markDefs: [],
                children: [
                    {
                        _type: 'span',
                        marks: [],
                        text: 'Known for her discretion, judgment, and ability to identify the right people for the right roles, she brings order and calm to demanding environments.'
                    }
                ]
            },
            {
                _key: 'bio2',
                _type: 'block',
                style: 'normal',
                markDefs: [],
                children: [
                    {
                        _type: 'span',
                        marks: [],
                        text: 'Before Adhoc, Holly founded The Assistant Academy, where she built and trained elite executive and personal assistants. She lives in Dallas with her husband and children, Lincoln and Monroe, though they spend time on the East Coast whenever possible, drawn by the ocean, salty air, and fresh seafood.'
                    }
                ]
            }
        ]
    };

    try {
        await client.createOrReplace(homepage);
        console.log('Homepage seeded!');

        await client.createOrReplace(settings);
        console.log('Settings seeded!');

        await client.createOrReplace(leadershipPage);
        console.log('Leadership Page seeded!');

        console.log('Seeding complete successfully!');
    } catch (err) {
        console.error('Seeding failed:', err.message);
    }
}

seed();
