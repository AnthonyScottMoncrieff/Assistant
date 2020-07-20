using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace Assistant.Tests.Acceptance.Helpers
{
    public class ComponentTestContext
    {
        public IConfigurationRoot ComponentConfigSettings { get; set; }

        public HttpClient Client { get; set; }

        public BearerTokenBuilder TokenBuilder { get; set; }
    }
}
