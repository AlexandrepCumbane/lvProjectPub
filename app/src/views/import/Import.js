import React, { useState } from "react";
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

import { axios } from "../../redux/api";
import { requestDropodowns } from "../../redux/actions/app/actions";

import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/plugins/extensions/toastr.scss";
import "../../assets/scss/plugins/extensions/dropzone.scss";
import config from "../../data/config";
import { IntlContext } from "../../i18n";

function Uploader(props) {
  const Keys = PT.pt;

  const [val, setVal] = useState(0);
  // let v1 = 0;
  const handleMapKey = (key) => {
    let mappedKey = "";
    switch (key) {
      case "Numero do Caso":
        mappedKey = "case_number";
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
        mappedKey = "case_type";
        break;
      case "Consentimento para compartilhar com parceiro":
        mappedKey = "case_type";
        break;
      case "Nome Completo":
        mappedKey = "case_type";
        break;
      case "Contacto":
        mappedKey = "case_type";
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
        mappedKey = "case_type";
        break;
      case "Ligação de volta":
        mappedKey = "call_feedback";
      case "Outro contacto":
        mappedKey = "other_contact";
        break;
      case "Chamador não encontrado para feedback":
        mappedKey = "callback_required";
        break;
      case "Criado por":
        mappedKey = "created_by";
        break;

      default:
        mappedKey = key;
    }

    return mappedKey;
  };
  const mappItemProps = (item) => {
    const entries = Object.entries(item);
    const { form } = config.pages.lvform;
    let kObject = {};

    entries.forEach((key) => {
      if (handleMapKey(key[0]) === "gender") return;
      if (
        handleMapKey(key[0]) === "provincia" ||
        handleMapKey(key[0]) === "distrito" ||
        handleMapKey(key[0]) === "localidade"
      ) {
        const field = form.filter(
          (item) => item.name === handleMapKey(key[0])
        )[0];

        if (field && field.type === "string" && field["wq:ForeignKey"]) {
          if (key[1] === "None") return;
          const val = props.app_reducer.dropdowns[
            field["wq:ForeignKey"]
          ]?.filter((item) => item.label === key[1]);

          if (val?.length > 0)
            kObject[`${handleMapKey(key[0])}_id`] = val[0].id;

          kObject[`${handleMapKey(key[0])}`] = key[1];
        }
      } else {
        const ks = Object.entries(Keys).filter((item) => item[1] === key[1]);

        if (ks.length > 0) {
          const field = form.filter(
            (item) => item.name === handleMapKey(key[0])
          )[0];

          if (ks[0][0] === "None") return;
          if (field && field.type === "string" && field["wq:ForeignKey"]) {
            const val = props.app_reducer.dropdowns[
              field["wq:ForeignKey"]
            ]?.filter((item) => item.label === ks[0][0]);

            if (val.length > 0)
              kObject[`${handleMapKey(key[0])}_id`] = val[0].id;

            kObject[`${handleMapKey(key[0])}`] = ks[0][0];
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
        } else kObject[handleMapKey(key[0])] = item[key[0]];
      }
    });

    return kObject;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx, .xls, .csv",
    onDrop: (acceptedFiles) => {
      var reader = new FileReader();
      reader.onload = function () {
        var fileData = reader.result;
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
  return (
    <section className="pb-1">
      <div {...getRootProps({ className: "dropzone py-3 flex-column" })}>
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
    form.append("data", JSON.stringify(this.state.tableData));
    axios
      .post(`lvforms/0/import_cases.json/`, this.state.tableData, {
        headers: {
          Authorization: `Bearer ${userOauth.access_token}`,
          "Content-type": "application/json",
        },
      })
      .then(({ data }) => {
        this.setState({ uploading: false });
        console.log(data);

        this.notifySuccessBounce("");
      })
      .catch((error) => {
        this.setState({ uploading: false });
        console.error(error);
        this.notifyErrorBounce("Failed to save Object.");
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
            <td key={index}>{col[key]}</td>
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
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <Uploader
                      getTableData={this.getTableData}
                      {...this.props}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          {this.state.tableData.length ? (
            <Col sm="12">
              <Card>
                <CardHeader className="justify-content-between flex-wrap">
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
                      Upload Data
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
                <CardBody>
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
