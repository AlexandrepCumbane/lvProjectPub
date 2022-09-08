import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import {
  ChevronDown,
  Filter,
  RefreshCw,
  Columns,
  DownloadCloud,
  ArrowRightCircle,
} from "react-feather";
import { ContextLayout } from "../../../utility/context/Layout";
import { Button, UncontrolledTooltip } from "reactstrap";

import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  Spinner,
} from "reactstrap";

import Modal from "../../../views/app/modal/forwardCaseModal";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import "../../../assets/scss/pages/data-list.scss";
import { getFilterComponent } from "./filterComponent";

import FilterByDate from "../../UI/molecules/FilterByDate";
import DropDownMenu from "../../UI/atoms/DropDownMenu";
import SearchFilter from "../../UI/atoms/SearchFilter";
import Loading from "../../UI/atoms/Loading";

function CasesCard({
  rowData,
  forwardSelectedCases,

  state,

  setState,

  gridApi,
  props,
  filterSize,

  translateFrom,
  translateTo,
  translate,

  updateSearchQuery,
  requestNode,

  onSelectionChanged,
  onColumnMoved,
  onGridReady,
  onPaginationChanged,
}) {
  return (
    <Card className="overflow-hidden agGrid-card rounded-0">
      <CardBody className="py-0">
        {rowData === null ? null : (
          <div className="ag-theme-material w-100 my-2 ag-grid-table">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-row align-items-center">
                <div className="mb-1 mr-2">
                  <UncontrolledDropdown className="p-1 ag-dropdown">
                    <DropdownToggle tag="div">
                      {gridApi
                        ? state.currenPageSize
                        : "" * state.getPageSize - (state.getPageSize - 1)}{" "}
                      -{" "}
                      {props.data.length -
                        state.currenPageSize * state.getPageSize >
                      0
                        ? state.currenPageSize * state.getPageSize
                        : props.data.length}{" "}
                      of {props.data.length}
                      <ChevronDown className="ml-50" size={15} />
                    </DropdownToggle>

                    <DropDownMenu
                      side="right"
                      items={[20, 50, 100, 150, 250, 500, 1000]}
                      filterSize={filterSize}
                    />
                  </UncontrolledDropdown>
                </div>
                {props.loading ? (
                  <Loading />
                ) : (
                  <div className="mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown-no-border">
                      <DropdownToggle tag="div">
                        <strong>
                          <span id="selectedRows">0</span>
                        </strong>
                      </DropdownToggle>
                    </UncontrolledDropdown>
                  </div>
                )}
              </div>

              <FilterByDate
                props={props}
                state={state}
                setState={setState}
                translateFrom={translateFrom}
                translateTo={translateTo}
                onChangeStart={(e) => setState({ start: e.target.value })}
                onChangeEnd={(e) => setState({ end: e.target.value })}
                handleSubmit={() => {
                  if (state.end !== "" && state.start !== "") {
                    const startDate = (x) => {
                      const date = new Date(x);

                      const days = date.getDate();
                      const month = date.getMonth() + 1;
                      const year = date.getFullYear();

                      return days + month * 30 + year * 12 * 30;
                    };
                    const endDate = (x) => {
                      const date = new Date(x);

                      const days = date.getDate();
                      const month = date.getMonth() + 1;
                      const year = date.getFullYear();

                      return days + month * 30 + year * 12 * 30;
                    };

                    const timeLength =
                      Math.abs(endDate(state.end) - startDate(state.start)) /
                      30;
                    props.requestParams(
                      `${state.start} 00:00:00`,
                      `${state.end} 23:59:59`,
                      timeLength
                    );
                  }
                }}
                handleCancel={() => {
                  setState({ end: "", start: "" });
                  props.requestMore(false);
                }}
              />

              <div className="d-flex flex-row justify-content-between mb-1">
                <SearchFilter
                  placeholder={`${translate("Search")}...`}
                  className="rounded-0"
                  onChange={(e) => updateSearchQuery(e.target.value)}
                  value={state.value}
                  onBlur={(e) => requestNode(e.target.value)}
                />

                <div>
                  {props.userRole === "manager" ||
                  props.userRole === "focalpoint" ||
                  props.userRole === "partner" ? (
                    <>
                      <Button.Ripple
                        id="download"
                        className="btn-icon"
                        color="flat-primary rounded-0"
                        onClick={() =>
                          gridApi.exportDataAsCsv({
                            onlySelected: true,
                            allColumns: true,
                          })
                        }
                      >
                        <DownloadCloud size={16} />
                      </Button.Ripple>
                      <UncontrolledTooltip placement="top" target="download">
                        {translate("Export Selected")}
                      </UncontrolledTooltip>
                      {props.tableType === "lvform" && (
                        <Button.Ripple
                          id="forward"
                          className="btn-icon"
                          color="flat-primary rounded-0"
                          onClick={() => forwardSelectedCases()}
                        >
                          <ArrowRightCircle size={16} />
                        </Button.Ripple>
                      )}
                      {props.tableType === "lvform" && (
                        <UncontrolledTooltip placement="top" target="forward">
                          {translate("Referral to")}
                        </UncontrolledTooltip>
                      )}
                      {state.openModal ? (
                        <Modal
                          title={translate(`Send to Focal Point`)}
                          page="forwardcasetofocalpoint"
                          label={translate("Send")}
                          lvform_id={state.forwardCaseData["id"]}
                          lvform={state.forwardCaseData}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  <Button.Ripple
                    id="date-filter"
                    onClick={() => {
                      setState({
                        filters: !state.filters,
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
                    onClick={() => props.requestMore(false)}
                  >
                    <RefreshCw size={16} />
                  </Button.Ripple>
                  <Button.Ripple
                    id="unset-column"
                    onClick={() => {
                      setState({
                        columnDefs: props.columnDefs,
                        showTable: false,
                      });

                      gridApi.setColumnDefs(props.columnDefs);
                      localStorage.removeItem(props.tableType);

                      window.location.reload(1);
                    }}
                    className="btn-icon"
                    color="flat-primary rounded-0"
                  >
                    <Columns size={16} />
                  </Button.Ripple>

                  <UncontrolledTooltip placement="top" target="date-filter">
                    {translate("Date range filters")}
                  </UncontrolledTooltip>
                  <UncontrolledTooltip placement="top" target="refresh-list">
                    {translate("Update list")}
                  </UncontrolledTooltip>
                  <UncontrolledTooltip placement="top" target="unset-column">
                    {translate("Restore Columns")}
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>

            {state.showTable ? (
              <ContextLayout.Consumer>
                {(context) => (
                  <AgGridReact
                    rowSelection="multiple"
                    defaultColDef={state.columnDefs}
                    columnDefs={state.columnDefs}
                    rowData={rowData}
                    onGridReady={(params) =>
                      onGridReady(props.tableType, params)
                    }
                    colResizeDefault={"shift"}
                    animateRows={true}
                    floatingFilter={true}
                    pagination={true}
                    paginationPageSize={state.paginationPageSize}
                    pivotPanelShow="always"
                    translate={translate}
                    enableRtl={context.state.direction === "rtl"}
                    onColumnMoved={(params) =>
                      onColumnMoved(props.tableType, params)
                    }
                    // modules={state.modules}
                    getRowNodeId={state.getRowNodeId}
                    onPaginationChanged={() => onPaginationChanged()}
                    onSelectionChanged={onSelectionChanged.bind(this)}
                    components={{
                      customFilter: getFilterComponent(),
                    }}
                    dropdowns={props.dropdowns}
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
  );
}

export default CasesCard;
