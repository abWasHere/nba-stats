import React, { useContext } from "react";
import { TeamContext } from "./../../contexts/TeamContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./../../styles/teams.css";

const TeamsFilter = ({ allTeams, areLoading }) => {
	const { team, chooseTeam } = useContext(TeamContext);

	if (areLoading) return <div>Loading teams infos...</div>;
	return (
		<div className="TeamsFilter">
			<h2 className="section-title">team</h2>
			<div className="d-flex justify-content-between">
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
						<p>Conference : {team.conference}</p>
						<p>Division : {team.division}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default TeamsFilter;
