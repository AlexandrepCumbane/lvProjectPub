import React, { useContext } from "react";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
  Media,
  Badge,
} from "reactstrap";
import ReactCountryFlag from "react-country-flag";
import * as Icon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// import moment from "moment";

import { IntlContext } from "../../../i18n/index";

import Avatar from "../../../components/@vuexy/avatar/AvatarComponent";

import { changeRole } from "../../../redux/actions/auth/loginActions";
import { requestForm } from "../../../redux/actions/app/actions";
import { axios } from "../../../redux/api";
// import { AuthService } from "../../../redux/oidc-config/services/authservice";
import { history } from "../../../history";
import { ContextLayout } from "../../../utility/context/Layout";

const UserDropdown = (props) => {
  const context = useContext(ContextLayout);

  const logout = () => {
    context.setLogout(true);
    history.push("/");
  };
  return (
    <DropdownMenu right>
      {/* <DropdownItem tag="a" href="#">
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">Tasks</span>
      </DropdownItem> */}
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => {
          logout();
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">{props.translate("Sign Out")}</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  static contextType = IntlContext;
  translate = this.context.translate;
  state = {
    navbarSearch: false,
    suggestions: [],
    langDropdown: false,
    currentBadgeNot: 0,
    currentMessage: {},
    taskNot: 0,
    casesNot: 0,
    notificationList: [],
  };

  componentDidMount() {
    this.setState({
      notificationList: this.props.app_reducer["notification"]?.list ?? [],
    });
    this.requestData();
  }

  componentDidUpdate() {
    const { newEvent, hasNewEvent } = this.context.getEvent();

    if (this.state.currentMessage !== newEvent && hasNewEvent) {
      this.setState({
        currentMessage: newEvent,
        currentBadgeNot: this.state.currentBadgeNot + 1,
      });
      this.requestData();
    }
  }

  requestData = () => {
    this.props
      .requestForm({
        url: "notifications",
        name: "notification",
        next: false,
        has_params: false,
      })
      .then(() => {
        this.setState({
          notificationList: this.props.app_reducer["notification"]?.list ?? [],
        });
      });
  };

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown });

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  handleSubmit = (id) => {
    let form = new FormData();

    form.append("watched", true);

    const { userOauth } = this.props.state.auth.login;
    axios
      .patch(`notifications/${id}.json/`, form, {
        headers: {
          Authorization: `Bearer ${userOauth.access_token}`,
        },
      })
      .then(() => {
        this.props
          .requestForm({
            url: "notifications",
            name: "notification",
            next: false,
            has_params: false,
          })
          .then(() => {
            this.setState({
              notificationList:
                this.props.app_reducer["notification"]?.list ?? [],
            });
          });
      })
      .catch((error) => console.log(error));
  };

  getMessageText = (title) => {
    let message = "";
    switch (title) {
      case "New Task":
        message = "You have a new task assigned to you";
        break;
      case "Case Forwarding":
        message = "You received a new Case";
        break;
      case "New Case Comment":
        message = "You received a new Case Comment";
        break;

      default:
        message = "";
    }

    return this.translate(message);
  };

  getNotificationCount = () => {
    const sub = this.state.notificationList.filter((item) => !item.watched);
    return sub.length;
  };

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <IntlContext.Consumer>
          {(context) => {
            let langArr = {
              en: "EN",
              pt: "PT",
            };
            return (
              <Dropdown
                tag="li"
                className="dropdown-language nav-item"
                isOpen={this.state.langDropdown}
                toggle={this.handleLangDropdown}
                data-tour="language"
              >
                <DropdownToggle tag="a" className="nav-link">
                  <ReactCountryFlag
                    className="country-flag"
                    countryCode={
                      context.state.locale === "en"
                        ? "us"
                        : context.state.locale
                    }
                    svg
                  />
                  <span className="d-sm-inline-block d-none text-capitalize align-middle ml-50">
                    {langArr[context.state.locale]}
                  </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag="a"
                    onClick={(e) => context.switchLanguage("en")}
                  >
                    <ReactCountryFlag
                      className="country-flag"
                      countryCode="us"
                      svg
                    />
                    <span className="ml-1">{this.translate("EN")}</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={(e) => context.switchLanguage("pt")}
                  >
                    <ReactCountryFlag
                      className="country-flag"
                      countryCode="pt"
                      svg
                    />
                    <span className="ml-1">{this.translate("PT")}</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            );
          }}
        </IntlContext.Consumer>
        <UncontrolledDropdown
          className="dropdown-notification nav-item rounded-0"
          tag="li"
        >
          <DropdownToggle
            tag="a"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownNotification}
            className="nav-link nav-link-label rounded-0"
          >
            <Icon.Bell size={21} />
            <Badge pill color="primary" className="badge-up">
              {" "}
              {`${this.getNotificationCount()}`}
            </Badge>
          </DropdownToggle>
          <DropdownMenu
            tag="ul"
            right
            className="dropdown-menu-media rounded-0"
          >
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">
                  {`${this.getNotificationCount()} ${this.translate("New")}`}
                </h3>
                <span className="notification-title">
                  {this.translate("App Notifications")}
                </span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false,
              }}
            >
              {this.state.notificationList.map((item) => (
                <div
                  key={item?.id}
                  className="d-flex justify-content-between"
                  onClick={() => this.handleSubmit(item.id)}
                >
                  <Media className="d-flex align-items-start">
                    {item.watched ? (
                      <Media left href="#">
                        <Icon.Check
                          className="font-medium-5 success"
                          size={21}
                        />
                      </Media>
                    ) : (
                      <Media left href="#">
                        <Icon.Circle
                          className="font-medium-5 primary"
                          style={{ cursor: "pointer" }}
                          size={21}
                        />
                      </Media>
                    )}
                    <Media body>
                      <Media
                        heading
                        className={`${
                          item.watched ? "success" : "primary"
                        } media-heading`}
                        tag="h6"
                      >
                        {this.translate(item.label)}
                      </Media>
                      <small className="notification-text">
                        {`${this.getMessageText(item.title)}`}
                      </small>
                      <br />
                      <br />
                      <strong className="mt-1 notification-text">
                        <u>{`Record No.  ${item.model_id}`}</u>
                      </strong>
                    </Media>
                    <small>
                      <time
                        className="media-meta"
                        dateTime={item.datetime_created}
                      >
                        {item.datetime_created}
                      </time>
                    </small>
                  </Media>
                </div>
              ))}
            </PerfectScrollbar>
            {/* <li className="dropdown-menu-footer">
              <DropdownItem tag="a" className="p-1 text-center">
                {" "}
                Read all notifications{" "}
              </DropdownItem>
            </li> */}
          </DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">{this.translate("Available")}</span>
            </div>
            <span data-tour="user">
              {/* <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              /> */}

              <Avatar color="primary" content={this.props.userName} initials />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} translate={this.translate} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    app_reducer: state.app.app_reducer,
  };
}

export default connect(mapStateToProps, { changeRole, requestForm })(
  NavbarUser
);

// export default NavbarUser;
