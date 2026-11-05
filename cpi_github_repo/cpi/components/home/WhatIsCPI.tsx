const WhatIsCPI: React.FC = () => {
    return <div className="bg-dark-gray ">
        <div className="container mx-auto bg-white text-black flex flex-col md:flex-row items-center justify-between px-10 py-12 md:px-16 md:py-24 rounded-[30px]">

            <div className="min-w-[100%] md:min-w-[35%]">
                <div className="flex justify-start items-center gap-2">
                    <div className="w-[1.4rem] h-[1.4rem] bg-[#957BFF] rounded-full"></div>
                    <div className="w-[1.4rem] h-[1.4rem] bg-[#6EF4FF] rounded-full"></div>

                </div>
                <div className="font-mori font-semibold text-4xl md:text-5xl mt-8">What is CPI?</div>
            </div>
            <div className="font-mori font-normal text-[#1E1E1E] text-xl md:text-2xl leading-[2rem] tracking-tighter mt-6 md:mt-auto ml-auto md:ml-4">
                The Concentration of Power Index (CPI) is a metric designed to measure the concentration of power within decentralized governance structures. Unlike traditional concentration indices that solely account for the distribution of voting power, the CPI takes into consideration the influence exerted by different governance bodies, such as houses, councils and committees. This makes it a more comprehensive and accurate measure of power distribution in the context of a DAO.
            </div>
        </div>
    </div>
}

export default WhatIsCPI;