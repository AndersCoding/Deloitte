using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MappingController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> UploadTrialBalance(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }
        return Ok(new
        {
            fileName = file.FileName,
            fileSize = file.Length,
            message = "File received successfully."
        });
    }
}
