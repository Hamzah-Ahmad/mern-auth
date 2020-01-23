import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const loading = {
  margin: "1em",
  fontSize: "24px"
};

const LinkButtons = ({ buttonText, link }) => (
  <Fragment>
    <Link to={link}>
      <button>{buttonText}</button>
    </Link>
  </Fragment>
);

const SubmitButtons = ({ buttonText }) => (
  <Fragment>
    <button type="submit" variant="contained">
      {buttonText}
    </button>
  </Fragment>
);

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      updated: false,
      isLoading: true,
      error: false
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { token }
      }
    } = this.props;
    try {
      const response = await axios.get("/api/auth/reset", {
        params: {
          resetPasswordToken: token
        }
      });
      console.log(response);
      if (response.data.message === "password reset link a-ok") {
        console.log(response);
        this.setState({
          email: response.data.email,
          updated: false,
          isLoading: false,
          error: false
        });
      }
    } catch (error) {
      console.log(error.response);
      this.setState({
        updated: false,
        isLoading: false,
        error: true
      });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updatePassword = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const {
      match: {
        params: { token }
      }
    } = this.props;
    try {
      const response = await axios.put("/api/auth/updatePasswordViaEmail", {
        email,
        password,
        resetPasswordToken: token
      });
      console.log(response.data);
      if (response.data.message === "password updated") {
        this.setState({
          updated: true,
          error: false
        });
      } else {
        this.setState({
          updated: false,
          error: true
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Send another reset link.</h4>
            <p>{error}</p>
            <LinkButtons buttonText="Go Home" link="/" />
            <LinkButtons buttonText="Forgot Password?" link="/forgotPassword" />
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        <form className="password-form" onSubmit={this.updatePassword}>
          <input
            id="password"
            onChange={this.handleChange("password")}
            value={password}
            type="password"
          />
          <SubmitButtons buttonText="Update Password" />
        </form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <LinkButtons buttonText="Login" link="/login" />
          </div>
        )}
        <LinkButtons buttonText="Go Home" link="/" />
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  })
};
