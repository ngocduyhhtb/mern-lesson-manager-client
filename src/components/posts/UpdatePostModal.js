import React, {useContext, useEffect, useState} from 'react';
import {Modal, Button, Form} from "react-bootstrap";
import {PostContext} from "../../contexts/PostContext";

const UpdatePostModal = () => {
    //Contexts
    const {
        postState: {post},
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast
    } = useContext(PostContext);
    //Local State
    const [updatedPost, setUpdatedPost] = useState(post);
    //Effect
    useEffect(() => setUpdatedPost(post), [post]);
    const {title, description, url, status} = updatedPost;
    const onChangeUpdatePostForm = (e) => {
        setUpdatedPost({...updatedPost, [e.target.name]: e.target.value});
    }
    const closeModal = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const {success, message} = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setShowToast({show: true, message: message, type: success ? 'success' : 'danger'});
    }
    return (
        <Modal show={showUpdatePostModal} animation={false} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text" placeholder="Title"
                            name="title" require="true"
                            aria-describedby="title-help"
                            defaultValue={title}
                            onChange={onChangeUpdatePostForm}
                        />
                        <Form.Text id="title-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            row={3}
                            placeholder="Description"
                            name="description"
                            defaultValue={description}
                            onChange={onChangeUpdatePostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube tutorial URL"
                            name="url"
                            defaultValue={url}
                            onChange={onChangeUpdatePostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="select"
                            defaultValue={status}
                            name="status"
                            onChange={onChangeUpdatePostForm}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="primary" type="submit">UPDATE</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdatePostModal;