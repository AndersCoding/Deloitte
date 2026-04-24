using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MappingController : ControllerBase
{

    private readonly ExcelParserService _excelParserService;

    public MappingController()
    {
        _excelParserService = new ExcelParserService();
}


    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        using var stream = file.OpenReadStream();

        var accounts = _excelParserService.ParseAccounts(stream);


        return Ok(accounts);
   
    }
}
