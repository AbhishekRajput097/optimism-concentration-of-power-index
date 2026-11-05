// components/MathFormula.tsx
import React from 'react';
import katex from 'katex';

interface MathFormulaProps {
    formula: string;
    displayMode?: boolean;
    className?: string;
}

const MathFormula: React.FC<MathFormulaProps> = ({ formula, displayMode = false, className }) => {
    const html = katex.renderToString(formula, {
        throwOnError: false,
        displayMode: displayMode,
    });

    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MathFormula;
