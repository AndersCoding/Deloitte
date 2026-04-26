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
  suggestedCategory: string;
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
        {accounts.map((account, index) => (
          <div key={index} className="account-card">
            <p>
              <strong>Source Account Number:</strong>{" "}
              {account.sourceAccountNumber}
            </p>
            <p>
              <strong>Source Account Name:</strong> {account.sourceAccountName}
            </p>
            <p>
              <strong>Suggested Standard Account Number:</strong>{" "}
              {account.suggestedStandardAccountNumber}
            </p>
            <p>
              <strong>Suggested Standard Account Name:</strong>{" "}
              {account.suggestedStandardAccountName}
            </p>
            <p>
              <strong>Confidence:</strong> {account.confidence}
            </p>
            <p>
              <strong>Status:</strong> {account.status}
            </p>
            <p>
              <strong>Suggested Category:</strong> {account.suggestedCategory}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
