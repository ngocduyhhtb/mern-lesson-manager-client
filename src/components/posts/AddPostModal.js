import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //Contexts
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  //Local State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url } = newPost;
  const onChangePostForm = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    setShowAddPostModal(false);
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setShowAddPostModal(false);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  return (
    <Modal show={showAddPostModal} animation={false} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>What to you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              require="true"
              aria-describedby="title-help"
              value={title}
              onChange={onChangePostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangePostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube tutorial URL"
              name="url"
              value={url}
              onChange={onChangePostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            POST
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
