using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class Therapist
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string Mi { get; set; }

        public string LastName { get; set; }

        public string AvatarUrl { get; set; }

        public string Phone { get; set; }

        public int LocationId { get; set; }

        public Location Location { get; set; }

        public bool IsActive { get; set; }

        public string Notes { get; set; }

        public int CreatedBy { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        

     


    }
}
