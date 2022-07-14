import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

import classes from "./App.module.css";

import CreatePost from "./component/CreatePost";
import PostItem from "./component/PostItem";

const FIREBASE_DOMAIN = "https://codemancers-fbui-default-rtdb.firebaseio.com/";

function App() {
  const [showPostBox, setShowPostBox] = useState(false);
  const [posts, setPosts] = useState([]);

  function postModalHandler() {
    setShowPostBox(!showPostBox);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      console.log("ResponseData", responseData);

      const loadedPosts = [];

      for (const key in responseData) {
        loadedPosts.unshift({
          id: key,
          timeStamp: responseData[key].timeStamp,
          message: responseData[key].message,
          embedUrl: responseData[key].gif.embed_url,
          gifId: responseData[key].gif.id,
          // gif: function Giphy (gifId) {
          //   const [gif, setGif] = useState(null);
          //   useAsync(async () => {
          //     const { data } = await giphyFetch.gif(gifId);
          //     setGif(data);
          //   }, []);
          //   return gif && <Gif gif={gif} width={300} />;
          // },
        });
      }
      setPosts(loadedPosts);
    };

    fetchPosts().catch((error) => {
      alert("Something went wrong!!");
    });
  }, []);

  const postList = posts.map((post) => (
    <PostItem
      key={post.id}
      id={post.id}
      gif={post.gif}
      message={post.message}
      timeStamp={post.timeStamp}
      embedUrl={post.embedUrl}
    />
  ));

  return (
    <div className={classes.App}>
      {!showPostBox && (
        <Button
          className={classes.createPostButton}
          onClick={postModalHandler}
          variant="primary"
        >
          Create Post
        </Button>
      )}
      {showPostBox && <CreatePost />}

      {postList}
    </div>
  );
}

export default App;
