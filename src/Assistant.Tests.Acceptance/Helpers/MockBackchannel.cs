using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Assistant.Tests.Acceptance.Helpers
{
    public class MockBackchannel : HttpMessageHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.RequestUri.AbsoluteUri.Equals("https://localhost:44336/.well-known/openid-configuration"))
            {
                var msg = new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Content = new StringContent("{\"issuer\":\"https://localhost:44336\",\"jwks_uri\":\"https://localhost:44336/.well-known/openid-configuration/jwks\",\"authorization_endpoint\":\"https://localhost:44336/connect/authorize\",\"token_endpoint\":\"https://localhost:44336/connect/token\",\"userinfo_endpoint\":\"https://localhost:44336/connect/userinfo\",\"end_session_endpoint\":\"https://localhost:44336/connect/endsession\",\"check_session_iframe\":\"https://localhost:44336/connect/checksession\",\"revocation_endpoint\":\"https://localhost:44336/connect/revocation\",\"introspection_endpoint\":\"https://localhost:44336/connect/introspect\",\"device_authorization_endpoint\":\"https://localhost:44336/connect/deviceauthorization\",\"frontchannel_logout_supported\":true,\"frontchannel_logout_session_supported\":true,\"backchannel_logout_supported\":true,\"backchannel_logout_session_supported\":true,\"scopes_supported\":[\"openid\",\"profile\",\"AssistantAPI\",\"offline_access\"],\"claims_supported\":[\"sub\",\"name\",\"family_name\",\"given_name\",\"middle_name\",\"nickname\",\"preferred_username\",\"profile\",\"picture\",\"website\",\"gender\",\"birthdate\",\"zoneinfo\",\"locale\",\"updated_at\"],\"grant_types_supported\":[\"authorization_code\",\"client_credentials\",\"refresh_token\",\"implicit\",\"password\",\"urn:ietf:params:oauth:grant-type:device_code\"],\"response_types_supported\":[\"code\",\"token\",\"id_token\",\"id_token token\",\"code id_token\",\"code token\",\"code id_token token\"],\"response_modes_supported\":[\"form_post\",\"query\",\"fragment\"],\"token_endpoint_auth_methods_supported\":[\"client_secret_basic\",\"client_secret_post\"],\"id_token_signing_alg_values_supported\":[\"RS256\"],\"subject_types_supported\":[\"public\"],\"code_challenge_methods_supported\":[\"plain\",\"S256\"],\"request_parameter_supported\":true}")
                };
                return msg;
            }
            if (request.RequestUri.AbsoluteUri.Equals("https://inmemory.microsoft.com/common/discovery/keys"))
            {
                return await EmbeddedResourceReader.GetOpenIdConfigurationAsResponseMessage("microsoft-wellknown-keys.json");
            }

            throw new NotImplementedException();
        }
    }
}
