using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class PaymentTransaction
    {
        public int Id { get; set; }

        public Decimal Amount { get; set; }

        public string TransactionToken { get; set; }

        public string SenderAccountId { get; set; }

        public int SenderId { get; set; }

        public int StatusId { get; set; }

        public string PaymentType { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
