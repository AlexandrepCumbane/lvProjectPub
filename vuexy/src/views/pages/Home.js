
import React from "react";
import {} from "reactstrap";

class Home extends React.Component {
  state = {
    username: "",
    password: "",
    csrf: "",
  };
  render() {
    return (
      <div>
        <form>
          <input
            className="form-control"
            placeholder="login"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Home;
