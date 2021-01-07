import React from "react";
import { AgGridReact } from "ag-grid-react";
import classnames from "classnames";
import { Edit, ChevronDown } from "react-feather";
import { ContextLayout } from "../../../utility/context/Layout";

import {
  Card,
  CardBody,
  Input,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import CaseEdit from "../../../views/app/edit";
import ModalEdit from "../../../views/app/modal/edit";

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import "../../../assets/scss/pages/data-list.scss";

class AggridTable extends React.Component {
  state = {
    gridReady: false,
    showSidebar: false,
    showTaskDialog: false,
    showCallSidebar: false,
    rowData: null,
    paginationPageSize: 10,
    currenPageSize: "",
    getPageSize: "",
    selectedData: {},
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "First Name",
        field: "firstname",
        width: 175,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
      },
    ],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ rowData: this.props.data ?? this.state.rowData });
    this.setState({
      columnDefs: [
        ...(this.props.columnDefs ?? this.state.columnDefs),
        {
          headerName: "Accao",
          field: "company",
          width: 100,
          pinned: window.innerWidth > 992 ? "right" : false,
          cellRendererFramework: (params) => {
            return (
              <div className="data-list-action">
                <Edit
                  className="cursor-pointer mr-1"
                  size={20}
                  onClick={(e) => {
                    this.setState({ selectedData: params.data });

                    if (this.props.tableType == "lvform") {
                      this.setState({ showSidebar: true });
                    }
                    if (this.props.tableType == "calls") {
                      this.setState({ showCallSidebar: true });
                    }
                    if (this.props.tableType == "task") {
                      this.setState({ showTaskDialog: true });
                    }
                  }}
                />
              </div>
            );
          },
        },
      ],
    });
    this.setState({ showSidebar: this.props.showSidebar ?? false });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.paginationSetPageSize(Number(20));
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
      gridReady: true,
    });
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };

  handleSidebar = (value, prev) => {
    this.setState({ showSidebar: this.props.showSidebar });
    this.setState({ showCallSidebar: false });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showTaskDialog: !prevState.showTaskDialog,
    }));
  };

  componentDidUpdate(previousProps, previousState) {
    if (this.state.gridReady) {
      if (previousState.rowData != this.props.data) {
        this.setState({
          rowData: this.props.data,
        });
      }
      this.updateData(this.props.data);
    }
  }

  updateData = (data) => {
    this.gridApi.setRowData(data);
  };

  render() {
    const {
      rowData,
      columnDefs,
      defaultColDef,
      showSidebar,
      showCallSidebar,
      showTaskDialog,
    } = this.state;
    return (
      <React.Fragment>
        <div className={`data-list thumb-view"`}>
          {showSidebar ? (
            <CaseEdit
              show={this.state.showSidebar}
              data={this.state.selectedData}
              updateData={() => {}}
              addData={() => {}}
              handleSidebar={this.handleSidebar}
              thumbView={this.props.thumbView}
              getData={this.props.getData}
              dataParams={this.props.parsedFilter}
              addNew={this.state.addNew}
            />
          ) : showCallSidebar ? (
            <></>
          ) : showTaskDialog ? (
            <ModalEdit
              title={`Edit Task`}
              page="task"
              label="Edit Task"
              color="info"
              modal={showTaskDialog}
              data={this.state.selectedData}
              disabled
              page={"task"}
            />
          ) : (
            <></>
          )}
          <div
            className={classnames("data-list-overlay", {
              show: this.state.showSidebar,
            })}
            onClick={() => this.handleSidebar(!this.state.showSidebar, true)}
          />
          <div
            className={classnames("data-list-overlay", {
              show: this.state.showCallSidebar,
            })}
            onClick={() => this.handleSidebar(!this.state.showSidebar, true)}
          />
        </div>
        <Card className="overflow-hidden agGrid-card">
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-3 ag-grid-table">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                        {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                            (this.state.getPageSize - 1)}{" "}
                        -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                        0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                        of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(134)}
                        >
                          134
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search..."
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                    <div className="export-btn">
                      <UncontrolledDropdown className="p-1 ag-dropdown">
                        <DropdownToggle tag="div">
                          Action
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.gridApi.exportDataAsCsv()}
                          >
                            Export
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
                <ContextLayout.Consumer>
                  {(context) => (
                    <AgGridReact
                      // modules={this.state.modules}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={true}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default AggridTable;
