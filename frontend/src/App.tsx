import { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./Components/InfoBox";
import MappingTable from "./Components/MappingTable";
import { getMappings } from "./services/mappingService";
import type { Mapping } from "./types/Mapping";

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
];


function App() {

  const [mappings, setMappings] = useState<Mapping[]>([]);

  function updateMapping(index: number, selectedAccountNumber: string) {
    const selectedAccount = standardAccounts.find(
      (account) => account.accountNumber === selectedAccountNumber
    );

    if (!selectedAccount) return;

    const updatedMappings = [...mappings];

    updatedMappings[index] = {
      ...updatedMappings[index],
      suggestedStandardAccountNumber: selectedAccount.accountNumber,
      suggestedStandardAccountName: selectedAccount.accountName,
      suggestedCategory: selectedAccount.category,
      status: "Edited",
    };

    setMappings(updatedMappings);
  }

  // Fetch movies
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

  return (
    <>
      <InfoBox />
      <section id="center">
        <main>
          <h1>AI-assisted account mapping</h1>

          <MappingTable
            mappings={mappings}
            standardAccounts={standardAccounts}
            onConfirm={confirmMapping}
            onUpdate={updateMapping}
          />
        </main>
      </section>
    </>
  );
}

export default App;
