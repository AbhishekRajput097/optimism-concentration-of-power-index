"use client";
import Image from "next/image";
import bg from "@/public/assets/images/influencebg.png";
import Link from "next/link";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { FaCircleChevronRight } from "react-icons/fa6";

const AddPercentage: React.FC = () => {
  return (
    <div className="bg-dark-gray pb-[80px] sm:pb-[120px] w-full relative">
      <div className="absolute right-0 -top-[120px] sm:-top-[50px] h-[290px] sm:h-[320px] md:h-[380px] lg:h-[430px] z-10">
        <Image
          src={bg}
          alt="bg-image"
          className="h-full w-auto"
          loading="lazy"
          quality={85}
        ></Image>
      </div>
      <div className="bg-[#15141408] backdrop-blur-[215.2px] flex flex-col items-center justify-center p-7 sm:p-10 w-[80%] sm:w-[65%] mx-auto rounded-[63px] border border-[#FEC5FB] relative z-20">
        <h1 className="font-mori max-w-[90%] text-xl md:text-2xl lg:text-2.5xl text-center text-[#F3FD9D]">
          Add Influence for each HCCs
        </h1>

        <div className="flex flex-col md:flex-row gap-6 w-full my-8">
          {/* Box 1 */}
          <div className="group relative flex-1 min-w-0">
            <div className="relative  backdrop-blur-md rounded-2xl p-6 border border-[#FEC5FB] h-full transition-colors duration-100">
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-[#FEC5FB] font-semibold text-sm transition-colors duration-100 flex gap-2 items-center">
                  <span className="text-sm transition-colors duration-100 mt-1">
                    <FaCircleChevronRight />
                  </span>
                  Get Started
                </h2>
                <p className="text-white text-xs leading-relaxed">
                  Click the Add Here button to access the CPI Simulator page
                </p>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="group relative flex-1 min-w-0">
            <div className="relative backdrop-blur-md rounded-2xl p-6 border border-[#FEC5FB] h-full  transition-colors duration-100">
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-[#FEC5FB] font-semibold text-sm transition-colors duration-100 flex gap-2 items-center">
                  <span className="text-sm transition-colors duration-100 mt-1">
                    <FaCircleChevronRight />
                  </span>
                  Add Influence
                </h2>
                <div className="space-y-2">
                  <p className="text-white text-sm leading-relaxed">
                    Enter the influence percentages for each HCC in the input
                    fields
                  </p>
                  <p className="text-[#FEC5FB] text-xs italic">
                    Note: Total percentage must equal 100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="group relative flex-1 min-w-0">
            <div className="relative backdrop-blur-md rounded-2xl p-6 border border-[#FEC5FB] h-full  transition-colors duration-100">
              <div className="flex flex-col items-start gap-3">
                <h2 className="text-[#FEC5FB] font-semibold text-sm  transition-colors duration-100 flex gap-2 items-center">
                  <span className="text-sm  transition-colors duration-100 mt-1">
                    <FaCircleChevronRight />
                  </span>
                  Generate Graph
                </h2>
                <p className="text-white text-sm leading-relaxed">
                  Click Simulate to generate a CPI temporal graph with baseline
                  comparison
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="http://cpi.lamproslabs.io/">
          <button
            className="mt-6 flex flex-row button-50 justify-center items-center font-redhat font-semibold text-xl"
            aria-label="add-percentage"
          >
            <span className="ml-4 pr-2 drop-shadow-custom">Add Here</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddPercentage;
