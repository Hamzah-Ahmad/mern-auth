import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input, Button, Container, Alert } from "reactstrap";
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
        <Container>
          {showNullError && (
            <div>
              <Alert color="danger">The email address cannot be null.</Alert>
            </div>
          )}
          {showError && (
            <div>
              <Alert color="danger">
                That email address isn't recognized. Please try again or
                register for a new account.
              </Alert>
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
              <Alert>Password Reset Email Successfully Sent!</Alert>
            </div>
          )}

          <form className="profile-form" onSubmit={this.sendEmail}>
            <Input
              id="email"
              value={email}
              onChange={this.handleChange("email")}
              placeholder="Email Address"
              disabled={disableInputs}
            />
            <Button
              color="dark"
              block
              style={{ marginTop: "20px", marginBottom: "30px" }}
              disabled={loading}
              disabled={disableInputs}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span>Send Reset Email</span>
              )}
            </Button>
          </form>

          <Link to="/login">
            <span>Go to Login page</span>
          </Link>
          {/* <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" /> */}
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
