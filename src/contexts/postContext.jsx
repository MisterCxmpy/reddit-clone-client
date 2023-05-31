import React, { useState, useContext, createContext } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({});
  const [votes, setVotes] = useState(0);

  const { user, saveUser } = useAuth();

  const navigate = useNavigate()

  const GetPosts = async (id) => {
    const response = await fetch(`http://localhost:3000/post/c/${id}`);
    const posts = await response.json();
  
    posts.sort((a, b) => b.votes - a.votes);
  
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

  const UpdateVote = async (post_id, vote_type) => {
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vote_type: vote_type
      }),
    };

    const response = await fetch(`http://localhost:3000/post/vote/${post_id}`, options);
    
    if (response.ok) {
      console.log("Successfully updated vote")
    } else {
      console.log("Failed to updated vote")
    }

    setVotes(votes => votes += 1);
  }

  const Vote = async (post, vote_type) => {
    const vote_details = {
      post_id: post.post_id,
      post_name: post.title,
      vote_type: vote_type,
    }
  
    const existingVoteIndex = user.votes.findIndex(vote => vote.post_id === post.post_id)
  
    if (existingVoteIndex !== -1) {
      const existingVote = user.votes[existingVoteIndex]
      
      if (existingVote.vote_type === vote_type) {
        user.votes.splice(existingVoteIndex, 1);
        if (vote_type === "upvotes") {
          UpdateVote(post.post_id, "downvotes");
          return
        } else if (vote_type === "downvotes") {
          UpdateVote(post.post_id, "upvotes");
          return
        }
      } else {
        user.votes[existingVoteIndex].vote_type = vote_type;
        UpdateVote(post.post_id, vote_type);
        return
      }

      user.votes[existingVoteIndex].vote_type = vote_type;
      UpdateVote(post.post_id, vote_type);
    } else {
      user.votes.push(vote_details);
      UpdateVote(post.post_id, vote_type);
    }
  
    try {
      saveUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <PostContext.Provider value={{ posts, setPosts, GetPosts, CreatePost, Vote, votes }}>
      {children}
    </PostContext.Provider>
  );
};


export const usePost = () => useContext(PostContext);
