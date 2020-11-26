using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.PaymentTransactions
{
    public class PaymentTransactionAddRequest
    {
        [Required]
        [Range(0, Double.MaxValue)]
        public Decimal Amount { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string TransactionToken { get; set; }

        [StringLength(200, MinimumLength = 1)]
        public string SenderAccountId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int StatusId { get; set; }

        [Range(1, int.MaxValue)]
        public int PaymentTypeId { get; set; }
    }
}
