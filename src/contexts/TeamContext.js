import React, { createContext, useState } from "react";

export const TeamContext = createContext();

const TeamContextProvider = (props) => {
	const [team, setTeam] = useState();

	const chooseTeam = (choice) => {
		setTeam(choice);
		if (choice) console.log("team pick =", choice.city + choice.name);
	};

	// -------------------- Context Provider

	return (
		<TeamContext.Provider
			value={{
				team,
				chooseTeam,
			}}
		>
			{props.children}
		</TeamContext.Provider>
	);
};

export default TeamContextProvider;
