import { useMemo, useState } from "react";
import { Row, Col, Button, Stack, Form, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Post, Tag } from "../App";
import ReactSelect from "react-select";

type PostCardProps = {
  id: string;
  tags: Tag[];
  title: string;
};

type PostListProps = {
  availableTags: Tag[];
  posts: PostCardProps[];
};

function PostList({ availableTags, posts }: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        (title === "" ||
          item.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            item.tags.some((postTag) => {
              postTag.id === tag.id;
            })
          ))
      );
    });
  }, [posts, availableTags, title]);

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
        <Row className="mb-4">
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
      <Row className="g-3">
        {filteredPosts.map((item) => (
          <Col key={item.id}>
            <PostCard id={item.id} title={item.title} tags={item.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function PostCard({ id, title, tags }: PostCardProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className="h-100 text-reset text-decoration-none"
    >
      <Card.Body>
        <Stack
          gap={2}
          className="h-100 align-items-center justify-content-center"
        >
          <span className="text-black fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="flex-wrap justify-content-center"
            >
              {tags.map((items) => (
                <Badge className="text-reuncate" key={items.id}>
                  {items.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default PostList;
