using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace TicketLight.Core.DataAccess
{
    public class TicketScope : IDisposable
    {
        public TicketScope()
        {
            var builder = new DbContextOptionsBuilder<TicketContext>();
            Context = new TicketContext(builder.Options);
        }

        public TicketScope(TicketContext context)
        {
            Context = context;
        }

        public TicketContext Context { get; private set; }
        public IDbContextTransaction Transaction { get; set; }

        bool _disposed = false;
        public void Dispose()
        {
            if (!_disposed)
            {
                _disposed = true;
                Context.Dispose();
            }
        }
    }
}
