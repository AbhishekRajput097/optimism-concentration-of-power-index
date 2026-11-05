
const ExpertAnalysis: React.FC = () => {
    return <>
        <div className="container mx-auto bg-white relative mt-[120px] rounded-[30px]">
            <div className="container mx-auto py-8 px-10">
                <h1 className="font-mori font-semibold text-[#957BFF] tracking-tighter text-2.5xl md:text-6xl my-8">Expert Analysis</h1>
                <div className="font-mori font-normal tracking-tight text-black text-xl md:text-2xl leading-7 mt-8">
                    The Concentration of Power Index (CPI) offers crucial insights into the governance health of decentralized autonomous organizations (DAOs) by revealing how power is distributed. High CPI values often signal centralization, leading to potential governance issues and reduced diversity. Conversely, lower CPI values reflect a more balanced and representative structure.
                </div>
                <div className="font-mori font-normal tracking-tight text-black text-xl md:text-2xl leading-7 mt-8">
                    In DAOs with multiple councils and committees, such as those with extensive governance structures, CPI trends generally indicate a more decentralized system. This contrasts with other DAOs where power may be more concentrated among a few key participants. By effectively distributing influence across various councils and houses, these multi-faceted DAOs enhance inclusivity, resilience, and innovation. Monitoring CPI trends in such DAOs ensures that governance remains equitable and adaptable.
                </div>
            </div>
            {/* <Image src={img1} className="absolute w-[100px] md:w-[200px] right-0 top-[-100px] md:top-[-180px] " alt="random abstract image" /> */}
        </div>
    </>
}

export default ExpertAnalysis;