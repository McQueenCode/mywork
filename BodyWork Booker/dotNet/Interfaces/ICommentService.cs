using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface ICommentService
    {
        int Add(CommentAddRequest model, int userId);
        void Delete(int id);
        List<Comment> GetByEntity(int entityId, int entityTypeId);
        Comment GetById(int id);
        Paged<Comment> GetCreatedByPage(int pageIndex, int pageSize, int createdBy);
        Paged<Comment> GetPage(int pageIndex, int pageSize);
        void Update(CommentUpdateRequest model);
        List<Comment> GetByCreated(int createdBy);
        List<Comment> GetByEntityId(int entityId);
    }
}