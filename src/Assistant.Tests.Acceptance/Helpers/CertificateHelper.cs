using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Assistant.Tests.Acceptance.Helpers
{
    public static class CertificateHelper
    {
        public static X509Certificate2 FindByThumbprint(
            string issuer,
            StoreName storeName,
            StoreLocation storeLocation)
        {
            var certificateStore = new X509Store(storeName, storeLocation);
            certificateStore.Open(OpenFlags.ReadOnly);

            foreach (var certificate in certificateStore.Certificates)
            {
                if (certificate == null || certificate.Thumbprint == null)
                {
                    continue;
                }

                if (String.Equals(certificate.Issuer, issuer, StringComparison.CurrentCultureIgnoreCase))
                {
                    certificateStore.Close();
                    return certificate;
                }
            }

            throw new ArgumentException(
                string.Format("Cannot find certificate with issuer {0} in certificate store ", issuer));
        }
    }
}
