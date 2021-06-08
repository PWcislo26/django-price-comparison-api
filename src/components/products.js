import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card:{
    maxWidth: 400
  }
  ,
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: 100,
    width: '50%',
    marginLeft:'33%'
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  productName: {
    fontSize: "16px",
    textAlign: "left",
  },
  productText: {
    display: "flex",
    justifyContent: "left",
    alignItems: "baseline",
    fontSize: "14px",
    textAlign: "left",
    
  },
  mediaImage:{
    height:"32px"
  },
  button:{
    paddingTop:"10px",
    textAlign: "center"
  }
}));

const Products = (props) => {
  const { products } = props;
  const classes = useStyles();
  if (!products || products.length === 0)
    return <p>Can not find any products, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {products.map((product) => {
            return (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={product.product_id} xs={12} md={4}>
                <Card className={classes.card}>
                  <Link
                    color="textPrimary"
                    href={"product/" + product.product_id}
                    className={classes.Link}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={product.image}
                      title={product.product_name}
                    />
                  </Link>

                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      className={classes.productName}
                    >
                      {product.product_name}
                    </Typography>
                    <div className={classes.productText}>
                        <Typography variant="body2" color="textPrimary">
                        Kategoria: {product.category}
                      </Typography>  
                    </div>
                    <div className={classes.productText} >
                    <Typography variant="body2"color="textPrimary"> Cena od: {product.min_price[0]} zł </Typography>
                    </div>
                    <div className={classes.productText}>
                    <Typography variant="body2" color="textPrimary"> Dostępny w: {product.min_price[1]} sklepach</Typography>
                    </div>
                    <div className={classes.button}>
                      <Button  variant="contained" color="primary" href={"product/" + product.product_id}>Sprawdź ceny</Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Products;
