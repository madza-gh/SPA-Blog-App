import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AddPost from "./components/AddPost";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import PostList from "./components/PostList";
import PostLayout from "./components/PostLayout";
import Post from "./components/Post";
import EditPost from "./components/EditPost";

export type Post = {
  id: string;
} & PostData;

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

  function onUpdatePost(id: string,{tags, ...data}: PostData){
    setPosts((prevPosts) => {
      return prevPosts.map((item)=>{
        if (item.id === id){
          return {...item, ...data, tagIds: tags.map((tag)=> tag.id)}
        }else{
          return item
        }
      })
    })
  }

  function addTag(tag: Tag) {
    setTags((prev) => {
      return [...prev, tag];
    });
  }

  function onDeletePost(id:string){
    setPosts((prevPosts)=>{
      return prevPosts.filter((item)=> item.id !== id)
    })
  }

  function updateTag(id:string ,label: string){
    setTags((prevTags)=>{
      return prevTags.map((tag)=>{
        if(tag.id === id){
          return {...tag, label}
        }else{
          return tag
        }
      })
    })
  }

  function deleteTag(id:string){
    setTags((prevTags)=>{
      return prevTags.filter((tag)=>(tag.id !== id))
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<PostList availableTags={tags} posts={postsWithTags} onUpdateTag={updateTag} onDeleteTag={deleteTag} />}
        />
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
        <Route path="/:id" element={<PostLayout posts={postsWithTags} />}>
          <Route index element={<Post onDelete={onDeletePost}/>} />
          <Route
            path="edit"
            element={
              <EditPost
                onSubmit={onUpdatePost}
                onAddTag={addTag}
                availableTags={tags}
              ></EditPost>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
