import { Routes,Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<h2>Home Page</h2>}/>
      <Route path="/add" element={<h2>Add Post</h2>}/>
      <Route path="/:id">
      
      </Route>

    </Routes>
  )
}

export default App
