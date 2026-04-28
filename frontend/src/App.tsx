import { useState, useEffect } from "react";
import "./App.css";
import MappingTable from "./Components/MappingTable";
import { getMappings } from "./services/mappingService";
import type { Mapping } from "./types/Mapping";

type AiSuggestion = {
  suggestedStandardAccountNumber: string;
  suggestedStandardAccountName: string;
  suggestedCategory: string;
  confidence: number;
  reason: string;
};

const standardAccounts = [
  { accountNumber: "1920", accountName: "Bank", category: "Omløpsmidler" },
  { accountNumber: "5000", accountName: "Lønn", category: "Lønn" },
  {
    accountNumber: "2400",
    accountName: "Leverandørgjeld",
    category: "Kortsiktig gjeld",
  },
  {
    accountNumber: "3000",
    accountName: "Salgsinntekter",
    category: "Driftsinntekter",
  },
  {
    accountNumber: "1200",
    accountName: "Maskiner og anlegg",
    category: "Driftsmidler",
  },
  {
    accountNumber: "1500",
    accountName: "Kundefordringer",
    category: "Omløpsmidler",
  },
  {
    accountNumber: "1000",
    accountName: "Forskning og utvikling",
    category: "Anleggsmidler",
  },
  {
    accountNumber: "1070",
    accountName: "Utsatt skattefordel",
    category: "Anleggsmidler",
  },
  { accountNumber: "1230", accountName: "Biler", category: "Driftsmidler" },
  { accountNumber: "1270", accountName: "Verktøy", category: "Driftsmidler" },
  {
    accountNumber: "2000",
    accountName: "Aksjekapital",
    category: "Egenkapital",
  },
  {
    accountNumber: "2050",
    accountName: "Annen egenkapital",
    category: "Egenkapital",
  },
  {
    accountNumber: "2930",
    accountName: "Skyldig lønn",
    category: "Kortsiktig gjeld",
  },
  {
    accountNumber: "2940",
    accountName: "Skyldige feriepenger",
    category: "Kortsiktig gjeld",
  },
];

function App() {

  const [mappings, setMappings] = useState<Mapping[]>([]);

 function updateMapping(index: number, selectedAccountNumber: string) {
   const selectedAccount = standardAccounts.find(
     (account) => account.accountNumber === selectedAccountNumber
   );

   if (!selectedAccount) return;

   const updatedMappings = [...mappings];
   const currentMapping = updatedMappings[index];

   updatedMappings[index] = {
     ...currentMapping,
     suggestedStandardAccountNumber: selectedAccount.accountNumber,
     suggestedStandardAccountName: selectedAccount.accountName,
     suggestedCategory: selectedAccount.category,
     status: "Edited",
   };

   setMappings(updatedMappings);
 }

  // Fetch from api when component mounts
  useEffect(() => {
    async function loadMappings() {
      const data = await getMappings();
      setMappings(data);
    }
    loadMappings();
    }
  , []);

  function confirmMapping(index: number) {
    const updatedMappings = [...mappings];
    updatedMappings[index].status = "Confirmed";
    setMappings(updatedMappings);
  }

function applyAiSuggestion(index: number, suggestion: AiSuggestion) {
  const updatedMappings = [...mappings];

  updatedMappings[index] = {
    ...updatedMappings[index],
    suggestedStandardAccountNumber: suggestion.suggestedStandardAccountNumber,
    suggestedStandardAccountName: suggestion.suggestedStandardAccountName,
    suggestedCategory: suggestion.suggestedCategory,
    confidence: suggestion.confidence,
    status: "Suggested",
  };

  setMappings(updatedMappings);
}
  return (
    <>
      <section id="center">
        <main>
          <h1>Deloitte Case</h1>

          <MappingTable
            mappings={mappings}
            standardAccounts={standardAccounts}
            onConfirm={confirmMapping}
            onUpdate={updateMapping}
              onAiSuggestion={applyAiSuggestion}
          />
        </main>
      </section>
    </>
  );
}

export default App;
