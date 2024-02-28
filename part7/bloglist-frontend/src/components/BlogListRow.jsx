import { ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogListRow = ({ blog }) => {
  return (
    <ListGroupItem key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.author}: {blog.title}
      </Link>
    </ListGroupItem>
  );
};
export default BlogListRow;
