import React, { useContext } from "react";
import { PlayersContext } from "./../../contexts/PlayersContext";
import { TeamContext } from "./../../contexts/TeamContext";

const FtmPlayersList = () => {
	const { team, teamMembers } = useContext(TeamContext);

	return (
		<div className="FtmPlayersList">
			{teamMembers.map((member) => (
				<p key={member.id}>
					{" "}
					{member.first_name} {member.last_name}
				</p>
			))}
		</div>
	);
};

export default FtmPlayersList;
