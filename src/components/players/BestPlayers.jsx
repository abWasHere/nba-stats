import React, { useContext } from "react";
import { SeasonContext } from "./../../contexts/SeasonContext";
import { PlayersContext } from "./../../contexts/PlayersContext";
import { TeamContext } from "./../../contexts/TeamContext";

import Stats from "./Stats";

// -----------------------------------------------
import "./../../styles/bestPlayers.css";
// -----------------------------------------------
const BestPlayers = () => {
	const { season } = useContext(SeasonContext);
	const { team } = useContext(TeamContext);
	const { playersAreLoading, statsAreLoading } = useContext(PlayersContext);

	//-----------
	if (!team)
		return (
			<div className="loading-message">Waiting for a team to be selected.</div>
		);
	return (
		<div className="BestPlayers">
			{playersAreLoading && (
				<div className="loading-message">
					Loading players infos... <div className="loader"></div>
				</div>
			)}

			{!statsAreLoading && (
				<div className="container">
					<h2 className="section-title">
						{season} {team.full_name} best players
					</h2>

					<div className="row">
						<div className="col strong">Total points</div>
						<div className="col strong">3 point field goals</div>
						<div className="col strong">Free throws</div>
						<div className="col strong">Offensive rebounds</div>
					</div>
					<div className="row">
						<div className="col">
							<Stats criteria="pts" />
						</div>
						<div className="col">
							<Stats criteria="fg3m" />
						</div>
						<div className="col">
							<Stats criteria="ftm" />
						</div>
						<div className="col">
							<Stats criteria="oreb" />
						</div>
					</div>
					<div>
						<p className="stats-infos">
							These stats are for the players from the last season's team. It
							does not mean these players were on the same team during the
							previous seasons. <br /> Also, the API does not have all the
							statistics and informations about the players.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default BestPlayers;
