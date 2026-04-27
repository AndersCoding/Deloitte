import React from 'react'
import type { Mapping } from '../types/Mapping'
import ConfidenceBadge from './ConfidenceBadge'

type Props = {
    mapping: Mapping;
    index: number;
    onConfirm: (index: number) => void;
}

function MappingRow({mapping, index, onConfirm}: Props) {
  return (
    <tr>
      <td>{mapping.sourceAccountNumber}</td>
      <td>{mapping.sourceAccountName}</td>
      <td>{mapping.suggestedStandardAccountNumber}</td>
      <td>{mapping.suggestedStandardAccountName}</td>
      <td>
        <ConfidenceBadge confidence={mapping.confidence} />
      </td>
      <td>{mapping.status}</td>
      <td>{mapping.suggestedCategory}</td>
      <td>
        <button onClick={() => onConfirm(index)}>Confirm</button>
      </td>
    </tr>
  );
}

export default MappingRow;