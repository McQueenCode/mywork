using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.PaymentTransactions;

namespace Sabio.Services
{
    public interface IPaymentTransactionService
    {
        int Add(PaymentTransactionAddRequest model, int userId);
        void Delete(int id);
        PaymentTransaction GetById(int id);
        Paged<PaymentTransaction> GetPage(int pageIndex, int pageSize);
    }
}