import classes from "./Navigation.module.css";

const Navigation: React.FC = () => {
  return (
    <nav className={classes.navigation}>
      <h1>MOVIE SITE</h1>
      <ul>
        <li>Popular</li>
        <li>Movies</li>
        <li>Series</li>
      </ul>
    </nav>
  );
};

export default Navigation;
