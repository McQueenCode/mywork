import React from "react";
import * as commentService from "../../services/commentService";
import CommentCard from "./CommentCard";
import CommentModal from "./CommentModal";
import { Row, Col, Media } from "reactstrap";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import debug from "sabio-debug";
const _logger = debug.extend("Comment");

class CommentsPage extends React.Component {
  state = {
    formData: {
      id: "",
      subject: "",
      text: "",
      entityId: 0,
      entityTypeId: 0,
      parentId: null,
      commentDetailed: {
        id: "",
        userId: 0,
        firstName: "",
        lastName: "",
        mi: "",
        avatarUrl: "",
        locationId: "",
        phone: "",
      },
    },
    createdBy: 0,
    isDeleted: false,
    mappedComments: [],
    currentPage: 1,
    commentsPerPage: 30,
    totalCount: "",
    comments: [],
    isOpen: false,
  };

  //--Component-Did-Mount------------------------------------------------//

  componentDidMount() {
    this.getComments();
  }

  //--Get-Comments-from-API------------------------------------------------//

  // getComments = () => {
  //   commentService
  //     .getCommentFeed()
  //     .then(this.onGetAllSuccess)
  //     .catch(this.onGetAllError);
  // };

  // onGetAllSuccess = (data) => {
  //   const comments = data.items;

  //   this.setState((prevState) => ({
  //     ...prevState,
  //     comments,
  //     mappedComments: comments.map(this.mapComments),
  //     formData: { ...prevState.formData, text: "", subject: "" },
  //   }));
  // };

  getComments = () => {
    const entityTypeId = this.props.entityTypeId;
    const entityId = this.props.entityId;

    commentService
      .getByEntity(entityId, entityTypeId)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  onGetAllSuccess = (data) => {
    const comments = data.items;

    this.setState((prevState) => ({
      ...prevState,
      comments,
      mappedComments: comments.map(this.mapComments),
      formData: {
        ...prevState.formData,
        text: "",
        subject: "",
        entityId: this.props.entityId,
        entityTypeId: this.props.entityTypeId,
      },
    }));
  };

  onGetAllError = (data) => {
    _logger("warning", data);
    this.setState((prevState) => ({
      ...prevState,
      comments: [],
      mappedComments: [],
    }));
  };

  //---Map Comment-------------------------------------------------------//

  mapComments = (comment) => (
    <CommentCard
      key={comment.id}
      commentObj={comment}
      onDelete={this.onDelete}
      onEdit={this.onEdit}
      onReply={this.onReply}
      showDelete={this.showDelete}
    />
  );

  // //--Inputting-Info------------------------------------------------------------------------------//

  onFormInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let value = currentTarget.value;
    let name = currentTarget.name;

    this.setState((prevState) => {
      return {
        ...prevState,
        formData: { ...prevState.formData, [name]: value },
      };
    });
    _logger(value);
  };

  //--On-Submit------------------------------------------------------------------------------//

  onSubmit = (e) => {
    e.preventDefault();
    let formInfo = {
      ...this.state.formData,
      entityId: this.props.entityId,
      entityTypeId: this.props.entityTypeId,
    };
    let id = this.state.formData.id;
    let currentUser = this.props.currentUser;
    let entityId = this.props.entityId;
    let entityTypeId = this.props.entityTypeId;

    if (
      id === "" &&
      formInfo.text.length >= 5 &&
      currentUser.name &&
      entityId &&
      entityTypeId
    ) {
      commentService
        .add(formInfo)
        .then(this.onAddCommentSuccess)
        .catch(this.onAddCommentError);

      Swal.fire("Done!", "Comment has been added", "success");
    } else if (
      id !== "" &&
      formInfo.text.length >= 5 &&
      formInfo.text.length < 1000 &&
      currentUser.name &&
      entityId &&
      entityTypeId
    ) {
      commentService
        .upDate(formInfo)
        .then(this.onAddCommentSuccess)
        .catch(this.onAddCommentError);
      Swal.fire("Done!", "Comment has been updated", "success");
    } else if (!currentUser.name) {
      Swal.fire("Must Sign In!", "Login to post a comment.", "error");
    } else {
      Swal.fire(
        "Error!",
        "Comment must be more than 5 characters and less than a 1000.",
        "error"
      );
    }
  };

