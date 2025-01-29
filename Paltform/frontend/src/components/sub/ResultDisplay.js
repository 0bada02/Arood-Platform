import React from 'react';
import '../../styles/sub/ResultDisplay.css';

function ResultDisplay({ result }) {
    const formattedModelName = result.model_name.replace(/\.keras$/, '');

    return (
        <div className="result-display">
            <div className="result-header">Analysis Result</div>
            <div className="result-box"><strong>Bahr:</strong> {result.bahr}</div>
            <div className="result-box"><strong>Confidence Ratio:</strong> {result.confidence_ratio.toFixed(4)}</div>
            <div className="result-box"><strong>Model Name:</strong> {formattedModelName}</div>
        </div>
    );
}

export default ResultDisplay;
