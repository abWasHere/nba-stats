import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";
import { TeamContext } from "./../../contexts/TeamContext";
import PlayerProfileModal from "./PlayerProfileModal";

// FIXME: player profile appears after 2 clicks
// -----------------------------------------------
import "./../../styles/stats.css";
// -----------------------------------------------

const Stats = ({ criteria }) => {
	const {
		teamMembers,
		stats,
		statsAreLoading,
		choosePlayer,
		playerPicked,
	} = useContext(PlayersContext);

	let playersRank = [];
	if (stats.length > 2) {
		let statsRank = [...stats].sort((a, b) => b[criteria] - a[criteria]);

		for (let i = 0; i < 3; i++) {
			playersRank[i] = teamMembers.filter(
				(player) => player.id === statsRank[i].player_id
			)[0];
			playersRank[i].specific_stats = statsRank[i][criteria].toFixed(2);
		}
	}

	//------------------------

	if (statsAreLoading) return <div className="loader"></div>;

	if (!playersRank)
		return (
			<div className="Stats">
				<p className="loading-message">
					API did not return enough players for rendering stats
				</p>
			</div>
		);

	return (
		<div className="Stats">
			{playersRank.map((player) => (
				<div
					key={player.id}
					className="d-flex justify-content-between rank"
					type="button"
					data-toggle="modal"
					data-target="#player-modal"
					onClick={() => choosePlayer(player)}
				>
					<p>
						{player.first_name} {player.last_name}
					</p>
					<p className="rank-numbers">{player.specific_stats}</p>
				</div>
			))}

			{/* Show modal with player's profile */}
			{playerPicked && <PlayerProfileModal />}
		</div>
	);
};

export default Stats;
