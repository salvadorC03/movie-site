import { Show } from "../../store/types";
import ShowListItem from "./ShowListItem";
import classes from "./ShowList.module.css";
import React from "react";

const ShowList: React.FC<{
  list: Array<Show>;
  onSelect: (show: Show) => void;
}> = React.memo((props) => {
  return (
    <ul className={classes["show-list"]}>
      {props.list.map((show) => (
        <ShowListItem key={show.id} show={show} onSelect={props.onSelect} />
      ))}
    </ul>
  );
});

export default ShowList;
