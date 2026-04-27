import React from 'react'
import type { Mapping } from '../types/Mapping'
import MappingRow from './MappingRow'

type Props = {
    mappings: Mapping[];
    onConfirm: (index: number) => void;
}

function MappingTable({mappings, onConfirm}: Props) {

  return (
 <table>
        <thead>
            <tr>
            <th>Original Account</th>
            <th>Source Mapping</th>
            <th>Category</th>
            <th>Confidence</th>
            <th>Status</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {mappings.map((mapping, index) => (
            <MappingRow key={index} 
            mapping={mapping}
            index={index} 
            onConfirm={onConfirm} />
            ))}
        </tbody>
 </table>
  )
}

export default MappingTable;