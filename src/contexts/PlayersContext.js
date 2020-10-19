import React, { createContext, useEffect, useState, useContext } from "react";
import apiHandler from "../api/apiHandler";
import { SeasonContext } from "./SeasonContext";
import { TeamContext } from "./TeamContext";

export const PlayersContext = createContext();

const PlayersContextProvider = (props) => {
	const { season } = useContext(SeasonContext);
	const { team } = useContext(TeamContext);
	const [playersAreLoading, setPlayersLoading] = useState(true);
	const [statsAreLoading, setStatsLoading] = useState(true);
	const [players, setPlayers] = useState([]);
	const [stats, setStats] = useState([]);

	// -------------------- GET ALL PLAYERS
	useEffect(() => {
		setPlayersLoading(true);

		apiHandler
			.getAllPlayersFromSeason(season, 0)
			.then((apiRes) => {
				let totalPages = apiRes.meta.total_pages - 20; // FIXME: the amount of pages generates too many requests for this API. So I reduced them by 20.
				let reqArr = [];

				for (let page = 0; page < totalPages; page++) {
					reqArr.push(apiHandler.getAllPlayersFromSeason(season, page));
				}

				Promise.all(reqArr)
					.then((apiRes) => {
						let allData = [];
						for (let res of apiRes) {
							//console.log(res.data);
							allData.push(res.data);
						}
						setPlayers([...players, allData.flat()]);
					})
					.then(() => setPlayersLoading(false))
					.catch((err) => console.log(err));
			})

			.catch((err) => console.log(err));
	}, [team]);
	/* 
	// -------------------- GET STATS FROM EACH INDIVIDUAL PLAYER OF A TEAM

	useEffect(() => {
		setStatsLoading(true)

		let statsReqArr = [];

		for (let player of players) {
			// console.log("id ", player.id);
			statsReqArr.push(apiHandler.getOnePlayerStats(season, player.id));
		}

		Promise.all(statsReqArr)
			.then((apiRes) => {
				for (let res of apiRes) {
					console.log("individual STATS res == ", res);
					setStats(...stats, res);
				}
			})
			.then(() => setStatsLoading(false))
			.catch((err) => console.log(err));
	}, [playersAreLoading]); 
  */
	// -------------------- Context Provider

	return (
		<PlayersContext.Provider
			value={{
				players,
				playersAreLoading,
				statsAreLoading,
			}}
		>
			{props.children}
		</PlayersContext.Provider>
	);
};

export default PlayersContextProvider;
