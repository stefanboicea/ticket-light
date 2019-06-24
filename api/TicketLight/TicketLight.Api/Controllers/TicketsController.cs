using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OData;
using TicketLight.Core.Common;
using TicketLight.Core.DataAccess;
using TicketLight.Core.Entities;

namespace TicketLight.Api
{
    /// <summary>
    /// All methods have specific status codes and are wrapped in an envelope (ApiResponse)
    /// which contains additional properties that may be useful to the calling clients.
    /// </summary>

    [Route("api/[controller]")]
    public class TicketsController : ODataController
    {
        private readonly TicketScope _scope;
        public TicketsController(TicketScope scope)
        {
            this._scope = scope;
        }


        /* 
             * Things to consider to limit RAM usage:
             * - Have a server constant for max page size 
             *  and validate client requests according to that size (ODataValidationService)
             *  Perform server-driven pagination accordingly            
             * Cache items when possible: 
             * - Use a request param to have clients specify if cache flushing is needed
             * - use a server side timestamp for cache duration                        
            */

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<Ticket> queryOptions)
        {
            try
            {
                queryOptions.Validate(ODataValidationService.Settings);
            }
            catch (ODataException exception)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ApiResponse(exception));
            }

            QueryResponse<Ticket> searchResponse = new TicketRepository(_scope.Context).Search(queryOptions,AppSettings.Instance.MaxPageSize);

            return StatusCode(StatusCodes.Status200OK, new ApiResponse(searchResponse.Items, searchResponse.TotalCount, AppSettings.Instance.MaxPageSize));
        }


        [HttpGet]
        [Route("/({Id})")]
        [ValidateModelState]
        public virtual IActionResult GetTicket([FromRoute][Required]int? id, [FromQuery]List<string> select, [FromQuery]List<string> expand)
        {
            /* 
             * could return different status codes, depending on the situation:
             * - NotFound when , ofc not found 
             * - 5xx for server errors 
             * - Get ticket from the repository            
            */

            var apiResponse = new ApiResponse();

            return StatusCode(StatusCodes.Status200OK, apiResponse);
        }


        [HttpPatch]
        [Route("/({Id})")]
        [ValidateModelState]
        public virtual IActionResult UpdateTicket([FromBody]Ticket body, [FromRoute][Required]int? id)
        {

            // return different status codes, depending on the situation:

            var apiResponse = new ApiResponse();

            return Ok(apiResponse);
        }

    }
}

