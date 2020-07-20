using Assistant.Tests.Acceptance.Helpers;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NUnit.Framework;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Assistant.Tests.Acceptance
{
    [TestFixture]
    public class TvShowControllerTests
    {
        private HttpClient _httpClient;
        private string _token;

        [SetUp]
        public void Setup()
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "appsettings.json"))
                .Build();
            var fixture = new ComponentFixtureBase(configuration);
            var token = fixture.ComponentContext.TokenBuilder
                .ForSubject("d03fd514-ae8e-4fb4-95df-23fb2ec66ef5")
                .WithClaim("scope", "openid")
                .WithClaim("scope", "profile")
                .WithClaim("scope", "AssistantAPI")
                .WithClaim("amr", "pwd")
                .WithClaim("client_id", "Assistant")
                .WithClaim("idp", "local")
                .BuildToken();


            _httpClient = fixture.ComponentContext.Client;
            _token = token;
        }

        [Test]
        public async Task Should_Get_Tv_Shows()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "api/tvshows");

            request.Headers.Authorization = new AuthenticationHeaderValue("bearer", _token);

            var response = await _httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseContent);
        }
    }
}
