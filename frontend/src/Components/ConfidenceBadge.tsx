import React from 'react'

type Props = {
    confidence: number;
}

function ConfidenceBadge({confidence}: Props) {

    const percentage = Math.round(confidence * 100);

     if (confidence >= 0.7) return <span style={{ color: "green" }}>{percentage}% High</span>;
     if (confidence >= 0.3) return <span style={{ color: "orange" }}>{percentage}% Medium</span>;

     return <span style={{ color: "red" }}>{percentage}% Low</span>;

}

export default ConfidenceBadge;
