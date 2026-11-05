"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import img2 from "@/public/assets/images/white-logo-icon.png";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import ContactModal from "../ui/ContactModal";
import NewsLetterSignUp from "../common/NewsLetterSignUp";

const Footer: React.FC = () => {
    const movingTextRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    // GSAP animation for infinite loop of CoPI text
    useGSAP(() => {
        if (movingTextRef.current) {
            const marqueeWidth = movingTextRef.current.scrollWidth / 2; // Half the width to handle seamless looping

            gsap.to(movingTextRef.current, {
                x: -marqueeWidth, // Move by half the width to simulate the infinite loop
                duration: 50, // Adjust duration for speed
                ease: "linear", // Keep it smooth and steady
                repeat: -1, // Infinite loop
            });
        }
    }, { scope: movingTextRef });

    return (
        <footer className="bg-black border-t border-[#777777] pt-20 text-white py-10 relative overflow-hidden">
            {/* Newsletter Signup Section */}
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full md:w-auto">
                        <h2 className="text-lg mb-2 font-mori font-normal">Sign up to our newsletter:</h2>
                        <div >
                            <NewsLetterSignUp />
                        </div>
                    </div>
                    <div className="mt-10 md:mt-auto">
                        <Image
                            src={img2}
                            width={100}
                            alt="white logo icon"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-10">
                {/* Social Links */}
                <div className="flex flex-wrap space-x-4 md:space-x-8 mt-4 md:mt-0 items-center font-mori font-normal tracking-tighter">
                    <a href="https://x.com/chain_haya" className="social-link twitter flex items-center space-x-2 group" target="_blank">
                        <svg
                            className="w-6 h-6 border rounded-full p-1"
                            width="31"
                            height="31"
                            viewBox="0 0 31 31"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.007 13.423L27.8165 1.9375H25.4915L16.9762 11.9098L10.1717 1.9375H2.32486L12.613 17.019L2.32486 29.0625H4.64986L13.6437 18.5302L20.8299 29.0625H28.6768L18.007 13.423ZM14.8237 17.1507L13.7813 15.6492L5.48686 3.70062H9.05767L15.7498 13.3436L16.7922 14.8451L25.4935 27.3807H21.9227L14.8237 17.1507Z" fill="white" />
                        </svg>

                        <span>Twitter</span>
                        <svg
                            className="w-6"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4721 34.2505L15.4165 32.1949L27.75 19.8615L25.6944 17.8059L27.75 15.7504L29.8055 17.8059L31.8611 15.7504L33.9167 17.8059L31.8611 19.8615L33.9167 21.9171L31.8611 23.9727L29.8055 21.9171L17.4721 34.2505ZM31.8611 28.0838L33.9167 26.0282L31.8611 23.9727L29.8055 26.0282L31.8611 28.0838ZM31.8611 28.0838L29.8055 30.1394L31.8611 32.1949L33.9167 30.1394L31.8611 28.0838ZM21.5833 17.8059L23.6388 15.7504L25.6944 17.8059L23.6388 19.8615L21.5833 17.8059ZM21.5833 17.8059L19.5277 19.8615L17.4721 17.8059L19.5277 15.7504L21.5833 17.8059Z" fill="white" />
                        </svg>

                    </a>
                    <a href="https://t.me/ChaIn_L" className="social-link telegram flex items-center space-x-2" target="_blank">
                        <svg
                            className="w-6 h-6 border rounded-full p-1"
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.002 3.89568C31.8663 3.7785 31.7012 3.70059 31.5245 3.67035C31.3478 3.64012 31.1662 3.65871 30.9993 3.72412L2.50026 14.8771C2.15363 15.0127 1.86035 15.2572 1.66448 15.5737C1.4686 15.8902 1.38071 16.2617 1.414 16.6325C1.44728 17.0032 1.59995 17.3532 1.84907 17.6297C2.09819 17.9063 2.43032 18.0946 2.79558 18.1663L10.4062 19.6612V28.1254C10.4064 28.5178 10.5238 28.9012 10.7434 29.2264C10.963 29.5516 11.2748 29.8037 11.6387 29.9505C12.0026 30.0972 12.4021 30.1319 12.7858 30.05C13.1696 29.9681 13.5201 29.7734 13.7924 29.4908L17.5387 25.6054L23.3859 30.7312C23.7429 31.047 24.203 31.2216 24.6796 31.2219C24.8878 31.2215 25.0946 31.1888 25.2928 31.1249C25.6176 31.0221 25.9098 30.836 26.1403 30.585C26.3707 30.3341 26.5314 30.0271 26.6062 29.6947L32.3184 4.86178C32.3585 4.6872 32.3503 4.50497 32.2945 4.33472C32.2388 4.16448 32.1376 4.01268 32.002 3.89568ZM3.10073 16.5055C3.09535 16.491 3.09535 16.475 3.10073 16.4605C3.10707 16.4556 3.1142 16.4518 3.12183 16.4493L25.581 7.6574L11.0545 18.0637L3.12183 16.5112L3.10073 16.5055ZM12.5775 28.318C12.5387 28.3582 12.4888 28.386 12.4342 28.3978C12.3796 28.4096 12.3228 28.4048 12.2709 28.3842C12.219 28.3635 12.1744 28.3278 12.1429 28.2818C12.1113 28.2357 12.0942 28.1812 12.0937 28.1254V20.8283L16.2689 24.4846L12.5775 28.318ZM24.9623 29.3137C24.9519 29.3612 24.929 29.4051 24.8958 29.4407C24.8627 29.4763 24.8205 29.5024 24.7739 29.5162C24.7262 29.5329 24.675 29.5365 24.6255 29.5266C24.576 29.5167 24.5301 29.4937 24.4926 29.4599L12.6056 19.0326L30.2343 6.39881L24.9623 29.3137Z" fill="white" />
                        </svg>

                        <span>Telegram</span>
                        <svg
                            className="w-6"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4721 34.2505L15.4165 32.1949L27.75 19.8615L25.6944 17.8059L27.75 15.7504L29.8055 17.8059L31.8611 15.7504L33.9167 17.8059L31.8611 19.8615L33.9167 21.9171L31.8611 23.9727L29.8055 21.9171L17.4721 34.2505ZM31.8611 28.0838L33.9167 26.0282L31.8611 23.9727L29.8055 26.0282L31.8611 28.0838ZM31.8611 28.0838L29.8055 30.1394L31.8611 32.1949L33.9167 30.1394L31.8611 28.0838ZM21.5833 17.8059L23.6388 15.7504L25.6944 17.8059L23.6388 19.8615L21.5833 17.8059ZM21.5833 17.8059L19.5277 19.8615L17.4721 17.8059L19.5277 15.7504L21.5833 17.8059Z" fill="white" />
                        </svg>
                    </a>
                    <div
                        className="social-link cursor-pointer contact flex items-center space-x-2"
                        onClick={openModal}
                    >
                        <svg
                            className="w-6 h-6 border rounded-full p-1"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.1387 3.66699H12.916C11.0993 3.66805 9.35737 4.39038 8.07302 5.67523C6.78868 6.96008 6.06703 8.7023 6.06667 10.519V21.4817C6.06667 25.2657 9.13334 28.3337 12.9173 28.3337H21.14C24.924 28.3337 27.992 25.267 27.992 21.4817V10.5203C27.992 6.73633 24.9253 3.66833 21.14 3.66833M4.00934 11.2043H8.12001M4.00934 20.7963H8.12001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22.2267 22.3272C22.2267 20.1232 19.7693 18.3325 17.5667 18.3325C15.364 18.3325 12.9067 20.1232 12.9067 22.3258M17.5667 15.1578C17.9778 15.1578 18.3849 15.0768 18.7647 14.9195C19.1446 14.7622 19.4897 14.5316 19.7804 14.2409C20.0711 13.9502 20.3017 13.605 20.459 13.2252C20.6164 12.8454 20.6973 12.4383 20.6973 12.0272C20.6973 11.616 20.6164 11.2089 20.459 10.8291C20.3017 10.4493 20.0711 10.1041 19.7804 9.81344C19.4897 9.52273 19.1446 9.29212 18.7647 9.13479C18.3849 8.97746 17.9778 8.89648 17.5667 8.89648C16.7364 8.89648 15.9401 9.22632 15.353 9.81344C14.7658 10.4005 14.436 11.1968 14.436 12.0272C14.436 12.8575 14.7658 13.6538 15.353 14.2409C15.9401 14.828 16.7364 15.1578 17.5667 15.1578Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span>Contact Us</span>

                    </div>
                </div>
            </div>
            {/* CoPI moving text with transparent text clipped to gradient background */}
            <div className="relative mt-0 h-80 overflow-hidden">
                <div
                    ref={movingTextRef}
                    className="absolute whitespace-nowrap text-[18rem] font-mori font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
                    style={{
                        backgroundImage: "linear-gradient(to right, #A78BFA, #F472B6, #FDE68A)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {/* Two copies of the CoPI text for seamless looping */}
                    <span className="mx-6">CPI CPI CPI CPI CPI CPI CPI CPI CPI</span>
                </div>
            </div>
            {isOpen && <ContactModal closeModal={closeModal} />}
        </footer>
    );
};

export default Footer;

