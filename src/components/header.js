import React from "react";
import { useCookies } from "react-cookie";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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
          <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              endIcon = {<LocalLibraryIcon/>}
              to="/guide"
            >
              Poradnik
            </Button>
          {(!token.token || token.token === "undefined" ) && (
            <>
              <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                component={NavLink}
                endIcon= {<LockOpenIcon/>}
                to="/login"
              >
                Zaloguj się 
              </Button>
              <Button
                color="primary"
                variant="outlined"
                href="#"
                className={classes.link}
                component={NavLink}
               endIcon = {<VpnKeyIcon/>}
                to="/register"
              >
                Rejestracja
              </Button>
            </>
          )}
          {(token.token && token.token !== "undefined") && (
            <>            
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              endIcon = {<VisibilityIcon/>}
              to="/watchlist"
            >
              Obserwowane produkty 
            </Button>
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              endIcon = {<LockIcon/>}
              to="/logout"
            >
              Wyloguj się 
            </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
