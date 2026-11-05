'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, TimeScale } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
// Dynamically import chart components with SSR disabled
const DynamicBar = dynamic(
    () => import('react-chartjs-2').then(mod => mod.Bar),
    { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" /> }
)

const DynamicLine = dynamic(
    () => import('react-chartjs-2').then(mod => mod.Line),
    { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" /> }
)

interface ChartWrapperProps {
    type: 'bar' | 'line'
    data: any
    options: any
}

export default function ChartWrapper({ type, data, options }: ChartWrapperProps) {
    const [isRegistered, setIsRegistered] = useState(false)

    useEffect(() => {
        if (!isRegistered) {
            ChartJS.register(CategoryScale, TimeScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, annotationPlugin)
            setIsRegistered(true)
        }
    }, [isRegistered])

    if (!isRegistered) {
        return <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
    }

    const ChartComponent = type === 'bar' ? DynamicBar : DynamicLine

    return <ChartComponent data={data} options={options} />
}