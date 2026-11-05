'use client';

import React, { useMemo } from 'react';
import {
    ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import ChartWrapper from './ChartWrapper';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin);

// Dynamically import Bar component with SSR disabled
// const Bar = dynamic(
//     () => import('react-chartjs-2').then(mod => mod.Bar),
//     { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" /> }
// );

const CPIChartForOP: React.FC = () => {
    // CPI Data
    const data = useMemo(() => ({
        labels: [
            'Token House',
            'Round 2 & Season 3',
            'Round 2 & Season 4',
            'Round 2 & Season 5',
            'Round 3 & Season 5',
            'Round 4 & Season 5',
        ],
        datasets: [
            {
                label: 'CPI',
                data: [329.25, 140.128, 140.128, 91.8072, 81.5283, 80.8986],
                backgroundColor: ['#34D399', '#60A5FA', '#F87171', '#FBBF24', '#A78BFA', '#4ADE80'],
                borderColor: ['#059669', '#3B82F6', '#DC2626', '#D97706', '#7C3AED', '#16A34A'],
                borderWidth: 1,
            },
        ],
    }), []);

    // Chart options with annotations for start dates
    const options: ChartOptions<'bar'> = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'CPI for Different Rounds and Seasons',
                font: {
                    size: 20,
                },
            },
            annotation: {
                annotations: {
                    dateLabel1: {
                        type: 'label',
                        xValue: 'Token House',
                        yValue: 20, // Adjusted position for the label
                        content: ['Started: N/A'], // Since there's no date for Token House
                        color: '#333',
                        font: {
                            size: 12,
                        },
                        yAdjust: 40,
                        xAdjust: -30,
                    },
                    dateLabel2: {
                        type: 'label',
                        xValue: 'Round 2 & Season 3',
                        yValue: 20,
                        content: ['26th May, 2022', '26th Jan, 2023'], // Round 2 and Season 3 start dates
                        color: '#333',
                        font: {
                            size: 12,
                        },
                        yAdjust: 40,
                        xAdjust: -30,
                    },
                    dateLabel3: {
                        type: 'label',
                        xValue: 'Round 2 & Season 4',
                        yValue: 20,
                        content: ['26th May, 2022'],
                        color: '#333',
                        font: {
                            size: 12,
                        },
                        yAdjust: 40,
                        xAdjust: -30,
                    },
                    dateLabel4: {
                        type: 'label',
                        xValue: 'Round 2 & Season 5',
                        yValue: 20,
                        content: ['26th May, 2022'],
                        color: '#333',
                        font: {
                            size: 12,
                        },
                        yAdjust: 40,
                        xAdjust: -30,
                    },
                    dateLabel5: {
                        type: 'label',
                        xValue: 'Round 3 & Season 5',
                        yValue: 20,
                        content: ['14th Oct, 2023'],
                        color: '#333',
                        font: {
                            size: 12,
                        },
                        yAdjust: 40,
                        xAdjust: -30,
                    },
                    dateLabel6: {
                        type: 'label',
                        xValue: 'Round 4 & Season 5',
                        yValue: 20,
                        content: ['3rd June, 2024'],
                        color: '#333',
                        font: {
                            size: 12,
                        },
                        yAdjust: 40,
                        xAdjust: -30,
                    },
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
                    stepSize: 50,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Rounds and Seasons',
                },
            },
        },
    }), []);

    return (
        <div className="container mx-auto flex flex-col items-center justify-center my-10 p-3 pb-8">
            <h2 className='font-mori font-semibold text-white text-2.5xl md:text-5xl mb-4 text-center max-w-[80%]'>Key Insights and Trends</h2>
            <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-4xl">
                <div className="relative w-full bg-white rounded-lg py-8 px-2">
                    <ChartWrapper data={data} type='bar' options={options} />
                </div>

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

export default CPIChartForOP;
