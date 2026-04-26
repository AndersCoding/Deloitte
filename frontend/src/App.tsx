import { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./Components/InfoBox";
import axios from "axios";


interface Accounts {
  sourceAccountNumber: string;
  sourceAccountName: string;
  suggestedStandardAccountNumber: string;
  suggestedStandardAccountName: string;
  confidence: number;
  status: string;
  suggeestedCategory: string;

}
function App() {

  const [accounts, setAccounts] = useState<Accounts[]>([]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5272/api/Mapping/");
        setAccounts(response.data);
        console.log(accounts)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <InfoBox />
      <section id="center">
        <h3>AI-accounted mapping</h3>
       
      </section>
    </>
  );
}

export default App;
