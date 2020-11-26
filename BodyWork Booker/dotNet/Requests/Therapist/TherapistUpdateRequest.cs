using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace Sabio.Models.Requests.Therapist
{
    public class TherapistUpdateRequest : TherapistAddRequest , IModelIdentifier
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
}
