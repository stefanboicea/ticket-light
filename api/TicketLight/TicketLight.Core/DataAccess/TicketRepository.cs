using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.OData.Query;
using TicketLight.Core.Common;
using TicketLight.Core.Entities;
using TicketLight.Core.Services;

namespace TicketLight.Core.DataAccess
{

    public class TicketRepository
    {
        TimeSpan _cachingValidity;
        TicketContext _context;

        public TicketRepository(TicketContext context)
        {
            _context = context;
            _cachingValidity = TimeSpan.FromSeconds(AppSettings.Instance.CachedSearchValiditySeconds);
        }

        public QueryResponse<Ticket> Search(ODataQueryOptions<Ticket> queryOptions, int maxPageSize)
        {
            QueryResponse<Ticket> response = new QueryResponse<Ticket>();

            var cachingService = ServiceProvider.Get<ICachingService>();

            var cachedTickets = cachingService.Get<List<Ticket>>(CacheKeys.TicketSearchCacheKey);
            if (cachedTickets == null)
            {
                cachedTickets = _context.Tickets.ToList();
                cachingService.Cache(CacheKeys.TicketSearchCacheKey, _cachingValidity, cachedTickets);
            }

            var tickets = cachedTickets.AsQueryable();

            if (queryOptions.Filter != null)
            {
                tickets = (IQueryable<Ticket>)queryOptions.Filter.ApplyTo(tickets, new ODataQuerySettings());
            }

            response.TotalCount = tickets.Count();

            if (queryOptions.Skip != null)
            {
                tickets = tickets.Skip(queryOptions.Skip.Value);
            }
            if (queryOptions.Top != null && queryOptions.Top.Value < maxPageSize)
            {
                maxPageSize = queryOptions.Top.Value;
            }

            tickets = tickets.Take(maxPageSize);

            response.Items = tickets.ToList();

            return response;

        }
    }
}
