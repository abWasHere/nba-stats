import React, { useContext } from "react";
import { SeasonContext } from "./../contexts/SeasonContext";
// -----------------------------------------------
import "./../styles/seasons.css";
// -----------------------------------------------
const SeasonsList = () => {
	//this loop returns the last 3 years seasons for display
	let seasonsChoice = [];
	for (let i = 3; i > 0; i--) {
		seasonsChoice.push(new Date().getFullYear() - i);
	}

	const { setSeason } = useContext(SeasonContext);
	const chooseSeason = (year) => {
		setSeason(year);
		console.log("season pick =", year);
	};

	return (
		<div className="SeasonsList d-flex justify-content-start">
			<h2 className="section-title">last seasons</h2>
			<div className="btn-group btn-group-toggle " data-toggle="buttons">
				{seasonsChoice.map((year, ind) => (
					<label
						key={ind}
						className="btn btn-danger season"
						onClick={() => chooseSeason(year)}
					>
						<input
							type="radio"
							name="season"
							id={`${year}season`}
							autoComplete="off"
						/>
						{year} <br /> {year + 1}
					</label>
				))}
			</div>
		</div>
	);
};

export default SeasonsList;
