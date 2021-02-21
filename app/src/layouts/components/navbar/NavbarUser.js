import React, { useContext } from "react";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
} from "reactstrap";
import ReactCountryFlag from "react-country-flag";
import * as Icon from "react-feather";

import { IntlContext } from "../../../i18n/index";

import { changeRole } from "../../../redux/actions/auth/loginActions";
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
          // props.changeRole("Not-auth");
          // new AuthService().logout();
          logout();
          // history.push("/logout");
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
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
  };

  componentDidMount() {
    // axios.get("/api/main-search/data").then(({ data }) => {
    //   this.setState({ suggestions: data.searchResult })
    // })
  }
  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown });

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <IntlContext.Consumer>
          {(context) => {
            let langArr = {
              en: "English",
              pt: "Portuguese",
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
                    <span className="ml-1">English</span>
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
                    <span className="ml-1">Portuguese</span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            );
          }}
        </IntlContext.Consumer>
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">{this.translate("Available")}</span>
            </div>
            {/* <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span> */}
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps, { changeRole })(NavbarUser);

// export default NavbarUser;
