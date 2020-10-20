import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";
import { TeamContext } from "./../../contexts/TeamContext";
import PlayerDetails from "./PlayerProfile";

import "./../../styles/stats.css";

const FtmPlayersList = () => {
	const { teamMembers } = useContext(TeamContext);
	const {
		stats,
		statsAreLoading,
		playerProfile,
		displayPlayerProfile,
	} = useContext(PlayersContext);

	let statsFtm = [...stats].sort((a, b) => b.ftm - a.ftm);
	//console.log("ftm stats :", statsFtm);

	let playersFtmRank = [];
	for (let i = 0; i < 3; i++) {
		playersFtmRank[i] = teamMembers.filter(
			(player) => player.id === statsFtm[i].player_id
		)[0];
		playersFtmRank[i].ftm_stats = statsFtm[i].ftm.toFixed(2);
	}

	//------------------------

	if (statsAreLoading)
		return <div className="loading-message">Loading stats...</div>;

	return (
		<div className="FtmPlayersList StatsList">
			{playersFtmRank.map((player) => (
				<div
					key={player.id}
					className="d-flex justify-content-between rank"
					type="button"
					data-toggle="modal"
					data-target="#player-modal"
					onClick={() => displayPlayerProfile(player)}
				>
					<p>
						{player.first_name} {player.last_name}
					</p>
					<p className="rank-numbers">{player.ftm_stats}</p>
				</div>
			))}
			{playerProfile && <PlayerDetails />}
		</div>
	);
};

export default FtmPlayersList;
