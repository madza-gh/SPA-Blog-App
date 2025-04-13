import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddPost from "./components/AddPost";

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/add" element={<AddPost/>} />
        <Route path="/:id">
          <Route index element={<h2>View Post</h2>} />
          <Route path="edit" element={<h2>Edit Post</h2>} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
