import React from "react";
import { connect } from "react-redux";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as Icon from "react-feather";
import classnames from "classnames";
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent";
import { history } from "../../../history";

import { axios } from "../../../redux/api";
import { changeRole } from "../../../redux/actions/auth/loginActions";

const UserDropdown = (props) => {
  return (
    <DropdownMenu right>
      <DropdownItem tag="a" href="#">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">My Inbox</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">Tasks</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.MessageSquare size={14} className="mr-50" />
        <span className="align-middle">Chats</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Heart size={14} className="mr-50" />
        <span className="align-middle">WishList</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => {
          props.changeRole("Not-auth");
          axios
            .get("logout.json")
            .then(() => {
              history.push("/pages/login");
            })
            .catch((err) => console.log(err));
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
  };

  componentDidMount() {
    // axios.get("/api/main-search/data").then(({ data }) => {
    //   this.setState({ suggestions: data.searchResult })
    // })
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">Available</span>
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
