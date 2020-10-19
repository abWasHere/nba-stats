import React, { createContext, useState } from "react";

export const SeasonContext = createContext();

const SeasonContextProvider = (props) => {
	const [season, setSeason] = useState(2019);

	const chooseSeason = (choice) => {
		setSeason(choice);
		console.log("season pick =", choice);
	};

	return (
		<SeasonContext.Provider value={{ season, chooseSeason }}>
			{props.children}
		</SeasonContext.Provider>
	);
};

export default SeasonContextProvider;
