using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Assistant.Tests.Acceptance.Helpers
{

    public class ComponentFixtureBase
    {
        public ComponentTestContext ComponentContext;
        private const string CertificatePassword = "pass";

        public ComponentFixtureBase(IConfiguration configuration)
        {
            ComponentContext = new ComponentTestContext
            {
                Client = new TestAuthenticationApi(configuration).Client,
                TokenBuilder =
                        new BearerTokenBuilder()
                            .ForAudience("AssistantAPI")
                            .IssuedBy("https://localhost:44336")
                            .WithSigningCertificate(EmbeddedResourceReader.GetCertificate())
            };
        }
    }
}
