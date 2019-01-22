import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/OrderActions';
import Header from '../common/Header';
import Typography from '@material-ui/core/Typography';
import OrderTable from './OrderTable';
import { Dialog, DialogContent, DialogContentText, DialogTitle, LinearProgress} from '@material-ui/core';

const styles = {
    root:{
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: '5%',
        marginLeft: '20%',
        marginRight: '20%',
        textAlign:'center',
        fontSize: 40,
        color: '#29428c'

    }
};

class OrderList extends Component{
    constructor(){
        super();
        this.state = {
            open:false
        }

    }

    componentDidMount() {
        this.props.getOrders();
    }

    render(){
        const { orders, loading } = this.props.order;
        return(
            <div>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Please wait"}</DialogTitle>
                    <DialogContent>
                        <LinearProgress />
                        <DialogContentText id="alert-dialog-description">
                            Loading...
                        </DialogContentText>

                    </DialogContent>
                </Dialog>
                <Header title={'Point of Sale System'}/>
                <Typography variant="headline" component="h1" style={styles.root}>
                    Open Orders
                </Typography>

                {loading ? 
                (()=> {this.setState({open: true})}):
                (
                    <OrderTable orders={orders} />
                )
                }
            </div>
        );
    }
}

OrderList.propTypes = {
    getOrders: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order
});
export default connect(mapStateToProps, { getOrders })(OrderList);
