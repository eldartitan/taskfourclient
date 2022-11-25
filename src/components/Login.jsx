import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin, setError } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { error } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(postLogin({ email: loginEmail, password: loginPassword }));
  };
  const navRegister = () => {
    dispatch(setError())
    navigate("/register");
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Form className="w-25 flex ">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="primary"
            type="button"
            onClick={navRegister}
          >
            Register
          </Button>
          <Button variant="primary" className="ms-auto" onClick={handleClick}>
            Submit
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}

export default Login;