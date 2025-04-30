import { useMemo, useState } from "react";
import { Row, Col, Button, Stack, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag, Post } from "../App";
import ReactSelect from "react-select";

type PostListProps = {
  availableTags: Tag[];
  posts:Post[]
};

function PostList({ availableTags, posts}: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  
  useMemo(()=>{

  },[availableTags, posts, title])

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>پست ها</h2>
        </Col>

        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={"/add"}>
              <Button variant="light">افزودن پست</Button>
            </Link>
            <Button variant="outline-light">ویرایش تگ ها</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default PostList;
