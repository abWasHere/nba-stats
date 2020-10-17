import React, { createContext, useEffect, useState, useContext } from "react";
import apiHandler from "../api/apiHandler";
import { SeasonContext } from "./SeasonContext";

export const PlayersContext = createContext();

const PlayersContextProvider = (props) => {
	const { season } = useContext(SeasonContext);

	const [isLoading, setLoading] = useState(false);
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		setLoading(true);
		apiHandler
			.getAllPlayersFromSeason(season.year)
			.then((dbRes) => {
				console.log("all players from db:", dbRes);
				let pages = dbRes.meta.total_pages;
				setPlayers(dbRes.data);
				console.log("pages", pages);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<PlayersContext.Provider value={{ players, isLoading }}>
			{props.children}
		</PlayersContext.Provider>
	);
};

export default PlayersContextProvider;
