const User = ({ user }) => {
  return (
    <div>
      <h2>{user.username}</h2>
      {user.blogs.length > 0 ? (
        <div>
          <h3>Added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{user.username} has not added blogs</p>
      )}
    </div>
  );
};

export default User;
