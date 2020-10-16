import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/" component={Dashboard} />
				{/* <Route path="/player/{id}" component={PlayerDetails} /> */}
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