  onAddCommentSuccess = () => {
    this.getComments();

    this.setState((prevState) => {
      return {
        ...prevState,
        isOpen: false,
      };
    });
  };

  onAddCommentError = (data) => {
    _logger(data);
  };

  //--On-Cancel-----------------------------------------------------------------//

  onCancel = (e) => {
    e.preventDefault();
    _logger("Cancel Firing");

    this.getComments();

    this.setState((prevState) => {
      return {
        ...prevState,
        formData: { ...prevState.formData, subject: "", text: "" },
      };
    });
  };

  //--On-Edit-----------------------------------------------------------------//

  onEdit = (comment) => {
    const currentUser = this.props.currentUser;

    if (currentUser.name && currentUser.id === comment.createdBy) {
      this.editSetState(comment);
    } else if (currentUser.name && currentUser.id !== comment.createdBy) {
      debugger;
      Swal.fire("Error!", "Can't update comments you did not create.", "error");
    } else if (!currentUser.name) {
      Swal.fire("Must Sign In!", "Login to access comments", "error");
    }
  };

  onEditReplyUpdate = (comment) => {
    const currentUser = this.props.currentUser;

    if (currentUser.name && currentUser.id === comment.commentDetailed.id) {
      this.editSetState(comment);
    } else if (
      currentUser.name &&
      currentUser.id !== comment.commentDetailed.id
    ) {
      Swal.fire("Error!", "Can't update comments you did not create.", "error");
    } else if (!currentUser.name) {
      Swal.fire("Must Sign In!", "Login to access comments", "error");
    }
  };

