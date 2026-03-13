import React, {useEffect, useState } from "react";

const useUsersPosts = () => {
  const [data, setData] = useState({ users: [], posts: [] });
  const [loading, SetLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
        ]);
        if (!usersRes.ok || !postsRes.ok) {
          throw new "Error Occurred"();
        }
        const users = await usersRes.json();
        const posts = await postsRes.json();
        setData({users, posts});
      } catch (error) {
        setError(error.message);
      } finally {
        SetLoading(false);
      }
    };
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        SetLoading(false);
      })
      .catch((error) => {
        throw new ("Error Occurred ", error);
      });
    fetchData();
  }, []);

  return {...data, loading, error };
};

const Galos = () => {
  const { users, posts, loading, error } = useUsersPosts();
  const [selectedUserId, setSelectedUserId] = useState("");

  if (loading) return <p>Loading....</p>;
  if (error) return <p style={{ color: "red" }}>Error : {error}</p>;

  const filteredPost = posts.filter((post) => post.userId ===parseInt(selectedUserId));

  return (
    <div style={{padding:"20px"}}>
      <h1>User Dashboard</h1>
      <label htmlFor="user">Select User:</label>
      <select
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId}
      >
        <option value=""> --Select User-- </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {/* <hr /> */}
      <h4>Post</h4>
      {selectedUserId ? (
        <ul>
          {filteredPost.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>please select a user to see their post</p>
      )}
    </div>
  );
};

export default Galos;
