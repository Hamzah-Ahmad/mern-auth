/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false,
      loading: false,
      disableInputs: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  sendEmail = async e => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true
      });
    } else {
      try {
        this.setState({ loading: true });
        const response = await axios.post("/api/auth/forgotPassword", {
          email
        });
        //console.log(response.data);
        if (response.data === "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false,
            loading: false,
            disableInputs: true
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === "email not in db") {
          this.setState({
            showError: true,
            messageFromServer: "",
            showNullError: false,
            loading: false
          });
        } else {
          console.log(error);
          //this.props.history.push("/");
        }
      }
    }
  };

  render() {
    const {
      email,
      messageFromServer,
      showNullError,
      showError,
      loading,
      disableInputs
    } = this.state;

    return (
      <div>
        {showNullError && (
          <div>
            <small color="danger">The email address cannot be null.</small>
          </div>
        )}
        {showError && (
          <div>
            <small color="danger">
              That email address isn't recognized. Pease try again or register
              for a new account.
            </small>
            {/* <LinkButtons
              buttonText="Register"
              buttonStyle={registerButton}
              link="/register"
            /> */}
          </div>
        )}
        {/* {loading && <div>Loading...</div>} */}
        {messageFromServer === "recovery email sent" && (
          <div>
            <alert>Password Reset Email Successfully Sent!</alert>
          </div>
        )}

        <form className="profile-form" onSubmit={this.sendEmail}>
          <input
            id="email"
            value={email}
            onChange={this.handleChange("email")}
            placeholder="Email Address"
            disabled={disableInputs}
          />
          <button
            color="dark"
            block
            style={{ marginTop: "20px", marginBottom: "30px" }}
            disabled={loading}
            disabled={disableInputs}
          >
            {loading ? <span>Loading...</span> : <span>Send Reset Email</span>}
          </button>
        </form>

        <Link to="/login">
          <span>Go to Login page</span>
        </Link>
        {/* <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" /> */}
      </div>
    );
  }
}

export default ForgotPassword;
