import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, Table, TableHead, TableRow, TableCell, IconButton, TableBody, TablePagination, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, addItem, setIems } from '../../actions/OrderActions';
import Paper from '@material-ui/core/Paper';
import store from '../../store';

const styles = {
    root: {
        marginLeft: '10%',
        width: '80%',
        overflowX: 'auto',
        marginTop: '2%'
    },
    table: {
        minWidth: 700,
    },
    row: {
        fontWeight: 'bold',
        fontSize: 14
    }
};

class OrderTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsPerPage: 5,
            page: 0
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    getItemArray(items) {
        let itemArray = [];
        items && items.map(x => {
            itemArray.push(x.item._id);
        });
        return itemArray;
    }

    getNotSelectedItems() {
        let filteredItemsArray = []
        const orderedItems = this.getItemArray(store.getState().order.order.items);
        const allItems = store.getState().item.items;

        allItems.map(x => {
            if (!orderedItems.includes(x._id)) {
                filteredItemsArray.push(x);
            }
        });
        this.props.setIems(filteredItemsArray);
    }

    handleChangePage(page) {
        this.setState({ page });
    };

    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleDeleteItem(id) {
        this.props.deleteItem(store.getState().order.order._id, id).then((res) => {
            this.getNotSelectedItems();
        });
    };

    handleQuantityChange(id) {
        let quantity = document.getElementById(id).value;
        let item = {
            itemID: id,
            quantity: quantity
        };
        this.props.addItem(store.getState().order.order._id, item);
    }

    render() {
        const { items } = this.props;
        const { rowsPerPage, page } = this.state;

        return (
            <div>
                <Paper style={styles.root}>
                    <Table style={styles.table}>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#A9AEB2' }}>
                                <TableCell style={styles.row}>Item # </TableCell>
                                <TableCell style={styles.row}>Item Name</TableCell>
                                <TableCell style={styles.row}>Unit Price</TableCell>
                                <TableCell style={styles.row}>Quantity</TableCell>
                                <TableCell style={styles.row}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items && items.length === 0 ? (
                                <div>
                                    <Typography variant={"caption"} style={{ fontSize: 18 }}>
                                        Add items to the order from below
                                    </Typography>
                                </div>
                            ) : (
                                    <div style={{ display: 'contents' }}>
                                        {items && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        {
                                                            <div>
                                                                <Tooltip title="Delete Item" placement="top">
                                                                    <IconButton onClick={() => this.handleDeleteItem(item.item._id)} style={{ marginRight: 5 }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                {index + 1}
                                                            </div>
                                                        }
                                                    </TableCell>
                                                    <TableCell>{item && item.item.name}</TableCell>
                                                    <TableCell>{item && `\$${item.item.price}`}</TableCell>
                                                    <TableCell>
                                                        <input type="number" min="0" defaultValue={item.quantity}
                                                            onChange={() => this.handleQuantityChange(item.item._id)}
                                                            id={item.item._id}></input>
                                                    </TableCell>
                                                    <TableCell >
                                                        {item && `\$${item.item.price * item.quantity}`}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </div>
                                )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={items && items.length}
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
            </div>
        );
    }
}

OrderTable.propTypes = {
    addItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    setIems: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    order: state.order
});

export default connect(mapStateToProps, { deleteItem, addItem, setIems })(OrderTable);