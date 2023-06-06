import React, { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const CommunityContext  = createContext();

export const CommunityProvider = ({ children }) => {
  const [commInfo, setCommInfo] = useState({});
  const [defaultCommunities, setDefaultCommunities] = useState({});
  const [currentCommunity, setCurrentCommunity] = useState("");
  const navigate = useNavigate()

  const { saveUser, user } = useAuth()

  const GetCommunityInfo = async (community) => {
    const response = await fetch(`http://localhost:3000/community/${community}`);
    
    const commInfo = await response.json();
    
    setCommInfo(commInfo);
  };

  const GetDefaultCommunities = async () => {
    const response = await fetch(`http://localhost:3000/community/c/default`);
    
    const defaultCommunities = await response.json();

    setDefaultCommunities(defaultCommunities);
  }

  const CreateCommunity = async (community) => {
    
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(community),
    };
    
    const response = await fetch(`http://localhost:3000/community/create`, options);

    const data = await response.json()

    if (response.ok) {
      console.log("Successfully created community")
      navigate(`/c/${data.community_name}`)

      user.joined_communities.push({id: data.community_id, community_name: data.community_name})
      saveUser(user);
      
      JoinCommunity(data.community_id, "join")
    } else {
      console.log("Failed to create community")
    }
  }

  const JoinCommunity = async (community_id, type) => {
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: type
      }),
    };

    const response = await fetch(`http://localhost:3000/community/join/${community_id}`, options);
    
    if (response.ok) {
      console.log("Successfully updated community")
    } else {
      console.log("Failed to updated community")
    }
  }
  

  return (
    <CommunityContext.Provider value={{ commInfo, setCommInfo, GetCommunityInfo, GetDefaultCommunities, currentCommunity, setCurrentCommunity, defaultCommunities, CreateCommunity, JoinCommunity }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);