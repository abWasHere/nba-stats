import React, { useEffect, useState } from "react";
import TeamsFilter from "./TeamsFilter";
import apiHandler from "./../../api/apiHandler";

const TeamsList = () => {
	const [allTeams, setAllTeams] = useState([]);
	const [teamsAreLoading, setTeamsLoading] = useState(true);

	// -------------------- GET ALL TEAMS
	useEffect(() => {
		setTeamsLoading(true);
		apiHandler
			.getAllTeams()
			.then((apiRes) => {
				setAllTeams(apiRes);
				//console.log("all teams", apiRes);
			})
			.then(() => setTeamsLoading(false))
			.catch((err) => console.log(err));
	}, []);

	//-----------

	return (
		<div className="TeamsList">
			<TeamsFilter allTeams={allTeams} areLoading={teamsAreLoading} />
		</div>
	);
};

export default TeamsList;
