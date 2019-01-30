import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrder, setIems, deleteOrder } from '../../actions/OrderActions';
import Header from '../common/Header';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { AppBar, Button, Table, TableHead, TableRow, TableCell, TableBody, Divider } from '@material-ui/core';
import { DialogContent, CircularProgress, DialogContentText, Dialog, DialogTitle } from '@material-ui/core';
import OrderTable from '../order/OrderTable';
import ItemList from '../items/ItemList';
import Back from '@material-ui/icons/ArrowBack';
import Money from '@material-ui/icons/AttachMoney';

const styles = {
    header: {
        marginTop: '2%',
        marginLeft: '1%',
        color: '#29428c'
    },
    table: {
        minWidth: 700,
    },
    row: {
        fontWeight: 'bold',
        fontSize: 14
    },
    cell: {
        fontWeight: 'bold',
        fontSize: 25
    }

};

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.calculateTotal = this.calculateTotal.bind(this);
        this.getOrderedItems = this.getOrderedItems.bind(this);
        this.handlePay = this.handlePay.bind(this);
    }

    componentDidMount() {
        this.props.getOrder(this.props.match.params.id)
        .then(()=>{
            if (!this.props.auth.isAuthenticated) {
                this.props.history.push({
                    pathname: '/login',
                    state: { message: this.props.auth.authError }
                });
            }
        });
    }

    calculateTotal(items) {
        var total = 0;
        items.map(x => {
            total = total + (x.item.price * x.quantity);
        })
        return `\$${total}`;
    }

    handlePay(orderId) {
        this.props.deleteOrder(orderId).then((res) => {
            this.props.getOrder(orderId);
            this.props.history.push('/orders');
        });
    }

    getOrderedItems(items) {
        let itemArray = [];
        items && items.map(x => {
            itemArray.push(x.item._id);
        });
        return itemArray;
    };

    render() {
        const { order, loading } = this.props.order;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Please wait"}</DialogTitle>
                    <DialogContent>
                        <CircularProgress />
                        <DialogContentText id="alert-dialog-description">
                            Loading...
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Header title={'Point of Sale System'} />

                <AppBar position="static" style={{ backgroundColor: "#838cbb" }}>
                    <Typography style={{ alignItems: 'center' }}>
                        {<Back style={{ color: "white" }} />}
                        <Link to={"/orders"} style={{ textDecoration: 'none', color: "white", fontSize: 18, alignContent: 'center' }}>
                            Orders
                        </Link>
                    </Typography>
                </AppBar>

                <Typography variant="headline" component="h1" style={styles.header}>
                    Order Details
                </Typography>
                <Divider />
                {loading ? (
                    () => { this.setState({ open: true }) }
                ) : (
                        <div>
                            <div style={{ marginTop: '1%', textAlign: 'center' }}>
                                <Button onClick={() => this.handlePay(order._id)} variant="contained" color="primary">
                                    <Money />
                                    Pay Order
                                </Button>
                            </div>
                            <Paper style={{ width: '50%', margin: 'auto', backgroundColor: '#D8DDE1', marginTop: '1%' }}>
                                <Table style={styles.table}>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell style={styles.row}>Order ID</TableCell>
                                            <TableCell style={styles.row}>Order Status</TableCell>
                                            <TableCell style={styles.row}>No of Items</TableCell>
                                            <TableCell style={styles.row}>Order Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell style={styles.cell}>{this.props.match.params.orderId}</TableCell>
                                            <TableCell style={styles.cell}>{order.status}</TableCell>
                                            <TableCell style={styles.cell}>{order.items && order.items.length}</TableCell>
                                            <TableCell style={styles.cell}>{order.items && this.calculateTotal(order.items)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                            <Typography variant="headline" component="h1" style={styles.header}>
                                Product Details
                        </Typography>
                            <Divider />
                            <OrderTable items={order.items} />

                            <Typography variant="headline" component="h1" style={styles.header}>
                                Add more items to the order
                        </Typography>
                            <Divider />
                            <ItemList orderID={order._id} orderedItems={this.getOrderedItems(order.items)} />
                        </div>
                    )}
            </div>
        );
    }
}

OrderDetails.propTypes = {
    getOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    setIems: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order,
    auth: state.auth
});

export default connect(mapStateToProps, { getOrder, setIems, deleteOrder })(OrderDetails);