import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Prompt = (props) => { 
  return (
    <div className="demo-inline-spacing ">
      <div className="theme-modal-danger rounded-0">
        <Modal
          className="rounded-0"
          isOpen={props.showModal}
          toggle={() => props.toggleModal()}
        >
          <ModalHeader className="rounded-0" toggle={() => props.toggleModal()}>
            {props.translate("Information")}
          </ModalHeader>
          <ModalBody className="rounded-0">
            {props.translate(props.message)}
          </ModalBody>
          <ModalFooter className="rounded-0">
            <Button
              className="rounded-0"
              color="danger"
              onClick={() => props.action()}
            >
              {props.translate("Yes")}
            </Button>
            <Button
              className="ml-1 rounded-0"
              color="primary"
              onClick={() => props.toggleModal()}
            >
              {props.translate("Cancel")}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default Prompt;
