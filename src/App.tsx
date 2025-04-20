import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddPost from "./components/AddPost";
import { useLocalStorage } from "./hooks/useLocalStorage";

export type RawPost = {
  id: string;
} & PostData;

export type RawPostData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type PostData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  label: string;
  id: string;
};

function App() {
  const [posts, setPosts] = useLocalStorage<RawPost[]>("POSTS", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/:id">
          <Route index element={<h2>View Post</h2>} />
          <Route path="edit" element={<h2>Edit Post</h2>} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
