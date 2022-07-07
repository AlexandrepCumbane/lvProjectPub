import React from "react";
import { ArrowUp, Circle, Octagon } from "react-feather";
import { Badge } from "reactstrap";

/**
 * returns highlighted status label based on status match color
 *
 * @param {*} props
 * @param {*} data
 * @param {*} label
 * @returns
 */
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
    // break;
  }

  return (
    <Badge color={color} className="mr-1 mb-1 badge-square">
      <Octagon size={12} />
      <span>{label}</span>
    </Badge>
  );
};

/**
 * returns priority icon rendered based on label color
 *
 * @param {*} props
 * @param {*} data
 * @returns
 */
export const renderPriority = (props, data) => {
  let color = "white";
  let model = props.path === "lvform" ? "case" : props.path;

  let status = data[`${model}_priority_label`];

  if (data.callcase) {
    status = data["callcase"][`case_priority_label`];
  }

  if (props.path === "customuser") {
    switch (data["groups_label"][0]) {
      case "partner":
        color = "danger";
        break;
      case "focalpoint":
        color = "secondary";
        break;
      case "operator":
        color = "warning";
        break;
      case "manager":
        color = "info";
        break;
      default:
        color = "white";
      // break;
    }
  } else {
    switch (status) {
      case "High":
        color = "danger";
        break;
      case "Medium":
        color = "warning";
        break;
      case "Low":
        color = "info";
        break;
      default:
        color = "white";
      // break;
    }
  }

  return (
    <ArrowUp className={`text-${color} text-center mb-1 mt-1`} size={14} />
  );
};

/**
 * returns a component with priority icon, status icons and given label
 *
 * @param {*} props
 * @param {*} data
 * @param {*} label
 * @returns
 */
export const renderStatus = (props, data, label) => {
  let color = "white";

  let status = data[`${props.path}_status_label`];

  if (props.path === "customuser") {
    if (data.is_active) {
      color = "success";
    } else {
      color = "danger";
    }
  } else {
    if (data.callcase) {
      console.log(data.callcase)
      if (data["callcase"].is_closed) {
        color = "success";
      } else {
        color = "danger";
      }
    } else {
      if (props.path === "lvform") {
        if (data.is_closed) {
          color = "success";
        } else {
          color = "danger";
        }
      } else {
        if (props.path === "article") {
          const today = new Date();
          const current = new Date(`${data.expiration_date} 23:59:59`);

          if (
            data.published &&
            (today <= current || data.expiration_date === null)
          ) {
            color = "success";
          } else {
            color = "danger";
          }
        } else
          switch (status) {
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
            // break;
          }
      }
    }
  }
  return (
    <div
      style={{
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>
        {renderPriority(props, data)}
        <Circle
          className={`text-${color} text-center bg-${color} rounded m-1`}
          size={12}
        />
        <Circle
          className={`text-${color} text-center bg-${color} rounded m-1`}
          size={12}
        />
        {console.log(`${color}`)}
        {` ${label}`}
      </span>
    </div>
  );
};

export const getFieldWith = (field_name) => {
  let width = 150;
  switch (field_name) {
    case "case_number":
      width = 210;
      break;

    case "lvform_label":
      width = 210;
      break;

    case "cluster_sector":
      width = 310;
      break;

    case "cluster_agency":
      width = 210;
      break;

    case "cluster_region":
      width = 210;
      break;

    case "name":
      width = 310;
      break;

    case "title":
      width = 310;
      break;

    case "lvform":
      width = 210;
      break;

    case "email":
      width = 310;
      break;

    case "is_active":
      width = 240;
      break;

    case "first_name":
      width = 250;
      break;

    case "last_name":
      width = 250;
      break;

    // case "datetime_created":
    //   width = 180;
    //   break;

    case "province":
      width = 180;
      break;

    case "distrito":
      width = 200;
      break;

    case "localidade":
      width = 200;
      break;

    case "case_priority":
      width = 150;
      break;
    case "category":
      width = 370;
      break;
    case "subcategory":
      width = 350;
      break;
    case "casetipology":
      width = 370;
      break;
    case "subcategory_issue":
        width = 370;
        break;
    
    default:
      width = 200;
    // break;
  }

  return width;
};
