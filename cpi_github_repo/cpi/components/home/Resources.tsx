import Image from "next/image";
import Link from "next/link";
import arrow from "@/public/assets/images/pixelarticons_arrow-up.png";

interface Resource {
    title: string
    description: string
    accessUrl: string
    color: string;
}

const resources: Resource[] = [
    {
        title: "Research Report",
        description: "A comprehensive report detailing the analysis, findings, and insights on council and committee influence within the Optimism ecosystem.",
        accessUrl: "https://www.papermark.io/view/cm1isoexg0003j5b1j53u50ow",
        color: "#957BFF"
    },
    {
        title: "Observation File",
        description: "Detailed observations and notes relevant to the analysis and calculations for council and committee influence.",
        accessUrl: "https://www.papermark.io/view/cm1j4avvn0005kipj1e5dndfb",
        color: "#2FFF6A"
    },
    {
        title: "Behind the Scenes Documentation",
        description: "In-depth look at the underlying processes and methodologies used in the calculations, offering additional context and technical insights.",
        accessUrl: "https://www.papermark.io/view/cm1j49mya0001rjn3cmsboya9",
        color: "#FEC5FB"
    },
    {
        title: "Github Repo",
        description: "The official GitHub repository containing the source code, scripts, and other resources used in the calculation and visualization of the Concentration of Power Index (CoP) within the Optimism ecosystem.",
        accessUrl: "https://github.com/ARDev097/Measuring_COP_Optimism",
        color: "#2FFF6A"
    },
    {
        title: "Influence Calculator",
        description: "A tool for evaluating the influence of Houses, Councils, and Committees (HCCs) within the Optimism Collective, based on six key parameters. Community members can assign weights and scores to help identify power concentration within the ecosystem.",
        accessUrl: "https://optimism-cop-analyzer.vercel.app/",
        color: "#FEC5FB"
    },
    {
        title: "Presentation Link",
        description: "A brief presentation highlighting the differences between the Concentration of Power Index (CPI) and the Herfindahl-Hirschman Index (HHI), along with an overview of the CPI calculation methodology within the Optimism ecosystem.",
        accessUrl: "https://coffee-cheap-marten-178.mypinata.cloud/ipfs/QmV9hQxERHU137e1DD2ex2Eiev5BmkUHNmTjdxV9fpRfzd",
        color: "#957BFF"
    }
]
const Resources: React.FC = () => {
    return (
        <div className="bg-dark-gray">
            <div className="container mx-auto pt-8 pb-20 px-10 ">
                <h2 className="font-mori font-semibold text-white text-4xl md:text-5xl my-8 mb-12">CPI Resources</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {resources.map((resource, index) => (
                        <div key={index} className="bg-transparent border border-[#777777] overflow-hidden shadow rounded-xl">
                            <div className="p-6 h-full flex flex-col justify-between ">
                                <div>
                                    <h3 className={`font-mori font-semibold text-[1.5rem] text-[${resource.color}]`}>{resource.title}</h3>
                                    <p className="font-mori font-normal text-[#FFFCE1] text-xl tracking-tight my-4">{resource.description}</p>
                                </div>
                                {/* <Link
                                    href={resource.accessUrl}
                                    className="max-w-max mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Access
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e8eaed"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z" /></svg>
                                </Link> */}
                                <Link
                                    className='mt-6 max-w-max flex flex-row button-50 heroarrowbtn justify-center items-center font-redhat font-semibold text-xl'
                                    href={resource.accessUrl}
                                    target="_blank"
                                >
                                    <span className='ml-2 drop-shadow-custom text-black font-semibold' >Explore</span>
                                    <Image
                                        src={arrow}
                                        alt='arrow icon'
                                        className='border border-white rounded-full bg-[#FF0E00] p-1'
                                        width={30}
                                        height={30}
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Resources;