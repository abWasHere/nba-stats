import React, { useContext } from "react";
import { TeamContext } from "./../../contexts/TeamContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Logo from "./Logo";
//--------------------------------
import "./../../styles/teams.css";
//--------------------------------

const TeamsList = () => {
	const { allTeams, teamsAreLoading, team, chooseTeam } = useContext(
		TeamContext
	);

	if (teamsAreLoading) return <div className="loader"></div>;
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
						// event argument is mandatory!
						chooseTeam(newValue);
					}}
				/>
				{team && <Logo teamAbbreviation={team.abbreviation} />}
			</div>
			{team && (
				<div className="team-conference">
					<p>
						<b>{team.conference}</b> Conference
					</p>
				</div>
			)}
		</div>
	);
};

export default TeamsList;