  editSetState = (comment) => {
    _logger("Edit Firing", comment);
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          ...comment,
        },
        isOpen: true,
      };
    });
  };

  //--On-Reply-----------------------------------------------------------------//

  onReply = (comment) => {
    debugger;
    const currentUser = this.props.currentUser;
    const loggedIn = this.props.isLogged;
    _logger("On Reply", comment);

    if (currentUser.name && loggedIn === true) {
      this.replySetState(comment);
    } else {
      Swal.fire("Must Sign In!", "Login to access comments", "error");
    }
  };

  onReplyToReply = (comment) => {
    const currentUser = this.props.currentUser;
    const loggedIn = this.props.isLogged;
    _logger("On Reply", comment);
    this.replySetState(comment);

    if (currentUser.name && loggedIn === true) {
      this.replySetState(comment);
    } else {
      Swal.fire("Must Sign In!", "Login to access comments", "error");
    }
  };

  replySetState = (comment) => {
    let replyingToThisUser =
      comment.commentDetailed.firstName +
      " " +
      comment.commentDetailed.lastName;
    let replyParentId = comment.id;
    debugger;
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          subject: "In Reply to: " + replyingToThisUser,
          text: "",
          id: "",
          parentId: replyParentId,
        },
        isOpen: true,
      };
    });
  };

  onAddReplySuccess = () => {
    this.getComments();

    this.setState((prevState) => {
      return {
        ...prevState,
        formData: { ...prevState.formData, text: "", subject: "" },
      };
    });
  };

  //--On-Delete---------------------------------------------------------------//

  onDelete = (comment) => {
    const currentUser = this.props.currentUser;
    const loggedIn = this.props.isLogged;

    if (
      comment.id > 0 &&
      !comment.replies &&
      currentUser.name &&
      currentUser.id === comment.createdBy &&
      loggedIn === true
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");

          commentService
            .deleteById(comment.id)
            .then(this.onDeleteSuccess)
            .catch(this.onDeleteError);
        }
      });
    } else if (
      currentUser.name &&
      currentUser.id !== comment.createdBy &&
      loggedIn === true
    ) {
      Swal.fire("Error!", "Can't delete comments you did not create.", "error");
    } else if (!currentUser.name) {
      Swal.fire("Must Sign In!", "Login to access comments", "error");
    } else {
      Swal.fire("Error!", "Comments with replies can't be deleted", "error");
    }
  };

  onDeleteSuccess = (id) => {
    _logger(id);
    const comments = [...this.state.comments];
    let index = comments.findIndex((comment) => comment.id === id);
    if (index > -1) {
      comments[index].isDeleted = true;
    } else {
      comments.forEach((comment) => {
        this.deleteReply(comment, id);
      });
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        comments: this.state.comments,
        mappedComments: comments.map(this.mapComments),
      };
    });

    this.getComments();
    Swal.fire("Done!", "Comment has been deleted", "success");
  };

  deleteReply = (comment, id) => {
    if (comment.replies) {
      let replyIndex = comment.replies.findIndex((reply) => reply.id === id);
      if (replyIndex > -1) {
        comment.replies[replyIndex].isDeleted = true;
      } else {
        comment.replies.forEach((reply) => this.deleteReply(reply, id));
      }
    }
  };

  onDeleteError = (data) => {
    _logger(data);
  };

  //------------------------------------------------------------------
  onDeleteReply = (comment) => {
    if (!comment.parentId && !comment.replies) {
      commentService
        .deleteById(comment.id)
        .then(this.onDeleteSuccess)
        .catch(this.onDeleteError);
    }

    if ((!comment.parentId && comment.replies) || comment.parentId) {
      this.setState((prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            subject: "This comment was deleted.",
            text: "Deleted.",
            commentDetailed: {
              avatarUrl:
                "https://doy2mn9upadnk.cloudfront.net/uploads/default/original/3X/6/a/6a776107459a4391181409a28adeda291520a0b6.png",
              firstName: "User Comment",
              lastName: "Deleted",
            },
            id: comment.id,
            isDeleted: true,
          },
        };
      }, this.getDeleteThenUpdateComment());
    }
  };

  getDeleteThenUpdateComment = () => {
    commentService
      .upDate(this.state.formData)
      .then(this.onDeleteReplySuccess)
      .catch(this.onDeleteReplyError);
  };

  onDeleteReplySuccess = () => {
    this.getComments();

    this.setState((prevState) => {
      return {
        ...prevState,
        formData: { ...prevState.formData, text: "", subject: "" },
      };
    });
  };

  onDeleteReplyError = (data) => {
    _logger(data);
  };

  //--Modals---------------------------------------------------------------------//

  toggleModal = () => {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen, //here we flip the bool value of the previous state.
      };
    });
  };

  // showDelete = () => {
  //   this.setState((prevState) => {
  //     return {
  //       showDelete: !prevState.showDelete,
  //     };
  //   });
  // };

  //--Display-On-Screen-----------------------------------------------------------------------------//

  render() {
    return (
      <React.Fragment>
        <section className="comment-box noPadding col-md-12 mt-5">
          <h4>Comments</h4>
          <hr />
          <ul>
            <li>
              <Media className="align-self-center">
                <Media
                  className="align-self-center"
                  src={this.state.formData.commentDetailed.avatarUrl}
                  alt=""
                />
                <Media body>
                  <Row>
                    <Col md="4">
                      <h6 className="mt-0">
                        {this.state.firstName} {this.state.lastName}
                      </h6>
                    </Col>
                  </Row>

                  <input
                    className="form-control mb-2"
                    rows={1}
                    name="subject"
                    placeholder="Subject"
                    onChange={this.onFormInputChanged}
                    value={this.state.formData.subject}
                  />
                  <textarea
                    className="form-control mb-2"
                    rows={3}
                    name="text"
                    placeholder="Comment"
                    onChange={this.onFormInputChanged}
                    value={this.state.formData.text}
                  />
                  <button
                    type="button"
                    className="btn btn-light btn-sm d-inline-flex-reverse p-2"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-sm d-inline-flex-reverse p-2 ml-2"
                    onClick={this.onCancel}
                  >
                    Cancel
                  </button>
                </Media>
              </Media>
            </li>
          </ul>
        </section>
        {/* <hr /> */}

        <div className="row col-md-12 my-4">{this.state.mappedComments}</div>

        <CommentModal
          isOpen={this.state.isOpen}
          showDelete={this.state.showDelete}
          toggleModal={this.toggleModal}
          title={"Comment"}
          onChange={this.onFormInputChanged}
          valueSubject={this.state.formData.subject}
          valueText={this.state.formData.text}
          onSubmit={this.onSubmit}
        />

        <div className="p-3"></div>
      </React.Fragment>
    );
  }
}

CommentsPage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    tenantId: PropTypes.string,
  }),
  entityId: PropTypes.number,
  entityTypeId: PropTypes.number,
  isLogged: PropTypes.bool,
};

export default CommentsPage;
