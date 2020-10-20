import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";

import "./../../styles/playerProfile.css";

const glossary = {
	F: "Forward-center",
	SF: "Small Forward",
	PF: "Power Forward",
	G: "Guard",
	PG: "Point Guard",
	SG: "Shooting Guard",
	C: "Center",
};

const PlayerProfile = () => {
	const { playerProfile } = useContext(PlayersContext);
	var pos = playerProfile.position;

	return (
		<div
			className="modal fade"
			id="player-modal"
			tabIndex="-1"
			aria-labelledby="player-modal-label"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="player-modal-label">
							{playerProfile.last_name} {playerProfile.first_name}
						</h5>
					</div>
					<div className="modal-body">
						<p className="modal-team-name">{playerProfile.team.full_name}</p>
						<p>
							<b>Position : </b>
							{glossary[pos]} ({playerProfile.position})
						</p>
						<p>
							<b>Height : </b> {playerProfile.height_feet} feet &{" "}
							{playerProfile.height_inches} inches
						</p>
						<p>
							<b>Weight :</b> {playerProfile.weight_pounds} pounds
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerProfile;
