import React from "react";

const TeamStats = ({ games, team }) => {
	const getGameStats = (theGames) => {
		let wins = theGames.filter(
			(game) =>
				(game["home_team"]["id"] === team.id &&
					game["home_team_score"] > game["visitor_team_score"]) ||
				(game["visitor_team"]["id"] === team.id &&
					game["visitor_team_score"] > game["home_team_score"])
		).length;

		let losses = theGames.length - wins;

		let draws = theGames.filter(
			(game) => game["home_team_score"] === game["visitor_team_score"]
		).length;

		let ptsMarked = theGames.reduce(
			(acc, val) =>
				val["home_team"]["id"] === team.id
					? acc + val["home_team_score"]
					: acc + val["visitor_team_score"],
			0
		);
		let ptsConceded = theGames.reduce(
			(acc, val) =>
				val["home_team"]["id"] === team.id
					? acc + val["visitor_team_score"]
					: acc + val["home_team_score"],
			0
		);

		return { wins, losses, draws, ptsMarked, ptsConceded };
	};

	return (
		<div className="TeamStats flex sp-center">
			<p>
				<b>{games.length}</b> GAMES
			</p>
			<p>
				<b>{getGameStats(games).wins}</b> WINS
			</p>
			<p>
				<b>{((getGameStats(games).wins * 100) / games.length).toFixed(1)}% </b>
				WINS
			</p>
			<p>
				<b>{getGameStats(games).losses}</b> LOSSES
			</p>

			<p>
				<b>{getGameStats(games).draws}</b> DRAWS
			</p>
			<div className="flex-col total-points">
				<div className="flex">
					<p className="points">
						<b>{getGameStats(games).ptsMarked}</b>
					</p>
					<p>
						points <br />
						marked
					</p>
				</div>
				<div className="flex">
					<p className="points">
						<b>{getGameStats(games).ptsConceded}</b>
					</p>
					<p>
						points <br />
						conceded
					</p>
				</div>
			</div>
		</div>
	);
};

export default TeamStats;
