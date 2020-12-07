import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Col,
  Row,
  Input,
  FormGroup,
  Button,
  Spinner,
  CustomInput,
  Label,
} from "reactstrap";
import Select from "react-select";

import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/plugins/extensions/editor.scss";

class Edit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { show, handleSidebar, data } = this.props;

    // console.log(data);
    return (
      <div
        className={classnames("data-list-sidebar pb-1", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header bg-primary p-2 d-flex justify-content-between">
          <h4 className="text-white">
            Case No.
            {/* <strong> {String(data.case_id)}</strong>{" "} */}
          </h4>
          <small className="text-white">
            <u className="text-secondary">
              Criado aos{" "}
              <strong>
                {"  "}
                {/* {moment(data.created_at).format("YYYY-MM-DD")} */}
              </strong>
              {"  "}
              por{" "}
              <strong>
                {" "}
                {/* <i>{String(data.created_by.username)}</i>{" "} */}
              </strong>
            </u>
          </small>

          <X
            className="text-white"
            size={20}
            onClick={() => handleSidebar(false, true)}
          />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          <Row></Row>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1 mb-1">
          <Button color="primary" className="mr-1 square">
            Update
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Edit);
