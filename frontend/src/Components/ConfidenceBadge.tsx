import React from 'react'

type Props = {
    confidence: number;
}

function ConfidenceBadge({confidence}: Props) {

    const percentage = Math.round(confidence * 100);

     if (confidence >= 0.7) return <span>{percentage}% High</span>;
     if (confidence >= 0.3) return <span>{percentage}% Medium</span>;

     return <span>{percentage}% Low</span>;

}

export default ConfidenceBadge;
