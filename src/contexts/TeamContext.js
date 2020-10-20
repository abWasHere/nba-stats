import React, { createContext, useState, useEffect } from "react";
import apiHandler from "./../api/apiHandler";

export const TeamContext = createContext();

const TeamContextProvider = (props) => {
	const [allTeams, setAllTeams] = useState([]);
	const [teamsAreLoading, setTeamsLoading] = useState();

	const [team, setTeam] = useState();
	const [teamMembers, setTeamMembers] = useState();

	useEffect(() => {
		setTeamsLoading(true);
		apiHandler
			.getAllTeams()
			.then((apiRes) => {
				setAllTeams(apiRes);
			})
			.then(() => setTeamsLoading(false))
			.catch((err) => console.log(err));
	}, []);

	const chooseTeam = (choice) => {
		setTeam(choice);
		if (choice) console.log("team pick =", choice.city + choice.name);
	};

	// -------------------- Context Provider

	return (
		<TeamContext.Provider
			value={{
				allTeams,
				teamsAreLoading,
				team,
				chooseTeam,
				teamMembers,
				setTeamMembers,
			}}
		>
			{props.children}
		</TeamContext.Provider>
	);
};

export default TeamContextProvider;
