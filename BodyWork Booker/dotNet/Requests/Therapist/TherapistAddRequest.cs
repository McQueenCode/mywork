using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Therapist
{
    public class TherapistAddRequest
    {
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(2)]
        public string Mi { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(255)]
        public string AvatarUrl { get; set; }

        [Required]
        [MaxLength(20)]
        public string Phone { get; set; }

        [Range(0, int.MaxValue)]
        public int LocationId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [MaxLength(2000)]
        public string Notes { get; set; }

    }
}
