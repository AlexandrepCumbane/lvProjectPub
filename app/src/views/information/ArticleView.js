import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  Input,
  FormGroup,
  Button,
  CustomInput,
  Label,
  Spinner,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { X, Check, Cloud } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import makeAnimated from "react-select/animated";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import {
  requestDropodowns,
  requestForm,
} from "../../redux/actions/app/actions";

import { axios } from "../../redux/api";

import { IntlContext } from "../../i18n/provider";

import config from "../../data/config";

import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/plugins/extensions/editor.scss";

class Edit extends Component {
  static contextType = IntlContext;
  translate = this.context.translate;
  notifySuccessBounce = () =>
    toast.success(`Transaction completed successfuly!`, { transition: Bounce });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
    });

  animatedComponents = makeAnimated();

  state = {
    form: new FormData(),
    isValid: true,
    dropdowns: [],
    childrens: {},
    edit_status: false,
    showModal: false,
    selectedData: {},
    modal_form: "task",
    modal_list: false,
    modal_list_data: {},
    isProcessing: false,
    editorState: EditorState.createEmpty(),
  };

  componentDidMount() {
    this.props.requestDropodowns();
    const { form } = config.pages.article;

    const { data } = this.props;

    let formdata = new FormData();

    if (this.props.data["text"]) {
      const contentBlock = htmlToDraft(this.props.data["text"] ?? "");
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }

    form.forEach((item) => {
      /**
       * Add all children dropdowns fiels in a map
       */
      if (item["children"]) {
        let childrens = this.state.childrens;
        childrens[item["children"]] = this.getForeignFieldDropdown(
          item["children"]
        );

        this.setState({ childrens });
      }

      if (
        data[item["wq:ForeignKey"] ? item.name + "_id" : item.name] &&
        item.name !== "file"
      )
        formdata.append(
          item["wq:ForeignKey"] ? item.name + "_id" : item.name,
          data[item["wq:ForeignKey"] ? item.name + "_id" : item.name]
        );
    });

    formdata.append("id", data["id"]);

    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns, form: formdata });
  }

  checkboxValue = (field_name) => {
    const { form } = this.state;
    return form.get(field_name) === "true";
  };

  renderLabel = (field) => {
    if (
      !this.state.isValid &&
      this.state.required_fields_labels.includes(field.label)
    ) {
      return (
        <Label className="text-danger">
          <strong> * {this.translate(field.label)}</strong>
        </Label>
      );
    } else {
      return (
        <Label>
          {" "}
          <strong>{this.translate(field.label)}</strong>
        </Label>
      );
    }
  };

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    let { show, handleSidebar, data } = this.props;

    return (
      <div
        className={classnames("data-list-sidebar pb-1", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header bg-primary p-2 d-flex justify-content-between">
          <h4 className="text-white">
            {this.translate("Article")} .<strong> {String(data.title)}</strong>{" "}
          </h4>

          <small className="text-white">
            <u className="text-secondary">
              {/* Criado aos{" "} */}
              <strong>
                {"  "}
                {/* {moment(data.created_at).format("YYYY-MM-DD")} */}
              </strong>
              {"  "}
              {/* por{" "} */}
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
          <div>{this.renderForm()}</div>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1 mb-1">
          {this.renderActions()}
        </div>
      </div>
    );
  }

  toggleListModal = () => {
    this.setState((prevState) => ({
      modal_list: !prevState.modal_list,
    }));
  };

  raiseListData(item) {
    this.setState({ modal_list_data: item });
    this.toggleListModal();
  }

  /**
   * Action and helper functions
   */

  renderActions = () => {
    const userRole = this.props.user;
    let element = <p>No actions Provived</p>;

    switch (userRole) {
      case "manager":
        element = (
          <div>
            <Button
              color={this.state.edit_status ? "primary" : "success"}
              className="mr-1 square"
              onClick={() => this.handleSubmit()}
            >
              {this.state.isProcessing ? (
                <Spinner color="white" className="mr-1" size="sm" type="grow" />
              ) : (
                <></>
              )}
              {this.translate(this.state.edit_status ? "Update" : "Edit")}
            </Button>

            {this.state.edit_status ? (
              <></>
            ) : (
              <Button
                color={"warning"}
                className="mr-1 square"
                onClick={() => this.handleDelete()}
              >
                {this.state.isProcessing ? (
                  <Spinner
                    color="white"
                    className="mr-1"
                    size="sm"
                    type="grow"
                  />
                ) : (
                  <></>
                )}
                {this.translate("Delete")}
              </Button>
            )}

            {this.state.edit_status ? (
              <Button
                color="danger"
                className="mr-1 square"
                onClick={() => this.setState({ edit_status: false })}
              >
                {this.translate("Cancel")}
              </Button>
            ) : (
              <></>
            )}
          </div>
        );
        break;
      case "partner":
        element = <div></div>;
        break;

      case "focalpoint":
        element = (
          <div>
            <></>
          </div>
        );
        break;

      case "operator":
        element = <div></div>;
        break;
      default:
        element = <p>Actions not authorized </p>;
        break;
    }

    return element;
  };

  renderForm = () => {
    const form_ = config.pages.article;
    return (
      <Row>
        {form_.form.map((field) =>
          this.state.edit_status
            ? this.renderSingleInput(field)
            : this.renderSingleRead(field)
        )}
      </Row>
    );
  };

  renderSingleInput = (field) => {
    let res = <></>;
    let { data } = this.props;

    switch (field.type) {
      case "text":
        res = (
          <Col md="12" className="my-1" key={field.name}>
            <Label>
              <strong>{field.label}</strong>
            </Label>
            <Editor
              readOnly={false}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorState={this.state.editorState}
              onEditorStateChange={this.onEditorStateChange}
              onChange={(e) => this.updateState(field.name, draftToHtml(e))}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "embedded",
                  "emoji",
                  "image",
                  "remove",
                  "history",
                ],
              }}
            />
          </Col>
        );

        break;
      case "string":
        if (field["wq:ForeignKey"]) {
          res = (
            <Col md="6" key={field.name}>
              <Label>
                <strong>{this.translate(field.label)}</strong>
              </Label>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <CustomInput
                  className="square"
                  type="select"
                  id={field.name}
                  disabled={!this.state.edit_status}
                  defaultValue={data[`${field.name}_id`]}
                  onChange={(e) => {
                    this.updateState(`${field.name}_id`, e.target.value);
                    if (field["children"]) {
                      this.updateChildrenList(field, e.target.value);
                    }
                  }}
                >
                  <option>{this.translate("Select")}</option>
                  {field["has_parent"] === undefined
                    ? this.renderSelectOptionForeignWQ(
                        this.getForeignFieldDropdown(field["wq:ForeignKey"])
                      )
                    : this.renderSelectOptionForeignWQ(
                        this.state.childrens[field["wq:ForeignKey"]] ?? []
                      )}
                </CustomInput>
              </FormGroup>
            </Col>
          );
        } else {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    className="square"
                    placeholder={this.translate(field.label)}
                    defaultValue={data[`${field.name}`]}
                    onChange={(e) =>
                      this.updateState(field.name, e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            ) : (
              <div key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    className="square"
                    defaultValue={data[`${field.name}`]}
                    placeholder={this.translate(field.label)}
                    onChange={(e) =>
                      this.updateState(field.name, e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            );
          }
        }
        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{this.translate(field.label)}</strong>
            </Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
                defaultValue={data[field.name]}
                disabled={!this.state.edit_status}
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
            </FormGroup>
          </Col>
        );
        break;
      case "int":
        if (field["depends_on"]) {
          res = this.checkboxValue(field.depends_on) ? (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  defaultValue={data[field.name]}
                  className="square"
                  placeholder={this.translate(field.label)}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
              </FormGroup>
            </Col>
          ) : (
            <div key={field.name} />
          );
        } else {
          res = (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  defaultValue={data[field.name]}
                  className="square"
                  placeholder={this.translate(field.label)}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
              </FormGroup>
            </Col>
          );
        }
        break;
      case "select one":
        if (field["has_boolean_options"]) {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name} className="mb-1">
                <Checkbox
                  color="primary"
                  className="my-2"
                  icon={<Check className="vx-icon" size={16} />}
                  label={this.translate(field.label)}
                  defaultChecked={false}
                  onChange={(e) => {
                    this.updateState(
                      field.name,
                      !this.checkboxValue(field.name)
                    );
                  }}
                />
              </Col>
            ) : (
              <Col md="6" key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name} className="mb-1">
                <Checkbox
                  color="primary"
                  className="my-2"
                  icon={<Check className="vx-icon" size={16} />}
                  label={this.translate(field.label)}
                  defaultChecked={data[field.name]}
                  onChange={(e) => {
                    this.updateState(
                      field.name,
                      !this.checkboxValue(field.name)
                    );
                  }}
                />
              </Col>
            );
          }
        } else {
          if (field.depend_on_value) {
            if (
              field.depend_on_value.value.includes(
                this.state.form.get(`${field.depend_on_value.field}_id`)
              )
            ) {
              res = res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <CustomInput
                      className="square"
                      type="select"
                      id={field.name}
                      defaultValue={data[field.name]}
                      placeholder={this.translate(field.label)}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    >
                      <option>{this.translate("Select")}</option>
                      {this.renderSelectOption(field.choices)}
                    </CustomInput>
                  </FormGroup>
                </Col>
              );
            } else return <Col md="6" key={field.name} />;
          } else {
            if (field["depends_on"]) {
              res = this.checkboxValue(field.depends_on) ? (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <CustomInput
                      className="square"
                      type="select"
                      id={field.name}
                      defaultValue={data[field.name]}
                      placeholder={this.translate(field.label)}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    >
                      <option>{this.translate("Select")}</option>
                      {this.renderSelectOption(field.choices)}
                    </CustomInput>
                  </FormGroup>
                </Col>
              ) : (
                <Col md="6" key={field.name} />
              );
            } else {
              res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <CustomInput
                      className="square"
                      type="select"
                      id={field.name}
                      defaultValue={data[field.name]}
                      placeholder={this.translate(field.label)}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    >
                      <option>{this.translate("Select")}</option>
                      {this.renderSelectOption(field.choices)}
                    </CustomInput>
                  </FormGroup>
                </Col>
              );
            }
          }
        }

        break;

      default:
        res = (
          <div key={field.name}>
            {/* {field.type === "binary" ? (
              <div
                style={{ cursor: "pointer" }}
                className="bg-primary text-white"
                onClick={() => window.location.replace(data[field.name])}
              >
                Attachment
              </div>
            ) : (
              <div />
            )} */}
          </div>
        );
        break;
    }

    return res;
  };

  renderSelectOption = (choices) => {
    return choices.map((item) => (
      <option key={item.name} value={item.name}>
        {this.translate(item.label)}
      </option>
    ));
  };

  renderSelectOptionForeignWQ = (choices) => {
    return choices.map((item) => (
      <option key={item.id} value={item.id}>
        {this.translate(item.label)}
      </option>
    ));
  };

  getForeignFieldDropdown = (field_name) => {
    return this.props.app_reducer.dropdowns[field_name] ?? [];
  };

  /**
   * Update each dynamic field state value
   * @param {*} field_name
   * @param {*} value
   */
  updateState = (field_name, value) => {
    let form = this.state.form;

    if (value !== "") {
      if (form.has(field_name)) {
        form.set(field_name, value);
      } else {
        form.append(field_name, value);
      }
    }
  };

  /**
   * Dynimically places the nested fields into it's relative
   * @param {*} field
   * @param {*} value
   */
  updateChildrenList = (field, value) => {
    let childrens = this.state.childrens;
    const res = this.state.dropdowns[field["wq:ForeignKey"]].filter((item) => {
      return Number(item.id) === Number(value);
    });
    childrens[field.children] = res[0][`${field.children}_set`];

    this.setState({ childrens });
  };

  /**
   * Submits the form to post request action
   */
  handleDelete = () => {
    let { handleSidebar } = this.props;
    const { userOauth } = this.props.state.auth.login;

    axios
      .delete(`articles/${this.props.data.id}.json/`, {
        headers: {
          "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
          Authorization: `Bearer ${userOauth.access_token}`,
        },
      })
      .then(({ data }) => {
        this.props.requestForm({
          url: "articles",
          name: "article",
        });

        this.notifySuccessBounce(data.id);

        setTimeout(() => {
          if (this.props.updateLoadMore) {
            this.props.updateLoadMore();
          }
          handleSidebar(false, true);
        }, 1000);
      })
      .catch((error) => {
        this.setState({ isProcessing: false });
        this.notifyErrorBounce("Unable to complete transaction.");
      });
  };

  /**
   * Submits the form to post request action
   */
  handleSubmit = () => {
    if (this.state.edit_status) {
      let { handleSidebar } = this.props;
      const { userOauth } = this.props.state.auth.login;

      this.setState({ isValid: true, isProcessing: true });
      axios
        .patch(`articles/${this.props.data.id}.json/`, this.state.form, {
          headers: {
            "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
            Authorization: `Bearer ${userOauth.access_token}`,
          },
        })
        .then(({ data }) => {
          this.props.requestForm({
            url: "articles",
            name: "article",
          });

          this.notifySuccessBounce(data.id);

          setTimeout(() => {
            if (this.props.updateLoadMore) {
              this.props.updateLoadMore();
            }
            handleSidebar(false, true);
          }, 1000);
        })
        .catch((error) => {
          this.setState({ isProcessing: false });
          this.notifyErrorBounce("Unable to complete transaction.");
        });
    } else {
      this.setState({ edit_status: true });
    }
  };

  renderSingleRead = (field) => {
    let res = <></>;
    let { data } = this.props;

    if (field.name === "case_number") {
      return <span key="case_number" />;
    }

    switch (field.type) {
      case "text":
        res = (
          <Col md="12" className="my-1" key={field.name}>
            <Label>
              <strong>{field.label}</strong>
            </Label>
            <Editor
              readOnly={true}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorState={this.state.editorState}
              onEditorStateChange={this.onEditorStateChange}
              onChange={(e) => this.updateState(field.name, draftToHtml(e))}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "embedded",
                  "emoji",
                  "image",
                  "remove",
                  "history",
                ],
              }}
            />
          </Col>
        );
        break;
      case "binary":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{this.translate(field.label)}</strong>
            </Label>
            <br />
            <Button.Ripple
              color="flat-primary"
              onClick={() =>
                data[field.name]
                  ? window.location.replace(data[field.name])
                  : {}
              }
            >
              <Cloud size={14} />
              <span className="align-middle ml-25">
                {data[field.name]
                  ? this.translate("Click here to download file")
                  : this.translate("No file uploaded")}
              </span>
            </Button.Ripple>
          </Col>
        );
        break;
      case "string":
        if (field["wq:ForeignKey"]) {
          res = (
            <Col md="6" key={field.name}>
              <Label>
                <strong>{this.translate(field.label)}</strong>
              </Label>
              <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
            </Col>
          );
        } else {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <p>{this.translate(data[`${field.name})`] ?? "None")}</p>
              </Col>
            ) : (
              <div key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name}>
                {this.renderLabel(field)}
                <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
              </Col>
            );
          }
        }
        break;
      case "date":
        res = (
          <Col md="6" key={field.name}>
            <Label>
              <strong>{this.translate(field.label)}</strong>
            </Label>
            <p>{this.translate(data[field.name] ?? "None")}</p>
          </Col>
        );
        break;
      case "int":
        if (field["depends_on"]) {
          res = this.checkboxValue(field.depends_on) ? (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
            </Col>
          ) : (
            <div key={field.name} />
          );
        } else {
          res = (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}
              <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
            </Col>
          );
        }
        break;
      case "select one":
        if (field["has_boolean_options"]) {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name} className="mb-1">
                {this.renderLabel(field)}
                <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
              </Col>
            ) : (
              <Col md="6" key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name} className="mb-1">
                {this.renderLabel(field)}
                <p>{this.translate(data[`${field.name}`] ?? "None")}</p>
              </Col>
            );
          }
        } else {
          if (field.depend_on_value) {
            if (
              field.depend_on_value.value.includes(
                this.state.form.get(`${field.depend_on_value.field}_id`)
              )
            ) {
              res = res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}

                  <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
                </Col>
              );
            } else return <Col md="6" key={field.name} />;
          } else {
            if (field["depends_on"]) {
              res = this.checkboxValue(field.depends_on) ? (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
                </Col>
              ) : (
                <Col md="6" key={field.name} />
              );
            } else {
              res = (
                <Col md="6" key={field.name}>
                  {this.renderLabel(field)}
                  <p>{this.translate(data[`${field.name}_label`] ?? "None")}</p>
                </Col>
              );
            }
          }
        }

        break;

      default:
        res = <div key={field.name}></div>;
        break;
    }

    return res;
  };

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
    user: state.auth.login.userRole,
  };
}

export default connect(mapStateToProps, { requestDropodowns, requestForm })(
  Edit
);
