import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter , Switch } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import Product from './components/detailedProduct';
import {CookiesProvider} from 'react-cookie';

function Routing() {

	return(
		<React.StrictMode>
			<CookiesProvider>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route exact path="/" component={App} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/logout" component={Logout} />
						<Route path="/product/:product_id" component={Product} />
						
					</Switch>
					<Footer />
				</BrowserRouter>
			</CookiesProvider>
		</React.StrictMode>	
	)
	
};

ReactDOM.render(<Routing/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
