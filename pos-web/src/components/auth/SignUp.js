import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel';
import Header from '../common/Header';
import { registerUser } from '../../actions/AuthActions';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formPaper: {
    padding: 50,
    marginTop: '10%',
    marginLeft: '35%',
    width: '20%',
  },
};

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showMsg: false,
      message: '',

    };
    this.register = this.register.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/orders');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.showError(nextProps.errors.error);
    }
  }

  register(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.registerUser(newUser, this.props.history);
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleClose() {
    this.setState({ showMsg: false });
  }

  showError(message) {
    this.setState({
      showMsg: true,
      message,
    });
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.showMsg}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={this.state.message}
          action={[
            <Button color="secondary" size="small" onClick={this.handleClose}>
                            OK
            </Button>,
          ]}
        />
        <Header title="Sign Up" hideUserSettings />
        <form style={styles.container} onSubmit={this.register}>
          <Paper style={styles.formPaper}>
            <Typography variant="headline" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Create a New Account
            </Typography>

            <TextField
              id="username"
              label="Enter Username"
              margin="normal"
              style={{ marginRight: '10%', width: '100%' }}
              type="text"
              onChange={e => this.handleChange('username', e)}
            />
            <TextField
              id="password"
              label="Enter Password"
              margin="normal"
              style={{ marginRight: '10%', width: '100%' }}
              type="password"
              onChange={e => this.handleChange('password', e)}
            />
            <br />
            <br />
            <br />
            <center>
              <Button variant="contained" color="primary" type="submit" style={{ width: '100%' }}>
                                Sign Up
              </Button>
              <br />
              <br />
              <InputLabel style={{ display: 'inline' }} htmlFor="adornment-amount">Have an account?</InputLabel>
              <Link to="/login"><Button>Login</Button></Link>
            </center>
          </Paper>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(SignUp);
