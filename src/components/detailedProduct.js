import React, { useState, useEffect } from 'react';
import {API} from '../apiService';
import { useParams } from 'react-router-dom';

//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card'


const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	paper: {
	  padding: theme.spacing(2),
	  margin: 'auto',
	  maxWidth: 500,
	  
	},
	img: {
	  margin: 'auto',
	  display: 'block',
	  maxWidth: '100%',
	  maxHeight: '100%',
	},
	siteGrid:{
		paddingTop: '5px',
		paddingBottom: '5px'
	},
	productImage:{
		maxWidth:'100%',
		maxHeight:'100%',
		display:"block",
		height:'450px',
		width:'100%'
	}
  }));


export default function Product() {
	const { product_id } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ product: [] });


	useEffect(() => {
		API.detailedProduct(product_id)
			.then((resp) => {
			setData({ product: resp });
			
		})
	}, [setData, product_id]);
	console.log(data);
	

	return (
		<Container component="main" maxWidth="md">
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
						<img className={classes.productImage} src={data.product.image} alt="Brak zdjęcia"></img>
					</Typography>
				</Container>
			</div>
			<div id='siteGrid' className={classes.siteGrid}>
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
				<Button variant="contained" color="secondary" href={data.product.link_morele} target="_blank">Odwiedź sklep</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
			</div>
			<div id='siteGrid' className={classes.siteGrid}>
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
				<Button variant="contained" color="secondary" href={data.product.link_xkom} target="_blank">Odwiedź sklep</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
			</div>	
			<div id='siteGrid' className={classes.siteGrid}>
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
				<Button variant="contained" color="secondary" href={data.product.link_proline} target="_blank">Odwiedź sklep</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
			</div>	
		</Container>
	);
}