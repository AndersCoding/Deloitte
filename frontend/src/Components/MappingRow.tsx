import type { Mapping } from "../types/Mapping";
import ConfidenceBadge from "./ConfidenceBadge";

type StandardAccount = {
  accountNumber: string;
  accountName: string;
  category: string;
};

type Props = {
  mapping: Mapping;
  index: number;
  standardAccounts: StandardAccount[];
  onConfirm: (index: number) => void;
  onUpdate: (index: number, selectedAccountNumber: string) => void;
};

function MappingRow({
  mapping,
  index,
  standardAccounts,
  onConfirm,
  onUpdate,
}: Props) {
  return (
    <tr>
      {/* Original */}
      <td>{mapping.sourceAccountNumber}</td>

      {/* Source name */}
      <td>{mapping.sourceAccountName}</td>

      {/* 🔥 Editable suggested mapping */}
      <td>
        <select
          value={mapping.suggestedStandardAccountNumber}
          onChange={(e) => onUpdate(index, e.target.value)}
        >
          {standardAccounts.map((account) => (
            <option key={account.accountNumber} value={account.accountNumber}>
              {account.accountNumber} - {account.accountName}
            </option>
          ))}
        </select>
      </td>

      {/* Category */}
      <td>{mapping.suggestedCategory}</td>

      {/* Confidence */}
      <td>
        <ConfidenceBadge confidence={mapping.confidence} />
      </td>

      {/* Status */}
      <td>{mapping.status}</td>

      {/* Actions */}
      <td>
        <button onClick={() => onConfirm(index)}>Confirm</button>
      </td>
    </tr>
  );
}

export default MappingRow;
