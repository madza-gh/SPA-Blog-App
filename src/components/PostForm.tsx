import { Form, Stack, Row, Col } from "react-bootstrap";

function PostForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
                <Form.Label>عنوان</Form.Label>
                <Form.Control required/>
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}

export default PostForm;
