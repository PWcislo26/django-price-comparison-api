import React, { useState } from "react";
import { useCookies } from "react-cookie";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  const [token] = useCookies(["token"]);
  console.log(token["token"]);
  let history = useHistory();
  const [data, setData] = useState({ search: "" });

  const goSearch = (e) => {
    history.push({
      pathname: "/search/",
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="textPrimary"
            >
              Produkty
            </Link>
          </Typography>
          {!token["token"] && (
            <>
              <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                component={NavLink}
                to="/login"
              >
                Logowanie
              </Button>
              <Button
                color="primary"
                variant="outlined"
                href="#"
                className={classes.link}
                component={NavLink}
                to="/register"
              >
                Rejestracja
              </Button>
            </>
          )}
          {token["token"] && (
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              to="/logout"
            >
              Wyloguj
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
