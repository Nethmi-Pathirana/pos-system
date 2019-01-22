import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/orders');
        }
    }

    render(){ //TODO
        return(
            <div>
                <Link to="/signup" >
                  Sign Up
                </Link>
                <Link to="/login" >
                  Login
                </Link>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);