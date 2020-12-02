import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input className="form-control" placeholder="login" />
          <br />
          <input
            type="password"
            className="form-control"
            placeholder="password"
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Home;
