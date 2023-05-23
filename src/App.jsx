import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from './layouts/Navbar';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Main />} />
        <Route path='/c/:id' element={<Main />} />
      </Route>
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  )
}

export default App
