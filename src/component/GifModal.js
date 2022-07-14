import { useState } from "react";

import ResizeObserver from "react-resize-observer";

import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";

import Card from "react-bootstrap/Card";

import classes from "./GifModal.module.css";

const giphyFetch = new GiphyFetch("2RtXVQvsBmihTWQ8PHraSmOVcnEPJegG");

function GifModal({ onGifClick }) {
  const [keyword, setKeyword] = useState("");

  const [width, setWidth] = useState(window.innerWidth);

  const fetchGifs = (offset) =>
    keyword === ""
      ? giphyFetch.trending({ offset, limit: 5 })
      : giphyFetch.search(keyword, { offset, limit: 5 });

  return (
    <Card className={classes.gifCard}>
      <input
        className={classes.searchGif}
        placeholder="Search GIF"
        value={keyword}
        type="text"
        onChange={(e) => {
          let str = e.target.value;
          let pattern = /[/+{^#&()<>,.~`;:$%"'}*\n]|^\d+/g;
          str = str.replace(pattern, " ").trim();

          setKeyword(str);
        }}
      />
      <div>
        <Grid
          onGifClick={onGifClick}
          key={keyword}
          fetchGifs={fetchGifs}
          width={width}
          columns={2}
          gutter={3}
        />
        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width);
          }}
        />
      </div>
    </Card>
  );
}

export default GifModal;
