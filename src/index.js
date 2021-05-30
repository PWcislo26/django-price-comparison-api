import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import './index.css';
import { Route, BrowserRouter , Switch } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Product from './components/DetailedProduct';
import Watchlist from './components/Watchlist';
import Guide from './components/Guide';
import {CookiesProvider} from 'react-cookie';
import theme from './components/theme';

function Routing() {

	return(
		<React.StrictMode>
			<CookiesProvider>
				<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Header />
					<Switch>						
						<Route exact path="/" component={App} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/logout" component={Logout} />
						<Route path="/product/:product_id" component={Product} />
						<Route path="/watchlist" component={Watchlist}/>
						<Route path="/guide" component={Guide}/>
					</Switch>
					<Footer />
				</BrowserRouter>
				</ThemeProvider>
			</CookiesProvider>
		</React.StrictMode>	
	)
	
};

ReactDOM.render(<Routing/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
