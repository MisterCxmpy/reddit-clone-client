import React, { useState, useContext, createContext } from 'react';

const CommunityContext  = createContext();

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

  return (
    <CommunityContext.Provider value={{ commInfo, setCommInfo, GetCommunityInfo, GetDefaultCommunities, currentCommunity, setCurrentCommunity, defaultCommunities }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);