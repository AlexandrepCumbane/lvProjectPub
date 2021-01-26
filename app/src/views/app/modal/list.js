import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

class ModalForm extends React.Component {
  state = {
    modal: false,
  };

  componentDidMount() {
    console.log(this.props.data);
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  renderTaskComments = () => {
    const { taskcomment_set } = this.props.data;

    let res = <p>No comments for this record.</p>;
    if (taskcomment_set.length > 0) {
      res = (
        <ListGroup flush className="rounded-0">
          {taskcomment_set.map((item) => {
            return (
              <ListGroupItem>
                <div className="d-flex justify-content-between w-100">
                  <h5 className="mb-1"></h5>
                  <small>{item.datetime_created_label}</small>
                </div>
                <p className="mb-1">{item.feedback} </p>
                <small>{item.assignee_label}</small>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      );
    }
    return res;
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.props.toggleModal} className="bg-success">
            Comments
          </ModalHeader>
          <ModalBody>{this.renderTaskComments()}</ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </>
    );
  }
}
export default ModalForm;
