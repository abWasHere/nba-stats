import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";
import { TeamContext } from "./../../contexts/TeamContext";
import PlayerDetails from "./PlayerProfile";

import "./../../styles/stats.css";

const OrbPlayersList = () => {
	const { teamMembers } = useContext(TeamContext);
	const {
		stats,
		statsAreLoading,
		playerProfile,
		displayPlayerProfile,
	} = useContext(PlayersContext);

	let statsOrb = [...stats].sort((a, b) => b.oreb - a.oreb);
	//console.log("orb stats :", statsOrb);

	let playersOrbRank = [];
	for (let i = 0; i < 3; i++) {
		playersOrbRank[i] = teamMembers.filter(
			(player) => player.id === statsOrb[i].player_id
		)[0];
		playersOrbRank[i].orb_stats = statsOrb[i].oreb.toFixed(2);
	}

	//------------------------

	if (statsAreLoading)
		return <div className="loading-message">Loading stats...</div>;

	return (
		<div className="OrbPlayersList StatsList">
			{playersOrbRank.map((player) => (
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
					<p className="rank-numbers">{player.orb_stats}</p>
				</div>
			))}
			{playerProfile && <PlayerDetails />}
		</div>
	);
};

export default OrbPlayersList;
