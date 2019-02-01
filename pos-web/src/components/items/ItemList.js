import React, { Component } from 'react';
import {
  Button, InputLabel, GridList, Card, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import {
  Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';
import AddCart from '@material-ui/icons/AddShoppingCart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../../actions/ItemActions';
import { addItem, setIems } from '../../actions/OrderActions';
import store from '../../store';

const styles = {
  card: {
    display: 'flex',
    width: '20%',
    margin: '2%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 5,
    paddingBottom: 5,
  },
  gridList: {
    width: '100%',
  },
};

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showMsg: false,
      message: {},
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getNotSelectedItems = this.getNotSelectedItems.bind(this);
    this.getItemArray = this.getItemArray.bind(this);
  }

  componentDidMount() {
    this.props.getItems().then(() => {
      this.getNotSelectedItems();
    });
  }

  getItemArray(items) {
    const itemArray = [];
    items && items.map((x) => {
      itemArray.push(x.item._id);
    });
    return itemArray;
  }

  getNotSelectedItems() {
    const filteredItemsArray = [];
    const orderedItems = this.getItemArray(store.getState().order.order.items);
    const allItems = store.getState().item.items;

    allItems.map((x) => {
      if (!orderedItems.includes(x._id)) {
        filteredItemsArray.push(x);
      }
    });
    this.props.setIems(filteredItemsArray);
  }

  handleAddItem(id) {
    if (document.getElementById(id).value === '' || document.getElementById(id).value === '0') {
      this.setState({ showMsg: true });
      return;
    }
    this.addItem(id);
  }

  handleClose() {
    this.setState({ open: false, showMsg: false });
  }

  addItem(id) {
    const quantity = document.getElementById(id).value;
    const item = {
      itemID: id,
      quantity,
    };
    this.props.addItem(store.getState().order.order._id, item).then(() => {
      this.getNotSelectedItems();
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
          message="Please specify the amount"
          action={[
            <Button color="secondary" size="small" onClick={this.handleClose}>
                            OK
            </Button>,
          ]}
        />
        <Dialog
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                            You are trying to change an existing item in the order. Are you sure?
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`Item Name: ${this.state.message.name}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`Quantity: ${this.state.message.quantity}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.addItem(this.state.message.id)} color="primary">
                            Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
                            Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <GridList cellHeight={160} style={styles.gridList} cols={3}>
          {store.getState().order.itemsToSelect.map(tile => (
            <Card key={tile._id} style={styles.card}>
              <div style={styles.details}>
                <CardContent style={styles.content}>
                  <Typography component="h5" variant="h5">
                    {tile.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`\$${tile.price}`}
                  </Typography>
                  <InputLabel>Quantity</InputLabel>
                  {' '}
                  <br />
                  <input type="number" min="1" name="Quantity" id={tile._id} />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 5 }}
                    onClick={() => this.handleAddItem(tile._id)}
                  >
                    <AddCart />
                    Add
                  </Button>
                </CardContent>
              </div>
              <CardMedia
                style={{ width: 200, margin: '0 auto' }}
                image={tile.img}
                title="Apple"
              />
            </Card>
          ))}
        </GridList>
      </div>
    );
  }
}

ItemList.propTypes = {
  setIems: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  item: state.item,
  order: state.order,
});

export default connect(mapStateToProps, { getItems, addItem, setIems })(ItemList);
