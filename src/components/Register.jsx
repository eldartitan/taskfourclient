import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister, setError } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/esm/Stack";
import Alert from "react-bootstrap/Alert";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const handleClick = () => {
    console.log(registerEmail, registerPassword, registerUsername);
    dispatch(
      postRegister({
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
      })
    );
  };

  const navLogin = () => {
    dispatch(setError())
    navigate("/login")
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Form className="w-25 flex ">
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" type="button" onClick={navLogin}>
            Login
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleClick}
            className="ms-auto"
          >
            Submit
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}

export default Register;
