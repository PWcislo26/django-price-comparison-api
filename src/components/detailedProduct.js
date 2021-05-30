import React, { useState, useEffect } from "react";
import { API } from "../apiService";
import { useParams } from "react-router-dom";
import ProductPriceInfo from "./ProductPriceInfo";
import PriceChart from "./PriceChart";
import { useCookies } from "react-cookie";
import CustomDialog from './CustomDialog';

//MaterialUI
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StoreIcon from "@material-ui/icons/Store";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "sm",
  },

  siteGrid: {
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  priceInfo: {
    paddingTop: "5px",
  },
  heroContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    maxWidth: "100%",
  },
  productImage: {
    flexBasis: "40%",
    height: "350px",
    width: "450px",
  },
  productName: {
    paddingLeft: "20px",
  },

  heading: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  shopButton: {
    paddingLeft: "5px",
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

  const [token] = useCookies(["token"]);

  return (
    <Container component="main" maxWidth="md">
      {data && (
        <>
          <CssBaseline />
          <Container maxWidth="md">
            <div className={classes.heroContent}>
              <div className={classes.image}>
                <img
                  className={classes.productImage}
                  src={data.product.image}
                  alt="Brak zdjęcia"
                ></img>
              </div>
              <div className={classes.productName}>
                <Typography
                  component="h1"
                  variant="h4"
                  color="textPrimary"
                  gutterBottom
                >
                  {data.product.product_name}
                </Typography>
                <FavoriteIcon onClick={()=> {API.addToWatchlist(product_id, token['token']);}}/>
              </div>
            </div>
          </Container>
          {data.product.prices.map(
            (
              { product_price, product_link, retailer, price_history },
              index
            ) => (
              <div id="siteGrid" className={classes.siteGrid} key={index}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            {retailer.retailer_name}
                          </Typography>
                          <Typography variant="body2" color="textPrimary">
                            Cena: {product_price} zł
                          </Typography>
                        </Grid>
                      </Grid>
                      <CustomDialog retailer ={ retailer.retailer_name} chartData = {price_history} />
                      <Grid className={classes.shopButton}>
                        <Button
                          variant="contained"
                          color="secondary"
                          href={product_link}
                          target="_blank"
                        >
                          Odwiedź sklep <StoreIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            )
          )}
          <div className={classes.priceInfo}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading} color="textPrimary">
                  Dodatkowe informacje o cenach:
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ProductPriceInfo price_data={data.product.prices} />
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      )}
    </Container>
  );
}
