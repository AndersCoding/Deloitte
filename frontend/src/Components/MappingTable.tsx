import type { Mapping } from "../types/Mapping";
import MappingRow from "./MappingRow";

type StandardAccount = {
  accountNumber: string;
  accountName: string;
  category: string;
};

type AiSuggestion = {
  suggestedStandardAccountNumber: string;
  suggestedStandardAccountName: string;
  suggestedCategory: string;
  confidence: number;
  reason: string;
};

type Props = {
  mappings: Mapping[];
  standardAccounts: StandardAccount[];
  onConfirm: (index: number) => void;
  onUpdate: (index: number, selectedAccountNumber: string) => void;
  onAiSuggestion: (index: number, suggestion: AiSuggestion) => void;
};

function MappingTable({
  mappings,
  standardAccounts,
  onUpdate,
  onConfirm,
  onAiSuggestion,
}: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Original Account</th>
          <th>Source Mapping</th>
          <th>Suggested Mapping</th>
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
            onAiSuggestion={onAiSuggestion}
          />
        ))}
      </tbody>
    </table>
  );
}

export default MappingTable;
