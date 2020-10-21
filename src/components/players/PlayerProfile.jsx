import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";

import "./../../styles/playerProfile.css";

const glossary = {
	F: "Forward",
	SF: "Small Forward",
	PF: "Power Forward",
	G: "Guard",
	PG: "Point Guard",
	SG: "Shooting Guard",
	C: "Center",
	"F-C": "Forward-center",
	"F-G": "Forward-guard",
};

const PlayerProfile = () => {
	const { playerProfile } = useContext(PlayersContext);

	if (!playerProfile) return <div></div>;
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
							{playerProfile.first_name} {playerProfile.last_name}
						</h5>
					</div>
					<div className="modal-body">
						<p className="modal-team-name">{playerProfile.team.full_name}</p>
						<p>
							<b>Position : </b>
							{glossary[playerProfile.position]} ({playerProfile.position})
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
