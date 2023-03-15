import { Button } from "@mui/material";
import classes from "./Navigation.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";

const Navigation: React.FC = () => {
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td align="left">
            <nav className={classes.navigation}>
              <header>
                <h1>MOVIE SITE</h1>
              </header>
              <ul>
                <li>
                  <a href="#">Popular</a>
                </li>
                <li>
                  <a href="#">Movies</a>
                </li>
                <li>
                  <a href="#">Series</a>
                </li>
              </ul>
            </nav>
          </td>
          <td align="right" className={classes["show-nav"]}>
            <label htmlFor="toggle-nav">
              <Button sx={{ color: grey[900], pointerEvents: "none" }}>
                <MenuIcon />
              </Button>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Navigation;
