import React from "react";
import { connect } from "react-redux";
import { Bounce } from "react-toastify";
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardHeader,
  CardTitle,
  Button,
  Spinner,
} from "reactstrap";
import XLSX from "xlsx";
import { DownloadCloud } from "react-feather";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";

import PT from "../../i18n/messages/pt-PT";
// import EN from "../../i18n/messages/en-US";

import { axios } from "../../redux/api";
import { history } from "../../history";
import { requestDropodowns } from "../../redux/actions/app/actions";

import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/plugins/extensions/toastr.scss";
import "../../assets/scss/plugins/extensions/dropzone.scss";
import config from "../../data/config";
import { IntlContext } from "../../i18n";

function Uploader(props) {
  const Keys = PT.pt;

  const handleMapKey = (key) => {
    let mappedKey = "";

    switch (key) {
      case "Numero do Caso":
        mappedKey = "case_number";
        break;
      case "id":
        mappedKey = "id";
        break;
      case "Provincia":
        mappedKey = "provincia";
        break;

      case "Distrito":
        mappedKey = "distrito";
        break;

      case "Localidade":
        mappedKey = "localidade";
        break;

      case "Sector":
        mappedKey = "sector";
        break;

      case "Resposta":
        mappedKey = "response";
        break;

      case "Outra categoria":
        mappedKey = "othercategory";
        break;

      case "Mês":
        mappedKey = "month";
        break;

      case "Tipo de Caso":
        mappedKey = "category";
        break;

      case "Subcategoria":
        mappedKey = "subcategory";
        break;

      case "Problema de Subcategoria":
        mappedKey = "subcategory_issue";
        break;

      case "Vulnerabilidade":
        mappedKey = "vulnerability";
        break;

      case "Notas da Chamada":
        mappedKey = "call_notes";
        break;

      case "Prioridade de Caso":
        mappedKey = "case_priority";
        break;

      case "Quem está a comunicar?":
        mappedKey = "contact_group";
        break;

      case "Consentimento para coletar informações pessoais":
        mappedKey = "consent_pi";
        break;

      case "Consentimento para compartilhar com parceiro":
        mappedKey = "consent_share_pi";
        break;

      case "Nome Completo":
        mappedKey = "fullname";
        break;

      case "Contacto":
        mappedKey = "contact";
        break;

      case "Gênero":
        mappedKey = "gender";
        break;

      case "Idade":
        mappedKey = "age_group";
        break;

      case "Comunidade":
        mappedKey = "community";
        break;

      case "Ponto de Distribuição":
        mappedKey = "distribution_point";
        break;

      case "Modalidade de Transferencia":
        mappedKey = "transfermod";
        break;

      case "Acomodação ou Centro de Reassentamento":
        mappedKey = "location_type";
        break;

      case "Nome de Reassentamento":
        mappedKey = "ressetlement_name";
        break;

      case "Solução da Chamada":
        mappedKey = "call_solution";
        break;

      case "Está encerrado?":
        mappedKey = "is_closed";
        break;

      case "Como está a contactar-nos?":
        mappedKey = "means_of_communication";
        break;

      case "Como teve conhecimento sobre o mecanismo de reclamação e feedback?":
        mappedKey = "how_knows_lv";
        break;

      case "Como gostaria de ser contactado?":
        mappedKey = "how_callback";
        break;

      case "Como é que você sente que seu assunto foi tratado durante esta chamada?":
        mappedKey = "call_feedback";
        break;

      case "Ligação de volta":
        mappedKey = "callback_required";
        break;

      case "Outro contacto":
        mappedKey = "other_contact";
        break;

      case "Chamador não encontrado para feedback":
        mappedKey = "unavailable_contact";
        break;

      case "Criado por":
        mappedKey = "created_by__label";
        break;

      /**
       * English Fields
       */
      case "Case Number":
        mappedKey = "case_number";
        break;

      case "Province":
        mappedKey = "provincia";
        break;

      case "District":
        mappedKey = "distrito";
        break;

      case "Locality":
        mappedKey = "localidade";
        break;

      case "Response":
        mappedKey = "response";
        break;

      case "Other category":
        mappedKey = "othercategory";
        break;

      case "Month":
        mappedKey = "month";
        break;

      case "Case category":
        mappedKey = "category";
        break;

      case "Sub-category":
        mappedKey = "subcategory";
        break;

      case "Sub-category issue":
        mappedKey = "subcategory_issue";
        break;

      case "Vulnerability":
        mappedKey = "vulnerability";
        break;

      case "Call Notes":
        mappedKey = "call_notes";
        break;

      case "Who is contacting":
        mappedKey = "contact_group";
        break;

      case "Consent to Collect Personal Information":
        mappedKey = "consent_pi";
        break;

      case "Consent to share Personal Information":
        mappedKey = "consent_share_pi";
        break;

      case "Full Name":
        mappedKey = "fullname";
        break;

      case "Contact":
        mappedKey = "contact";
        break;

      case "Gender":
        mappedKey = "gender";
        break;

      case "Age":
        mappedKey = "age_group";
        break;

      case "Community":
        mappedKey = "community";
        break;

      case "Distribution Point":
        mappedKey = "distribution_point";
        break;

      case "Transfer modality":
        mappedKey = "transfermod";
        break;

      case "Accommodation or resettlement centre":
        mappedKey = "location_type";
        break;

      case "Resettlement name":
        mappedKey = "ressetlement_name";
        break;

      case "Call Solution":
        mappedKey = "call_solution";
        break;

      case "Case closed?":
        mappedKey = "is_closed";
        break;

      case "How did they contact us?":
        mappedKey = "means_of_communication";
        break;

      case "How did you hear about linha verde?":
        mappedKey = "how_knows_lv";
        break;

      case "How would you like to be contacted?":
        mappedKey = "how_callback";
        break;

      case "How do you feel you issue was managed during this call?":
        mappedKey = "call_feedback";
        break;

      case "Callback Required":
        mappedKey = "callback_required";
        break;

      case "Other number":
        mappedKey = "other_contact";
        break;

      case "Created by":
        mappedKey = "created_by__label";
        break;

      default:
        mappedKey = key;
    }

    return mappedKey;
  };

  /**
   * Receives a uploaded single row and match keys to the API required specifications (Post Payload)
   *
   * @param {*} item
   * @returns
   */
  const mappItemProps = (item) => {
    const entries = Object.entries(item); // Gets item object as bi-dimensional array

    const { form } = config.pages.lvform;

    let kObject = {};

    console.log(kObject)

    entries.forEach((key) => {
      // Specific known keys matching
      if (
        handleMapKey(key[0]) === "provincia" ||
        handleMapKey(key[0]) === "distrito" ||
        handleMapKey(key[0]) === "localidade" ||
        handleMapKey(key[0]) === "gender" 
      ) {
        const field = form.filter(
          (item) => item.name === handleMapKey(key[0])
        )[0];

        // Handle parsing of select one for gender field

        if (
          field &&
          field.name === "gender" &&
          field.type === "select one" 
        ) {
            switch (item[key[0]]){
              case 'Male':
                kObject[`${handleMapKey(key[0])}`] = "male";
                break;
              case 'Female':
                kObject[`${handleMapKey(key[0])}`] = "female";
                break;
              default:
                console.log(`Handle gender with ${item[key[0]]}`);
                kObject[`${handleMapKey(key[0])}`] = "other";
            }
        }

        if (field && field.type === "string" && field["wq:ForeignKey"]) {
          if (key[1] === "Null") return;
          const val = props.app_reducer.dropdowns[
            field["wq:ForeignKey"]
          ]?.filter((item) => item.label === key[1]);

          if (val?.length > 0)
            kObject[`${handleMapKey(key[0])}_id`] = val[0].id;
          else kObject[`${handleMapKey(key[0])}_id`] = "";

          kObject[`${handleMapKey(key[0])}`] = key[1];
        }
      } else {
        let ks = Object.entries(Keys).filter((item) => item[1] === key[1]);

        if (ks.length > 0) {
          const field = form.filter(
            (item) => item.name === handleMapKey(key[0])
          )[0];

          if (field && field.type === "string" && field["wq:ForeignKey"]) {
            const val = props.app_reducer.dropdowns[
              field["wq:ForeignKey"]
            ]?.filter((item) => item.label === ks[0][0]);

            if (val?.length > 0)
              kObject[`${handleMapKey(key[0])}_id`] = val[0].id;
            else kObject[`${handleMapKey(key[0])}_id`] = "";

            kObject[`${handleMapKey(key[0])}`] = ks[0][0];
          }

          if (ks[0][0] === "Null") {
            kObject[handleMapKey(key[0])] = "";
            kObject[`${handleMapKey(key[0])}_id`] = "";
            return;
          }

          if (
            field &&
            field.type === "select one" &&
            !field.has_boolean_options
          ) {
            kObject[`${handleMapKey(key[0])}`] = ks[0][0];
          }

          if (field && field.has_boolean_options) {
            kObject[`${handleMapKey(key[0])}`] =
              ks[0][0] === "Yes" ? true : false;
          }
        } else {
          kObject[handleMapKey(key[0])] = item[key[0]];

          const field = form.filter(
            (item) => item.name === handleMapKey(key[0])
          )[0];
          if (field && field.type === "string" && field["wq:ForeignKey"]) {
            const val = props.app_reducer.dropdowns[
              field["wq:ForeignKey"]
            ]?.filter((item) => {
              return item.label === key[1];
            });

            if (val?.length > 0)
              kObject[`${handleMapKey(key[0])}_id`] = val[0].id;
            else kObject[`${handleMapKey(key[0])}_id`] = "";

            kObject[`${handleMapKey(key[0])}`] = item[key[0]];
          }

          if (item[key[0]] === "Null") {
            if (field) {
              if (field?.type === "int") {
                kObject[handleMapKey(key[0])] = 0;
                return;
              }
              if (field["wq:ForeignKey"])
                kObject[`${handleMapKey(key[0])}_id`] = "";
            }

            kObject[handleMapKey(key[0])] = "";

            return;
          }

          if (
            field &&
            field.type === "select one" &&
            !field.has_boolean_options
          ) {
            kObject[`${handleMapKey(key[0])}`] = item[key[0]];
          }

          if (field && field.has_boolean_options) {
            kObject[`${handleMapKey(key[0])}`] =
              item[key[0]] === "Yes" ? true : false;
          }
        }
      }
    });

    return kObject;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx, .xls, .csv",
    onDrop: (acceptedFiles) => {
      // console.log(getRootProps,getInputProps)
      var reader = new FileReader();
      reader.onload = function () {
        var fileData = reader.result;
        console.log(fileData)
        var wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach(function (sheetName) {
          var rowObj = XLSX.utils.sheet_to_row_object_array(
            wb.Sheets[sheetName]
          );
          props.getTableData(
            rowObj.map((item) => mappItemProps(item)),
            acceptedFiles[0].name
          );
        });
      };
      if (acceptedFiles.length) {
        reader.readAsBinaryString(acceptedFiles[0]);
      } else {
        toast.error("You can only upload .xlsx, .xls, .csv Files!");
      }
    },
  });
 const handleFileUpload = (e) => {
    let file = e.target.files[0];
    console.log(file);
    props.setState({uploaded_file: file})
  };
  return (
    <section className="pb-1">
      <div {...getRootProps({ className: "dropzone py-3 flex-column", onChange: e =>handleFileUpload(e) })}>
        <input {...getInputProps()} />
        <DownloadCloud className="text-light" size={50} />
        <h4 className="mb-0 mt-2">Drop Excel File or Browse</h4>
      </div>
    </section>
  );
}

