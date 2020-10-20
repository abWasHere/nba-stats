import React, { useContext } from "react";
import { TeamContext } from "./../../contexts/TeamContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./../../styles/teams.css";

const TeamsFilter = ({ allTeams, areLoading }) => {
	const { team, chooseTeam } = useContext(TeamContext);

	if (areLoading)
		return <div className="loading-message">Loading teams infos...</div>;
	return (
		<div className="TeamsFilter">
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
					<div className="main-team-infos">
						<p>
							Conference :{" "}
							<span className="team-conference">{team.conference}</span>
						</p>
						<p>
							Division : <span className="team-division">{team.division}</span>
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TeamsFilter;
