import type { Mapping } from '../types/Mapping'
import MappingRow from './MappingRow'

type StandardAccount = {
    accountNumber: string;
    accountName: string;
    category: string;
}


type Props = {
  mappings: Mapping[];
  standardAccounts: StandardAccount[];
  onConfirm: (index: number) => void;
  onUpdate: (index: number, selectedAccountNumber: string) => void;
};

function MappingTable({mappings, standardAccounts, onUpdate, onConfirm}: Props) {

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
          <MappingRow
            key={index}
            mapping={mapping}
            index={index}
            standardAccounts={standardAccounts}
            onConfirm={onConfirm}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  );
}

export default MappingTable;