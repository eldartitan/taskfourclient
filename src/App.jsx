import React, { useEffect } from "react";
import "./App.css";
import {
  deleteRemove,
  getUsers,
  postBlock,
  postLogout,
  setCheck,
} from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function App() {
  const dispatch = useDispatch();
  const { users, error, logId, check } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(postLogout());
  };
  const handleChange = (e, id) => {
    if (e.target.checked) dispatch(setCheck([...check, id]));
    else dispatch(setCheck(check.filter((p) => p !== id)));
  };
  const allChange = (e) => {
    if (!e.target.checked) dispatch(setCheck([]));
    else dispatch(setCheck(users.map((m) => m._id)));
  };

  return (
    <>
      {!error ? (
        <div className="App">
          <Container>
            <Stack direction="horizontal" gap={3} className="mb-3 mt-3">
              <ButtonGroup aria-label="Basic example">
                <Button
                  onClick={() => {
                    dispatch(postBlock({ users_id: check, block: true }));
                    if (check.includes(logId)) handleClick();
                  }}
                >
                  Block
                </Button>
                <Button
                  onClick={() => {
                    dispatch(postBlock({ users_id: check, block: false }));
                  }}
                >
                  Unblock
                </Button>
                <Button
                  onClick={() => {
                    dispatch(deleteRemove({ users_id: check }));
                    if (check.includes(logId)) handleClick();
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
                  <th>Status</th>
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
                      <td>{user.blocked ? "blocked" : "active"}</td>
                      <td>
                        {user.lastLogged
                          ?.replace("T", " ")
                          .slice(0, user.createdAt.length - 5) ||
                          "just created"}
                      </td>
                      <td>
                        {user.createdAt
                          ?.replace("T", " ")
                          .slice(0, user.createdAt.length - 5)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        </div>
      ) : (
        <h1>Error! {error}</h1>
      )}
    </>
  );
}
export default App;
