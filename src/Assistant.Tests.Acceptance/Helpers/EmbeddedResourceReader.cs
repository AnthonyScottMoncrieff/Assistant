using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Assistant.Tests.Acceptance.Helpers
{
    public class EmbeddedResourceReader
    {
        private const string EmbeddedResourceQualifier = "Assistant.Tests.Acceptance.Helpers";

        public static X509Certificate2 GetCertificate()
        {
            var cert = CertificateHelper.FindByThumbprint("CN=localhost", StoreName.My, StoreLocation.LocalMachine);

            return cert;
        }

        public static async Task<HttpResponseMessage> GetOpenIdConfigurationAsResponseMessage(string resource)
        {
            var resourceName = $"{EmbeddedResourceQualifier}.well_known." + resource;
            using (var stream = typeof(EmbeddedResourceReader).Assembly.GetManifestResourceStream(resourceName))
            using (var reader = new StreamReader(stream))
            {
                var body = await reader.ReadToEndAsync();
                var content = new StringContent(body, Encoding.UTF8, "application/json");
                return new HttpResponseMessage()
                {
                    Content = content,
                };
            }
        }
    }
}
