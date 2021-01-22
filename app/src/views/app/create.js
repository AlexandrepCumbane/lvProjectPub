import React from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { requestDropodowns } from "../../redux/actions/app/actions";
import { IntlContext } from "../../i18n/provider";
import { history } from "../../history";
import { axios } from "../../redux/api";

import config from "../../data/config";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  CustomInput,
  Input,
  Label,
} from "reactstrap";
import { Check } from "react-feather";

import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy";

class Create extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  notifySuccessBounce = () =>
    toast.success(this.translate(`Transaction completed successfuly!`), {
      transition: Bounce,
    });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
    });

  state = {
    form: new FormData(),
    required_fields: [],
    required_fields_labels: [],
    isValid: true,
    dropdowns: [],
    childrens: {},
  };
  componentDidMount() {
    this.props.requestDropodowns(); // Request dropdown lists and place in a map
    const { form } = config.pages[this.props.path]; // loads lvform to be rendered on view
    form.forEach((item, index) => {
      this.addToRequired(item);
    });
    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns });
  }

  render() {
    return (
      <div>
        <Card className="rounded-0 mb-0 px-2">
          <CardBody>{this.renderForm()}</CardBody>
        </Card>
      </div>
    );
  }

  /**
   * Action and helper functions
   */
  renderForm = () => {
    const form_ = config.pages[this.props.path];

    return (
      <Row>
        <Col md="12">
          <h4>Register a new record: {form_.verbose_name}</h4>
          <p>{form_.verbose_name}.</p>
          <hr />
        </Col>
        <Col md="12">
          {this.state.isValid && this.state.required_fields.length === 0 ? (
            <></>
          ) : (
            <Alert color="danger" className="square">
              <Label className="text-danger">
                All these fields are required{" "}
                {this.state.required_fields_labels.map((item, index) => (
                  <strong key={index}>{item}, </strong>
                ))}
              </Label>
            </Alert>
          )}
        </Col>

        {form_.form.map((field) => this.renderSingleInput(field))}

        <Col md="12">
          <div className="d-flex justify-content-between">
            <div />
            <Button.Ripple
              className="square"
              color="primary"
              type="submit"
              onClick={(e) => this.handleSubmit()}
            >
              Submit
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    );
  };

  checkboxValue = (field_name) => {
    const { form } = this.state;

    console.log("Field Value: ", form.get(field_name));

    if (form.get(field_name) === "true") {
      return true;
    }
    return false;
  };

  renderSingleInput = (field) => {
    let res = <></>;

    switch (field.type) {
      case "text":
        if (field.name === "call_notes") {
          res = (
            <>
              <Col key={field.name + "_"} md="6" />
              <Col md="6" key={field.name}>
                <Label>{this.translate(field.label)}</Label>
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="textarea"
                    rows={7}
                    className="square"
                    placeholder={field.label}
                    onChange={(e) =>
                      this.updateState(field.name, e.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            </>
          );
        } else {
          res = (
            <Col md="6" key={field.name}>
              <Label>{this.translate(field.label)}</Label>

              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="textarea"
                  rows={7}
                  className="square"
                  placeholder={field.label}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
              </FormGroup>
            </Col>
          );
        }
        break;
      case "string":
        if (field["wq:ForeignKey"]) {
          res = (
            <Col md="6" key={field.name}>
              <Label>{this.translate(field.label)}</Label>

              <FormGroup className="form-label-group position-relative has-icon-left">
                <CustomInput
                  className="square"
                  type="select"
                  id={field.name}
                  placeholder={field.label}
                  onChange={(e) => {
                    this.updateState(`${field.name}_id`, e.target.value);
                    if (field["children"]) {
                      this.updateChildrenList(field, e.target.value);
                    }
                  }}
                >
                  <option>Select</option>

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
                <>
                  <Label>{this.translate(field.label)}</Label>
                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <Input
                      type="text"
                      className="square"
                      placeholder={field.label}
                      onChange={(e) =>
                        this.updateState(field.name, e.target.value)
                      }
                    />
                  </FormGroup>
                </>
              </Col>
            ) : (
              <div key={field.name} />
            );
          } else {
            res = (
              <Col md="6" key={field.name}>
                <Label>{this.translate(field.label)}</Label>
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    className="square"
                    placeholder={field.label}
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
            <Label>{this.translate(field.label)}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
                placeholder={field.label}
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
              {" "}
              <Label>{this.translate(field.label)}</Label>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  className="square"
                  placeholder={field.label}
                  // defaultValue={this.state.email}
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
              <Label>{this.translate(field.label)}</Label>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  className="square"
                  placeholder={field.label}
                  // defaultValue={this.state.email}
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
                  icon={<Check className="vx-icon" size={16} />}
                  label={this.translate(field.label)}
                  defaultChecked={false}
                  onChange={(e) =>
                    this.updateState(
                      field.name,
                      !this.checkboxValue(field.name)
                    )
                  }
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
                  icon={<Check className="vx-icon" size={16} />}
                  label={this.translate(field.label)}
                  defaultChecked={false}
                  onChange={(e) =>
                    this.updateState(
                      field.name,
                      !this.checkboxValue(field.name)
                    )
                  }
                />
              </Col>
            );
          }
        } else {
          res = (
            <Col md="6" key={field.name}>
              <Label>{this.translate(field.label)}</Label>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <CustomInput
                  className="square"
                  type="select"
                  id={field.name}
                  placeholder={field.label}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                >
                  <option>Select</option>
                  {this.renderSelectOption(field.choices)}
                </CustomInput>
              </FormGroup>
            </Col>
          );
        }
        break;

      default:
        res = <div key={field.name}></div>;
        break;
    }

    return res;
  };

  renderSelectOption = (choices) => {
    return choices.map((item) => (
      <option key={item.name} value={item.name}>
        {item.label}
      </option>
    ));
  };

  renderSelectOptionForeignWQ = (choices) => {
    return choices.map((item) => (
      <option key={item.id} value={item.id}>
        {item.label}
      </option>
    ));
  };

  getForeignFieldDropdown = (field_name) => {
    return this.props.app_reducer.dropdowns[field_name] ?? [];
  };

  /**
   * Add all fields and add the required fields into an array
   * @param {*} field
   */
  addToRequired(field) {
    const index = this.state.required_fields.indexOf(field.name);

    /**
     * Add all children dropdowns fiels in a map
     */
    if (field["children"] !== undefined) {
      let childrens = this.state.childrens;
      childrens[field["children"]] = [];
      this.setState({ childrens });
    }

    if (field.bind !== undefined) {
      if (field.bind.required === true && index <= 0) {
        if (field.type === "string" && field["wq:ForeignKey"]) {
          this.state.required_fields.push(`${field.name}_id`);
        } else this.state.required_fields.push(field.name);
        this.state.required_fields_labels.push(field.label);
      }
    }
  }

  /**
   * Remove field from required array if is the value is not null
   * @param {*} field
   */
  removeFromRequired(field) {
    const index = this.state.required_fields.indexOf(field);
    if (index >= 0) {
      this.state.required_fields.splice(index, 1);
      this.state.required_fields_labels.splice(index, 1);
    }
  }

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

      this.removeFromRequired(field_name);
    }

    this.setState({ form });
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
  handleSubmit = () => {
    const { userOauth } = this.props.state.auth.login;

    if (this.state.required_fields.length > 0) {
      this.notifyErrorBounce("Fill all required inputs");
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
      axios
        .post(`${this.props.path}s.json`, this.state.form, {
          headers: {
            "X-CSRFTOKEN": this.props.state.auth.login.csrftoken,
            Authorization: `Bearer ${userOauth.access_token}`,
          },
        })
        .then(({ data }) => {
          this.notifySuccessBounce(data.id);
          setTimeout(() => {
            history.push(`/${this.props.url}`);
          }, 1000);
        })
        .catch((error) => {
          this.notifyErrorBounce("Failed to save Object.");
        });
    }
  };
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
  };
}

export default connect(mapStateToProps, { requestDropodowns })(Create);
