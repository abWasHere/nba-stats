import React, { createContext, useEffect, useState } from "react";
import apiHandler from "./../api/apiHandler";

export const SeasonContext = createContext();

const SeasonContextProvider = (props) => {
	const [season, setSeason] = useState([]);

	console.log("context");

	const chooseSeason = (choice) => {
		setSeason(choice);
		console.log("season pick", choice.year);
	};

	return (
		<SeasonContext.Provider value={{ season, chooseSeason }}>
			{props.children}
		</SeasonContext.Provider>
	);
};

export default SeasonContextProvider;
