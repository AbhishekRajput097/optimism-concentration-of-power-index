'use client'
import React, { useMemo } from 'react';
import {
    ChartOptions,
} from 'chart.js';
import 'tailwindcss/tailwind.css';
// import dynamic from 'next/dynamic';
import ChartWrapper from './ChartWrapper';

// Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// Dynamically import Bar component with SSR disabled
// const Bar = dynamic(
//     () => import('react-chartjs-2').then(mod => mod.Bar),
//     { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" /> }
// );

const CPIChartofDAOs: React.FC = () => {
    // Data for the CPI of different platforms
    const data = useMemo(() => ({
        labels: ['Optimism', 'Compound', 'Aave', 'Uniswap'],
        datasets: [
            {
                label: 'CPI',
                data: [80.8986, 320.723865, 627.338053, 215.291105],
                backgroundColor: ['#FF0420', '#00D395', '#B6509E', '#FF007A'], // Tailwind colors
                borderWidth: 1,
            },
        ],
    }), []);

    // Chart options
    const options: ChartOptions<'bar'> = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend as there's only one dataset
            },
            title: {
                display: true,
                text: 'CPI of Major Platforms',
                font: {
                    size: 20,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CPI Value',
                },
                ticks: {
                    stepSize: 100,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Platforms',
                },
            },
        },
    }), []);

    return (

        <div className="container mx-auto flex flex-col items-center justify-center my-10 p-3 pb-8">
            <h2 className='font-mori font-semibold text-white text-2.5xl md:text-5xl mb-4 text-center max-w-[80%]'>Featured DAOs CPI</h2>
            <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-4xl">
                {/* Header Section */}

                {/* Chart Rendering */}
                {data ? (
                    <div className="relative w-full bg-white border border-dark-gray rounded-lg  py-8 px-2">
                        <ChartWrapper data={data} type='bar' options={options} />
                    </div>
                ) : (
                    <p>Loading chart...</p>
                )}
                <time
                    dateTime="2024-08-27"
                    className="font-mori font-normal text-xs text-gray-500 text-end block pt-4"
                >
                    Last updated on:- <span className="text-black ml-1">27 August 2024</span>
                </time>

            </div>

        </div>
    );
};

export default CPIChartofDAOs;
