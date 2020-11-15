import React, { useContext } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";

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

const PlayerProfileModal = () => {
	const { playerPicked } = useContext(PlayersContext);

	if (!playerPicked) return <div></div>;
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
							{playerPicked.first_name} {playerPicked.last_name.toUpperCase()}
						</h5>
					</div>
					<div className="modal-body">
						<p className="modal-team-name">{playerPicked.team.full_name}</p>
						<p>
							<b>Position : </b>
							{glossary[playerPicked.position]} ({playerPicked.position})
						</p>
						<p>
							<b>Height : </b> {playerPicked.height_feet} feet &{" "}
							{playerPicked.height_inches} inches
						</p>
						<p>
							<b>Weight :</b> {playerPicked.weight_pounds} pounds
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerProfileModal;
