import { types } from './Type'

const initialStates = {
  contact: [],
  detail_contact: []
}

export const reducerContact = (state = initialStates, action) => {
  const { contact } = state
  const { type, payload } = action
  
  switch(type){
    case types.FETCH_CONTACT_USER: {
      return {
        ...state,
        contact: payload.data
      }
    }
    case types.FETCH_CONTACT: {
      return {
        ...state,
        detail_contact: payload.data
      }
    }
    case types.ADD_CONTACT: {
      return {
        ...state
      }
    }
    case types.EDIT_CONTACT: {
      let updatedItem = contact.map(v => {
        if(v.id === payload.data.id){
          let data = {
            firstName: payload.data.firstName,
            lastName: payload.data.lastName,
            age: payload.data.age,
            photo: payload.data.photo
          }

          return {...v, ...data}
        }

        return v
      })
      return {
        contact: updatedItem
      }
    }
    case types.DELETE_CONTACT: {
      return {
        ...state,
        contact: contact.filter(v => v.id !== payload)
      }
    }
    default: {
      return state
    }
  }
}