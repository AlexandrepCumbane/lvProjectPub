import React from "react";
import { AgGridReact } from "ag-grid-react";
import classnames from "classnames";
import { Edit, ChevronDown, List, Delete, X } from "react-feather";
import { ContextLayout } from "../../../utility/context/Layout";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Search } from "react-feather";

import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Spinner,
} from "reactstrap";

import CaseEdit from "../../../views/app/edit";
import ModalEdit from "../../../views/app/modal/edit";

import { IntlContext } from "../../../i18n/provider";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import "../../../assets/scss/pages/data-list.scss";
import ArticleView from "../../../views/information/ArticleView";

class AggridTable extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    filters: false,
    gridReady: false,
    showSidebar: false,
    showTaskDialog: false,
    showCallSidebar: false,
    rowData: null,
    paginationPageSize: 10,
    currenPageSize: "",
    getPageSize: "",
    selectedData: {},
    modalForm: "",
    page: "",
    showTable: false,
    hasRequestedMore: false,
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
    showArticleView: false,
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
    start: "",
    end: "",
    selectedRows: 0,
  };

  componentDidMount() {
    this.setState({
      rowData: this.props.data ?? this.state.rowData,
      page: this.props.tableType,
    });

    this.setState({
      columnDefs: [
        ...(this.props.columnDefs ?? this.state.columnDefs),
        {
          headerName: this.translate("Action"),
          field: "company",
          width: 130,
          pinned: window.innerWidth > 800 ? "right" : false,
          cellRendererFramework: (params) => {
            return (
              <div className="data-list-action">
                <Edit
                  className="cursor-pointer mr-1"
                  size={20}
                  onClick={(e) => {
                    this.setState({ selectedData: params.data });

                    if (this.props.tableType === "lvform") {
                      this.setState({ showSidebar: true });
                    }
                    if (this.props.tableType === "article") {
                      this.setState({ showArticleView: true });
                    }
                    if (
                      this.props.tableType === "forwardcasetofocalpoint" ||
                      this.props.tableType === "forwardinginstitution"
                    ) {
                      this.setState({
                        showSidebar: true,
                        selectedData: params.data.callcase,
                      });
                    }
                    if (this.props.tableType === "calls") {
                      this.setState({ showCallSidebar: true });
                    }
                    if (this.props.tableType === "task") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "task",
                      });
                    }
                    if (this.props.tableType === "clusterregion") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "clusterregion",
                      });
                    }
                    if (this.props.tableType === "clusteragency") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "clusteragency",
                      });
                    }
                    if (this.props.tableType === "customuser") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "customuser",
                      });
                    }
                  }}
                />

                {this.props.tableType === "task" ? (
                  <List
                    className="cursor-pointer mr-1 text-info"
                    size={20}
                    onClick={(e) => {
                      this.setState({
                        showSidebar: true,
                        selectedData: params.data.casecall,
                      });
                    }}
                  />
                ) : (
                  <></>
                )}

                {this.props.userRole === "manager" ? (
                  <Delete
                    className="cursor-pointer mr-1 text-danger"
                    size={20}
                    onClick={(e) => {
                      this.props.deleteAction(params.data.id);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            );
          },
        },
      ],
    });

    // this.gridApi.setColumnDefs(this.props.columnDefs);

    this.setState({
      showSidebar: this.props.showSidebar ?? false,
      showTable: true,
    });
  }

  renderLoading = () => {
    let res = (
      <div className="mb-1">
        <Spinner color="warning" type="grow" size="sm" />
        <strong className="ml-1">Loading...</strong>
      </div>
    );

    if (!this.props.loading)
      res = (
        // <div className="mb-1">
        //   <strong className="text-primary">
        //     {this.translate("Selected")}: <span id="selectedRows">0</span>
        //   </strong>
        // </div>
        <div className="mb-1">
          <UncontrolledDropdown className="p-1 ag-dropdown-no-border">
            <DropdownToggle tag="div">
              <strong>
                {this.translate("Selected")}: <span id="selectedRows">0</span>
              </strong>
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      );
    return res;
  };

  onColumnMoved(name, params) {
    var columnState = JSON.stringify(params.columnApi.getColumnState());
    localStorage.setItem(name, columnState);
  }

  onGridReady = (name, params) => {
    var columnState = JSON.parse(localStorage.getItem(name));
    const { columnDefs } = params.columnApi.columnController;
    if (columnState) {
      if (columnState.length === columnDefs.length) {
        params.columnApi.setColumnState(columnState);
      }
    }

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
    this.setState({ showArticleView: false });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showTaskDialog: !prevState.showTaskDialog,
    }));
  };

  componentDidUpdate(previousProps, previousState) {
    if (this.state.gridReady) {
      if (previousState.rowData !== this.props.data) {
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

  handleModal = () => {
    this.setState({ showTaskDialog: !this.state.showTaskDialog });
  };

  requestMore = async (size, currentPage) => {
    if (size === currentPage + 1 && size > 1) {
      this.setState({ hasRequestedMore: true });
      const hasRequestedMore = !(await this.props.requestMore());
      this.setState({ hasRequestedMore });
    }
  };

  onPaginationChanged = () => {
    if (this.gridApi && !this.state.hasRequestedMore) {
      this.requestMore(
        this.gridApi?.paginationGetTotalPages(),
        this.gridApi?.paginationGetCurrentPage()
      );
    }
  };

  onSelectionChanged = () => {
    const selected = this.gridApi.getSelectedRows();
    if (!this.props.loading)
      document.querySelector("#selectedRows").innerHTML = selected.length ?? 0;
  };

  renderFilters = () => {
    let element = (
      <div className="d-flex flex-row">
        <div className="col-sm-12 col-md-5 table-input rounded-0">
          <InputGroup className="rounded-0 mb-1">
            <InputGroupAddon
              className="rounded-0 text-primary"
              color="primary"
              addonType="prepend"
            >
              <InputGroupText className={`rounded-0`}>
                {this.translate("From")}
              </InputGroupText>
            </InputGroupAddon>
            <Input
              className={`rounded-0 start-date`}
              value={this.state.start}
              onChange={(e) => this.setState({ start: e.target.value })}
              type="date"
            />
          </InputGroup>
        </div>
        <div className="col-sm-12 col-md-5 table-input rounded-0">
          <InputGroup className="rounded-0 mb-1">
            <InputGroupAddon className="rounded-0" addonType="prepend">
              <InputGroupText className="rounded-0">
                {this.translate("To")}
              </InputGroupText>
            </InputGroupAddon>
            <Input
              className="rounded-0 end-date"
              value={this.state.end}
              onChange={(e) => this.setState({ end: e.target.value })}
              type="date"
            />
          </InputGroup>
        </div>
        <div className="col-sm-12 col-md-3 table-input mb-1">
          <Button.Ripple
            className="btn-icon rounded-circle"
            color="danger"
            onClick={() => {
              this.setState({ end: "", start: "" });
              this.props.requestMore(false);
            }}
          >
            <X size={18} color="white" />
          </Button.Ripple>
          <Button.Ripple
            className="btn-icon rounded-circle ml-1 mr-1"
            color="primary"
            onClick={() => {
              if (this.state.end !== "" && this.state.start !== "")
                this.props.requestParams(
                  `${this.state.start} 00:00:00`,
                  `${this.state.end} 23:59:59`
                );
            }}
          >
            <Search size={18} color="white" />
          </Button.Ripple>
        </div>
      </div>
    );

    if (this.props.tableType === "customuser") {
      element = <></>;
    }
    if (!this.state.filters) {
      element = <></>;
    }

    if (
      this.props.userRole === "operator" &&
      this.props.tableType === "lvform"
    ) {
      element = <></>;
    }

    return element;
  };

  render() {
    const {
      rowData,
      showSidebar,
      showCallSidebar,
      showTaskDialog,
      modalForm,
      showArticleView,
    } = this.state;
    return (
      <React.Fragment>
        <div className={`data-list thumb-view"`}>
          {showSidebar ? (
            <CaseEdit
              requestData={this.props.requestData}
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
              title={`Edit`}
              page={modalForm}
              label="Edit"
              color="info"
              modal={showTaskDialog}
              toggleModal={this.handleModal}
              data={this.state.selectedData}
              disabled
              requestData={this.props.requestData}
            />
          ) : showArticleView ? (
            <ArticleView
              handleSidebar={this.handleSidebar}
              show={this.state.showArticleView}
              data={this.state.selectedData}
              updateLoadMore={this.props.requestData}
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
        <Card className="overflow-hidden agGrid-card rounded-0">
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-3 ag-grid-table">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <div className="mb-1 mr-2">
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
                            onClick={() => this.filterSize(150)}
                          >
                            150
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(250)}
                          >
                            250
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(500)}
                          >
                            500
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => this.filterSize(1000)}
                          >
                            1000
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    {this.renderLoading()}
                  </div>
                  {this.renderFilters()}

                  <div className="d-flex flex-row justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder={`${this.translate("Search")}...`}
                        className="rounded-0"
                        onChange={(e) => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>

                    <div className="export-btn">
                      <UncontrolledDropdown className="p-1 ag-dropdown">
                        <DropdownToggle tag="div">
                          {this.translate("Action")}
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          {this.props.userRole === "manager" ||
                          this.props.userRole === "focalpoint" ? (
                            <DropdownItem
                              tag="div"
                              onClick={() =>
                                this.gridApi.exportDataAsCsv({
                                  onlySelected: true,
                                  allColumns: true,
                                })
                              }
                            >
                              {this.translate("Export Selected")}
                            </DropdownItem>
                          ) : (
                            <></>
                          )}
                          <DropdownItem
                            tag="div"
                            onClick={() => {
                              this.setState({
                                filters: !this.state.filters,
                              });
                            }}
                          >
                            {this.translate("Date Filters")}
                          </DropdownItem>
                          <DropdownItem
                            tag="div"
                            onClick={() => {
                              this.setState({
                                columnDefs: this.props.columnDefs,
                                showTable: false,
                              });

                              this.gridApi.setColumnDefs(this.props.columnDefs);
                              localStorage.removeItem(this.props.tableType);

                              this.setState({
                                showTable: true,
                              });
                            }}
                          >
                            {this.translate("Restore Columns")}
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
                {this.state.showTable ? (
                  <ContextLayout.Consumer>
                    {(context) => (
                      <AgGridReact
                        rowSelection="multiple"
                        defaultColDef={this.state.columnDefs}
                        columnDefs={this.state.columnDefs}
                        rowData={rowData}
                        onGridReady={(params) =>
                          this.onGridReady(this.props.tableType, params)
                        }
                        colResizeDefault={"shift"}
                        animateRows={true}
                        floatingFilter={true}
                        pagination={true}
                        paginationPageSize={this.state.paginationPageSize}
                        pivotPanelShow="always"
                        enableRtl={context.state.direction === "rtl"}
                        onColumnMoved={(params) =>
                          this.onColumnMoved(this.props.tableType, params)
                        }
                        onPaginationChanged={() => this.onPaginationChanged()}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : (
                  <Spinner size="lg" />
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default AggridTable;
