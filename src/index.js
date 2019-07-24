import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

//Import Reducer
import { reducerContact } from './Reducers/Contact'

//Import Main Component, SCSS, and Boostrap CSS
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'

const rootReducer = combineReducers({
  contacts: reducerContact,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const AppWithStore = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

render(AppWithStore, document.getElementById('root'));
