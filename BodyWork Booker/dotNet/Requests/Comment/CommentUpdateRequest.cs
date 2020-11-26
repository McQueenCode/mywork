using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class CommentUpdateRequest : CommentAddRequest , IModelIdentifier
    {
        [Required]
        [Range(0, int.MaxValue)]
        public int Id { get; set; }
    }
}
