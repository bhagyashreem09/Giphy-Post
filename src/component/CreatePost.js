import { useRef, useState } from "react";

import classes from "./CreatePost.module.css";

import { Gif } from "@giphy/react-components";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import GifModal from "./GifModal";

const FIREBASE_DOMAIN = "https://codemancers-fbui-default-rtdb.firebaseio.com/";

function CreatePost() {
  const date = new Date().toString();

  const textInputRef = useRef();

  const [showGifModal, setShowGifModal] = useState(false);
  const [selectedGif, setSelectedGif] = useState();

  function handleShowGifPopup(e) {
    e.preventDefault();
    setShowGifModal(!showGifModal);
  }

  //--------------------------- SUBMIT HANDLER ------------------------------

  async function submitHandler(event) {
    event.preventDefault();

    const gifObj = {
      id: selectedGif.id,
      url: selectedGif.url,
      embed_url: selectedGif.embed_url,
    };
    console.log("GIF OBJECT : ", gifObj);

    const enteredDate = date;
    let enteredText = textInputRef.current.value;
    const enteredGif = gifObj;

    const postData = {
      timeStamp: enteredDate,
      message: enteredText,
      gif: enteredGif,
    };

    const response = await fetch(`${FIREBASE_DOMAIN}/posts.json`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      console.log("POST DATA", postData);
      window.location.reload(false);
    }
    if (!response.ok) {
      throw new Error(data.message || "Could not create Post.");
    }
  }

  return (
    <Card className={classes.card}>
      <Card.Title className={classes.title}>Compose Post</Card.Title>
      <Form.Control
        className={classes.textBox}
        ref={textInputRef}
        size="lg"
        placeholder="Enter something here..."
        required
        as="textarea"
        rows={5}
        id="message"
        maxLength="200"
      />
      {/* --------------------------- GIF Display --------------------------- */}

      {selectedGif && (
        <div
          className={classes.gifDisplay}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Gif gif={selectedGif} width={300} />
        </div>
      )}

      {/* ----------------------------- GIF Card ----------------------------- */}
      {showGifModal && (
        <div className={classes.gifModal}>
          {
            <GifModal
              onGifClick={(gif, e) => {
                e.preventDefault();
                setSelectedGif(gif);
                console.log("gif", gif);
                setShowGifModal(false);
              }}
            />
          }
        </div>
      )}
      {/* ---------------------------- Buttons --------------------------- */}
      <div className={classes.buttonGroup}>
        <Button
          className={classes.gifButton}
          onClick={handleShowGifPopup}
          variant="primary"
        >
          GIF
        </Button>

        <Button
          className={classes.postButton}
          onClick={submitHandler}
          value="submit"
          variant="primary"
        >
          Post
        </Button>
      </div>
    </Card>
  );
}

export default CreatePost;
