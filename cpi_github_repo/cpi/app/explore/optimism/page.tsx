import DataTable from "@/components/common/DataTable";
import Header from "@/components/layout/Header";
import { getItem } from "@/lib/utils/fetchDataOnServer";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import arrow from "@/public/assets/images/pixelarticons_arrow-up.svg";

const optimism: React.FC = async () => {
    let initialDataOptimism = [];
    initialDataOptimism = await getItem();
    return (
        <div className="bg-dark-gray">
            <Header />
            <div className="container mx-auto pb-4 flex flex-col bg-dark-gray">
                <h1 className="font-mori font-semibold text-[#fffce1] text-2xl md:text-4xl lg:text-6xl tracking-tight text-center my-6 md:my-12">OP Delegates</h1>
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4 md:gap-8 md:m-8 min-h-[100vh]"> */}
                <div className="custom-scrollbar">
                    <Suspense fallback={<>Loading...</>}>
                        <DataTable initialData={initialDataOptimism} background="bg-optimism" platform="optimism" member={true} iconURL="/assets/images/op_small.svg" />
                    </Suspense>
                </div>
                {/* </div> */}

                <div className="my-20 flex items-center justify-center">
                    <Link className='flex flex-row button-50 heroarrowbtn max-w-max justify-center items-center font-redhat font-semibold text-xl mr-8' href="/explore">
                        <span className='ml-4 drop-shadow-custom' >Other DAOs Delegates</span>
                        <Image src={arrow} alt='arrow icon' className='border border-white rounded-full bg-[#FF0E00] p-3' width={50} height={50} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default optimism;