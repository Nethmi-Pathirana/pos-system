import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import OrderList from './components/order/OrderList';
import OrderDetails from './components/order/OrderDetails';

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from="/" to="/login" />
                        <Route exact path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/orders" component={OrderList} />
                        <Route path="/order/:id" component={OrderDetails} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );

    }
}

export default Main;