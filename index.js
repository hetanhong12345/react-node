import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './webConfig/routes'
/*style*/
import './less/loading.less'
var store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
console.log(store.getState());
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes}>

            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
)
