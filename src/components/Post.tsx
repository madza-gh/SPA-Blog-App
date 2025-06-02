import { usePost } from "./PostLayout";
import { Col, Row, Badge, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type PostProps = {
  onDelete: (id: string) => void;
};

function Post({ onDelete }: PostProps) {
  const post = usePost();
  const navigate = useNavigate();

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
        <Col>
          <Stack gap={2} direction="horizontal">
            <Link to={`/${post.id}/edit`}>
              <Button variant="light">ویرایش</Button>
            </Link>
            <Button
              variant="outline-light"
              onClick={async () => {
                try {
                  await onDelete(post.id);
                  navigate("/");
                } catch (error) {
                  console.error("Failed to delete post:", error);
                }
              }}
            >
              حذف
            </Button>
            <Link to={"/"}>
              <Button variant="outline-light">بازگشت</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{post.markdown}</ReactMarkdown>
    </>
  );
}

export default Post;
