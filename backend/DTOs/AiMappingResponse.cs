namespace backend.DTOs;

public class AiMappingResponse
{
    public string SuggestedStandardAccountNumber { get; set; } = string.Empty;
    public string SuggestedStandardAccountName { get; set; } = string.Empty;
    public string SuggestedCategory { get; set; } = string.Empty;
    public double Confidence { get; set; }
    public string Reason { get; set; } = string.Empty;
}