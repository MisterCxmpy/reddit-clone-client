import React, { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState({});

  const { user } = useAuth();

  const CreateVote = async (e, post) => {
    e.preventDefault()

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        post_id: post.post_id,
        vote_type: post.vote_type
      }),
    };

    const hasMatchingObject = user.likes.some((vote) => {
      return (
        vote.user_id === JSON.parse(options.body).user_id &&
        vote.post_id === JSON.parse(options.body).post_id &&
        vote.vote_type === JSON.parse(options.body).vote_type
      );
    });

    if (hasMatchingObject) return;

    const response = await fetch(`http://localhost:3000/vote/create`, options);
    
    if (response.ok) {
      console.log("Successfully created vote")
      UpdateVote(post.post_id, post.vote_type)
    } else {
      console.log("Failed to create vote")
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
  }

  return (
    <VoteContext.Provider value={{ votes, setVotes, CreateVote }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVote = () => useContext(VoteContext);
