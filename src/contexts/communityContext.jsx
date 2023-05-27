import React, { useState, useContext, createContext } from 'react';

const CommunityContext  = createContext();

export const CommunityProvider = ({ children }) => {
  const [commInfo, setCommInfo] = useState({});
  const [currentCommunity, setCurrentCommunity] = useState("");

  const GetCommunityInfo = async (community) => {
    const response = await fetch(`http://localhost:3000/community/${community}`);
    
    const commInfo = await response.json();
    
    setCommInfo(commInfo);
  };

  return (
    <CommunityContext.Provider value={{ commInfo, setCommInfo, GetCommunityInfo, currentCommunity, setCurrentCommunity }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);