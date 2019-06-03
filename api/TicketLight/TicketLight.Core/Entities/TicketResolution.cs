using System;
namespace TicketLight.Core.Entities
{
    public enum TicketResolution
    {
        Backlog = 0,
        Pending, 
        InProgress, 
        Done,
        Fixed
    }
}
