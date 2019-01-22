import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'; 
import TablePagination from '@material-ui/core/TablePagination';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        fontWeight:'bold',
        fontSize: 14
    }
};

class OrderTable extends Component {
    constructor(){
        super();
        this.state = {
            page: 0,
            rowsPerPage: 10,
        };
        this.calculateTotal = this.calculateTotal.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    calculateTotal(items){
        return  '$20'; //TODO
    }

    handleChangePage (event, page) {
        this.setState({ page });
    };

    handleChangeRowsPerPage (event) {
        this.setState({ rowsPerPage: event.target.value });
    };

    render(){
        const { orders } = this.props;
        const { rowsPerPage, page } = this.state;
        return (
            <Paper className={styles.root}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow style={{backgroundColor:'#7c8185'}}>
                            <TableCell style={styles.row}>Order ID</TableCell>
                            <TableCell style={styles.row}>Total Amount</TableCell>
                            <TableCell style={styles.row}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <div style={{display:'contents'}}>
                                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => {
                                return ( 
                                    <TableRow hover>
                                        <TableCell>{order.status}</TableCell> 
                                        <TableCell>{this.calculateTotal(order.items)}</TableCell>
                                        <TableCell >    
                                            {<Link to={`/order/${order._id}`}>
                                                <Button variant="contained" color="primary">
                                                    View Order
                                                </Button>
                                            </Link>}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </div>
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
        );
    }
}

OrderTable.propTypes = {
    orders: PropTypes.array.isRequired
}

export default OrderTable;