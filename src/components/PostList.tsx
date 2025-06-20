import { useMemo, useState } from "react";
import {
  Row,
  Col,
  Button,
  Stack,
  Form,
  Card,
  Badge,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import ReactSelect from "react-select";

type PostCardProps = {
  id: string;
  tags: Tag[];
  title: string;
};

type PostListProps = {
  availableTags: Tag[];
  posts: PostCardProps[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

function PostList({
  availableTags,
  posts,
  onUpdateTag,
  onDeleteTag,
}: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        (title === "" ||
          item.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            item.tags.some((postTag) => postTag.id === tag.id)
          ))
      );
    });
  }, [posts, availableTags, title, selectedTags]);

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
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-light"
            >
              ویرایش تگ ها
            </Button>
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
          <Col>
            <Form.Group controlId="tag">
              <Form.Label>تگ</Form.Label>
              <ReactSelect
                value={selectedTags.map((item) => {
                  return { label: item.label, value: item.id };
                })}
                options={availableTags.map((item) => {
                  return { label: item.label, value: item.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    (tags || []).map((item) => {
                      return { label: item.label, id: item.value };
                    })
                  );
                }}
                isMulti
                placeholder="انتخاب"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {filteredPosts.map((item) => (
          <Col key={item.id}>
            <PostCard id={item.id} title={item.title} tags={item.tags} />
          </Col>
        ))}
      </Row>

      <EditTagsModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
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

function EditTagsModal({
  availableTags,
  show,
  handleClose,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ویرایش تگ ها</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((item) => (
              <Row key={item.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={item.label}
                    onChange={(e) => onUpdateTag(item.id, e.target.value)}
                  />
                </Col>
                <Col xs={"auto"}>
                  <Button
                    onClick={() => onDeleteTag(item.id)}
                    variant="outline-none"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PostList;
