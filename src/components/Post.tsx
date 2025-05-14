import { usePost } from "./PostLayout";
import { Col, Row, Badge, Stack } from "react-bootstrap";

function Post() {
  const post = usePost();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>{post.title}</h2>
          {post.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {post.tags.map((item) => (
                <Badge key={item.id} className="text-truncate">
                  {item.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Post;
