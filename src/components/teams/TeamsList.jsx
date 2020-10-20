import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TeamContext } from "./../../contexts/TeamContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./../../styles/teams.css";

const TeamsList = () => {
	const { allTeams, areLoading, team, chooseTeam } = useContext(TeamContext);

	if (areLoading)
		return <div className="loading-message">Loading teams infos...</div>;
	return (
		<div className="TeamsList">
			<div className="d-flex justify-content-start">
				<h2 className="section-title">team</h2>
				<Autocomplete
					id="combo-box"
					options={allTeams}
					getOptionLabel={(option) => option.full_name}
					style={{ width: 300 }}
					renderInput={(params) => (
						<TextField {...params} label="Select a team" variant="outlined" />
					)}
					onChange={(event, newValue) => {
						chooseTeam(newValue);
					}}
				/>
				{team && (
					<div className="main-team-infos d-flex justify-content-between">
						<div className="team-name">{team.full_name}</div>
						<div className="team-conference">
							<p>Conference </p>
							<p className="team-conference-content">{team.conference}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TeamsList;
