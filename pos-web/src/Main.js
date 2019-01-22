import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/common/Landing';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import OrderList from './components/order/OrderList';
import OrderDetails from './components/order/OrderDetails';

class Main extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Landing} />
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