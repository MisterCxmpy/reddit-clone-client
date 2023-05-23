import { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const login = async ({ username, password }) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }

    const response = await fetch('http://localhost:3000/auth/login', options);
    const user = await response.json();

    if (!response.ok) throw new Error(user.message); // if theres any error, throw one and with that data

    saveUser({ ...user}) // save and cache user
    return user;
  }

  const register = async ({ username, password }) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }

    const response = await fetch('http://localhost:3000/auth/register', options);
    const user = await response.json();

    if (!response.ok) throw new Error(user.message); // if theres any error, throw one and with that data

    saveUser({ ...user }) // save and cache user, set registered = true
    return user;
  }

  const logout = () => {
    setUser(null)
    navigate('/');
  }

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <AuthContext.Provider value={{ user, saveUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
  
export const useAuth = () => useContext(AuthContext);