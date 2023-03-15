import { useState } from "react";
import { auth, googleProvider, userState } from "../../store/firebase-config";
import { signInWithPopup } from "firebase/auth";
import UserInfo from "./UserInfo";
import Button from "@mui/material/Button/Button";
import GoogleButton from "react-google-button";
import classes from "./UserSideBar.module.css";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";

const UserSideBar: React.FC = () => {
  const user = userState();
  const [loading, setLoading] = useState(false);

  async function googleSignInHandler() {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  async function signOutHandler() {
    try {
      await auth.signOut();
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  return (
    <>
      <label htmlFor="toggle-nav" className={classes["hide-nav"]}>
        <Button sx={{ color: grey[900], pointerEvents: "none" }}>
          <CloseIcon />
        </Button>
      </label>
      {!loading && (
        <>
          {user && (
            <>
              <UserInfo user={user} />
              <div className={classes.centered}>
                <Button onClick={signOutHandler} variant="contained">
                  Sign out
                </Button>
              </div>
            </>
          )}
          {!user && (
            <div className={classes.centered + " " + classes["space-top"]}>
              <GoogleButton onClick={googleSignInHandler}>
                Sign in with Google
              </GoogleButton>
            </div>
          )}
        </>
      )}
      {loading && (
        <div className={classes.centered + " " + classes["space-top"]}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default UserSideBar;
