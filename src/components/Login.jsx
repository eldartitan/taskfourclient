import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.user);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleClick = () => {
    dispatch(postLogin({ email: loginEmail, password: loginPassword }));
  };

  useEffect(() => {
    if (error === null && status) navigate("/")
  })

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
        <Stack direction="horizontal" gap={2}>
          <Button
            variant="primary"
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
          <Button
            variant="primary"
            className="ms-auto"
            onClick={handleClick}
          >
            Submit
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}

export default Login;
