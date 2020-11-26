using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class CommentDetailed
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Mi { get; set; }

        public string AvatarUrl { get; set; }

        public int LocationId { get; set; }

        public string Phone { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}
