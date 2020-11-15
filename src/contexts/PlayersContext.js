import React, { createContext, useEffect, useState, useContext } from "react";
import apiHandler from "../api/apiHandler";
import { SeasonContext } from "./SeasonContext";
import { TeamContext } from "./TeamContext";

export const PlayersContext = createContext();

const PlayersContextProvider = (props) => {
	const { season } = useContext(SeasonContext);
	const { team, setTeamMembers } = useContext(TeamContext);

	const [players, setPlayers] = useState(
		JSON.parse(window.localStorage.getItem("players")) || []
	);
	const [playersAreLoading, setPlayersLoading] = useState(false);
	const [playerPicked, setPlayerPicked] = useState(null);

	const [statsAreLoading, setStatsLoading] = useState(true);
	const [stats, setStats] = useState();

	/* --- GET ALL PLAYERS api call --- */

	useEffect(() => {
		async function fetchPlayers() {
			setPlayersLoading(true);

			try {
				// first call to get the total pages of the API
				const apiRes1 = await apiHandler.getAllPlayersFromAPI(0);
				let totalPages = apiRes1.meta.total_pages; // FIXME: the amount of pages generates too many requests for this API.

				// creation of an array of requests (n times the amount of pages) to get the data from the API
				let reqArr = [];
				for (let page = 0; page < totalPages; page++) {
					reqArr.push(apiHandler.getAllPlayersFromAPI(page));
				}

				// call API with all requests
				const apiRes2 = await Promise.all(reqArr);
				let allData = [];
				for (let res of apiRes2) {
					allData = [...allData, res.data];
				}

				// put players from API in local storage and in state
				console.log("putting players from API in local storage");
				window.localStorage.setItem("players", JSON.stringify(allData.flat()));
				setPlayers(allData.flat());
				setPlayersLoading(false); // => end
			} catch (error) {
				console.log(error);
				setPlayersLoading(false);
			}
		}
		if (!JSON.parse(window.localStorage.getItem("players"))) fetchPlayers();
	}, []);

	/* --- GET STATS from each player of the picked team --- */

	useEffect(() => {
		if (players && team) {
			//define a key name for data in local storage
			let teamStatsKey = `${season}${team.abbreviation}TeamStats`;
			console.log("teamStatsKey", teamStatsKey);

			let statsInLocalStorage = JSON.parse(
				window.localStorage.getItem(teamStatsKey)
			);

			//if this data exists => set state with it
			if (statsInLocalStorage) {
				console.log("getting stats from local storage");
				setStats(statsInLocalStorage);
				setStatsLoading(false); // => end

				//else : if nothing in local storage call the API to get the data
			} else {
				setStatsLoading(true);

				if (!playersAreLoading) {
					// get the players from the current team
					let teamId = team.id;
					let playersFromTeam = players.filter(
						(player) => player.team.id === teamId && player.height_feet !== null
					);
					setTeamMembers(playersFromTeam);

					// set the request with all their IDs
					let idsQueryParam = "";
					for (let player of playersFromTeam) {
						idsQueryParam += `&player_ids[]=${player.id}`;
					}

					// call the API to get the stats of the team
					apiHandler
						.getPlayersStats(season, idsQueryParam)
						.then((dbRes) => {
							window.localStorage.setItem(teamStatsKey, JSON.stringify(dbRes));
							setStats(dbRes);
							setStatsLoading(false); // => end
						})
						.catch((err) => {
							console.log(err);
							setStatsLoading(false);
						});
				}
			}
		}
	}, [team, season]);

	/* --- DISPLAY PROFILE of the choosen player --- */

	const choosePlayer = (person) => {
		console.log("player pick =", person);
		setPlayerPicked(person);
	};

	/* --- Context Provider --- */

	return (
		<PlayersContext.Provider
			value={{
				players,
				playersAreLoading,
				stats,
				statsAreLoading,
				playerPicked,
				choosePlayer,
			}}
		>
			{props.children}
		</PlayersContext.Provider>
	);
};

export default PlayersContextProvider;
