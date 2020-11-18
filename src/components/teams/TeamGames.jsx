import React, { useContext, useEffect, useState } from "react";
import { SeasonContext } from "./../../contexts/SeasonContext";
import { TeamContext } from "./../../contexts/TeamContext";
import apiHandler from "./../../api/apiHandler";
// -----------------------------------------------
import "./../../styles/teamGames.css";
// -----------------------------------------------

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

					console.log("putting GAMES from API in local storage");
					window.localStorage.setItem(gamesKey, JSON.stringify(allData));
					setGames({
						allGames: allData,
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

	/*  */

	const highlightScores = (homeScore, visitorScore, homeTeam, visitorTeam) => {
		return homeScore >= visitorScore ? (
			<>
				<div className="col-2 game-score ">
					<p className="strong">
						{homeTeam} {homeScore}
					</p>
				</div>

				<div className="col-2 game-score">
					<p>
						{visitorTeam} {visitorScore}
					</p>
				</div>
			</>
		) : (
			<>
				<div className="col-2 game-score ">
					<p>
						{homeTeam} {homeScore}
					</p>
				</div>

				<div className="col-2 game-score">
					<p className="strong">
						{visitorTeam} {visitorScore}
					</p>
				</div>
			</>
		);
	};

	const calcWins = (theGames) => {
		if (team && season)
			return theGames.filter(
				(game) =>
					(game["home_team"]["id"] === team.id &&
						game["home_team_score"] > game["visitor_team_score"]) ||
					(game["visitor_team"]["id"] === team.id &&
						game["visitor_team_score"] > game["home_team_score"])
			).length;
	};

	const calcDefeats = (theGames) => {
		if (team && season) return theGames.length - calcWins(theGames);
	};

	const calcDraws = (theGames) => {
		if (team && season)
			return theGames.filter(
				(game) => game["home_team_score"] === game["visitor_team_score"]
			).length;
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
						{season} {team.full_name} games
					</h2>

					<div className="container">
						<div className="games-totals flex sp-center">
							<p>
								{" "}
								<b>{games.allGames.length}</b> GAMES
							</p>
							<p>
								<b>{calcWins(games.allGames)}</b> WINS{" "}
							</p>
							<p>
								<b>
									{(
										(calcWins(games.allGames) * 100) /
										games.allGames.length
									).toFixed(1)}{" "}
									%{" "}
								</b>
								WINS
							</p>
							<p>
								<b>{calcDefeats(games.allGames)}</b> DEFEATS
							</p>

							<p>
								<b>{calcDraws(games.allGames)}</b> DRAWS
							</p>
						</div>
						<div className="row headers">
							<div className="col strong">Date</div>
							<div className="col strong">Opponent</div>
							<div className="col-2 strong">Home</div>
							<div className="col-2 strong">Visitor</div>
						</div>
					</div>

					<div className="container">
						{games.allGames.map((game, ind) => (
							<div className="row" key={ind}>
								<div className="col game-date">
									<p>{game.date.slice(0, 10).replace(/-/g, " ")}</p>
								</div>
								{/* if team is at home */}
								{game.home_team.id === team.id && (
									<div className="col game-opponent">
										<p>{game.visitor_team.full_name}</p>
									</div>
								)}
								{/* if team is the visitor */}
								{game.visitor_team.id === team.id && (
									<div className="col game-opponent">
										<p>{game.home_team.full_name}</p>
									</div>
								)}
								<>
									{highlightScores(
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
