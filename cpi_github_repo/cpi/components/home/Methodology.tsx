import whereImg from "@/public/assets/images/where.png";
import setDef from "@/public/assets/images/definitions.png";
import exp from "@/public/assets/images/explaination.png";

import starIcon from "@/public/assets/images/spark_list.png"

import MathFormula from "../common/MathFormula";
import Image from "next/image";


const Methodology: React.FC = () => {

    return <div className="pt-20 bg-dark-gray">
        <div className="container mx-auto px-6 bg-dark-gray">
            <div className="font-mori font-semibold text-white text-4xl md:text-5xl mb-8">
                Methodology
            </div>
            <div className=" font-mori font-normal text-xl">
                <span>CPI formula for Optimism Collective:</span>
                <div className="text-[#957BFF] text-[1.5rem] md:text-[2.2rem] lg:text-[3rem] my-20">
                    <MathFormula formula="\sum_{i \ \in \ D} V_{i} \ ^2 \quad{ where } \ V_{i} = \sum_{j \ \in \ HCC} (V_{j} * I_{j})" displayMode={false} />
                </div>
            </div>

        </div>
        {/* Where section */}
        <div className="container mx-auto mt-20 border-t border-[#777777] flex justify-between items-center px-10 flex-col md:flex-row">
            <div className="w-[30%] p-8 min-w-[250px]">
                <Image
                    src={whereImg}
                    alt="abstract icon"
                    quality={80}
                    loading="lazy"
                />
            </div>
            <div className="flex-1 pb-10 md:p-10 flex flex-col justify-between items-start h-full">
                <span className="font-mori font-semibold text-[#957BFF] text-[2rem]">Where</span>

                <ul className="list-none flex-1 font-mori font-normal text-xl tracking-tight mt-14">
                    <li className="flex items-start mb-4 ">
                        <Image
                            src={starIcon}
                            className=" w-4 h-4 text-green-500 mr-4"
                            alt="start icon for list"
                            quality={100}
                            loading="lazy"
                        />
                        𝑉j is the voting power of
                        delegate 𝑖 in HCC j.
                    </li>
                    <li className="flex items-start mb-4">
                        <Image src={starIcon} className=" w-4 h-4 text-green-500 mr-4" alt="start icon for list" quality={100} loading="lazy" />
                        𝐼j is the influence factor of 𝐻CC j in the overall Optimism Collective.
                    </li>
                    <li className="flex items-start">
                        <Image src={starIcon} className="w-4 h-4 text-green-500 mr-4" alt="start icon for list" quality={100} loading="lazy" />
                        𝑉i is the weighted voting
                        power of delegate i.
                    </li>
                </ul>
            </div>
        </div>
        {/* Set Definitions section */}
        <div className="container mx-auto border-t border-[#777777] flex justify-between items-center px-10 flex-col md:flex-row">
            <div className="w-[30%] p-8 min-w-[250px]">
                <Image
                    src={setDef}
                    alt="abstract icon"
                    quality={80}
                    loading="lazy"
                />
            </div>
            <div className="flex-1 pb-10 md:p-10 flex flex-col justify-between items-start h-full">
                <span className="font-mori font-semibold text-[#2FFF6A] text-[2rem]">Set Definitions</span>
                <ul className="list-none flex-1 font-mori font-normal text-xl tracking-tight mt-14">
                    <li className="flex items-start mb-4">
                        <Image src={starIcon} className="w-4 h-4 text-green-500 mr-4" alt="start icon for list" quality={100}
                            loading="lazy" />
                        D is the set of Delegates. D = {`{d₁, d₂, d₃, … , dₙ}`}
                    </li>
                    <li className="flex items-start mb-4">
                        <Image src={starIcon} className="w-4 h-4 text-green-500 mr-4" alt="start icon for list" quality={100}
                            loading="lazy" />
                        HCC represents the set of
                        Houses, Councils &
                        Committees which includes

                        HCC = {`{Th, Ch, Gc, Sc, CoC, DAB}`}
                    </li>

                </ul>
            </div>
        </div>
        {/* Explanation section */}
        <div className="container mx-auto border-t border-[#777777] flex justify-between items-center px-10 flex-col md:flex-row">
            <div className="w-[30%] p-8 min-w-[250px]">
                <Image
                    src={exp}
                    alt="abstract icon"
                    quality={80}
                    loading="lazy"
                />
            </div>
            <div className="flex-1 pb-10 md:p-10 flex flex-col justify-between items-start h-full">
                <span className="font-mori font-semibold text-[#FEC5FB] text-[2rem]">Explanation</span>
                <ul className="list-none flex-1 font-mori font-normal text-xl tracking-tight mt-14">
                    <li className="flex items-start mb-4">
                        <Image
                            src={starIcon}
                            className="w-4 h-4 text-green-500 mr-4" alt="start icon for list"
                            quality={100}
                            loading="lazy"
                        />
                        The CPI is the sum of the squares
                        of the weighted voting power of
                        each delegate.
                    </li>
                    <li className="flex items-start mb-4">
                        <Image
                            src={starIcon}
                            className="w-4 h-4 text-green-500 mr-4" alt="start icon for list"
                            quality={100}
                            loading="lazy"
                        />
                        The weighted voting power 𝑉𝑖 for
                        each delegate 𝑖 is calculated by
                        summing the products of the voting
                        power 𝑉j and the influence 𝐼j for
                        each house and council in the
                        Optimism Collective.
                    </li>

                </ul>
            </div>
        </div>
    </div>
}

export default Methodology;