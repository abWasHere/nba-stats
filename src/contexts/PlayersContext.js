import React, { createContext, useEffect, useState, useContext } from "react";
import apiHandler from "../api/apiHandler";
import { SeasonContext } from "./SeasonContext";
import { TeamContext } from "./TeamContext";

export const PlayersContext = createContext();

const PlayersContextProvider = (props) => {
	const { season } = useContext(SeasonContext);
	const { team, setTeamMembers } = useContext(TeamContext);

	const [players, setPlayers] = useState([]);
	const [playersAreLoading, setPlayersLoading] = useState();
	const [playerProfile, setPlayerProfile] = useState();

	const [statsAreLoading, setStatsLoading] = useState(true);
	const [stats, setStats] = useState([]);

	// --------------- GET ALL PLAYERS
	useEffect(() => {
		async function fetchPlayers() {
			setPlayersLoading(true);
			try {
				// first call to get the total pages of the API
				const apiRes1 = await apiHandler.getAllPlayersFromSeason(0);
				let totalPages = apiRes1.meta.total_pages; // FIXME: the amount of pages generates too many requests for this API.
				// creation of an array of requests (n times the amount of pages) to get the data from the API
				let reqArr = [];
				for (let page = 0; page < totalPages; page++) {
					reqArr.push(apiHandler.getAllPlayersFromSeason(page));
				}

				const apiRes2 = await Promise.all(reqArr);
				let allData = [];
				for (let res of apiRes2) {
					allData = [...allData, res.data];
				}
				setPlayers(allData.flat());
				setPlayersLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchPlayers();
	}, []);

	// --------------- GET STATS FROM EACH INDIVIDUAL PLAYER OF A TEAM

	useEffect(() => {
		setStatsLoading(true);

		if (team && !playersAreLoading) {
			let teamId = team.id;
			let playersFromTeam = players.filter(
				(player) => player.team.id === teamId && player.height_feet !== null
			);
			setTeamMembers(playersFromTeam);

			let idsQueryParam = "";
			for (let player of playersFromTeam) {
				idsQueryParam += `&player_ids[]=${player.id}`;
			}

			apiHandler
				.getPlayersStats(season, idsQueryParam)
				.then((dbRes) => setStats(dbRes))
				.then(() => setStatsLoading(false))
				.catch((err) => console.log(err));
		}
	}, [team, season]);

	// --------------- DISPLAY ONE PLAYER PROFILE
	const displayPlayerProfile = (person) => {
		setPlayerProfile(person);
		console.log("player pick =", person);
	};

	// --------------- Context Provider

	return (
		<PlayersContext.Provider
			value={{
				players,
				playersAreLoading,
				stats,
				statsAreLoading,
				playerProfile,
				displayPlayerProfile,
			}}
		>
			{props.children}
		</PlayersContext.Provider>
	);
};

export default PlayersContextProvider;
