

namespace Sabio.Models.Requests.PaymentTransactions
{
    public class PaymentTransactionUpdateRequest : PaymentTransactionAddRequest , IModelIdentifier
    {
        public int Id { get; set; }
    }
}
