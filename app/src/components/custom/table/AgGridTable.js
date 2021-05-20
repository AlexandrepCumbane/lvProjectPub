import React from "react";
import { AgGridReact } from "ag-grid-react";
import classnames from "classnames";
import {
  Edit,
  ChevronDown,
  List,
  Delete,
  X,
  Filter,
  RefreshCw,
  Columns,
  DownloadCloud,
} from "react-feather";
import { ContextLayout } from "../../../utility/context/Layout";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
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
import { getFilterComponent } from "./filterComponent";

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
    editCase: false,
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
          field: "none",
          width: 123,
          pinned: window.innerWidth > 512 ? "right" : false,
          cellRendererFramework: (params) => {
            return (
              <div className="justify-content-end">
                <Button.Ripple
                  onClick={(e) => {
                    this.setState({ selectedData: params.data });

                    if (this.props.tableType === "lvform") {
                      this.setState({ editCase: true });
                      // this.setState({ showSidebar: true, editCase: true });
                      this.props.handleShowCaseSidebar(params.data);
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
                  className="btn-icon rounded-0"
                  color="flat-primary"
                >
                  <Edit size={16} />
                </Button.Ripple>

                {this.props.tableType === "task" ? (
                  <Button.Ripple
                    onClick={(e) => {
                      this.setState({
                        showSidebar: true,
                        selectedData: params.data.casecall,
                      });
                    }}
                    className="btn-icon rounded-0"
                    color="flat-secondary"
                  >
                    <List size={16} />
                  </Button.Ripple>
                ) : (
                  <></>
                )}

                {this.props.userRole === "manager" ? (
                  <Button.Ripple
                    className="btn-icon rounded-0"
                    color="flat-danger"
                    onClick={(e) => {
                      this.props.deleteAction(params.data.id);
                    }}
                  >
                    <Delete size={16} />
                  </Button.Ripple>
                ) : (
                  <></>
                )}
              </div>
            );
          },
        },
      ],
    });

    this.setState({
      showSidebar: this.props.showSidebar ?? false,
      showTable: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.filters !== nextState.filters ||
      this.state.start !== nextState.start ||
      this.state.end !== nextState.end ||
      this.props.loading !== nextProps.loading ||
      this.props.data !== nextProps.data
    )
      return true;

    if (
      this.props.tableType === "lvform" &&
      nextProps.data === this.props.data &&
      this.state.showTable &&
      !nextProps.loading
    ) {
      return false;
    }

    return true;
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
        <div className="mb-1">
          <UncontrolledDropdown className="p-1 ag-dropdown-no-border">
            <DropdownToggle tag="div">
              <strong>
                <span id="selectedRows">0</span>
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
    let selectedCount = 0;
    this.gridApi.forEachNodeAfterFilter((node) => {
      if (node.isSelected()) selectedCount += 1;
    });

    if (!this.props.loading)
      document.querySelector("#selectedRows").innerHTML = selectedCount ?? 0;
  };

  renderFilters = () => {
    let element = (
      <div className="d-flex flex-row">
        <div>
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
        <div>
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
        <div>
          <Button.Ripple
            className="btn-icon rounded-0 py-1"
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
          <Button.Ripple
            className="btn-icon rounded-0 py-1"
            color="danger"
            onClick={() => {
              this.setState({ end: "", start: "" });
              this.props.requestMore(false);
            }}
          >
            <X size={18} color="white" />
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
              show={this.state.showSidebar}
              data={this.state.selectedData}
              handleSidebar={this.handleSidebar}
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
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
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
                          {this.props.data.length -
                            this.state.currenPageSize * this.state.getPageSize >
                          0
                            ? this.state.currenPageSize * this.state.getPageSize
                            : this.props.data.length}{" "}
                          of {this.props.data.length}
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

                    <div>
                      {this.props.userRole === "manager" ||
                      this.props.userRole === "focalpoint" ? (
                        <>
                          <Button.Ripple
                            id="download"
                            className="btn-icon"
                            color="flat-primary rounded-0"
                            onClick={() =>
                              this.gridApi.exportDataAsCsv({
                                onlySelected: true,
                                allColumns: true,
                              })
                            }
                          >
                            <DownloadCloud size={16} />
                          </Button.Ripple>
                          <UncontrolledTooltip
                            placement="top"
                            target="download"
                          >
                            {this.translate("Export Selected")}
                          </UncontrolledTooltip>
                        </>
                      ) : (
                        <></>
                      )}
                      <Button.Ripple
                        id="date-filter"
                        onClick={() => {
                          this.setState({
                            filters: !this.state.filters,
                          });
                        }}
                        className="btn-icon rounded-0"
                        color="flat-primary"
                      >
                        <Filter size={16} />
                      </Button.Ripple>
                      <Button.Ripple
                        id="refresh-list"
                        className="btn-icon rounded-0"
                        color="flat-primary"
                        onClick={() => this.props.requestMore(false)}
                      >
                        <RefreshCw size={16} />
                      </Button.Ripple>
                      <Button.Ripple
                        id="unset-column"
                        onClick={() => {
                          this.setState({
                            columnDefs: this.props.columnDefs,
                            showTable: false,
                          });

                          this.gridApi.setColumnDefs(this.props.columnDefs);
                          localStorage.removeItem(this.props.tableType);

                          window.location.reload(1);
                        }}
                        className="btn-icon"
                        color="flat-primary rounded-0"
                      >
                        <Columns size={16} />
                      </Button.Ripple>

                      <UncontrolledTooltip placement="top" target="date-filter">
                        {this.translate("Date range filters")}
                      </UncontrolledTooltip>
                      <UncontrolledTooltip
                        placement="top"
                        target="refresh-list"
                      >
                        {this.translate("Update list")}
                      </UncontrolledTooltip>
                      <UncontrolledTooltip
                        placement="top"
                        target="unset-column"
                      >
                        {this.translate("Restore Columns")}
                      </UncontrolledTooltip>
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
                        translate={this.translate}
                        enableRtl={context.state.direction === "rtl"}
                        onColumnMoved={(params) =>
                          this.onColumnMoved(this.props.tableType, params)
                        }
                        onPaginationChanged={() => this.onPaginationChanged()}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        components={{
                          customFilter: getFilterComponent(),
                        }}
                        dropdowns={this.props.dropdowns}
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
