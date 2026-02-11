'use client';

import Hero from '@/components/Hero';
import Memberships from '@/components/Memberships';
import Scope from '@/components/Scope';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';

export default function HomeClient() {
    return (
        <>
            <Hero />
            <Memberships />
            <Scope />
            <Leadership />
            <Contact />
        </>
    );
}
