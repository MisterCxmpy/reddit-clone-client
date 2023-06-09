import { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  const updateUser = async (user) => {

    const options = { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) }

    const response = await fetch(`http://localhost:3000/auth/${user.user_id}/update`, options);
    const updated_user = await response.json();

    if (!response.ok) throw new Error(updated_user.message);
  }

  const saveUser = (user) => {
    setUser(user);
    updateUser(user)
    localStorage.setItem('user', JSON.stringify(user));
  }

  const login = async ({ username, password }) => {
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) }

    const response = await fetch('http://localhost:3000/auth/login', options);
    const user = await response.json();

    if (!response.ok) throw new Error(user.message); // if theres any error, throw one and with that data

    saveUser({ ...user}) // save and cache user
    document.body.classList.remove('no-scroll');
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
    localStorage.removeItem('user');
    updateUser(user)
    setUser(null)
    navigate('/');
  }

  useEffect(() => { // check for cachedUser data to login and redirect user
    let cached = localStorage.getItem('user');

    if (!cached) return;
    if (cached !== 'undefined') {
      let cachedUser = JSON.parse(cached)

      if (!user) {
        setUser(cachedUser)
      }
    }
  }, []);

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