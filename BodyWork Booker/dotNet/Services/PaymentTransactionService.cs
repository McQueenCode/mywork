using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.PaymentTransactions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class PaymentTransactionService : IPaymentTransactionService
    {
        IDataProvider _data = null;

        public PaymentTransactionService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(PaymentTransactionAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[PaymentTransactions_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@SenderId", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                });


            return id;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[PaymentTransactions_DeleteById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }


        public PaymentTransaction GetById(int id)
        {
            string procName = "[dbo].[PaymentTransactions_SelectById]";

            PaymentTransaction paymentTransaction = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {

                paymentTransaction = MapPaymentTransaction(reader, out int Index);

            });


            return paymentTransaction;
        }


        public Paged<PaymentTransaction> GetPage(int pageIndex, int pageSize)
        {
            Paged<PaymentTransaction> pagedResult = null;

            List<PaymentTransaction> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.PaymentTransaction_SelectAll",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    PaymentTransaction paymentTransaction = MapPaymentTransaction(reader, out int index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }


                    if (result == null)
                    {
                        result = new List<PaymentTransaction>();
                    }

                    result.Add(paymentTransaction);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<PaymentTransaction>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }


        private static PaymentTransaction MapPaymentTransaction(IDataReader reader, out int startingIndex)
        {
            PaymentTransaction paymentTransaction = new PaymentTransaction();

            startingIndex = 0;

            paymentTransaction.Id = reader.GetSafeInt32(startingIndex++);
            paymentTransaction.Amount = reader.GetSafeDecimal(startingIndex++);
            paymentTransaction.TransactionToken = reader.GetSafeString(startingIndex++);
            paymentTransaction.SenderAccountId = reader.GetSafeString(startingIndex++);
            paymentTransaction.SenderId = reader.GetSafeInt32(startingIndex++);
            paymentTransaction.StatusId = reader.GetSafeInt32(startingIndex++);
            paymentTransaction.PaymentType = reader.GetSafeString(startingIndex++);
            paymentTransaction.DateCreated = reader.GetDateTime(startingIndex++);

            return paymentTransaction;
        }


        private static void AddCommonParams(PaymentTransactionAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Amount", model.Amount);
            col.AddWithValue("@TransactionToken", model.TransactionToken);
            col.AddWithValue("@SenderAccountId", model.SenderAccountId);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@PaymentTypeId", model.PaymentTypeId);
        }
    }
}
