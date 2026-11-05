'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import hero2 from "@/public/assets/images/hero2.png";



interface Rotation {
    x: number;
    y: number;
}

const RotatingImage = () => {
    const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Calculate rotation based on mouse position
            // Adjust the division factor to control rotation sensitivity
            const rotateY = mouseX / (rect.width / 20);
            const rotateX = -mouseY / (rect.height / 20);

            setRotation({ x: rotateX, y: rotateY });
        };

        const handleMouseLeave = () => {
            // Reset rotation when mouse leaves the container
            setRotation({ x: 0, y: 0 });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="inline relative w-fit h-fit"
            style={{
                perspective: '1000px',
            }}
        >
            <div
                className="transition-transform duration-200 ease-out"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                <Image
                    src={hero2}
                    alt={"icon"}
                    className="inline pointer-events-none"
                />
            </div>
        </div>
    );
};

export default RotatingImage;