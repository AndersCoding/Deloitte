using backend.DTOs;
using backend.Models;

public class MappingService
{
    private readonly List<StandardAccount> _standardAccounts =
    [
    new StandardAccount { AccountNumber = "1000", AccountName = "Forskning og utvikling", Category = "Anleggsmidler" },
new StandardAccount { AccountNumber = "1070", AccountName = "Utsatt skattefordel", Category = "Anleggsmidler" },
new StandardAccount { AccountNumber = "1200", AccountName = "Maskiner og anlegg", Category = "Driftsmidler" },
new StandardAccount { AccountNumber = "1230", AccountName = "Biler", Category = "Driftsmidler" },
new StandardAccount { AccountNumber = "1270", AccountName = "Verktøy", Category = "Driftsmidler" },
new StandardAccount { AccountNumber = "1500", AccountName = "Kundefordringer", Category = "Omløpsmidler" },
new StandardAccount { AccountNumber = "1700", AccountName = "Forskuddsbetalte kostnader", Category = "Omløpsmidler" },
new StandardAccount { AccountNumber = "1920", AccountName = "Bank", Category = "Omløpsmidler" },

new StandardAccount { AccountNumber = "2000", AccountName = "Aksjekapital", Category = "Egenkapital" },
new StandardAccount { AccountNumber = "2050", AccountName = "Annen egenkapital", Category = "Egenkapital" },
new StandardAccount { AccountNumber = "2400", AccountName = "Leverandørgjeld", Category = "Kortsiktig gjeld" },
new StandardAccount { AccountNumber = "2700", AccountName = "Merverdiavgift", Category = "Kortsiktig gjeld" },
new StandardAccount { AccountNumber = "2900", AccountName = "Annen kortsiktig gjeld", Category = "Kortsiktig gjeld" },
new StandardAccount { AccountNumber = "2930", AccountName = "Skyldig lønn", Category = "Kortsiktig gjeld" },
new StandardAccount { AccountNumber = "2940", AccountName = "Skyldige feriepenger", Category = "Kortsiktig gjeld" },

new StandardAccount { AccountNumber = "3000", AccountName = "Salgsinntekter", Category = "Driftsinntekter" },
new StandardAccount { AccountNumber = "3900", AccountName = "Annen driftsinntekt", Category = "Driftsinntekter" },
new StandardAccount { AccountNumber = "4300", AccountName = "Varekostnad", Category = "Varekostnader" },

new StandardAccount { AccountNumber = "5000", AccountName = "Lønn", Category = "Lønn" },
new StandardAccount { AccountNumber = "5400", AccountName = "Arbeidsgiveravgift", Category = "Lønn" },
new StandardAccount { AccountNumber = "6000", AccountName = "Avskrivninger", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "6300", AccountName = "Leiekostnader", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "6400", AccountName = "Leie maskiner", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "6500", AccountName = "Driftsmateriale og utstyr", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "6700", AccountName = "Fremmed tjeneste", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "6800", AccountName = "Kontorkostnader", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "6900", AccountName = "Telefon og kommunikasjon", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "7000", AccountName = "Transportkostnader", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "7300", AccountName = "Salgskostnader", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "7500", AccountName = "Forsikring", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "7770", AccountName = "Bankgebyrer", Category = "Driftskostnader" },
new StandardAccount { AccountNumber = "8050", AccountName = "Renteinntekter", Category = "Finansinntekter" },
new StandardAccount { AccountNumber = "8150", AccountName = "Rentekostnader", Category = "Finanskostnader" },
new StandardAccount { AccountNumber = "8300", AccountName = "Skattekostnad", Category = "Skatt" },
new StandardAccount { AccountNumber = "8960", AccountName = "Overføring egenkapital", Category = "Egenkapital" },
    ];

    public List<MappingSuggestions> GenerateMappings(List<TrialBalanceAccountDto> accounts)
    {
        var results = new List<MappingSuggestions>();
        foreach (var account in accounts)
        {
            var bestMatch = _standardAccounts
        .Select(sa => new
        {
            Account = sa,
            Store = CalculateScore(account, sa)
        })
        .OrderByDescending(x => x.Store)
        .First();

            if (bestMatch.Store < 0.3)
            {
                results.Add(new MappingSuggestions
                {
                    SourceAccountNumber = account.AccountNumber,
                    SourceAccountName = account.AccountDescription,
                    SuggestedStandardAccountNumber = "",
                    SuggestedStandardAccountName = "No match",
                    SuggestedCategory = "Requires manual review",
                    Confidence = bestMatch.Store,
                    Status = "NeedsReview"
                });
                continue;
            }

            results.Add(new MappingSuggestions
            {
                SourceAccountNumber = account.AccountNumber,
                SourceAccountName = account.AccountDescription,
                SuggestedStandardAccountNumber = bestMatch.Account.AccountNumber,
                SuggestedStandardAccountName = bestMatch.Account.AccountName,
                SuggestedCategory = bestMatch.Account.Category,
                Confidence = bestMatch.Store,
                Status = "Suggested"
            });
        }
            return results;
    }


    private double CalculateScore(TrialBalanceAccountDto source, StandardAccount target)
    {
        double score = 0;

        var sourceName = source.AccountDescription.ToLower();
        var targetName = target.AccountName.ToLower();

        // Number match
        if (source.AccountNumber == target.AccountNumber)
            score += 0.5;
        else if (source.AccountNumber[0] == target.AccountNumber[0])
            score += 0.1; //Bytt til 0,3 for flere kontoer

        // Name match
        if (sourceName == targetName)
            score += 0.2;

        // Key account name match
        if (sourceName.Contains("bank") && targetName.Contains("bank"))
            score += 0.2;
        if (sourceName.Contains("lønn") && targetName.Contains("lønn"))
            score += 0.2;
        if (sourceName.Contains("leverandør") && targetName.Contains("leverandør"))
            score += 0.2;
        if (sourceName.Contains("salgs") && targetName.Contains("salg"))
            score += 0.2;
        if (sourceName.Contains("maskin") && targetName.Contains("maskiner"))
            score += 0.2;

        return Math.Min(score, 1.0);
    }
}