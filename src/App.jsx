import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { deleteRemove, getUsers, postBlock, postLogout, postRemove } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, error, status } = useSelector((state) => state.user);
  const [check, setCheck] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) navigate("/login");
  });

  const handleClick = () => {
    dispatch(postLogout());
    navigate("/login");
  };
  const handleChange = (e, id) => {
    if (e.target.checked) setCheck([...check, id]);
    else setCheck(check.filter((p) => p !== id));
  };
  const allChange = (e) => {
    if (!e.target.checked) {
      setCheck([]);
    } else {
      setCheck(users.map((m) => m._id));
    }
  };
  console.log(check);

  if (!error)
    return (
      <div className="App">
        <Container>
          <Stack direction="horizontal" gap={3} className="mb-3 mt-3">
            <ButtonGroup aria-label="Basic example">
              <Button
                onClick={() => {
                  dispatch(postBlock({ users_id: check, block: true }));
                  dispatch(getUsers());
                  setCheck([]);
                }}
              >
                Block
              </Button>
              <Button
                onClick={() => {
                  dispatch(postBlock({ users_id: check, block: false }));
                  dispatch(getUsers());
                  setCheck([]);
                }}
              >
                Unblock
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteRemove({ users_id: check }));
                  dispatch(getUsers());
                  setCheck([]);
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
            <Button onClick={handleClick} className="ms-auto">
              Logout
            </Button>
          </Stack>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={(e) => allChange(e)} />
                </th>
                <th>Id</th>
                <th>Name</th>
                <th>email</th>
                <th>blocked</th>
                <th>Last log</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {users !== null &&
                users?.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => handleChange(e, user._id)}
                        value={check}
                        checked={check.includes(user._id)}
                      />
                    </td>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.blocked ? "yes" : "no"}</td>
                    <td>{user.lastLogged || "just created"}</td>
                    <td>{user.createdAt}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
}
export default App;