class Import extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    tableData: [],
    filteredData: [],
    value: "",
    name: "",
    uploading: false,
    uploaded_file: null,
  };

  componentDidMount() {
    this.props.requestDropodowns();
  }

  getTableData = (arr, name) => {
    this.setState({ tableData: arr, name });
  };

  handleFilter = (e) => {
    let data = this.state.tableData;
    let filteredData = [];
    let value = e.target.value;
    this.setState({ value });

    if (value.length) {
      filteredData = data.filter((col) => {
        let keys = Object.keys(col);

        let startsWithCondition = keys.filter((key) => {
          return col[key]
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase());
        });

        let includesCondition = keys.filter((key) =>
          col[key].toString().toLowerCase().includes(value.toLowerCase())
        );

        if (startsWithCondition.length) return col[startsWithCondition];
        else if (!startsWithCondition && includesCondition.length)
          return col[includesCondition];
        else return null;
      });

      this.setState({ value, filteredData });
    } else {
      return null;
    }
  };

  /**
   * Submits the form to post request action
   */
  handleSubmit = () => {
    const { userOauth } = this.props.state.auth.login;

    this.setState({ uploading: true });
    let form = new FormData();
    form.append("data", this.state.uploaded_file);
    // console.log(this.state.tableData)
    axios
      .post(`lvforms/0/import_cases.json/`, form, {
        headers: {
          Authorization: `Bearer ${userOauth.access_token}`,
          "Content-type": "application/json",
        },
      })
      .then(({ data }) => {
        this.setState({ uploading: false });
        this.notifySuccessBounce("");
        setTimeout(() => {
          history.push('/lvforms');
        }, 1000);
      })
      .catch((error) => {
        this.setState({ uploading: false });
        console.error(error);
        this.notifyErrorBounce(this.translate(`Failed to record case`));
      });
  };

  render() {
    let headArr = this.state.tableData.length
      ? this.state.tableData.map((col, index) => {
          if (index === 0) return [...Object.keys(col)];
          else return null;
        })
      : [];
    let dataArr = this.state.value.length
      ? this.state.filteredData
      : this.state.tableData.length && !this.state.value.length
      ? this.state.tableData
      : null;
    let renderTableBody =
      dataArr !== null && dataArr.length ? (
        dataArr.map((col, index) => {
          let keys = Object.keys(col);
          let renderTd = keys.map((key, index) => (
            <td key={index}>{this.translate(col[key])}</td>
          ));
          return <tr key={index}>{renderTd}</tr>;
        })
      ) : (
        <tr></tr>
      );

    let renderTableHead = headArr.length
      ? headArr[0].map((head, index) => {
          return <th key={index}>{head}</th>;
        })
      : null;

    return (
      <React.Fragment>
        <Row className="import-component">
          <Col sm="12">
            <Card className="rounded-0">
              <CardBody className="rounded-0">
                <Row>
                  <Col sm="12">
                    <Uploader
                      getTableData={this.getTableData}
                      {...this.props}
                      uploaded_file={this.state.uploaded_file}
                     setState={this.setState.bind(this)}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {this.state.tableData.length ? (
            <Col sm="12">
              <Card className="rounded-0">
                <CardHeader className="justify-content-between flex-wrap rounded-0">
                  <CardTitle>{this.state.name}</CardTitle>

                  <div className="flex-wrap">
                    <Button.Ripple
                      onClick={() => this.handleSubmit()}
                      className="rounded-0 mr-1"
                      color="primary"
                    >
                      {this.state.uploading ? (
                        <Spinner type="grow" size="sm" className="mr-1" />
                      ) : null}
                      {this.translate("Upload Data")}
                    </Button.Ripple>

                    {/* <div className=" rounded-0 filter position-relative has-icon-left">
                      <Input
                        type="text"
                        value={this.state.value}
                        onChange={(e) => this.handleFilter(e)}
                      />
                      <div className="form-control-position">
                        <Search size={15} />
                      </div>
                    </div> */}
                  </div>
                </CardHeader>
                <CardBody className="rounded-0">
                  <Table className="table-hover-animation" responsive>
                    <thead>
                      <tr>{renderTableHead}</tr>
                    </thead>
                    <tbody>{renderTableBody}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          ) : null}
          <ToastContainer />
        </Row>
      </React.Fragment>
    );
  }

  /**
   * Success alert function - shows an alert with success background
   * @returns
   */
  notifySuccessBounce = () =>
    toast.success(this.translate(`Transaction completed successfuly!`), {
      transition: Bounce,
    });

  /**
   * Error alert function - shows an alert with danger background
   * @param {*} error - string message
   * @returns
   */
  notifyErrorBounce = (error) =>
    toast.error(this.translate(error), {
      transition: Bounce,
    });
}

// export default Import;

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
  };
}

export default connect(mapStateToProps, { requestDropodowns })(Import);
