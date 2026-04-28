using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MappingController : ControllerBase
{

    private readonly ExcelParserService _excelParserService = new ExcelParserService();
    private readonly MappingService _mappingService = new MappingService();

    // Store data
    private static List<MappingSuggestions> _latestMappings = new();

    // Post excel-file
    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        using var stream = file.OpenReadStream();

        var accounts = _excelParserService.ParseAccounts(stream);

        var mappings = _mappingService.GenerateMappings(accounts);

        // Store the latest mappings in memory
        _latestMappings = mappings;
        return Ok(mappings);

    }

    // Get data from the uploaded file
    [HttpGet]
    public IActionResult GetLatestMappings()
    {
        return Ok(_latestMappings);
    }


    // AI-suggested mapping
    [HttpPost("ai-suggest")]
    public async Task<IActionResult> AiSuggest(
    [FromBody] AiMappingRequest request,
    [FromServices] OpenAiMappingService aiService)
{
    var suggestion = await aiService.SuggestMapping(request);

    if (suggestion == null)
    {
        return BadRequest("Could not generate AI suggestion.");
    }

    return Ok(suggestion);
}

}
