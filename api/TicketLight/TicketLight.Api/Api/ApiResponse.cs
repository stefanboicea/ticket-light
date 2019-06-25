using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.OData;
using TicketLight.Core.Entities;

namespace TicketLight.Api
{
    /// <summary>
    /// ApiResponse class. 
    /// Used to wrap api responses with additional properties that may be useful 
    /// to the calling clients.
    /// InternalStatusCode - provide additional error/info details
    /// Ticket - for single queries (GetById)
    /// Tickets - for list queries 
    /// Message - status message, could extend to a collection of complex messages(multiple errors)
    /// </summary>
    public class ApiResponse<T> : QueryResponse<T>
    {
        public ApiResponse()
        {

        }

        public ApiResponse(ODataException exception)
        {
            this.InternalStatusCode = ApiStatusCode.ErrorGenericOdataValidation;
            this.Message = exception.Message;
        }

        public ApiResponse(ApiStatusCode internalStatusCode)
        {
            this.InternalStatusCode = internalStatusCode;
        }

        public ApiStatusCode InternalStatusCode { get; set; }


        public int PageSize { get; set; }

        public string Message { get; set; }

    }
}
