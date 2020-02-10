import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const Login = props => {
  // state = {
  //   modal: false,
  //   email: "",
  //   password: "",
  //   msg: null
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { error, isAuthenticated } = props;

  // componentDidUpdate(prevProps) {
  //   const { error, isAuthenticated } = this.props;
  //   if (error !== prevProps.error) {
  //     // Check for register error
  //     if (error.id === "LOGIN_FAIL") {
  //       this.setState({ msg: error.msg.msg });
  //     } else {
  //       this.setState({ msg: null });
  //     }
  //   }

  //   if (isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  // }

  useEffect(() => {
    if (error) {
      if (error.id === "LOGIN_FAIL") {
        console.log(error);
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  // const onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  const onSubmit = e => {
    e.preventDefault();

    // Create user object
    const user = {
      email,
      password
    };

    // Attempt to login
    props.login(user);
  };

  return (
    <div>
      <Container>
        {msg ? <Alert color="danger">{msg}</Alert> : null}
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="mb-3"
              onChange={e => setEmail(e.target.value)}
            />

            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="mb-3"
              onChange={e => setPassword(e.target.value)}
            />
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Login
            </Button>
          </FormGroup>
        </Form>
        <Link to="/register">Not a member?</Link>
        <div style={{ marginTop: "20px" }}>
          <Link to="/forgotPassword">Forgot Password </Link>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
