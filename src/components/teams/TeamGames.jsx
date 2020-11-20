import React, { useContext, useEffect, useState } from "react";
import { SeasonContext } from "./../../contexts/SeasonContext";
import { TeamContext } from "./../../contexts/TeamContext";
import apiHandler from "./../../api/apiHandler";
import Logo from "./Logo";
// -----------------------------------------------
import "./../../styles/teamGames.css";
// -----------------------------------------------

function sortArrayByDates(array) {
	const formattedArr = array.map((game) => {
		let formattedDate = game["date"].slice(0, 10);
		return { ...game, ["date"]: formattedDate };
	});

	function dateToNum(d) {
		// Convert "YYYY-MM-DD" (string date) to YYYYMMDD (number)
		d = d.split("-");
		return Number(d[0] + d[1] + d[2]);
	}
	return formattedArr.sort(function (a, b) {
		return dateToNum(b["date"]) - dateToNum(a["date"]);
	});
}

const TeamGames = () => {
	const { season } = useContext(SeasonContext);
	const { team } = useContext(TeamContext);

	const [games, setGames] = useState({ allGames: [], areLoading: false });

	/* --- GET GAMES of a team for the given season --- */

	useEffect(() => {
		if (season && team) {
			setGames({ ...games, areLoading: true });

			let gamesKey = `${season}${team.abbreviation}TeamGames`;

			let gamesInLocalStorage = JSON.parse(
				window.localStorage.getItem(gamesKey)
			);

			async function fetchGames() {
				try {
					const apiRes1 = await apiHandler.getAllGamesOfTeam(
						season,
						team.id,
						0
					);
					let totalPages = apiRes1.meta.total_pages;

					let allData = [];

					if (totalPages === 1) {
						allData = apiRes1.data;
					} else {
						let reqArr = [];
						for (let page = 0; page < totalPages; page++) {
							reqArr.push(apiHandler.getAllGamesOfTeam(season, team.id, page));
						}
						const apiRes2 = await Promise.all(reqArr);
						for (let res of apiRes2) {
							allData = [...allData, ...res.data];
						}
					}

					const sortedData = await sortArrayByDates(allData);

					console.log("putting GAMES from API in local storage");
					window.localStorage.setItem(gamesKey, JSON.stringify(sortedData));
					setGames({
						allGames: sortedData,
						areLoading: false,
					}); // => end
				} catch (error) {
					console.log(error);
					setGames({ ...games, areLoading: false });
				}
			}

			/* if games for a given team & seasons are in local storage, get them, if not, call API */
			if (gamesInLocalStorage) {
				setGames({ allGames: gamesInLocalStorage, areLoading: false }); // => end
			} else {
				fetchGames();
			}
		}
	}, [season, team]);

	/* --- Statistic Functions --- */

	const displayScores = (
		homeScore,
		visitorScore,
		homeTeamAbb,
		visitorTeamAbb
	) => {
		return homeScore >= visitorScore ? (
			<>
				<div className="col-2 game-score flex sp-center ">
					<Logo teamAbbreviation={homeTeamAbb} />
					<p className="strong">
						{homeTeamAbb} {homeScore}
					</p>
				</div>

				<div className="col-2 game-score flex sp-center">
					<Logo teamAbbreviation={visitorTeamAbb} />
					<p>
						{visitorTeamAbb} {visitorScore}
					</p>
				</div>
			</>
		) : (
			<>
				<div className="col-2 game-score flex sp-center ">
					<Logo teamAbbreviation={homeTeamAbb} />
					<p>
						{homeTeamAbb} {homeScore}
					</p>
				</div>

				<div className="col-2 game-score flex sp-center">
					<Logo teamAbbreviation={visitorTeamAbb} />
					<p className="strong">
						{visitorTeamAbb} {visitorScore}
					</p>
				</div>
			</>
		);
	};

	const getGameStats = (theGames) => {
		if (team && season) {
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
			let ptsConceided = theGames.reduce(
				(acc, val) =>
					val["home_team"]["id"] === team.id
						? acc + val["visitor_team_score"]
						: acc + val["home_team_score"],
				0
			);

			return { wins, losses, draws, ptsMarked, ptsConceided };
		} else {
			return { wins: 0, losses: 0, draws: 0, ptsMarked: 0, ptsConceided: 0 };
		}
	};

	/* --- Render --- */

	if (!team) return <div className="loading-message"></div>;
	return (
		<div className="TeamGames">
			{games.areLoading ? (
				<div className="loader"></div>
			) : (
				<>
					<h2 className="section-title">
						{team.full_name}
						<br />
						{season} Games
					</h2>

					<div className="container">
						<div className="games-totals flex sp-center">
							<p>
								<b>{games.allGames.length}</b> GAMES
							</p>
							<p>
								<b>{getGameStats(games.allGames).wins}</b> WINS
							</p>
							<p>
								<b>
									{(
										(getGameStats(games.allGames).wins * 100) /
										games.allGames.length
									).toFixed(1)}{" "}
									%
								</b>
								WINS
							</p>
							<p>
								<b>{getGameStats(games.allGames).losses}</b> LOSSES
							</p>

							<p>
								<b>{getGameStats(games.allGames).draws}</b> DRAWS
							</p>
							<div className="flex-col">
								<p>
									<b>{getGameStats(games.allGames).ptsMarked}</b> POINTS MARKED
								</p>
								<p>
									<b>{getGameStats(games.allGames).ptsConceided}</b> POINTS
									CONCEDED
								</p>
							</div>
						</div>

						<div className="row headers">
							<div className="col-3 strong">Date</div>
							<div className="col-4 strong">Opponent</div>
							<div className="col-2 strong">Home</div>
							<div className="col-2 strong">Visitor</div>
						</div>
					</div>

					<div className="container">
						{games.allGames.map((game, ind) => (
							<div className="row" key={ind}>
								<div className="col-3 game-date">
									<p>{game.date}</p>
								</div>
								{/* if team is at home */}
								{game.home_team.id === team.id && (
									<div className="col-4 game-opponent">
										<p>{game.visitor_team.full_name}</p>
									</div>
								)}
								{/* if team is the visitor */}
								{game.visitor_team.id === team.id && (
									<div className="col-4 game-opponent">
										<p>{game.home_team.full_name}</p>
									</div>
								)}
								<>
									{displayScores(
										game.home_team_score,
										game.visitor_team_score,
										game.home_team.abbreviation,
										game.visitor_team.abbreviation
									)}
								</>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default TeamGames;
