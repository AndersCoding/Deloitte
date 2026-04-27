import { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./Components/InfoBox";
import MappingTable from "./Components/MappingTable";
import { getMappings } from "./services/mappingService";
import type { Mapping } from "./types/Mapping";


function App() {

  const [mappings, setMappings] = useState<Mapping[]>([]);

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

          <MappingTable mappings={mappings} onConfirm={confirmMapping} />
        </main>
      </section>
    </>
  );
}

export default App;
