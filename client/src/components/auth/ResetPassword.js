/* eslint-disable */
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Input, Container, Button, Alert, Spinner } from "reactstrap";
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
        console.log(response.data.message);
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
        <Container>
          <div>
            <Alert color="danger">
              Problem resetting password. Send another reset link.
            </Alert>
            <p>{error}</p>
            {/* <LinkButtons buttonText="Go Home" link="/" />
            <LinkButtons buttonText="Forgot Password?" link="/forgotPassword" /> */}

            <Link to="/forgotPassword">
              <div>Forgot Password</div>
            </Link>

            <Link to="/">
              <div style={{ marginTop: "10px" }}>Go home</div>
            </Link>
          </div>
        </Container>
      );
    }
    if (isLoading) {
      const centered = {
        position: "fixed" /* or absolute */,
        top: "50%",
        left: "50%"
      };
      return (
        <Container>
          <Spinner animation="border" style={centered} />
        </Container>
      );
    }
    return (
      <Container>
        {updated && (
          <div>
            <Alert>
              Your password has been successfully reset, please try logging in
              again.
            </Alert>
            {/* <Link to="/login">
              <Button>Login</Button>
            </Link> */}
          </div>
        )}
        <form className="password-form" onSubmit={this.updatePassword}>
          <Input
            id="password"
            onChange={this.handleChange("password")}
            value={password}
            type="password"
            disabled={updated}
          />
          <Button
            type="submit"
            block
            disabled={updated}
            color="dark"
            style={{ marginTop: "20px" }}
          >
            Update Password
          </Button>
        </form>

        <Link to="/login">Go to Login page</Link>
      </Container>
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
