import React, { useContext } from "react";
import { SeasonContext } from "./../contexts/SeasonContext";
// -----------------------------------------------
import "./../styles/seasons.css";
// -----------------------------------------------
const SeasonsList = () => {
	//this loop returns the last 3 years seasons for display
	let seasonsChoice = [];
	for (let i = 3; i > 0; i--) {
		seasonsChoice.push({ year: new Date().getFullYear() - i, id: i });
	}

	const { chooseSeason } = useContext(SeasonContext);

	return (
		<div className="SeasonsList d-flex justify-content-start">
			<h2 className="section-title">last seasons</h2>
			<div className="d-flex justify-content-around">
				{seasonsChoice.map((choice) => (
					<button
						key={choice.id}
						type="button"
						className="season btn btn-outline-danger "
						onClick={() => chooseSeason(choice.year)}
					>
						{choice.year} - {choice.year + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default SeasonsList;
