using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class Comment
    {
        public int Id { get; set; }

        public string Subject { get; set; }

        public string Text { get; set; }

        public int? ParentId { get; set; }

        public int EntityTypeId { get; set; }

        public int EntityId { get; set; }

        public List<Comment> Replies { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public CommentDetailed CommentDetailed { get; set; }

        public int CreatedBy { get; set; }

        public bool IsDeleted { get; set; }
    }
}
