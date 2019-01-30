import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteOrder } from '../../actions/OrderActions';
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    table: {
        minWidth: 700,
    },
    row: {
        fontWeight: 'bold',
        fontSize: 14
    }
};

class OrdersTable extends Component {
    constructor() {
        super();
        this.state = {
            page: 0,
            rowsPerPage: 10,
        };
        this.calculateTotal = this.calculateTotal.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
    }

    calculateTotal(items) {
        var total = 0;
        items.map(x => {
            total = total + (x.item.price * x.quantity);
        })
        return `\$${total}`;
    }

    handleChangePage(event, page) {
        this.setState({ page });
    };

    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleDeleteOrder(orderId){
        this.props.deleteOrder(orderId);
    }

    render() {
        const { orders } = this.props;
        const { rowsPerPage, page } = this.state;
        return (
            <div>
                <Table style={styles.table}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#A9AEB2' }}>
                            <TableCell style={styles.row}>Order ID</TableCell>
                            <TableCell style={styles.row}>No of Items</TableCell>
                            <TableCell style={styles.row}>Total Amount</TableCell>
                            <TableCell style={styles.row}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                            {orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => {
                                return (
                                    <TableRow key={order._id} hover>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.items.length}</TableCell>
                                        <TableCell>{this.calculateTotal(order.items)}</TableCell>
                                        <TableCell >
                                            {<Link to={`/order/${order._id}/${index + 1}`} style={{ textDecoration: 'none', marginRight:'1%' }}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon />
                                                    Edit Order
                                                </Button>
                                            </Link>}
                                            <Button onClick={()=> this.handleDeleteOrder(order._id)} variant="contained" color="secondary">
                                                <DeleteIcon />
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        
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
            </div>
        );
    }
}

OrdersTable.propTypes = {
    orders: PropTypes.array.isRequired,
    deleteOrder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    order: state.order
});

export default connect(mapStateToProps, {deleteOrder})(OrdersTable);