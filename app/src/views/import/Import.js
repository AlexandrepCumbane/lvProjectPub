import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardHeader,
  CardTitle,
  Button,
} from "reactstrap";
import XLSX from "xlsx";
import { DownloadCloud, Search } from "react-feather";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";

import { axios } from "../../redux/api";

import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/plugins/extensions/toastr.scss";
import "../../assets/scss/plugins/extensions/dropzone.scss";

function Uploader(props) {
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
          props.getTableData(rowObj, acceptedFiles[0].name);
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
  state = {
    tableData: [],
    filteredData: [],
    value: "",
    name: "",
  };

  getTableData = (arr, name) => {
    console.log("Arr: ", arr);
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

    console.log("Payload: ",this.state.tableData)

    let form = new FormData();
    form.append("data", JSON.stringify(this.state.tableData))
    axios
      .post(`lvforms/0/import_cases.json/`, this.state.tableData, {
        headers: {
          Authorization: `Bearer ${userOauth.access_token}`,
          "Content-type": "application/json"
        },
      })
      .then(({ data }) => {
        // this.notifySuccessBounce(data.id);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        // this.notifyErrorBounce("Failed to save Object.");
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
      dataArr !== null && dataArr.length
        ? dataArr.map((col, index) => {
            let keys = Object.keys(col);
            let renderTd = keys.map((key, index) => (
              <td key={index}>{col[key]}</td>
            ));
            return <tr key={index}>{renderTd}</tr>;
          })
        : null;

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
                    <Uploader getTableData={this.getTableData} />
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
}

// export default Import;

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
  };
}

export default connect(mapStateToProps, {})(Import);
