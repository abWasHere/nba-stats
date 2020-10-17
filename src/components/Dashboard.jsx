import React from "react";
import SeasonContextProvider from "./../contexts/SeasonContext";
import PlayersContextProvider from "./../contexts/PlayersContext";
import SeasonsList from "./../components/SeasonsList";

import "./../styles/dashboard.css";
import BestPlayers from "./players/BestPlayers";

const Dashboard = () => {
	return (
		<div className="Dashboard">
			<SeasonContextProvider>
				<SeasonsList />
				<PlayersContextProvider>
					<BestPlayers />
				</PlayersContextProvider>
			</SeasonContextProvider>
		</div>
	);
};

export default Dashboard;
