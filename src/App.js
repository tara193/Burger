import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import * as actionCreator from './store/action/index';
import Logout from './containers/Auth/Logout/Logout';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const Order = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const app = props => {
  
  const { onTryAutoAuth } = props;
  useEffect(() => {
    onTryAutoAuth();
  }, [onTryAutoAuth]);

  let routes =
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>

  if (props.isAuthenticated) {
    routes =
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Order {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}> {routes} </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoAuth: () => dispatch(actionCreator.checkAuthData())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
