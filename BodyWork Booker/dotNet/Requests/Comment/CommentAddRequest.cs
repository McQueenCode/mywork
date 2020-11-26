using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class CommentAddRequest
    {
        
        public string Subject { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 5)]
        public string Text { get; set; }

        public int? ParentId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int EntityTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int EntityId { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
