import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders, addOrder } from '../../actions/OrderActions';
import Header from '../common/Header';
import Typography from '@material-ui/core/Typography';
import OrdersTable from './OrdersTable';
import { Paper, Dialog, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import InfoIcon from '@material-ui/icons/Info';
import store from '../../store';

const styles = {
    header: {
        paddingBottom: 20,
        marginTop: '4%',
        marginLeft: '20%',
        marginRight: '20%',
        textAlign: 'center',
        fontSize: 40,
        color: '#29428c'

    },
    root: {
        marginLeft: '10%',
        width: '80%',
        overflowX: 'auto',
    },
};

class OrderList extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
        this.handleNewOrder = this.handleNewOrder.bind(this);
    }

    componentDidMount() {
        this.props.getOrders();
    }

    handleNewOrder(){
        this.props.addOrder({status: "open"}).then((result) => {
            this.props.history.push(`/order/${result.payload._id}/${store.getState().order.orders.length}`);
        });
    }

    render() {
        const { orders, loading } = this.props.order;
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
                <Header title={'Point of Sale System'} />
                <Typography variant="headline" component="h1" style={styles.header}>
                    Open Orders
                </Typography>

                {loading ?
                    (() => { this.setState({ open: true }) }) :
                    (orders.length !== 0 ? (
                        <Paper style={styles.root}>
                            <OrdersTable orders={orders} />
                        </Paper>
                    ) : (
                            <SnackbarContent
                                style={{ backgroundColor: '#346385', margin: '0 auto' }}
                                message={
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <InfoIcon style={{ fontSize: 30, opacity: 0.9, marginRight: 10 }} />
                                        {'No open orders to display!'}
                                    </span>
                                }
                            />
                        ))
                }
                <Tooltip title="Add Order" aria-label="Add" placement="top">
                    <Fab color="primary" aria-label="Add" style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
                        <AddIcon onClick={()=>{this.handleNewOrder()}} />
                    </Fab>
                </Tooltip>

            </div>
        );
    }
}

OrderList.propTypes = {
    getOrders: PropTypes.func.isRequired,
    addOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order
});
export default connect(mapStateToProps, { getOrders, addOrder })(OrderList);
