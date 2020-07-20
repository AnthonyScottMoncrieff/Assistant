using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Text;

namespace Assistant.Tests.Acceptance.Helpers
{
    public class TestAuthenticationApi
    {
        public TestAuthenticationApi(IConfiguration configuration)
        {
            var builder = new WebHostBuilder()
                .UseConfiguration(configuration)
                .UseStartup<Startup>()
                .ConfigureServices(services =>
                {
                    services.PostConfigure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters()
                        {
                            SignatureValidator = (token, parameters) => new JwtSecurityToken(token)
                        };
                        options.Audience = "AssistantAPI";
                        options.Authority = "https://localhost:44336";
                        options.BackchannelHttpHandler = new MockBackchannel();
                        options.MetadataAddress = "https://inmemory.microsoft.com/common/.well-known/openid-configuration";
                    });
                });

            var server = new TestServer(builder);

            Client = server.CreateClient();
            Client.BaseAddress = new Uri("https://localhost:44336");
        }

        public HttpClient Client { get; set; }
    }
}
