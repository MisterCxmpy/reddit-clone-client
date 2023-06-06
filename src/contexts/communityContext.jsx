import React, { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CommunityContext  = createContext();
const navigate = useNavigate()

export const CommunityProvider = ({ children }) => {
  const [commInfo, setCommInfo] = useState({});
  const [defaultCommunities, setDefaultCommunities] = useState({});
  const [currentCommunity, setCurrentCommunity] = useState("");

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

    if (response.ok) {
      console.log("Successfully created community")
      navigate(`/c/${community.name}`)
    } else {
      console.log("Failed to create community")
    }
  }
  

  return (
    <CommunityContext.Provider value={{ commInfo, setCommInfo, GetCommunityInfo, GetDefaultCommunities, currentCommunity, setCurrentCommunity, defaultCommunities, CreateCommunity }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);