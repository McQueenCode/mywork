import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

const CommentModal = (props) => {
  return (
    <React.Fragment>
      <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
        <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
        <ModalBody>
          <div>
            <input
              className="form-control mb-2"
              rows={1}
              name="subject"
              placeholder="Subject"
              onChange={props.onChange}
              value={props.valueSubject}
            />
            <textarea
              className="form-control mb-2"
              rows={3}
              name="text"
              placeholder="Comment"
              onChange={props.onChange}
              value={props.valueText}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleModal}>
            Close
          </Button>
          <Button color="secondary" onClick={props.onSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  onFormInputChanged: PropTypes.func,
  onChange: PropTypes.func,
  valueText: PropTypes.string,
  valueSubject: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default CommentModal;
