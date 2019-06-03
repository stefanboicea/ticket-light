using System;
namespace TicketLight.Api
{
    public enum ApiStatusCode
    {
        Ok = 1,
        ErrorMaxPageSizeExceeded,
        ErrorPoorConnection, 
        ErrorRequestValidation,
        ErrorThirdPartyApi,
        ErrorGenericOdataValidation
    }
}
