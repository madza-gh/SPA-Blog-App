import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { type FormEvent, useRef, useState } from "react";
import { type Tag, type PostData } from "../App";
import { v4 as uuidV4 } from "uuid";

type PostFormProps = {
  onSubmit: (data: PostData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function PostForm({ onSubmit, onAddTag, availableTags }: PostFormProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tag">
              <Form.Label>تگ</Form.Label>
              <CreatableSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                isMulti
                placeholder="انتخاب"
                value={selectedTags.map((item) => {
                  return { label: item.label, value: item.id };
                })}
                options={availableTags.map((item) => {
                  return { label: item.label, value: item.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((item) => {
                      return {
                        label: item.label,
                        id: item.value,
                      };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="markdown">
            <Form.Label>پست</Form.Label>
            <Form.Control
              ref={markdownRef}
              required
              as={"textarea"}
              rows={15}
            />
          </Form.Group>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-start"
          >
            <Button type="submit" variant="light">
              انتشار پست
            </Button>
            <Link to={".."}>
              <Button type="button" variant="outline-light">
                لغو
              </Button>
            </Link>
          </Stack>
        </Row>
      </Stack>
    </Form>
  );
}

export default PostForm;
