using backend.DTOs;
using backend.Models;

public class MappingService
{
    private readonly List<StandardAccount> _standardAccounts =
    [
        new StandardAccount { AccountNumber = "1920", AccountName = "Bank", Category = "Omløpsmidler" },
        new StandardAccount { AccountNumber = "5000", AccountName = "Lønn", Category = "Lønn" },
        new StandardAccount { AccountNumber = "2400", AccountName = "Leverandørgjeld", Category = "Kortsiktig gjeld" },
        new StandardAccount { AccountNumber = "3000", AccountName = "Salgsinntekter", Category = "Driftinntekter"},
        new StandardAccount { AccountNumber = "1200", AccountName = "Maskiner og anlegg", Category = "Driftsmidler" },
        new StandardAccount { AccountNumber = "1500", AccountName = "Kundefordringer", Category = "Omløpsmidler" },
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

            if (bestMatch.Store == 0)
            {
                results.Add(new MappingSuggestions
                {
                    SourceAccountNumber = account.AccountNumber,
                    SourceAccountName = account.AccountDescription,
                    SuggestedStandardAccountNumber = "",
                    SuggestedStandardAccountName = "No match",
                    SuggestedCategory = "Requires manual review",
                    Confidence = 0,
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