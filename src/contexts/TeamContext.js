import React, { createContext, useState, useEffect } from "react";
import apiHandler from "./../api/apiHandler";

export const TeamContext = createContext();

const TeamContextProvider = (props) => {
	const [allTeams, setAllTeams] = useState(
		JSON.parse(window.localStorage.getItem("allTeams")) || []
	);
	const [teamsAreLoading, setTeamsLoading] = useState();
	const [team, setTeam] = useState();

	useEffect(() => {
		if (!JSON.parse(window.localStorage.getItem("allTeams"))) {
			setTeamsLoading(true);
			apiHandler
				.getAllTeams()
				.then((apiRes) => {
					console.log("putting ALL TEAMS in local storage");
					window.localStorage.setItem("allTeams", JSON.stringify(apiRes));
					setAllTeams(apiRes);
					setTeamsLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const chooseTeam = (choice) => {
		setTeam(choice);
		console.log("team pick =", choice.city + choice.name);
	};

	/* --- Context Provider --- */

	return (
		<TeamContext.Provider
			value={{
				allTeams,
				teamsAreLoading,
				team,
				chooseTeam,
			}}
		>
			{props.children}
		</TeamContext.Provider>
	);
};

export default TeamContextProvider;
