// import CPIChartForOP from "../common/CPIChartForOp";
import dynamic from "next/dynamic";
// import CPIChartofDAOs from "../common/CPIChartofDAOs";
// import LineGraph from "../common/LineGraph";

const CPIChartofDAOs = dynamic(() => import('../common/CPIChartofDAOs'), { ssr: false });
const LineGraph = dynamic(() => import('../common/LineGraph'), { ssr: false });
const CPIChartForOP = dynamic(() => import('../common/CPIChartForOp'), { ssr: false });

const FeaturedDAOChart: React.FC = () => {
    return <>
        <CPIChartofDAOs />
        <LineGraph />
        <CPIChartForOP />
    </>
}

export default FeaturedDAOChart;