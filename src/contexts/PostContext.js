import React, {createContext, useReducer, useState} from "react";
import {
    apiUrl,
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST
} from "./constant";
import axios from "axios";
import {postReducer} from "../reducers/postReducer";

export const PostContext = createContext();

const PostContextProvider = ({children}) => {
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        postLoading: true,
        posts: [],
    });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    })
    //Get All Post
    const getPost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts
                })
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL
            });
        }
    }

    //Add post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post,
                })
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : {success: false, message: 'Server error'};
        }
    }

    // Find post when user is updating post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({type: FIND_POST, payload: post})
    }

    // Update post
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${updatedPost._id}`,
                updatedPost
            )
            if (response.data.success) {
                dispatch({type: UPDATE_POST, payload: response.data.post})
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : {success: false, message: 'Server error'}
        }
    }

    //Delete A Post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    //PostContextData

    const postContextData = {
        postState,
        getPost,
        addPost,
        deletePost,
        updatePost,
        findPost,
        showAddPostModal,
        setShowAddPostModal,
        showToast,
        setShowToast,
        showUpdatePostModal,
        setShowUpdatePostModal
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;