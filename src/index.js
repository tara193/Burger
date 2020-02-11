import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import thunk from  'redux-thunk';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import {watchAuth,watchBurgerBuilder,watchOrder} from './store/saga'

const composeEnhancers = process.env.NODE_ENV==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orderReducer,
    auth:authReducer
});

const sagaMiddleware = createSagaMiddleware();
//const store=createStore(rootReducers,applyMiddleware(thunk));
const store = createStore(rootReducers, composeEnhancers(   
        applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
        
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
