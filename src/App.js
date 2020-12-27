//import logo from './logo.svg';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './components/home'
import Amende from './components/amende'
import Usager from './components/liste_usager'
import Infraction from './components/infraction'
import Login from './components/login'
import RegisterUser from './components/registration_user'
import RegisterPolice from './components/registration_policier'
import ListInfraction from './components/liste_infraction'
import Navigation from './components/navigation_bar'

function App() {
    return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register_user" component={RegisterUser} />
				<Route path="/register_police" component={RegisterPolice} />
				<Route path="/infraction" component={Infraction} />
				<Route path="/amende" component={Amende} />
				<Route path="/usager" component={Usager} />
				<Route path="/all_infractions" component={ListInfraction} />
			</Switch>
		</BrowserRouter>
    );
}

export default App;
