import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddPost from "./components/AddPost";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import PostList from "./components/PostList";

export type RawPost = {
  id: string;
} & RawPostData;

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

  const postsWithTags = useMemo(() => {
    return posts.map((item) => {
      return {
        ...item,
        tags: tags.filter((tag) => item.tagIds.includes(tag.id)),
      };
    });
  }, [tags, posts]);

  function onCreatePost({ tags, ...data }: PostData) {
    setPosts((prevPosts) => {
      return [
        ...prevPosts,
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map((item) => item.id),
        },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => {
      return [...prev, tag];
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route
          path="/add"
          element={
            <AddPost
              onSubmit={onCreatePost}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<h2>View Post</h2>} />
          <Route path="edit" element={<h2>Edit Post</h2>} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
