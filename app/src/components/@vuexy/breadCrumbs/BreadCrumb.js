import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Home, MoreVertical } from "react-feather";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
class BreadCrumbs extends React.Component {
  render() {
    return (
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              {this.props.breadCrumbTitle ? (
                <h2 className="content-header-title float-left mb-0">
                  {/* {} */}
                  <FormattedMessage
                    id={this.props.breadCrumbTitle}
                    values={{ ...{} }}
                  />
                </h2>
              ) : (
                ""
              )}
              <div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
                <Breadcrumb tag="ol">
                  <BreadcrumbItem tag="li">
                    <NavLink to="/">
                      <Home className="align-top" size={15} />
                    </NavLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem tag="li" className="text-primary">
                    {this.props.breadCrumbParent}
                  </BreadcrumbItem>
                  {this.props.breadCrumbParent2 ? (
                    <BreadcrumbItem tag="li" className="text-primary">
                      {this.props.breadCrumbParent2}
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  {this.props.breadCrumbParent3 ? (
                    <BreadcrumbItem tag="li" className="text-primary">
                      {this.props.breadCrumbParent3}
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  <BreadcrumbItem tag="li" active>
                    {this.props.breadCrumbActive}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>

        <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
          <div className="form-group breadcrum-right dropdown">
            <UncontrolledButtonDropdown>
              {this.props.breadCrumbItems.length > 0 ? (
                <DropdownToggle
                  color="primary"
                  size="sm"
                  className="btn-icon btn-round dropdown-toggle"
                >
                  <MoreVertical
                    size={14}
                    style={{
                      left: 0,
                    }}
                  />
                </DropdownToggle>
              ) : (
                <div />
              )}
              <DropdownMenu tag="ul" right className="rounded-0">
                {this.props.breadCrumbItems.map((item, index) => {
                  return (
                    <DropdownItem tag="li" key={index} className="rounded-0">
                      <NavLink className="text-primary w-100" to={item.link}>
                        {item.name}
                      </NavLink>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      </div>
    );
  }
}
export default BreadCrumbs;
