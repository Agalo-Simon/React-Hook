import React, { useState } from "react";
import useUsersPosts from "./useUsersPosts";

const UsersPosts = () => {
  const { users, posts, loading, error } = useUsersPosts();
  const [selectedUserId, setSelectedUserId] = useState("");

  const filteredPosts = posts.filter(
    (post) => post.userId === parseInt(selectedUserId),
  );
  if (loading) return <p>Loading.....</p>;
  if (error) return <p style={{color:'red'}}>Error, {error.message}</p>;
  return (
    <div>
      <h1>User Dashboard:</h1>
      <select
        value={selectedUserId}
        onChange={(e) => {
          setSelectedUserId(e.target.value);
        }}
      >
        <option value=""> -- Select User -- </option>
        {users.map((user) => (
          <option value={user.id}> {user.name} UserId: {user.id}</option>
        ))}
      </select>
      <h2>User Posts</h2>
      {selectedUserId ? (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Please select the user to see their post</p>
      )}
    </div>
  );
};

export default UsersPosts;
