import React from "react";
import SeasonContextProvider from "./../contexts/SeasonContext";
import SeasonsList from "./../components/SeasonsList";

import "./../styles/dashboard.css";

const Dashboard = () => {
	return (
		<div className="Dashboard">
			<SeasonContextProvider>
				<SeasonsList />
			</SeasonContextProvider>
		</div>
	);
};

export default Dashboard;
