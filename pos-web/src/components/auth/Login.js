import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/es/Typography/Typography';
import TextField from '@material-ui/core/es/TextField/TextField';
import Button from '@material-ui/core/es/Button/Button';
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel';
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import InfoIcon from '@material-ui/icons/Info';
import Header from '../common/Header';
import { loginUser } from '../../actions/AuthActions';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formPaper: {
    padding: '2%',
    marginTop: '5%',
    marginLeft: '38%',
    width: '20%',
  },
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      showMsg: false,
      message: '',
    };
    this.authenticate = this.authenticate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/orders');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.alert.success('Login sucessful!');
      this.props.history.push('/orders');
    }

    if (nextProps.errors.error !== '') {
      this.showError(nextProps.errors.error);
    }
  }

  authenticate(e) {
    e.preventDefault();
    const authDetails = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.loginUser(authDetails);
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
        <Header title="Login" hideUserSettings />
        {(this.props.location.state && this.props.location.state.message !== '')
          ? (
            <SnackbarContent
              style={{
                backgroundColor: '#b72e24', margin: '0 auto', width: '15%', marginTop: '2%',
              }}
              message={(
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon style={{ fontSize: 30, opacity: 0.9, marginRight: 10 }} />
                  {this.props.location.state.message}
                </span>
)}
            />
          ) : <div />}

        <form style={styles.container} noValidate autoComplete="off" onSubmit={this.authenticate}>
          <Paper style={styles.formPaper}>

            <Typography variant="headline" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Login
            </Typography>
            <TextField
              id="username"
              label="Username"
              margin="normal"
              style={{ marginRight: '10%', width: '100%' }}
              type="text"
              onChange={e => this.handleChange('username', e)}
            />
            <TextField
              id="password"
              label="Password"
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
                                Login
              </Button>
              <br />
              <br />
              <InputLabel style={{ display: 'inline' }} htmlFor="adornment-amount">Don't have an account?</InputLabel>
              <Link to="/signup"><Button>Register</Button></Link>
            </center>
          </Paper>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withAlert(Login));
