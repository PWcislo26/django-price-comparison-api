import React, { useState, useEffect } from "react";
import { API } from "../apiService";
import { useParams } from "react-router-dom";
import ProductPriceCollapsible from "./ProductPriceInfo";

//MaterialUI
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  siteGrid: {
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  productImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    height: "450px",
    width: "100%",
  },
}));

export default function Product() {
  const { product_id } = useParams();
  const classes = useStyles();

  const [data, setData] = useState(null);

  useEffect(() => {
    API.detailedProduct(product_id).then((resp) => {
      setData({ product: resp });
    });
  }, [product_id]);

  return (
    <Container component="main" maxWidth="md">
      {data && (
        <>
          {" "}
          <CssBaseline />
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {data.product.product_name}
                <img
                  className={classes.productImage}
                  src={data.product.image}
                  alt="Brak zdjęcia"
                ></img>
              </Typography>
            </Container>
          </div>
          <div id="siteGrid" className={classes.siteGrid}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Morele.net
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Cena: {data.product.price_morele} zł
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={data.product.link_morele}
                      target="_blank"
                    >
                      Odwiedź sklep
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <div id="siteGrid" className={classes.siteGrid}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Xkom.pl
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Cena: {data.product.price_xkom} zł
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={data.product.link_xkom}
                      target="_blank"
                    >
                      Odwiedź sklep
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <div id="siteGrid" className={classes.siteGrid}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Proline.pl
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Cena: {data.product.price_proline} zł
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={data.product.link_proline}
                      target="_blank"
                    >
                      Odwiedź sklep
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
          {/* {data.product.price_history.map(({price_xkom, price_morele}, index) => <p key={index}>{price_xkom}, {price_morele}</p>)} */}
          <p>{data.product.stats_morele.avg}</p>
		  <div>
		  <Accordion>
        <AccordionSummary
          
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
		<ProductPriceCollapsible {...data} />
        </AccordionDetails>
      </Accordion>
		  </div>
        </>
      )}
    </Container>
  );
}
