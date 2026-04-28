using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using backend.DTOs;

namespace backend.Services;

public class OpenAiMappingService
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public OpenAiMappingService(IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClient = new HttpClient();
    }

    public async Task<AiMappingResponse?> SuggestMapping(AiMappingRequest request)
    {
        // Set this to false when you want to test with real OpenAI API.
       // var useMock = true;
//
       // if (useMock)
       // {
       //     return new AiMappingResponse
       //     {
       //         SuggestedStandardAccountNumber = "1200",
       //         SuggestedStandardAccountName = "Maskiner og anlegg",
       //         SuggestedCategory = "Driftsmidler",
       //         Confidence = 0.88,
       //         Reason = "Mock AI test"
       //     };
       // }

        var apiKey = _configuration["OpenAI:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new Exception("OpenAI API key is missing.");
        }

        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);

        var prompt = $@"
You are helping map Norwegian trial balance accounts to a simplified standard chart of accounts.

Source account:
{request.AccountNumber} - {request.AccountName}

Choose the best matching account from this list.
Be strict. Only choose from the provided list. Do not invent new accounts.

1000 - Forskning og utvikling - Anleggsmidler
1070 - Utsatt skattefordel - Anleggsmidler
1200 - Maskiner og anlegg - Driftsmidler
1230 - Biler - Driftsmidler
1270 - Verktøy - Driftsmidler
1500 - Kundefordringer - Omløpsmidler
1700 - Forskuddsbetalte kostnader - Omløpsmidler
1920 - Bank - Omløpsmidler
2000 - Aksjekapital - Egenkapital
2050 - Annen egenkapital - Egenkapital
2400 - Leverandørgjeld - Kortsiktig gjeld
2700 - Merverdiavgift - Kortsiktig gjeld
2900 - Annen kortsiktig gjeld - Kortsiktig gjeld
2930 - Skyldig lønn - Kortsiktig gjeld
2940 - Skyldige feriepenger - Kortsiktig gjeld
3000 - Salgsinntekter - Driftsinntekter
3900 - Annen driftsinntekt - Driftsinntekter
4300 - Varekostnad - Varekostnader
5000 - Lønn - Lønn
5400 - Arbeidsgiveravgift - Lønn
6000 - Avskrivninger - Driftskostnader
6300 - Leiekostnader - Driftskostnader
6400 - Leie maskiner - Driftskostnader
6500 - Driftsmateriale og utstyr - Driftskostnader
6700 - Fremmed tjeneste - Driftskostnader
6800 - Kontorkostnader - Driftskostnader
6900 - Telefon og kommunikasjon - Driftskostnader
7000 - Transportkostnader - Driftskostnader
7300 - Salgskostnader - Driftskostnader
7500 - Forsikring - Driftskostnader
7770 - Bankgebyrer - Driftskostnader
8050 - Renteinntekter - Finansinntekter
8150 - Rentekostnader - Finanskostnader
8300 - Skattekostnad - Skatt
8960 - Overføring egenkapital - Egenkapital

Return ONLY valid JSON in this exact shape:

{{
  ""suggestedStandardAccountNumber"": ""string"",
  ""suggestedStandardAccountName"": ""string"",
  ""suggestedCategory"": ""string"",
  ""confidence"": 0.0,
  ""reason"": ""short explanation""
}}
";

        var body = new
        {
            model = "gpt-4o-mini",
            input = prompt
        };

        var json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(
            "https://api.openai.com/v1/responses",
            content
        );

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception(error);
        }

        var responseJson = await response.Content.ReadAsStringAsync();

        using var document = JsonDocument.Parse(responseJson);

        var outputText = document
            .RootElement
            .GetProperty("output")[0]
            .GetProperty("content")[0]
            .GetProperty("text")
            .GetString();

        if (string.IsNullOrWhiteSpace(outputText))
        {
            return null;
        }

        outputText = outputText
        .Replace("```json", "")
        .Replace("```", "")
        .Trim();

        return JsonSerializer.Deserialize<AiMappingResponse>(
            outputText,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }
        );
    }
}