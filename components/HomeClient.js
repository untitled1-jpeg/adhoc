'use client';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import Memberships from '@/components/Memberships';
import Scope from '@/components/Scope';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

const ScrollContainer = styled.div`
  width: 100%;
`;

export default function HomeClient({ initialData }) {
    const data = initialData || {};
    const containerRef = useRef(null);

    useEffect(() => {
        // Only enable snapping on desktop/non-touch for the best experience
        if (ScrollTrigger.isTouch) return;

        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('section');

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <ScrollContainer ref={containerRef}>
            <Hero data={initialData} />
            <Memberships data={initialData} />
            <Scope data={initialData} />
            <Leadership data={initialData} />
            <Contact data={initialData} />
        </ScrollContainer>
    );
}
