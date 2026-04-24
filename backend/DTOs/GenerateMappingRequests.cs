namespace backend.DTOs;

public class GenerateMappingsRequest
{
    public List<TrialBalanceAccountDto> Accounts { get; set; } = new();
}