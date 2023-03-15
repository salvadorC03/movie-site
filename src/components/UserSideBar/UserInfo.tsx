import { User } from "firebase/auth";
import classes from "./UserInfo.module.css";

const UserInfo: React.FC<{ user: User }> = (props) => {
  return (
    <div className={classes.group}>
      <img src={props.user.photoURL || ""} />
      <div className={classes["user-info"]}>
        <div className={classes["display-name"]}>{props.user.displayName}</div>
        <div className={classes.email}>{props.user.email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
