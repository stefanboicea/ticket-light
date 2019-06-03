using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketLight.Core.Entities
{
    /// <summary>
    /// Main Ticket class - contains basic ticket properties.
    /// Could extend to include other properties like 
    /// LastActivityDate, FileAttachments, Tags, MultipleMembers etc.
    /// Due to Sqlite limitations, ReportedDate and other date props have string types.
    /// </summary>
    public class Ticket
    {
        public Ticket()
        {
        }

        public int Id { get; set; }

        public string Key { get; set; }

        public string Summary { get; set; }

        public string Description { get; set; }

        public TicketPriority? Priority { get; set; }

        public TicketResolution? Resolution { get; set; }

        public int? AsigneeId { get; set; }

        public int? ReporterId { get; set; }

        [ForeignKey("AsigneeId")]
        public virtual Member Asignee { get; set; }

        [ForeignKey("ReporterId")]
        public virtual Member Reporter { get; set; }

        public string ReportedDate { get; set; }
    }
}
