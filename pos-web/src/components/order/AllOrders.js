import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
  Button, Paper, Dialog, DialogContent, DialogContentText, DialogTitle, CircularProgress,
} from '@material-ui/core';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import InfoIcon from '@material-ui/icons/Info';
import ViewList from '@material-ui/icons/ViewList';
import Chip from '@material-ui/core/Chip';
import Header from '../common/Header';
import { getOrders } from '../../actions/OrderActions';

const styles = {
  header: {
    paddingBottom: 20,
    marginTop: '4%',
    marginLeft: '20%',
    marginRight: '20%',
    textAlign: 'center',
    fontSize: 40,
    color: '#29428c',

  },
  table: {
    minWidth: 700,
  },
  row: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  root: {
    marginLeft: '10%',
    width: '80%',
    overflowX: 'auto',
  },
};

class AllOrders extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 15,
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  calculateTotal(items) {
    let total = 0;
    items.map((x) => {
      total += (x.item.price * x.quantity);
    });
    return `\$${total}`;
  }

  handleChangePage(event, page) {
    this.setState({ page });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }

  componentDidMount() {
    this.props.getOrders('all')
      .then(() => {
        if (!this.props.auth.isAuthenticated) {
          this.props.history.push({
            pathname: '/login',
            state: { message: this.props.auth.authError },
          });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authError) {
      this.props.history.push({
        pathname: '/login',
        state: { message: nextProps.auth.authError },
      });
    }
  }

  render() {
    const { orders, loading } = this.props.order;
    const { rowsPerPage, page } = this.state;
    return (
      <div>
        <Dialog
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Please wait</DialogTitle>
          <DialogContent>
            <CircularProgress />
            <DialogContentText id="alert-dialog-description">
                            Loading...
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Header title="Point of Sale System" />
        <Button
          variant="contained"
          color="default"
          style={{ marginTop: 15 }}
          onClick={() => this.props.history.push('/orders')}
        >
          <ViewList />
                    View Open Orders
        </Button>
        <Typography variant="headline" component="h1" style={styles.header}>
                    All Orders
        </Typography>

        {loading
          ? (() => { this.setState({ open: true }); })
          : (orders && orders.length !== 0 ? (
            <Paper style={styles.root}>
              <Table style={styles.table}>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#A9AEB2' }}>
                    <TableCell style={styles.row}>Order ID</TableCell>
                    <TableCell style={styles.row}>No of Items</TableCell>
                    <TableCell style={styles.row}>Total Amount</TableCell>
                    <TableCell style={styles.row}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
                    <TableRow key={order._id} hover>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>{this.calculateTotal(order.items)}</TableCell>
                      <TableCell>
                            {order.status === 'open' ? <Chip label="Open" color="primary" />
                                : <Chip label="Closed" color="secondary" />}
                          </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          ) : (
            <SnackbarContent
              style={{ backgroundColor: '#5181a5', margin: '0 auto' }}
              message={(
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon style={{ fontSize: 30, opacity: 0.9, marginRight: 10 }} />
                  {'No orders to display!'}
                </span>
                                )}
            />
          ))
                }

      </div>
    );
  }
}

AllOrders.propTypes = {
  getOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth,
});

export default connect(mapStateToProps, { getOrders })(AllOrders);
