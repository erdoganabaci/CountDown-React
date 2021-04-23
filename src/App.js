import "./styles.css";
import CountDown from "../src/components/CountDown";
import { Grid, Typography, Link } from "@material-ui/core";

export default function App() {
  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <CountDown />
      </Grid>
      <Grid className="footer">
        <Typography variant="h6" gutterBottom>
          ©2021 Created by
          <Link
            style={{ margin: "5px" }}
            href="https://github.com/erdoganabaci"
            onClick={(event) => event.preventDefault()}
          >
            Erdogan
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
