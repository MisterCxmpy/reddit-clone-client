import { Route, Routes } from 'react-router-dom';
import { Main, Create } from './pages';
import Navbar from './layouts/Navbar';
import Filter from './layouts/Filter';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Filter />}>
          <Route index element={<Main />} />
          <Route path='/c/:id' element={<Main />} />
        </Route>
        <Route path='/create' element={<Create />} />
        <Route path='/c/:id/create' element={<Create />} />
      </Route>
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  )
}

export default App
