import { useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blogs } from './pages/Blogs';
import { Blog } from './pages/Blog';
import { Publish } from './pages/Publish';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/publish" element={<Publish/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
