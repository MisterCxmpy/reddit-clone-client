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
    setUser(null)
    localStorage.setItem('user', null);
    navigate('/');
  }

  const getLikes = async (user) => {
    const response = await fetch(`http://localhost:3000/vote/${user.user_id}`);

    const data = await response.json()

    saveUser({ ...user, likes: data})
  }

  useEffect(() => { // check for cachedUser data to login and redirect user
    let cached = localStorage.getItem('user');

    if (!cached) return;
    if (cached !== 'undefined') {
      let cachedUser = JSON.parse(cached)

      if (!user) {
        setUser(cachedUser)
        getLikes(cachedUser)
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