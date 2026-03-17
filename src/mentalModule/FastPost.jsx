import React, { useState, useEffect } from 'react';

const apiUrls = [
  'https://jsonplaceholder.typicode.com/posts/4',
  'https://jsonplaceholder.typicode.com/posts/5',
  'https://jsonplaceholder.typicode.com/posts/6'
];

const FastPostsApp = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Define the async function inside the effect
    const getFastPosts = async () => {
      try {
        setLoading(true);

        // 2. Create an array of fetch promises
        // We add .then(res => res.json()) to each so they race to the final data
        const fetchPromises = apiUrls.map(url => 
          fetch(url).then(res => {
            if (!res.ok) throw new Error("Failed");
            return res.json();
          })
        );

        // 3. Race! The first one to resolve wins.
        const fastestData = await Promise.race(fetchPromises);

        setPost(fastestData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // 4. Run the function immediately
    getFastPosts();

  }, []); // Empty array means "Run once on load"

  if (loading) return <h2>🏁 Racing APIs for the fastest data...</h2>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd' }}>
      <h1>Fastest Post Results</h1>
      {post && (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      )}
      <button onClick={() => window.location.reload()}>Race Again (Refresh)</button>
    </div>
  );
};

export default FastPostsApp;