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
      <td>{mapping.sourceAccountNumber}</td>

      <td>{mapping.sourceAccountName}</td>

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

      <td>{mapping.suggestedCategory}</td>

      <td>
        <ConfidenceBadge confidence={mapping.confidence} />
      </td>

      <td>
        <span style={{
            color:
              mapping.status === "Confirmed"
                ? "green"
                : mapping.status === "Edited"
                ? "orange"
                : "gray",
          }}>
          {mapping.status}
        </span>
      </td>

      <td>
        <button
          onClick={() => onConfirm(index)}
          disabled={mapping.status === "Confirmed"}
        >
          {mapping.status === "Confirmed" ? "Confirmed" : "Confirm"}
        </button>
      </td>
    </tr>
  );
}

export default MappingRow;
