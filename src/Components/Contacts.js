import React, { Component } from 'react'
import { contactActions } from '../Reducers/Contact/Action'
import { connect } from 'react-redux'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';

const mapStateToProps = (state) => ({
  contacts: state.contacts.contact,
  contact_detail: state.contacts.detail_contact
})

const mapDispatchToProps = (dispatch) => ({
  fetchDataContact: () => dispatch(contactActions.fetchDataContact()),
  fetchDetailContact: (id) => dispatch(contactActions.fetchDetailContact(id)),
  addContact: (payloads) => dispatch(contactActions.addingContact(payloads)),
  deleteContact: (id) => dispatch(contactActions.deletingContact(id)),
  editContact: (id, payloads) => dispatch(contactActions.editingContact(id, payloads))
})

class Contacts extends Component {
  constructor(props){
    super(props)

    this.state = {
      show: false,
      showEdit: false,
      showAdd: false,
      id: '',
      firstName: '',
      lastName: '',
      age: '',
      urlPhoto: ''
    }

    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleInputAge = this.handleInputAge.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleInputLastName = this.handleInputLastName.bind(this)
    this.handleInputUrlPhoto = this.handleInputUrlPhoto.bind(this)
    this.handleShowAddDialogs = this.handleShowAddDialogs.bind(this)
    this.handleInputFirstName = this.handleInputFirstName.bind(this)
    this.handleCloseAddDialogs = this.handleCloseAddDialogs.bind(this)
  }
  
  componentDidMount() {    
    this.props.fetchDataContact()
  }

  handleClickOpen(id) {
    this.props.fetchDetailContact(id).then(() => {
      this.setState({ show: true })
    })
  }

  handleShowAddDialogs() {
    this.setState({
      showAdd: true,
      firstName: '',
      lastName: '',
      age: '',
      urlPhoto: ''
    })
  }

  handleClose() {
    this.setState({
      show: false,
      showAdd: false
    })
  }

  handleInputFirstName(event) {
    this.setState({
      firstName: event.target.value
    })
  }

  handleInputLastName(event) {
    this.setState({
      lastName: event.target.value
    })
  }

  handleInputAge(event) {
    this.setState({
      age: event.target.value
    })
  }

  handleInputUrlPhoto(event) {
    this.setState({
      urlPhoto: event.target.value
    })
  }

  handleCloseAddDialogs() {
    this.setState({
      firstName: '',
      lastName: '',
      age: '',
      urlPhoto: '',
      showAdd: false
    })
  }

  handleSave() {
    const { id, firstName, lastName, age, urlPhoto, showEdit } = this.state

    let payloads = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: urlPhoto
    }

    if(showEdit) {
      this.props.editContact(id, payloads)
      this.setState({
        showEdit: false,
        showAdd: false
      })
    } else {
      this.props.addContact(payloads).then(() => {
        this.setState({
          showAdd: false
        })
      })
    }
  }

  handleEdit({ id, firstName, lastName, age, photo }) {
    this.setState({
      id: id,
      firstName: firstName,
      lastName: lastName,
      age: age,
      urlPhoto: photo,
      showAdd: true,
      showEdit: true
    })
  }

  handleDelete(idDelete) {
    let confirm_delete = window.confirm("Are You Sure to Delete this Post ?");
    if(confirm_delete){
      this.props.deleteContact(idDelete)
    }
  }

  listContacts(contact, i, callback) {
    return (
      <div key={i}>
        <ListItem alignItems="flex-start" button onClick={()=> callback(contact.id) }>
          <ListItemAvatar>
            <Avatar alt={`${contact.firstName} ${contact.lastName}`} src={contact.photo} />
          </ListItemAvatar>
          <ListItemText
            primary={`${contact.firstName} ${contact.lastName}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  Age {contact.age}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  }

  render() {
    const { contacts, contact_detail } = this.props
    const { show, showAdd, firstName, lastName, age, urlPhoto } = this.state

    let listContacts = contacts !== undefined ?  contacts.map((el, i) => (this.listContacts(el, i, this.handleClickOpen))) : ''
    
    return (
      <div>
        <List>
          {listContacts}
        </List>
        {contact_detail ?
          <Dialog
            open={show}
            keepMounted
            fullWidth
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={`${contact_detail.firstName} ${contact_detail.lastName}`} src={contact_detail.photo} style={style.AvatarImage()}/>
                </ListItemAvatar>
                <ListItemText
                  primary={`${contact_detail.firstName} ${contact_detail.lastName}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Age {contact_detail.age}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <div style={style.CloseButton()}>
                <IconButton onClick={() => this.handleDelete(contact_detail.id)}>
                  <Icon color="secondary">
                    delete
                  </Icon>
                </IconButton>
                <IconButton onClick={() => this.handleEdit(contact_detail)}>
                  <Icon color="action">
                    edit
                  </Icon>
                </IconButton>
                <IconButton aria-label="Close" onClick={this.handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
          </Dialog>
        : '' }
        <Dialog open={showAdd} onClose={this.handleCloseAddDialogs} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstname"
              label="First Name"
              type="text"
              name="firstName"
              fullWidth
              value={firstName}
              onChange={this.handleInputFirstName}
            />
            <TextField
              margin="dense"
              id="lastname"
              label="Last Name"
              type="text"
              name="lastName"
              fullWidth
              value={lastName}
              onChange={this.handleInputLastName}
            />
            <TextField
              margin="dense"
              id="age"
              label="Age"
              type="number"
              name="age"
              fullWidth
              value={age}
              onChange={this.handleInputAge}
            />
            <TextField
              margin="dense"
              id="urlphoto"
              label="URL Photo"
              type="text"
              name="urlPhoto"
              fullWidth
              value={urlPhoto}
              onChange={this.handleInputUrlPhoto}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAddDialogs} color="primary">
              Tutup
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
        <Fab color="primary" aria-label="Add" onClick={this.handleShowAddDialogs} style={style.FabButton()}>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}

const style = {
  AvatarImage: () => {
    return {
      height: '60px',
      width: '60px',
      marginRight: '20px'
    }
  },
  CloseButton: () => {
    return {
      position: 'absolute',
      right: '15px',
      top: '20px'
    }
  },
  FabButton: () => {
    return {
      position: 'fixed',
      right: '20%',
      bottom: '20%'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
