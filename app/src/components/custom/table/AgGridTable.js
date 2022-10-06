import React from "react";

// import { AllCommunityModules } from '@ag-grid-community/all-modules';

import classnames from "classnames";
import { Edit, List, Delete } from "react-feather";
import { Button } from "reactstrap";

import { UncontrolledDropdown, DropdownToggle, Spinner } from "reactstrap";

import CaseEdit from "../../../views/app/edit";
import ModalEdit from "../../../views/app/modal/edit";

import { IntlContext } from "../../../i18n/provider";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import "../../../assets/scss/pages/data-list.scss";
import ArticleView from "../../../views/information/ArticleView";
import CasesCard from "./CasesCard";

class AggridTable extends React.Component {
  static contextType = IntlContext;
  translate = this.context.translate;

  state = {
    filters: false,
    openModal: false,
    forwardCaseData: "",
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
    loading: false,
    page: "",
    editCase: false,
    showTable: false,
    hasRequestedMore: false,
    defaultColDef: {},

    // modules: AllCommunityModules,
    showArticleView: false,
    getRowNodeId: function (data) {
      return data.label;
    },
    columnDefs: [
      {
        headerName: "First Name",
        field: "firstname",
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
                    let selectedData = params.data;

                    selectedData["index"] = params.rowIndex;
                    this.setState({ selectedData: params.data });

                    if (this.props.tableType === "lvform") {
                      this.setState({ editCase: true });
                      this.setState({ showSidebar: true, editCase: true });
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
                      this.props.handleShowCaseSidebar(params.data);
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
                    if (this.props.tableType === "clustersector") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "clustersector",
                      });
                    }
                    if (this.props.tableType === "customuser") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "customuser",
                      });
                    }
                    if (this.props.tableType === "subcategoryissue") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "subcategoryissue",
                      });
                    }
                    if (this.props.tableType === "subcategory") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "subcategory",
                      });
                    }
                    if (this.props.tableType === "casetipology") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "casetipology",
                      });
                    }
                    if (this.props.tableType === "location") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "location",
                      });
                    }
                    if (this.props.tableType === "locationclassification") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "locationclassification",
                      });
                    }
                    if (this.props.tableType === "district") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "district",
                      });
                    }
                    if (this.props.tableType === "province") {
                      this.setState({
                        showTaskDialog: true,
                        modalForm: "province",
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
      this.state.openModal !== nextState.openModal ||
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

  requestNode = (val) => {
    if (!this.gridApi.getRowNode(val) && val !== "" && !this.state.loading) {
      this.setState({ loading: true });
      this.props
        .searchCase({
          name: this.props.tableType,
          case_number: val,
        })
        .then(() => {
          this.gridApi.setRowData(this.props.data);
          this.setState({ loading: false });
        });
      this.setState({ loading: false });
    }
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

  updateRow = (row) => {
    var rowNode = this.gridApi.getRowNode(row.label);
    rowNode.setData(row);
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

    if (!this.props.loading || !this.props.loading)
      document.querySelector("#selectedRows").innerHTML = selectedCount ?? 0;
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
        <CasesCard
          rowData={rowData}
          state={this.state}
          gridApi={this.gridApi}
          props={this.props}
          filterSize={this.filterSize}
          setState={this.setState.bind(this)}
          translateFrom={this.translate("From")}
          translateTo={this.translate("To")}
          translate={this.translate}
          onSelectionChanged={this.onSelectionChanged}
          onColumnMoved={this.onColumnMoved}
          onGridReady={this.onGridReady}
          forwardSelectedCases={this.forwardSelectedCases}
          onPaginationChanged={this.onPaginationChanged}
          updateSearchQuery={this.updateSearchQuery}
          requestNode={this.requestNode}
        />
      </React.Fragment>
    );
  }

  /**
   * Forwarding to Inctitutions Action and helper functions
   */
  forwardSelectedCases = () => {
    console.log("You clicked to select forward cases.");
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    // alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    // console.log("The state of openModal is = " + this.state.openModal);
    this.setState(
      {
        openModal: !this.state.openModal,
        showModal: true,
        forwardCaseData: selectedData,
        modal_form: "forwardinginstitution",
      },
      () => {
        // console.log("The state of openModal is = ");
        // console.log(this.state.forwardCaseData);
      }
    );

    return selectedData;
  };
}

export default AggridTable;
