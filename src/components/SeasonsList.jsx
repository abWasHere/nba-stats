import React, { useContext } from "react";
import { SeasonContext } from "./../contexts/SeasonContext";
// -----------------------------------------------
import "./../styles/seasons.css";
// -----------------------------------------------
const SeasonsList = () => {
	let seasonsChoice = [];
	for (let i = 3; i > 0; i--) {
		seasonsChoice.push({ year: new Date().getFullYear() - i, id: i });
	}

	const { chooseSeason } = useContext(SeasonContext);

	return (
		<div className="SeasonsList">
			<h2 className="section-title">last seasons</h2>
			<div className="d-flex justify-content-around">
				{seasonsChoice.map((choice) => (
					<button
						key={choice.id}
						type="button"
						class="season btn "
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
