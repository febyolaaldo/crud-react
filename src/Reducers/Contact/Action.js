import { types } from './Type'
import Http from '../../Configs/Services'

const API = new Http()

const fetchContactSuccess = (data) => {
  return { type: types.FETCH_CONTACT_USER, payload: data }
}

const fetchDetailContactSuccess = (data) => {
  return { type: types.FETCH_CONTACT, payload: data }
}

const addContact = () => {
  return { type: types.ADD_CONTACT }
}

const editContact = (data) => {
  return { type: types.EDIT_CONTACT, payload: data }
}

const deleteContact = (data) => {
  return { type: types.DELETE_CONTACT, payload: data }
}

export const contactActions = {
  fetchDataContact: () => {
    return (dispatch) => {
      return API.get('/contact', '')
        .then((result) => {
          dispatch(fetchContactSuccess(result))
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  fetchDetailContact: (id) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        return API.get('/contact/'+id,'')
          .then((result) => {
            dispatch(fetchDetailContactSuccess(result))
            resolve(result)
          }).catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  addingContact: (data) => {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        return API.post('/contact', '', data)
          .then((result) => {
            dispatch(addContact())
            resolve(result)
          }).catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  editingContact: (id, data) => {
    return (dispatch) => {
      return API.put('/contact/'+id, '', data)
        .then((result) => {
          dispatch(editContact(result))
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  deletingContact: (id) => {
    return (dispatch) => {
      return API.delete('/contact/'+id, '')
        .then((result) => {
          dispatch(deleteContact(id))
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}