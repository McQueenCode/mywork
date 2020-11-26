using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Therapist;

namespace Sabio.Services
{
    public interface ITherapistService
    {
        int Add(TherapistAddRequest model, int userId);
        Therapist GetById(int id);
        Paged<Therapist> GetDetails(int pageIndex, int pageSize);
        void Update(TherapistUpdateRequest model, int userId);
        Paged<Therapist> GetAll(int pageIndex, int pageSize);
        Paged<Therapist> GetSearch(int pageIndex, int pageSize, string query);
    }
}