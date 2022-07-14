import Card from "react-bootstrap/Card";

import classes from "./PostItem.module.css";

function PostItem(props) {
  return (
    <div className={classes.main}>
      <Card className={classes.card}>
        <div className={classes.timeStamp}>Created At : {props.timeStamp}</div>
        <div className={classes.message}>{props.message}</div>
        <div className={classes.gif}>
          <iframe
            src={props.embedUrl}
            alt="Loading..."
            width="200"
            frameBorder="0"
            class="giphy-embed"
          ></iframe>
        </div>
      </Card>
    </div>
  );
}

export default PostItem;
