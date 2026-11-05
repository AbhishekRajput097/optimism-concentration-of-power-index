'use client'

import { ApiResponse, DelegateData } from "@/types";
import { formatNumber } from "@/lib/utils/formatNumber";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import AvatarGenerator from "../ui/AvatarGenerator";
import { truncateAddress } from "@/lib/utils/truncateAddress";
import MembershipBadges from "../ui/MembershipBadges";
import Pagination from "./Pagination";
import { Tooltip } from "react-tooltip";

export interface InitialDataProps {
    initialData: ApiResponse;
    member: boolean;
    background: string;
    platform: string;
    iconURL: string;
}

const DataTable: React.FC<InitialDataProps> = ({ initialData, member, background, platform, iconURL }) => {
    console.log(initialData)
    const [data, setData] = useState<DelegateData[]>(initialData?.data || []);
    const [page, setPage] = useState<number>(1); // Start from page 1
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [sort, setSort] = useState<string>('voting_power');
    const [isAsc, setIsAsc] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const [totalItems, setTotalItems] = useState<number>(initialData?.totalItems || 0);
    const [totalPages, setTotalPages] = useState<number>(initialData?.totalPages || 0);

    const tableRef = useRef<HTMLTableElement | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchMoreData = useCallback(async (page: number) => {
        if (loading || isFirstRender) return;
        // Scroll to the top of the table after data is fetched
        if (tableRef.current) {
            tableRef.current.scrollTo({ behavior: 'smooth' });
        }
        setLoading(true);

        try {
            console.log(`${API_URL}/${platform}?page=${page}&sort=${sort}&isAsc=${isAsc}&search=${search}`)
            const res = await fetch(`${API_URL}/${platform}?page=${page}&sort=${sort}&isAsc=${isAsc}&search=${search}`);
            const json: ApiResponse = await res.json();
            console.log(json)
            setData(json.data);
            setHasMore(json.data.length > 0);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, sort, isAsc]);

    useEffect(() => {
        console.log("useEffect called")
        if (!isFirstRender) {
            console.log("inside if condition in useEffect")
            fetchMoreData(page); // Fetch data when page, sort, isAsc, or search changes
        }
        // Set isFirstRender to false after the initial render
        setIsFirstRender(false);
    }, [page, isFirstRender, sort, isAsc]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    const handleSortChange = (value: string) => {

        setSort(value);
    };

    const handleSortOrderChange = () => {
        setIsAsc(prev => !prev);
    };
    // const handleScroll = useCallback(() => {
    //     if (containerRef.current) {
    //         const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    //         if (scrollHeight - scrollTop === clientHeight && !loading) {
    //             fetchMoreData();
    //         }
    //     }
    // }, [fetchMoreData, loading]);

    // useEffect(() => {
    //     const container = containerRef.current;
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll);
    //         return () => container.removeEventListener('scroll', handleScroll);
    //     }
    // }, [handleScroll]);

    return (
        <div className='flex flex-col justify-center items-center m-auto bg-white rounded-[20px]'>
            <div className={`p-[20px] md:p-[30px] h-[100px] rounded-t-[20px] w-full flex justify-between items-center ${background} ${platform === "compound" ? "text-black" : "text-white"}`}>
                <span className='font-bold  flex flex-row items-center text-inherit font-mori font-semibold text-xl md:text-2xl'>
                    <Image src={iconURL} alt="optimism logo" width={56} height={56} className='h-[40px] w-[40px]  md:h-[50px] md:w-[50px] rounded-full mr-2' />
                    All Delegates
                </span>
                <span className='font-normal text-md md:text-xl font-mori'>{"(" + (formatNumber(totalItems) || 0) + " delegates)"}</span>

            </div>
            {/* <table className="modern-table" ref={tableRef}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Delegate</th>
                        <th>Member</th>
                        <th>Voting Power</th>
                        <th>mHHi</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className='text-xs md:text-sm lg:text-md'>{(page - 1) * 20 + index + 1}</td>
                            <td className='flex flex-row items-center justify-start gap-2'>{loading ? <Skeleton containerClassName='flex-1' /> : <><AvatarGenerator address={item.delegate} />{truncateAddress(item.delegate)}</>}</td>
                            <td>{loading ? <Skeleton /> :
                                <div>{
                                    item.ch_member_r4 === "1" ?
                                        <Image src={"/assets/images/optimism_small_logo.svg"} height={30} width={30} alt='member icon' /> : null}
                                </div>
                            }</td>
                            <td>{loading ? <Skeleton /> : <span className='flex flex-col justify-center itmes-center text-xs'>{item.voting_power}<span className="font-bold ml-2">{"(" + Number(item.th_vp).toFixed(2) + "%)"}</span></span>}</td>
                            <td>{loading ? <Skeleton /> : Number(item.influence_r4_s5).toFixed(4)}</td>
                        </tr>
                    ))}


                </tbody>
            </table> */}

            <div className="max-h-[650px] overflow-y-auto w-full custom-scrollbar border-b" ref={tableRef}>
                <div className={`${platform === "optimism" ? 'min-w-[550px]' : "min-w-[450px]"} flex flex-row gap-2 bg-[#f0f0f0] text-black font-mori font-semibold text-sm md:text-[16px] leading-normal sticky top-0 z-[100] py-4 px-4`}>
                    <div className="flex justify-start items-center basis-1/5 min-w-[50px] ">#</div>
                    <div className="flex items-center justify-start basis-1/2 min-w-[100px] ">Delegate</div>
                    {platform === "optimism" ? <div className="flex justify-center items-center basis-1/2 min-w-[100px]">Member</div> : null}
                    <div className="flex justify-center items-center basis-1/2 min-w-[140px]">
                        {platform === "optimism" ?
                            <div className='flex justify-center py-2 max-w-[140px] min-w-[140px] border border-[#a3a3a3] rounded-full'>
                                <span>Voting Power</span>
                                <button
                                    type="button"
                                    aria-label="asc"
                                    className='ml-1'
                                    onClick={
                                        () => {
                                            handleSortChange("voting_power");
                                            handleSortOrderChange()
                                        }
                                    }>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        {sort !== "voting_power" ?
                                            <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                                            :
                                            isAsc ? <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path> : <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>}
                                    </svg>
                                </button>
                            </div>
                            :
                            <div className='flex justify-center py-2 max-w-[140px] min-w-[140px]'>
                                <span>Voting Power</span>
                            </div>
                        }

                    </div>
                    <div className="flex justify-center items-center basis-1/2  min-w-[100px] ">
                        <div className="flex justify-center py-2 max-w-[100px] min-w-[100px] border border-[#a3a3a3] rounded-full">
                            <span className='max-w-[60%]'>CPI</span>
                            <button
                                type="button"
                                aria-label="asc"
                                className='ml-1'
                                onClick={
                                    () => {
                                        handleSortChange("mHHi");
                                        handleSortOrderChange()
                                    }
                                }>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    {sort !== "mHHi" ?
                                        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
                                        :
                                        isAsc ? <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path> : <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${platform === "optimism" ? 'min-w-[550px]' : "min-w-[450px]"} divide-y md:text-sm text-xs text-black font-mori font-normal`}>
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-row gap-2 py-3 px-4 hover:bg-gray-50 transition-colors duration-200">
                            <div className='basis-1/5 flex items-center min-w-[50px]'>{(page - 1) * 20 + index + 1}</div>
                            <div
                                className="basis-1/2 flex items-center gap-1 min-w-[100px]"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={item.ens_name === "" ? item.delegate : item.ens_name}
                                data-tooltip-place="bottom"
                            >
                                {loading ? (
                                    <Skeleton containerClassName="flex-1" />
                                ) : (
                                    <>
                                        <AvatarGenerator address={item.delegate || ""} />
                                        <span className="truncate font-semibold max-w-xs text-xs lg:text-[15px]">{item.ens_name === "" ? truncateAddress(item.delegate || "") : item.ens_name}</span>
                                    </>
                                )}
                            </div>
                            <Tooltip id="my-tooltip" />
                            {platform === "optimism" ? <div className='basis-1/2 flex flex-row justify-center items-center min-w-[100px]'>
                                {loading ? <Skeleton containerClassName="flex-1" /> :
                                    <div className='flex flex-row gap-0 items-center justify-center'>
                                        {/* {[
                                        { condition: item.ch_member_r4 === "1", zIndex: 60 },
                                        { condition: item.gc_member_s5 === "1", zIndex: 50 },
                                        { condition: item.gc_member_mm_s5 === "1", zIndex: 40 },
                                        { condition: item.sc_member_s5 === "1", zIndex: 30 },
                                        { condition: item.coc_member_s5 === "1", zIndex: 20 },
                                        { condition: item.dab_member_s5 === "1", zIndex: 10 },
                                    ]
                                        .filter(element => element.condition)
                                        .map((element, index) => (
                                            <Image
                                                key={index}
                                                className={`border border-black rounded-full border-2 ${index !== 0 ? '-ml-2' : ''}`}
                                                style={{ zIndex: element.zIndex }}
                                                src="/assets/images/optimism_small_logo.svg"
                                                height={30}
                                                width={30}
                                                alt='member icon'
                                            />
                                        ))} */}
                                        <MembershipBadges item={item} />

                                    </div>
                                }
                            </div> : null}
                            <div className='basis-1/2 flex flex-row justify-center items-center flex-wrap min-w-[140px]'>
                                {loading ? (
                                    <Skeleton containerClassName="flex-1" />
                                ) : (
                                    <span className='flex flex-col items-center justify-center text-xs lg:text-sm'>
                                        {formatNumber(parseInt(item.voting_power))}
                                        <span className="font-semibold ">
                                            {"(" + Number(item.th_vp).toFixed(2) + "%)"}
                                        </span>
                                    </span>
                                )}
                            </div>
                            <div className='basis-1/2 flex items-center justify-center font-bold min-w-[100px]'>
                                {loading ? <Skeleton containerClassName="flex-1" /> : Number(item.influence).toFixed(5)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-4'>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <div className="font-mori font-normal text-xs text-gray-500 self-end p-4">Last updated on:- <span className='text-black ml-1'>27 August 2024</span></div>
        </div >
    );
}

export default DataTable