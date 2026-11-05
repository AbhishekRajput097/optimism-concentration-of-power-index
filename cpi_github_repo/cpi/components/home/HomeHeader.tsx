import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import HeaderImage from '../layout/HeaderImage';

const Logo = () => (
    <Image
        src="/assets/images/CPI.png"
        alt="Logo"
        width={300}
        height={50}
        quality={75}
        priority={true}
        className="cursor-pointer w-[200px] md:w-[300px]"
        sizes="(max-width: 768px) 200px, 300px"
    />
);

const HomeHeader = () => {
    return (
        <header className="relative min-h-[100px] md:min-h-[150px] bg-dark-gray">
            <div className="px-4">
                <div className="flex justify-between items-center h-30 overflow-visible">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>

                </div>
            </div>
            <HeaderImage />
        </header>
    );
};

export default HomeHeader;