import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

function PostForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>عنوان</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tag">
              <Form.Label>تگ</Form.Label>
              <CreatableSelect isMulti placeholder="انتخاب" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="markdown">
            <Form.Label>پست</Form.Label>
            <Form.Control required as={"textarea"} rows={15} />
          </Form.Group>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-start"
          >
            <Button type="submit" variant="light">
              انتشار پست
            </Button>
            <Button type="button" variant="outline-light">
              لغو
            </Button>
          </Stack>
        </Row>
      </Stack>
    </Form>
  );
}

export default PostForm;
