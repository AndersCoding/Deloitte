using ClosedXML.Excel;
using backend.DTOs;

namespace backend.Services;

public class ExcelParserService
{
    public List<TrialBalanceAccountDto> ParseAccounts(Stream fileStream)
    {
        using var workbook = new XLWorkbook(fileStream);
        var worksheet = workbook.Worksheet(1);

        var rows = worksheet.RowsUsed().Skip(1);

        var accounts = new List<TrialBalanceAccountDto>();

        foreach (var row in rows)
        {
            var accountNumber = row.Cell(1).GetValue<string>().Trim();
            var accountDescription = row.Cell(2).GetValue<string>().Trim();

            if (string.IsNullOrEmpty(accountNumber) || string.IsNullOrEmpty(accountDescription))
            {
                continue;
            }
                    accounts.Add(new TrialBalanceAccountDto
                    {
                    AccountNumber = accountNumber,
                    AccountDescription = accountDescription
                    }
                );
        }
            return accounts;
    }
}