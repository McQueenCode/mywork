import React, { Fragment } from "react";
import { Col, Media } from "reactstrap";
import PropTypes from "prop-types";
import "./CommentStyle.css";

const CommentCard = (props) => {
  const comment = props.commentObj;

  const onDelete = () => {
    props.onDelete(props.commentObj);
  };

  const onEdit = () => {
    props.onEdit(comment);
  };

  const onReply = () => {
    props.onReply(comment);
  };

  const onEditReplyUpdate = (reply) => {
    props.onEdit(reply);
  };

  const onReplyToReply = (reply) => {
    props.onReply(reply);
  };

  const mapReplies = (reply) => (
    <CommentCard
      key={reply.id}
      commentObj={reply}
      onDelete={props.onDelete}
      onEdit={onEditReplyUpdate}
      onReply={onReplyToReply}
    />
  );

  return (
    <Fragment>
      <section className="comment-box noPadding col-md-12">
        {/* <hr /> */}
        <div className="py-4"></div>
        <ul>
          <li>
            <Media className="align-self-center">
              <Media
                className="align-self-center"
                src={
                  comment.commentDetailed && comment.commentDetailed.avatarUrl
                }
                alt=""
              />
              <Media body>
                <Col md="4">
                  <h6 className="mt-0 mediaH6 full-name-shift">
                    {comment.commentDetailed &&
                      comment.commentDetailed.firstName}{" "}
                    {comment.commentDetailed &&
                      comment.commentDetailed.lastName}
                  </h6>
                </Col>

                <h5 className="card-title text-left">
                  {!comment.isDeleted
                    ? comment.subject
                    : "This comment was deleted."}
                </h5>
                <p>{!comment.isDeleted ? comment.text : "Deleted"}</p>

                <ul className="comment-social icon-buttons mt-3">
                  <li className="digits">
                    <i className="icofont icofont-ui-delete" onClick={onDelete}>
                      {"  "}
                      Delete
                    </i>
                  </li>
                  <li className="digits">
                    <i className="icofont icofont-reply" onClick={onReply}>
                      {"  "}
                      Reply
                    </i>
                  </li>
                  <li className="digits">
                    <i className="icofont icofont-edit mr-4" onClick={onEdit}>
                      {"  "}
                      Edit
                    </i>
                  </li>
                </ul>
              </Media>
            </Media>

            <div className="replies pl-5">
              {comment.replies && comment.replies.map(mapReplies)}
            </div>
          </li>
        </ul>
      </section>
    </Fragment>
  );
};

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    subject: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    parentId: PropTypes.number,
    entityId: PropTypes.number,
    entityTypeId: PropTypes.number,
    createdBy: PropTypes.number,
    commentDetailed: PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string,
      locationId: PropTypes.number,
    }),
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        subject: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        parentId: PropTypes.number,
        entityId: PropTypes.number,
        entityTypeId: PropTypes.number,
        createdBy: PropTypes.number,
        commentDetailed: PropTypes.shape({
          id: PropTypes.number,
          userId: PropTypes.number,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          mi: PropTypes.string,
          avatarUrl: PropTypes.string,
          locationId: PropTypes.number,
          isDeleted: PropTypes.bool,
        }),
      })
    ),
    isDeleted: PropTypes.bool,
  }),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditReply: PropTypes.func,
  onEditReplyUpdate: PropTypes.func,
  onReplyToReply: PropTypes.func,
  onReply: PropTypes.func,
};

export default CommentCard;
