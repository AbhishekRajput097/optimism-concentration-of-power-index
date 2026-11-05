'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const buttons = ['Aave', 'Compound', 'Uniswap'] as const;

type ButtonType = typeof buttons[number];

const buttonImages: Record<ButtonType, string> = {
    // Optimism: '/assets/images/optimism.svg',
    Aave: '/assets/images/aave.svg',
    Compound: '/assets/images/compound.svg',
    Uniswap: '/assets/images/uniswap.svg'
};
const buttonColors: Record<ButtonType, string> = {
    // Optimism: 'bg-[#c80925] ',
    Aave: 'bg-gradient-to-r from-[#8c3ebc] to-[#007782]',
    Compound: 'bg-[#121B23]',
    Uniswap: 'bg-[#FB58FF]'
};

export default function FilterButtons() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse active buttons from URL or default to all
    const activeButtons = (searchParams.get('filter')?.split(',') as ButtonType[]) || buttons;

    const toggleButton = (button: ButtonType) => {
        if (activeButtons.length === 1 && activeButtons.includes(button)) {
            // If only one button is active and clicked, activate all buttons
            router.push(`?filter=${buttons.join(',')}`);
        } else {
            // If the button is already active, deactivate it
            if (activeButtons.includes(button)) {
                const newActive = activeButtons.filter(b => b !== button);
                router.push(`?filter=${newActive.join(',')}`);
            } else {
                // Otherwise, add the button to active buttons
                const newActive = [...activeButtons, button];
                router.push(`?filter=${newActive.join(',')}`);
            }
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mx-4 mb-2 md:mb-12 md:mx-auto items-center md:justify-center">
            {buttons.map(button => (
                <button
                    key={button}
                    onClick={() => toggleButton(button)}
                    className={`min-h-[30px] md:min-h-[40px] lg:min-h-[50px] min-w-[100px] md:min-w-[200px] lg:min-w-[250px] px-4 py-1 md:px-10 md:py-5 text-lg md:text-2xl font-redhat font-semibold uppercase transition-all duration-300 ${buttonColors[button]} text-white button-50
                        ${activeButtons.includes(button)
                            ? "opacity-100"
                            : "opacity-30 "
                        }`}
                    aria-label={button}
                >

                    {button}
                </button>

            ))}
            {/* <Image
                        src={buttonImages[button]}
                        alt={`${button} icon`}
                        width={90}
                        height={10}
                        className="object-contain"
                    /> */}
        </div>
    );
}
