using System;
using System.Collections.Generic;

namespace TicketLight.Core.Entities
{
    public class QueryResponse<T>
    {
        public int TotalCount { get; set; }

        public List<T> Items { get; set; }
    }
}
