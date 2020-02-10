/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const Register = props => {
  // state = {
  //   name: "",
  //   email: "",
  //   password: "",
  //   msg: null
  // };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { error, isAuthenticated } = props;

  // componentDidUpdate(prevProps) {
  //   const { error, isAuthenticated } = this.props;
  //   if (error !== prevProps.error) {
  //     // Check for register error
  //     if (error.id === "REGISTER_FAIL") {
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
      if (error.id === "REGISTER_FAIL") {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }

    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [error, isAuthenticated]);

  // const onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  const onSubmit = e => {
    e.preventDefault();

    // const { name, email, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    props.register(newUser);
  };
  return (
    <div>
      <Container>
        {msg ? <Alert color="danger">{msg}</Alert> : null}
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="mb-3"
              onChange={e => setName(e.target.value)}
            />

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
              Register
            </Button>
          </FormGroup>
        </Form>
        <Link to="/login">Already a member?</Link>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
