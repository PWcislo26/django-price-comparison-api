import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "shop",
    numeric: false,
    disablePadding: false,
    label: <b>Sklep</b>
  },
  { id: "min", numeric: true, disablePadding: false, label: <b>Cena minimalna</b> },
  { id: "price", numeric: true, disablePadding: false, label: <b>Cena aktualna</b> },
  { id: "max", numeric: true, disablePadding: false, label: <b>Cena maksymalna</b> },
  { id: "pricemin", numeric: true, disablePadding: false, label: <b>Stosunek ceny aktualnej do ceny min.</b> },
  { id: "pricemax", numeric: true, disablePadding: false, label: <b>Stosunek ceny aktualnej do ceny maks.</b> }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired
};

function createData(shop, price, min, max, pricemin, pricemax) {
  return { shop, price, min, max, pricemin, pricemax };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function ProductPriceInfo(props) {
  const rows = [];
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("shop");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  for (var i = 0; i < props.price_data.length; i++) {
    var retailer_instance = props.price_data[i];
    rows.push(
      createData(
        retailer_instance.retailer.retailer_name,
        retailer_instance.product_price,
        retailer_instance.price_stats.min.toFixed(2),
        retailer_instance.price_stats.max.toFixed(2),
        (
          (retailer_instance.product_price /
            retailer_instance.price_stats.min) *
          100
        ).toFixed(2),
        (
          (retailer_instance.product_price /
            retailer_instance.price_stats.max) *
          100
        ).toFixed(2)
      )
    );
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label="enhanced table"  aria-labelledby="tableTitle">
        <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
        <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.shop}>
                      <TableCell component="th" scope="row" padding="default">
                        {row.shop}
                      </TableCell>
                      <TableCell align="right">{row.min} zł</TableCell>
                      <TableCell align="right">{row.price} zł</TableCell>
                      <TableCell align="right">{row.max} zł</TableCell>
                      <TableCell align="right">{row.pricemin} %</TableCell>
                      <TableCell align="right">{row.pricemax} %</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </div>
  );
}
