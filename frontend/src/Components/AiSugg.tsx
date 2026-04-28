type AiSuggestion = {
    suggestedStandardAccountNumber: string;
    suggestedStandardAccountName: string;
    suggestedCategory: string;
    confidence: number;
    reason: string;
}

type Props = {
    sourceAccountNumber: string;
    sourceAccountName: string;
    onSuggestionApplied: (suggestions: AiSuggestion) => void;
}

function AiSuggestButton({sourceAccountNumber, sourceAccountName, onSuggestionApplied}: Props) {
    async function getAiSuggestion() {
        const response = await fetch(
          "http://localhost:5272/api/Mapping/ai-suggest", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accountNumber: sourceAccountNumber,
              accountName: sourceAccountName,
            }),
          }
        );

        const suggestion: AiSuggestion = await response.json();
        onSuggestionApplied(suggestion);
    }

    return (
        <button onClick={getAiSuggestion} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get AI Suggestions
        </button>
    )
}

export default AiSuggestButton;