import React from "react";
import SeasonContextProvider from "./../contexts/SeasonContext";
import PlayersContextProvider from "./../contexts/PlayersContext";
import TeamContextProvider from "./../contexts/TeamContext";
import SeasonsList from "./../components/SeasonsList";
import TeamsList from "./teams/TeamsList";
import BestPlayers from "./players/BestPlayers";
import TeamGames from "./teams/TeamGames";

import "./../styles/dashboard.css";

const Dashboard = () => {
	return (
		<div className="Dashboard">
			<SeasonContextProvider>
				<SeasonsList />
				<TeamContextProvider>
					<TeamsList />
					<PlayersContextProvider>
						<BestPlayers />
						<TeamGames />
					</PlayersContextProvider>
				</TeamContextProvider>
			</SeasonContextProvider>
		</div>
	);
};

export default Dashboard;
