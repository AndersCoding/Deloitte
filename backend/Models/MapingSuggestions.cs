namespace backend.Models;

public class MappingSuggestions
{
    // public int Id { get; set; }
    public string SourceAccountNumber { get; set; } = string.Empty;
    public string SourceAccountName { get; set; } = string.Empty;
    public string SuggestedStandardAccountNumber { get; set; } = string.Empty;
    public string SuggestedStandardAccountName { get; set; } = string.Empty;

    public double Confidence { get; set; }

    public string Status { get; set; } = "Suggested";
    public string SuggestedCategory { get; set; } = string.Empty;
}