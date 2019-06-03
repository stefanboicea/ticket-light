using System;
using Microsoft.EntityFrameworkCore;
using TicketLight.Core.Entities;

namespace TicketLight.Core.DataAccess
{
    public class TicketsContext : DbContext
    {
        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<Member> Members { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./TicketLight.db");
        }

        public TicketsContext(DbContextOptions<TicketsContext> options)
            : base(options) { }


    }
}
