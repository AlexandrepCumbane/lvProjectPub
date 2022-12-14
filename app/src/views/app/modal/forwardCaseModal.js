import React from "react";
import { connect } from "react-redux";
import { toast, Bounce } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { requestDropodowns } from "../../../redux/actions/app/actions";

import config from "../../../data/config";
import { axios } from "../../../redux/api";
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  CustomInput,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { IntlContext } from "../../../i18n";

class Create extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;
  animatedComponents = makeAnimated();

  notifySuccessBounce = (id = "") =>
    toast.success(this.translate(`Transaction completed successfuly!`), {
      transition: Bounce,
    });
  notifySuccess = (success) =>
  toast.success(success, {
    transition: Bounce,
    autoClose: 12000,
  });

  notifyErrorBounce = (error) =>
    toast.error(error, {
      transition: Bounce,
      autoClose: 12000,
    });

  multipleSelect = (list) =>
    list.map((item) => {
      return {
        value: item.id,
        label: this.translate(item.label),
        color: "#4287f5",
      };
    });

  state = {
    modal: false,
    unmountOnClose: true,

    form: new FormData(),
    forms: [],
    required_fields: [],
    required_fields_labels: [],
    isValid: true,
    dropdowns: [],
    childrens: {},

    showAlert: false,
    alertFields: [],
    alertData: {},
    disabled: false,
    isLoading: false,
    f1:"",
    f2:"",
    f3:"",
    f4:"",
  };
  componentDidMount() {
    this.props.requestDropodowns(); // Request dropdown lists and place in a map

    this.updateState("lvform_id", this.props.lvform_id);
    let formsdata= []
    // Handle single forward modal
    if(Array.isArray(this.props.lvform)){
      this.props.lvform.forEach((form)=>{

        let formdata = new FormData();
  
        if (form["description"]) {
          formdata.append("description", form["description"]);
        }
        if (form["feedback"]) {
          formdata.append("feedback", form["feedback"]);
        }
  
        formdata.append("lvform_id", form["id"]);
        formdata.append("task_id", this.props.task_id);
        formdata.append("article_id", form["id"]);
        formsdata.push(formdata);
      });
    } else {
      let formdata = new FormData();
        
      if (this.props.description) {
        formdata.append("description", this.props["description"]);
      }
      if (this.props.feedback) {
        formdata.append("feedback", this.props["feedback"]);
      }
  
      formdata.append("lvform_id", this.props.lvform_id);
      formdata.append("task_id", this.props.task_id);
      formdata.append("article_id", this.props.lvform_id);
      formsdata.push(formdata);
    }


    this.setState({ forms: formsdata, modal: this.props.modal ?? false });
    const { dropdowns } = this.props.app_reducer;
    this.setState({ dropdowns });
  }

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
      childrens[field.children] = res[0][`${field.children}`];
      this.setState({ childrens });
    } else {
      res = this.props.app_reducer.dropdowns[field["wq:ForeignKey"]].filter(
        (item) => {
          return Number(item.id) === Number(value.value);
        }
      );

      childrens[field.children] = res[0][`${field.children}`];
      this.setState({ childrens });
    }
  };

  render() {
    return (
      <>
        {this.props.hideButton ? (
          <></>
        ) : (
          <Button
            color={`${this.props.color ?? "warning"}`}
            className="square mr-1"
            outline
            onClick={this.toggleModal}
          >
            {this.translate(this.props.label)}
          </Button>
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={`${this.props.className} square`}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggleModal}>
            {this.translate(this.props.title)}
          </ModalHeader>

          <ModalBody>
            {/* <div>
              {this.renderFieldAlert()}
            </div> */}
            {this.renderForm()}
            </ModalBody>

          <ModalFooter>
            <Button
              disabled={this.state.disabled}
              color="primary"
              className="square"
              onClick={() => this.handleSubmit()}
            >
              {this.state.isLoading ? (
                <Spinner className="mr-1" color="white" size="sm" type="grow" />
              ) : (
                <></>
              )}
              {this.translate("Submit")}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
  /**
   * Action and helper functions
   */

  renderForm = () => {
    const form_ = config.pages[this.props.page];
    return (
      <Row>
        <Col md="12">
          {this.state.isValid && this.state.f1 !== "" ? (
            <></>
          ) : (
            <Alert color="danger" className="square">
              <Label className="text-danger">
                {this.translate(
                  `${this.translate("All these fields are required")} `
                )}
                {this.state.required_fields_labels.map((item, index) => (
                  <strong key={index}>{this.translate(item)}, </strong>
                ))}
              </Label>
            </Alert>
          )}
        </Col>

        {form_.form.map((field) => this.renderSingleInput(field))}
      </Row>
    );
  };

  renderSingleInput = (field) => {
    let res = <></>;

    if (
      field.name === "lvform" ||
      field.name === "article" ||
      field.name === "task" ||
      field.name === "has_feedback" ||
      field.name === "partner_feedback" ||
      field.name === "call_attempts" ||
      field.name === "id" ||
      field.name === "isFeedback_aproved"
    ) {
      return <span key={field.name} />;
    }
    switch (field.type) {
      case "text":
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="textarea"
                rows={5}
                className="square"
                placeholder={this.translate(field.label)}
                defaultValue={
                  this.props["description"] ??
                  this.props["feedback" ?? undefined]
                }
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
              <div className="form-control-position">
                {/* <Mail size={15} /> */}
              </div>
            </FormGroup>
          </Col>
        );

        break;

      case "binary":
        res = (
          <Col md="6" key={field.name}>
            <Label>{this.translate(field.label)}</Label>
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
            <Col md="12" key={field.name}>
                 {this.renderLabel(field)}
              <Label></Label>

              <FormGroup className="form-label-group position-relative has-icon-left">
                { field.name === "focalpoint" &&
                  <Select
                    className="react-select"
                    classNamePrefix='select'
                    isMulti
                    onChange={(e) => {
                      this.updateState(`${field.name}_id`, e);
                     if(e){
                      this.setState({
                        f1:e[0].value
                      })
                     }
                    }}
                    components={this.animatedComponents}
                    options={this.multipleSelect(
                      field["has_parent"] === undefined
                        ? this.getForeignFieldDropdown(field["wq:ForeignKey"])
                        : this.state.childrens[field["wq:ForeignKey"]] ?? []
                    )}
                  />
                }
                { field.name !== "focalpoint" &&
                <Select
                  className="react-select"
                  classNamePrefix='select'
                  onChange={(e) => {
                    this.updateState(`${field.name}_id`, e.value);
                    if (field["children"]) {
                      this.updateChildrenList(field, e);
                    }
                  }}
                  components={this.animatedComponents}
                  options={this.multipleSelect(
                    field["has_parent"] === undefined
                      ? this.getForeignFieldDropdown(field["wq:ForeignKey"])
                      : this.state.childrens[field["wq:ForeignKey"]] ?? []
                  )}
                />
                }
              </FormGroup>
            </Col>
          );
        } else {
          res = (
            <Col md="12" key={field.name}>
              {this.renderLabel(field)}
              <Label></Label>

              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="text"
                  className="square"
                  placeholder={this.translate(field.label)}
                  onChange={(e) => this.updateState(field.name, e.target.value)}
                />
              </FormGroup>
            </Col>
          );
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
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
              <div className="form-control-position">
                {/* <Mail size={15} /> */}
              </div>
            </FormGroup>
          </Col>
        );
        break;
      case "int":
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="number"
                className="square"
                placeholder={this.translate(field.label)}
                // defaultValue={this.state.email}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              />
              <div className="form-control-position">
                {/* <Mail size={15} /> */}
              </div>
            </FormGroup>
          </Col>
        );
        break;
      case "select one":
        res = (
          <Col md="12" key={field.name}>
            <Label>{this.translate(field.label)}</Label>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <CustomInput
                className="square"
                type="select"
                id={field.name}
                placeholder={this.translate(field.label)}
                onChange={(e) => this.updateState(field.name, e.target.value)}
              >
                <option>{this.translate("Select")}</option>
                {this.renderSelectOption(field.choices)}
              </CustomInput>
            </FormGroup>
          </Col>
        );
        break;

      default:
        res = <div key={field.name}></div>;
        break;
    }

    return res;
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  changeUnmountOnClose = (e) => {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
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
   * Render a input label verifying it's required bind value and filled value
   * @param {*} field
   * @returns
   */
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
          this.addToRequired(field)
          if (this.state.required_fields_labels.includes(field.label))
            return (
              <Label className="text-danger">
                <strong> * {this.translate(field.label)}</strong>
              </Label>
            );
          else {
            console.log('vamos');

            return (
              
              <Label className="text-danger">
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

  /**
   * Add all fields and add the required fields into an array
   * @param {*} field
   */
  addToRequired(field) {
    const index = this.state.required_fields.indexOf(field.name);

    if (field.bind !== undefined) {
      if (field.bind.required === true && index <= 0) {

        if (field.type === "string") {
          this.state.required_fields.push(`${field.name}_id`);
        } else { this.state.required_fields.push(field.name);

      } 
    } else {
      this.state.required_fields_labels.push(field.label);
      this.state.required_fields.push(field.name);
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
    let forms = this.state.forms;
    let updatedForms = []

    forms.forEach((form) => {
        if (value !== "") {
        if (form.has(field_name)) {
          if (field_name === "focalpoint_id"){
            const fp_ids = []
            if(value !== null){
              value.forEach((item) => {
                fp_ids.push(item.value);
              });
              form.set(field_name, fp_ids);
            } else{
              form.set(field_name, null);
              this.addToRequired(field_name);
            }
            
          } else {
            form.set(field_name, value);
          }
        } else {
          if (field_name === "focalpoint_id"){
            form.append(field_name, value[0].value);
          } else {
            form.append(field_name, value);
          }
        }

          this.removeFromRequired(field_name);
        }

        updatedForms.push(form);
    })
    this.setState({ forms: updatedForms });
  };

  filterNotificationAction = (item) => {
    switch (this.props.page) {
      case "forwardinginstitution":
        this.context.sendNotification(
          "Create",
          `new_${this.props.page}`,
          this.state.form.get("referall_to_id"),
          `${item.lvform_label}`
        );
        break;
      // case "casecomment":
      //   this.context.sendNotification("Loram", `new_${this.props.page}`, this.state.form.get('referall_to_id'));
      //   break;
      case "taskcomment":
        this.context.sendNotification("Create", 
        `new_${this.props.page}`, 
        this.props.task['created_by_id'],
        `${this.props.task['lvform_label']}-${this.props.task['id']}`);
        break;
      case "task":
        this.context.sendNotification(
          "Create",
          `new_${this.props.page}`,
          this.state.form.get("assignee_id"),
          `${item.lvform_label}-${item.id}`
        );
        break;
      case "forwardcasetofocalpoint":
        // TODO: Make this handle multiple values to submit to
        this.context.sendNotification(
          "Create",
          `new_${this.props.page}`,
          this.state.form.get("focalpoint_id"),
          `${item.lvform_label}`
        );
        break;
      default:
        // TODO
        console.log("a");
    }
  };

  /**
   * Submits the form to post request action
   */
  handleSubmit = () => {
    const { userOauth } = this.props.state.auth.login;
    if (this.state.f1 === "") {
      this.notifyErrorBounce(this.translate("Submission was not possible due to not filling the required fields."));
      this.setState({ isValid: false });
    } else {

      // desabilitar a acao do butao 
      this.setState({disabled: true});
      this.setState({ isValid: true, isLoading: true });

      const url =
        this.props.page === "agencypartner" ||
        this.props.page === "agencyfocalpoint"
          ? `/users/0/${this.props.page}`
          : `${this.props.page}s/`;

    const failedCases = [];
    this.state.forms.forEach((form, idx, array) => {
      console.log(form)

      // Unwrap and submit individually for each ID in Array
      const focal_points = form.get("focalpoint_id").split(',');

      focal_points.forEach((focal_point_id, idx, array) => {
        // set focalpoint_id 
        form.set("focalpoint_id", focal_point_id);
       
        // new form data do add set values
        const formData = new FormData();
        
        // get values 
        for (let [key, val] of form.entries()) 
        {
          // add setter values on form data
          formData.append(key,val);
        }

        // send promise
        axios
          .post(url, formData, {
            headers: {
              Authorization: `Bearer ${userOauth.access_token}`,
            },
          })
          .then(({ data }) => {
            console.log(data);
            this.notifySuccess(this.translate(`Case forwarded to `)+data.focalpoint_label)

              if (idx === array.length - 1){ 
                  // console.log("Last callback call at index " + idx + " with value "  ); 
                      
                  // this.notifySuccessBounce(data.id);

                  this.filterNotificationAction(data);
                  if (this.props.addMore) {
                      this.props.addMore(data);
                  }
              }
          })
          .catch(({ response }) => {
            console.log(response.data[0].focalpoint_label)
            failedCases.push({"id": form.get("lvform_id"), "response": response});
            this.notifyErrorBounce(
              this.translate(
                response.data?.description ?? `This case has already been sent to `
              )+ response.data[0].focalpoint_label
            );
            this.setState({disabled: false});
            this.setState({isLoading: false});

            this.setState({
              alertFields: Object.keys(response.data) ?? [],
              alertData: response.data,
              showAlert: true
            })
          });
          this.setState({disabled: false});
          this.setState({isLoading: false});
        });
      });

                  // desabilitar a acao do butao 
      this.state.disabled=false;
      this.setState({ isLoading: false });

      setTimeout(() => {
        this.toggleModal();
      }, 1000);
    }
  };


  renderFieldAlert = () => {

    const { showAlert, alertData, alertFields } = this.state;
    const { form } = config.pages[this.props.page];
  
    return <Alert className="rounded-0" ref="alertFocus" color='danger' isOpen={ showAlert} toggle={() => this.setState({ showAlert: false })}>
        { alertFields?.map((item, index) => {
  
          const field = form.find(el => el.name === item)
          return (<div className='alert-body' key={index}>
            {`${this.translate(field?.label ?? item )}: ${this.translate(alertData[field?.name ?? item])}` }
          </div>)
  
        })}
      </Alert>
    }
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
  };
}

export default connect(mapStateToProps, { requestDropodowns })(Create);
