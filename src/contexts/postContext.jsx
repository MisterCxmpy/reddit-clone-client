import React, { useState, useContext, createContext } from 'react';

const PostContext  = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({});

  const GetPosts = async (id) => {
    const response = await fetch(`http://localhost:3000/post/c/${id}`);

    const posts = await response.json();

    setPosts(posts);
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, GetPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);