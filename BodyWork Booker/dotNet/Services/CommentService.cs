using Microsoft.Extensions.ObjectPool;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;

namespace Sabio.Services
{
    public class CommentService : ICommentService
    {
        IDataProvider _data = null;

        public CommentService(IDataProvider data)
        {
            _data = data;

        }

        public int Add(CommentAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Comments_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {   
                    AddCommonParams(model, col);
                    col.AddWithValue("@CreatedBy", userId);

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

        public void Update(CommentUpdateRequest model)
        {
            string procName = "[dbo].[Comments_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);

                },
                returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Comments_DeleteById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {         
                    col.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

        public Comment GetById(int id)
        {
            string procName = "[dbo].[Comments_SelectById]";

            Comment comment = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {

                comment = MapComment(reader, out int Index);

            });


            return comment;
        }

        public List<Comment> GetByEntity(int entityId, int entityTypeId)
        {
            string procName = "[dbo].[Comments_Select_ByEntityId]";

            List<Comment> comment = null;

         

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@EntityId", entityId);
                paramCollection.AddWithValue("@EntityTypeId", entityTypeId);

            },

            singleRecordMapper: delegate (IDataReader reader, short set)
            {

                Comment aComment = MapComment(reader, out int index);

            
                if (comment == null)
                {
                    comment = new List<Comment>();
                }

                comment.Add(aComment);
            }

            );

            return comment;
        }

        public Paged<Comment> GetPage(int pageIndex, int pageSize)
        {
            Paged<Comment> pagedResult = null;

            List<Comment> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Comments_SelectAllByPagination",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    Comment aComment = MapComment(reader, out int index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }


                    if (result == null)
                    {
                        result = new List<Comment>();
                    }

                    result.Add(aComment);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Comment>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public Paged<Comment> GetCreatedByPage(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Comment> pagedResult = null;

            List<Comment> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Comments_SelectByCreatedByPagination",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@createdBy", createdBy);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    Comment aComment = MapComment(reader, out int index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }


                    if (result == null)
                    {
                        result = new List<Comment>();
                    }

                    result.Add(aComment);
                }

            );

            if (result != null)
            {
                pagedResult = new Paged<Comment>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }

        public List<Comment> GetByEntityId(int entityId)
        {

            List<Comment> commentList = null;
            Dictionary<int, List<Comment>> replyCollection = null;
            _data.ExecuteCmd(
                "dbo.Comments_SelectByEntityId_v2",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@EntityId", entityId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    switch (set)
                    {
                        case 0:
                            Comment aReply = MapComment(reader, out int index);
                            if (replyCollection == null)
                            {

                                replyCollection = new Dictionary<int, List<Comment>>();
                            }
                            if (replyCollection.ContainsKey(aReply.ParentId.Value))
                            {
                                replyCollection[aReply.ParentId.Value].Add(aReply);

                            }
                            else
                            {
                                replyCollection.Add(aReply.ParentId.Value, new List<Comment> { aReply });
                            }
                            break;

                        case 1:
                            Comment aComment = MapComment(reader, out int i);

                            if (commentList == null)
                            {
                                commentList = new List<Comment>();
                            }
                            if (replyCollection != null && replyCollection.ContainsKey(aComment.Id))
                            {
                                aComment.Replies = replyCollection[aComment.Id];
                            }
                            commentList.Add(aComment);
                            break;

                    }
                }

            );

            if (commentList != null)
            {
                if (replyCollection != null)
                {
                    foreach (List<Comment> list in replyCollection.Values)
                    {
                        foreach (Comment item in list)
                        {
                            if (replyCollection.ContainsKey(item.Id))
                            {
                                item.Replies = replyCollection[item.Id];
                            }
                        }

                    }
                }

            }



            return commentList;
        }

        public List<Comment> GetByCreated( int createdBy)
        {

            List<Comment> commentList = null;
            Dictionary<int, List<Comment>> replyCollection = null;
            _data.ExecuteCmd(
                "dbo.Comments_SelectByEntityId_v2",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@createdBy", createdBy);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    switch (set)
                    {
                        case 0:
                            Comment aReply = MapComment(reader, out int index);
                            if (replyCollection == null)
                            {

                                replyCollection = new Dictionary<int, List<Comment>>();
                            }
                            if (replyCollection.ContainsKey(aReply.ParentId.Value))
                            {
                                replyCollection[aReply.ParentId.Value].Add(aReply);

                            }
                            else
                            {
                                replyCollection.Add(aReply.ParentId.Value, new List<Comment> { aReply });
                            }
                            break;

                        case 1:
                            Comment aComment = MapComment(reader, out int i);

                            if (commentList == null)
                            {
                                commentList = new List<Comment>();
                            }
                            if (replyCollection != null && replyCollection.ContainsKey(aComment.Id))
                            {
                                aComment.Replies = replyCollection[aComment.Id];
                            }
                            commentList.Add(aComment);
                            break;

                    }
                }

            );

            if (commentList != null )
            {
                if (replyCollection != null)
                {
                    foreach (List<Comment> list in replyCollection.Values)
                    {
                        foreach (Comment item in list)
                        {
                            if (replyCollection.ContainsKey(item.Id))
                            {
                                item.Replies = replyCollection[item.Id];
                            }
                        }

                    }
                }
                
            }



            return commentList;
        }

        private Comment MapComment(IDataReader reader, out int startingIndex)
        {
            Comment comment = new Comment();

            startingIndex = 0;

            comment.Id = reader.GetSafeInt32(startingIndex++);
            comment.Subject = reader.GetSafeString(startingIndex++);
            comment.Text = reader.GetSafeString(startingIndex++);
            comment.ParentId = reader.GetSafeInt32Nullable(startingIndex++);
            comment.EntityTypeId = reader.GetSafeInt32(startingIndex++);
            comment.EntityId = reader.GetSafeInt32(startingIndex++);
            comment.DateCreated = reader.GetDateTime(startingIndex++);
            comment.DateModified = reader.GetDateTime(startingIndex++);
            comment.CommentDetailed = new CommentDetailed
            {
                Id = reader.GetSafeInt32(startingIndex++),
                UserId = reader.GetSafeInt32(startingIndex++),
                FirstName = reader.GetSafeString(startingIndex++),
                LastName = reader.GetSafeString(startingIndex++),
                Mi = reader.GetSafeString(startingIndex++),
                AvatarUrl = reader.GetSafeString(startingIndex++),
                LocationId = reader.GetSafeInt32(startingIndex++),
                Phone = reader.GetSafeString(startingIndex++)
            };

            comment.CreatedBy = reader.GetSafeInt32(startingIndex++);
            comment.IsDeleted = reader.GetSafeBool(startingIndex++);

            return comment;
        }

    private static void AddCommonParams(CommentAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Subject", model.Subject);
            col.AddWithValue("@Text", model.Text);
            col.AddWithValue("@ParentId", model.ParentId);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@EntityId", model.EntityId);
            col.AddWithValue("@IsDeleted", model.IsDeleted);
        }

    }
}