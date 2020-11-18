import React, { createContext, useState } from "react";

export const SeasonContext = createContext();

const SeasonContextProvider = (props) => {
	const [season, setSeason] = useState(2019);

	/* --- Context Provider --- */

	return (
		<SeasonContext.Provider value={{ season, setSeason }}>
			{props.children}
		</SeasonContext.Provider>
	);
};

export default SeasonContextProvider;
