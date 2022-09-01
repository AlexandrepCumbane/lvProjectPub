import React from "react";
import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div className="mb-1">
      <Spinner color="warning" type="grow" size="sm" />
      <strong className="ml-1">Loading...</strong>
    </div>
  );
}

export default Loading;
