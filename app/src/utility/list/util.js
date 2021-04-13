import React from "react";
import { Octagon } from "react-feather";
import { Badge } from "reactstrap";

export const renderStatusLabel = (props, data, label) => {
  let color = "white";

  switch (data[`${props.path}_status_label`]) {
    case "Not started":
      color = "danger";
      break;
    case "In Progress":
      color = "primary";
      break;
    case "Completed":
      color = "success";
      break;

    case "Closed":
      color = "success";
      break;
    default:
      color = "white";
      break;
  }

  return (
    <Badge color={color} className="mr-1 mb-1 badge-square">
      <Octagon size={12} />
      <span>{label}</span>
    </Badge>
  );
};
