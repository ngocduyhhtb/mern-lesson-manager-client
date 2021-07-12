import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { Button, Card, Spinner, Row, Col } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Dashboard = () => {
  //Context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { post, posts, postLoading },
    getPost,
    setShowAddPostModal,
    showToast: { show, message },
    setShowToast,
  } = useContext(PostContext);
  //Get all post
  useEffect(() => {
    getPost();
  });
  let body = null;
  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Lesson Manager App</Card.Title>
            <Card.Text>
              Click the button bellow to track your first lesson
            </Card.Text>
            <Button variant="primary" onClick={() => setShowAddPostModal(true)}>
              Start Learn
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post, index) => {
            return (
              <Col key={index} className="my-2">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>
        {/*Open Add Post modal*/}
        <Button
          className="btn-floating"
          onClick={setShowAddPostModal.bind(this, true)}
        >
          <img src={addIcon} alt="add-post" width="60" height="60" />
        </Button>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={show}
        autoHideDuration={2000}
        onClose={() => setShowToast(false)}
      >
        <Alert onClose={() => setShowToast(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
