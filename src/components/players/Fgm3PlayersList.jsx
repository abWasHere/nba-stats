import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";
import { TeamContext } from "./../../contexts/TeamContext";

import "./../../styles/stats.css";

const Fgm3PlayersList = () => {
	const { teamMembers } = useContext(TeamContext);
	const { stats, statsAreLoading } = useContext(PlayersContext);

	let statsFg3m = [...stats].sort((a, b) => b.fg3m - a.fg3m);
	//console.log("fg3m stats :", statsFg3m);

	let playersFg3mRank = [];
	for (let i = 0; i < 5; i++) {
		playersFg3mRank[i] = teamMembers.filter(
			(player) => player.id === statsFg3m[i].player_id
		)[0];
		playersFg3mRank[i].fg3m_stats = statsFg3m[i].fg3m.toFixed(2);
	}

	//------------------------

	if (statsAreLoading)
		return <div className="loading-message">Loading stats...</div>;

	return (
		<div className="Fgm3PlayersList StatsList">
			{playersFg3mRank.map((player) => (
				<div key={player.id} className="d-flex justify-content-between rank">
					<p>
						{player.first_name} {player.last_name}
					</p>
					<p className="rank-numbers">{player.fg3m_stats}</p>
				</div>
			))}
		</div>
	);
};

export default Fgm3PlayersList;
