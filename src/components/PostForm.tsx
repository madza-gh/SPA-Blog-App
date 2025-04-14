import { Form, Stack, Row, Col } from "react-bootstrap";
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
            <Form.Group>
              <Form.Label>تگ</Form.Label>
              <CreatableSelect isMulti placeholder="انتخاب" />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}

export default PostForm;
