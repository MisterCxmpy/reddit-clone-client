import React, { useState, useContext, createContext } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({});

  const { user } = useAuth();

  const navigate = useNavigate()

  const GetPosts = async (id) => {
    const response = await fetch(`http://localhost:3000/post/c/${id}`);

    const posts = await response.json();

    setPosts(posts);
  };

  const CreatePost = async (e, post) => {
    e.preventDefault()

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        community: post.community,
        author: user.username,
        title: post.title,
        content: post.content,
        user_id: user.user_id,
      }),
    };
    
    const response = await fetch(`http://localhost:3000/post/create`, options);

    if (response.ok) {
      console.log("Successfully created post")
      navigate(`/c/${post.community}`)
    } else {
      console.log("Failed to create post")
    }
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, GetPosts, CreatePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
