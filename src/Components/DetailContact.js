import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { contactActions } from '../Reducers/Contact/Action'
import {
  Row, Card, Col, Button, Modal, Form
} from 'react-bootstrap'

const DetailContacts = ({handleEditContact, handleDeleteContact, contact}) => {
  if(contact){
    return (
      <Card className="mb-3 mt-5">
        <Card.Img variant="top" src={contact.photo} />
        <Card.Body>
          <Card.Title>
            <Link to={`/contacts/${contact.id}`}>{contact.firstName} {contact.lastName}</Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Age: {contact.age}</Card.Subtitle>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts.detail_contact.data
})

class DetailContact extends Component {
  constructor(props){
    super(props)

    this.state = {
      detailContact: null,
      show: false,
      showEdit: false,
      postId: '',
      title: '',
      body: ''
    }

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleInputTitle = this.handleInputTitle.bind(this)
    this.handleInputBody = this.handleInputBody.bind(this)
    this.handleEditContact = this.handleEditContact.bind(this)
    this.handleDeleteContact = this.handleDeleteContact.bind(this)
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    
    dispatch(contactActions.fetchDetailContact(match.params.uuid))
  }

  componentWillReceiveProps(newProps) {
    const { contact } = newProps

    this.setState({ detailContact: contact })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleSave() {
    const { dispatch, match } = this.props
    const { showEdit, postId, title, body } = this.state

    if(showEdit) {
      let data_edit = {
        title: title,
        body: body  
      }
      dispatch(contactActions.editingContact(postId, data_edit))
    } else {
      let data = {
        userId: match.params.id,
        title: title,
        body: body
      }
      dispatch(contactActions.addingContact(data))
    }
    this.setState({ show: false, showEdit: false })
  }

  handleShow() {
    this.setState({
      show: true,
      showEdit: false,
      title: '',
      body: ''
    });
  }

  handleInputTitle({ target }) {
    this.setState({ title: target.value })
  }

  handleInputBody({ target }) {
    this.setState({ body: target.value })
  }

  handleEditContact(id, title, body) {
    this.setState({
      show: true,
      showEdit: true,
      postId: id,
      title: title,
      body: body
    })
  }

  handleDeleteContact(id) {
    const { dispatch } = this.props
    let confirm_delete = window.confirm("Are You Sure to Delete this Post ?");
    if(confirm_delete){
      dispatch(contactActions.deletingContact(id))
    }
  }

  render() {
    const { contacts } = this.props
    console.log(contacts)

    return (
      <Row className="mb-4">
        <Col sm={12}>
          {contacts ? <DetailContacts handleEditContact={this.handleEditContact} handleDeleteContact={this.handleDeleteContact} contact={contacts} /> : ``}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control className="mb-3" size="sm" type="text" placeholder="Title" value={this.state.title} onChange={this.handleInputTitle}/>
              <Form.Control className="mb-3" as="textarea" rows="5" placeholder="Body" value={this.state.body} onChange={this.handleInputBody}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps)(DetailContact);
