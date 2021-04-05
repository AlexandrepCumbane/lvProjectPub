import React from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { requestDropodowns } from "../../redux/actions/app/actions";
import { IntlContext } from "../../i18n/provider";
import { history } from "../../history";
import { axios } from "../../redux/api";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import config from "../../data/config";
import {
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
  animatedComponents = makeAnimated();

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
          <h4>{this.translate(form_.verbose_name)}</h4>
          <hr />
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
              {this.translate("Submit")}
            </Button.Ripple>
          </div>
        </Col>
      </Row>
    );
  };

  checkboxValue = (field_name) => {
    const { form } = this.state;
    if (form.get(field_name) === "true") {
      return true;
    }
    return false;
  };

  renderLabel = (field) => {
    if (
      (!this.state.isValid &&
        this.state.required_fields_labels.includes(field.label)) ||
      (!this.state.isValid &&
        this.state.required_fields.includes(`${field.name}_id`))
    ) {
      return (
        <Label className="text-danger">
          <strong>* {this.translate(field.label)}</strong>
        </Label>
      );
    } else {
      if (field.bind !== undefined) {
        if (field.bind.required === true) {
          if (this.state.required_fields_labels.includes(field.label))
            return (
              <Label className="text-danger">
                <strong> * {this.translate(field.label)}</strong>
              </Label>
            );
          else {
            return (
              <Label>
                <strong>* {this.translate(field.label)}</strong>
              </Label>
            );
          }
        } else {
          return (
            <Label>
              <strong> {this.translate(field.label)}</strong>
            </Label>
          );
        }
      } else {
        return (
          <Label>
            <strong> {this.translate(field.label)}</strong>
          </Label>
        );
      }
    }
  };

  renderSingleInput = (field) => {
    let res = <></>;

    if (field.name === "case_number" || field.name === "created_by") {
      return <span key={field.name} />;
    }

    switch (field.type) {
      case "text":
        const size = field.name === "text" ? 12 : 6;
        res = (
          <Col md={size} key={field.name}>
            {/* <Label>{this.translate(field.label)}</Label> */}
            {this.renderLabel(field)}
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="textarea"
                rows={7}
                className="square"
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
            </FormGroup>
          </Col>
        );

        break;
      case "binary":
        res = (
          <Col md="6" key={field.name}>
            {/* <Label>{this.translate(field.label)}</Label> */}
            {this.renderLabel(field)}
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="file"
                className="square"
                placeholder={this.translate(field.label)}
                onChange={(e) => {
                  this.updateState(field.name, e.target.files[0]);
                }}
              />
            </FormGroup>
          </Col>
        );

        break;
      case "string":
        if (field["wq:ForeignKey"]) {
          res = (
            <Col md="6" key={field.name}>
              {this.renderLabel(field)}

              <FormGroup className="form-label-group position-relative has-icon-left">
                <Select
                  isClearable={true}
                  className="rounded-0"
                  onChange={(e) => {
                    this.updateState(`${field.name}_id`, e?.value);
                    if (field["children"] && e) {
                      this.updateChildrenList(field, e);
                    }
                  }}
                  components={this.animatedComponents}
                  options={this.selectOptions(
                    field["has_parent"] === undefined
                      ? this.getForeignFieldDropdown(field["wq:ForeignKey"]) ??
                          []
                      : this.state.childrens[field["wq:ForeignKey"]] ?? []
                  )}
                />
              </FormGroup>
            </Col>
          );
        } else {
          if (field["depends_on"]) {
            res = this.checkboxValue(field.depends_on) ? (
              <Col md="6" key={field.name}>
                <>
                  {this.renderLabel(field)}

                  <FormGroup className="form-label-group position-relative has-icon-left">
                    <Input
                      type="text"
                      className="square"
                      placeholder={this.translate(field.label)}
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
                {this.renderLabel(field)}
                <FormGroup className="form-label-group position-relative has-icon-left">
                  <Input
                    type="text"
                    className="square"
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
            {this.renderLabel(field)}

            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="date"
                className="square"
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
                  label={<strong>{this.translate(field.label)}</strong>}
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
                  className="my-2"
                  icon={<Check className="vx-icon" size={16} />}
                  label={<strong>{this.translate(field.label)}</strong>}
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
        res = <div key={field.name}></div>;
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
   * Add field from required array if is the value is null
   * @param {*} field
   */
  addFromRequired(field) {
    this.state.required_fields.push(field);
  }

  /**
   * Update each dynamic field state value
   * @param {*} field_name
   * @param {*} value
   */
  updateState = (field_name, value) => {
    let form = this.state.form;

    if (value !== "" || value) {
      if (form.has(field_name)) {
        form.set(field_name, value);
      } else {
        form.append(field_name, value);
      }

      this.removeFromRequired(field_name);
    }

    if (!value && form.has(field_name)) {
      form.delete(field_name);
      this.addFromRequired(field_name);
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
    let res = [];
    if (field.has_parent) {
      res = this.state.childrens[field["wq:ForeignKey"]].filter((item) => {
        return Number(item.id) === Number(value.value);
      });
      childrens[field.children] = res[0][`${field.children}_set`];
      this.setState({ childrens });
    } else {
      res = this.props.app_reducer.dropdowns[field["wq:ForeignKey"]].filter(
        (item) => {
          return Number(item.id) === Number(value.value);
        }
      );

      childrens[field.children] = res[0][`${field.children}_set`];
      this.setState({ childrens });
    }
  };

  selectOptions = (list) =>
    list.map((item) => {
      return {
        value: item.id,
        label: this.translate(item.label),
        color: "#4287f5",
      };
    });

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

      const url = this.props.path === "customuser" ? "user" : this.props.path;
      axios
        .post(`${url}s.json`, this.state.form, {
          headers: {
            Authorization: `Bearer ${userOauth.access_token}`,
          },
        })
        .then(({ data }) => {
          this.notifySuccessBounce(data.id);
          setTimeout(() => {
            history.push(`/${this.props.url}`);
          }, 1000);
        })
        .catch(({ error }) => {
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
