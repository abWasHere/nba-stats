import React, { useContext } from "react";
import { TeamContext } from "./../../contexts/TeamContext";

import getLogo from "./../../utils/getLogo";

import "./../../styles/logo.css";

const Logo = ({ teamAbbreviation }) => {
	const { team } = useContext(TeamContext);

	if (!team) return <div></div>;
	return (
		<div className="Logo">
			<img
				src={getLogo(teamAbbreviation)}
				alt="team-logo"
				className="main-team-logo"
			/>
		</div>
	);
};

export default Logo;
