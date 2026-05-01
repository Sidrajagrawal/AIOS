import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import CursorEffect from './Cursor/CursorEffect'
import PackagesPage from './Packages/PackagesPage';
import LoginPage from './Auth/LoginPage.jsx'
import Admin from './Admin/Admin.jsx';
import { Toaster } from "react-hot-toast";
import DocsLanding from './Docs/DocsLanding.jsx';
import DocsLayout from './Docs/DocsLayout.jsx';
import Contact from './Contact/Contact.jsx';

function App() {
  return (
    <Router>
      <CursorEffect />
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/authentication" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />

        <Route path='/docs' element={<DocsLanding />} />
        <Route path='/docs/:categoryId' element={<DocsLayout />} />
        <Route path='/docs/:categoryId/:articleId' element={<DocsLayout />} />

        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App