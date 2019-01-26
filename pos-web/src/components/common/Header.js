import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/AuthActions';

import { AppBar, IconButton, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



class Header extends Component {

    constructor() {
        super();
        this.state = {
            anchorEl: null,
        };
        this.renderRightLinks = this.renderRightLinks.bind(this);
    }

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose() {
        this.setState({ anchorEl: null });
    };

    handleLogout() {
        this.props.logoutUser();
        window.location.href = '/login';
    };

    renderRightLinks() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if (this.props.hideUserSettings) {
            return <div />;
        }

        let user;
        if (this.props.auth.isAuthenticated) {
            user = this.props.auth.user;
        }
        if (!user) {
            return (
                <Button style={{ marginRight: '5px' }} variant="contained" href="/login">
                    Login
                </Button>
            );
        }

        return (
            <div >
                <span>{user.username}</span>
                <IconButton onClick={this.handleMenu}>
                    <AccountCircle />
                </IconButton>
                <Menu anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleLogout}> Logout </MenuItem>
                </Menu>
            </div>
        );
    }

    render() {
        return (
            <AppBar position="static" style={{ backgroundColor: '#19188d' }}>
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        {this.props.title}
                    </Typography>
                    <div style={{ display: 'inline-block', position: 'absolute', right: 0 }}>
                        {this.renderRightLinks()}
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Header);
