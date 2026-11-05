'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Panels: React.FC = () => {
    const component = useRef<HTMLDivElement>(null); // Component ref
    const slider = useRef<HTMLDivElement>(null); // Slider/container ref


    useGSAP(() => {
        const mm = gsap.matchMedia()
        let panels = gsap.utils.toArray(".panel") as HTMLElement[];
        const createAnimation = (end: string) => {
            return gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end,
                    markers: false,
                },
            })
        }

        mm.add("(min-width: 768px)", () => {
            return createAnimation("+=" + slider.current!.offsetWidth)
        })

        mm.add("(max-width: 767px)", () => {
            return createAnimation("+=" + slider.current!.scrollWidth)
        })

        return () => {
            mm.revert()
        }
    }, { scope: component })


    return (
        <div ref={component} className="relative w-full bg-black">
            {/* Horizontal scroll container */}
            <div ref={slider} className="flex  min-h-[500px] h-screen overflow-hidden">
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-green rounded-xl w-max">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Delegates</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">Delegates are individuals or entities that are entrusted by token holders with voting power in DAO governance. Delegates play a critical role in representing the interests of the community, making decisions on their behalf in key governance matters. The distribution of voting power among delegates is crucial in determining the level of decentralization within the DAO.
                        </p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-orange rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 font-bold">Influence Factor</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">The Influence Factor represents the weight or importance assigned to each governance body in the CPI calculation. This factor accounts for the varying levels of influence that different governance bodies have on decision-making. By incorporating the influence factor, the CPI provides a more accurate measure of decentralization, recognizing that some bodies may have a stronger impact on governance than others.</p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-green rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Power Concentration</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">Power Concentration refers to the degree of centralization in a DAO. A high concentration of power suggests that decision-making is centralized among a few delegates or governance bodies, indicating lower decentralization. Conversely, a low concentration of power implies a more decentralized structure where decision-making authority is more evenly distributed across delegates. The CPI captures this by measuring the sum of squared voting power, helping to quantify the level of decentralization in the Optimism Collective.</p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-pink rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Decentralized Autonomous Organization (DAO)</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">A Decentralized Autonomous Organization (DAO) is a self-governed entity that operates through blockchain-based smart contracts, allowing stakeholders to make decisions collectively without the need for centralized leadership. In a DAO, governance decisions such as protocol upgrades, funding allocations, and strategic directions are made by the community through transparent voting processes.
                        </p>
                    </div>
                </div>
                <div className="panel min-w-[100vw] h-screen p-10 md:p-20 flex flex-col justify-center">
                    <div className="container  mx-auto">
                        <div className="p-5 mb-8 bg-custom-orange rounded-xl w-max max-w-[80%]">
                            <h2 className="font-mori text-black text-[5vw] md:text-[3vw] leading-10 tracking-tighter font-bold">Retroactive Public Goods Funding</h2>
                        </div>
                        <p className="font-mori font-normal tracking-tight text-xl md:text-[2vw] leading-6 md:leading-10 mt-8">Retroactive Public Goods Funding is a unique governance initiative within the Optimism Collective, where funding is allocated to projects after they have demonstrated a positive impact on the ecosystem. This approach incentivizes and rewards contributions that have already proven their value to the community, fostering sustainable growth and development.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Panels;
