import { Show } from "../../store/types";
import classes from "./ShowListItem.module.css";

const ShowListItem: React.FC<{
  show: Show;
  onSelect: (show: Show) => void;
}> = (props) => {
  return (
    <li
      className={classes["show-list-item"]}
      onClick={() => props.onSelect(props.show)}
    >
      <img src={props.show.poster_url} />
    </li>
  );
};

export default ShowListItem;
