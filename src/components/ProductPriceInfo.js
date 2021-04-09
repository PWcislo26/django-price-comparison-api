import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeaders:{


  }
});

function createData(shop, price, min, max, pricemin, pricemax) {
  return { shop, price, min, max, pricemin, pricemax };
}

export default function ProductPriceInfo( props ) {
  
  const rows = [];
  for(var i = 0; i<props.price_data.length; i++){
    var retailer_instance = props.price_data[i]
    rows.push(createData(
      retailer_instance.retailer.retailer_name,
      retailer_instance.product_price,
      retailer_instance.price_stats.min.toFixed(2),
      retailer_instance.price_stats.max.toFixed(2),
      ((retailer_instance.product_price/ retailer_instance.price_stats.min) * 100).toFixed(2),
      ((retailer_instance.product_price/ retailer_instance.price_stats.max) * 100).toFixed(2)
    ))}

  const classes = useStyles();
  return (
    
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableHeaders}>
              <TableCell><b>Sklep</b></TableCell>
              <TableCell align="right"><b>Cena aktualna&nbsp;(zł)</b></TableCell>
              <TableCell align="right"><b>Cena minimalna&nbsp;(zł)</b></TableCell>
              <TableCell align="right"><b>Cena maksymalna&nbsp;(zł)</b></TableCell>
              <TableCell align="right">
                <b>Stosunek ceny aktualnej do ceny min.&nbsp;(%)</b>
              </TableCell>
              <TableCell align="right">
                <b>Stosunek ceny aktualnej do ceny max.&nbsp;(%)</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.shop}>
                <TableCell component="th" scope="row">
                  {row.shop}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.min}</TableCell>
                <TableCell align="right">{row.max}</TableCell>
                <TableCell align="right">{row.pricemin}</TableCell>
                <TableCell align="right">{row.pricemax}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
