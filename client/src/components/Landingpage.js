import React from "react";
import { connect } from "react-redux";
import { Alert, Container } from "reactstrap";

const Landingpage = props => {
  console.log(props);
  const { isAuthenticated } = props.auth;
  return (
    <div>
      <Container>
        {props.location.state && !isAuthenticated ? (
          <Alert color="danger">{props.location.state.msg}</Alert>
        ) : null}
        <h3>Landing Page</h3>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landingpage);
