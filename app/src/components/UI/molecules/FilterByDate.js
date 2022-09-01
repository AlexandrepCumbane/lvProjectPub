import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { X } from "react-feather";

import { Search } from "react-feather";

export default function FilterByDate({
  props,
  state,
  setState,
  onChangeStart,
  onChangeEnd,
  translateFrom,
  translateTo,
  handleSubmit,
  handleCancel,
}) {
  return (
    <div>
      {props.tableType === "customuser" ||
      state.filters ||
      (props.userRole === "operator" && props.tableType === "lvform") ? (
        <></>
      ) : (
        <div className="d-flex flex-row">
          <div>
            <InputGroup className="rounded-0 mb-1">
              <InputGroupAddon
                className="rounded-0 text-primary"
                color="primary"
                addonType="prepend"
              >
                <InputGroupText className={`rounded-0`}>
                  {translateFrom}
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={`rounded-0 start-date`}
                value={state.start}
                onChange={onChangeStart}
                type="date"
              />
            </InputGroup>
          </div>

          <div>
            <InputGroup className="rounded-0 mb-1">
              <InputGroupAddon className="rounded-0" addonType="prepend">
                <InputGroupText className="rounded-0">
                  {translateTo}
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className="rounded-0 end-date"
                value={state.end}
                onChange={onChangeEnd}
                type="date"
              />
            </InputGroup>
          </div>

          <div>
            <Button.Ripple
              className="btn-icon rounded-0 py-1"
              color="primary"
              onClick={handleSubmit}
              // onClick={() => {
              //   const filteredData = props.data.filter((item) => {
              //     return (
              //       props.data[
              //         props.data.indexOf(item)
              //       ].datetime_created.substring(0, 10) >= state.start &&
              //       props.data[
              //         props.data.indexOf(item)
              //       ].datetime_created.substring(0, 10) <= state.end
              //     );
              //   });

              //   setState({ rowData: filteredData });
              // }}
            >
              <Search size={18} color="white" />
            </Button.Ripple>
            <Button.Ripple
              className="btn-icon rounded-0 py-1"
              color="danger"
              onClick={handleCancel}
            >
              <X size={18} color="white" />
            </Button.Ripple>
          </div>
        </div>
      )}
    </div>
  );
}
