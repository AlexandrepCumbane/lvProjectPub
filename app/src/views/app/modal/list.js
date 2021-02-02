import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import Create from "./create";
class ModalForm extends React.Component {
  state = {
    modal: false,
    feedback: "",
    lvform_id: 0,
  };

  componentDidMount() {
    this.setState({ lvform_id: this.props.data.lvform_id });
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  renderTaskComments = () => {
    const { taskcomment_set } = this.props.data;

    let res = <p>No comments for this record.</p>;

    let create = this.state.modal ? (
      <Create
        modal={this.state.modal}
        feedback={this.state.feedback}
        page="casecomment"
        title={`Add your comment`}
        color="success"
        hideButton={true}
        lvform_id={this.state.lvform_id}
      />
    ) : (
      <></>
    );

    if (taskcomment_set.length > 0) {
      res = (
        <ListGroup flush className="rounded-0">
          {create}
          {taskcomment_set.map((item) => {
            return (
              <ListGroupItem
                onClick={() => {
                  this.setState({
                    feedback: item.feedback,
                    // lvform_id: item.lvform_id,
                  });
                  this.toggleModal();
                }}
              >
                <div className="d-flex justify-content-between w-100 mb-2">
                  <small>{item.created_by_label}</small>
                  <small>{item.datetime_created_label}</small>
                </div>
                <p className="mb-1">{item.feedback} </p>

                <div className="d-flex justify-content-between w-100">
                  <small></small>{" "}
                  <small className="text-primary" style={{ cursor: "pointer" }}>
                    Send as case comment
                  </small>
                </div>
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
