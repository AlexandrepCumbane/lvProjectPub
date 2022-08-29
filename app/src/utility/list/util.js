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
  console.log(model);
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
 * returns feedback case icon rendered based on icon color
 *
 * @param {*} props
 * @param {*} data
 * @returns
 */
 export const commentCase = (props, data) => {
  let color = "white";
  if (props.path === "lvform") {
    if (Object.keys(data.casecomment_set).length!==0) {
      color = "success";
    } else {
      color = "danger";
    }
  }
  return (
    <Octagon className={`text-${color} text-center mb-1 mt-1`} size={14} />
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
        {commentCase(props, data)}
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
  let width = 100;
  switch (field_name) {
    case "case_number": 
      width = 230;
      break;

    case "lvform_label":
      width = 100;
      break;

    case "cluster_sector":
      width = 300;
      break;

    case "cluster_agency":
      width = 300;
      break;

    case "cluster_region":
      width = 300;
      break;

    case "name":
      width = 300;
      break;

    case "age":
      width = 120;
      break;


    case "title":
      width = 300;
      break;

    case "lvform":
      width = 150;
      break;

    case "response":
      width = 120;
      break;

    case "community":
      width = 150;
      break;

    case "gender":
      width = 120;
      break;

    case "email":
      width = 350;
      break;

    case "is_active":
      width = 100;
      break;

    case "first_name":
      width = 200;
      break;

    case "last_name":
      width = 200;
      break;

    case "datetime_created":
      width = 180;
      break;

    case "provincia":
      width = 120;
      break;

    case "distrito":
      width = 120;
      break;

    case "localidade":
      width = 100;
      break;

    case "case_priority":
      width = 100;
      break;
    case "category":
      width = 200;
      break;
    case "subcategory":
      width = 150;
      break;
    case "casetipology":
      width = 150;
      break;
    case "subcategory_issue":
        width = 150;
        break;
    
    default:
      width = 180;
    // break;
  }

  return width;
};
