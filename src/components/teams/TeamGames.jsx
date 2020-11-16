import React, { useContext, useEffect } from "react";
import { SeasonContext } from "./../../contexts/SeasonContext";
import { TeamContext } from "./../../contexts/TeamContext";
// -----------------------------------------------
import "./../../styles/teamGames.css";
// -----------------------------------------------

const TeamGames = () => {
	const { season } = useContext(SeasonContext);
	const { team } = useContext(TeamContext);

	useEffect(() => {
		if (season && team) {
			let gamesKey = `${season}`;
		}
	}, [season, team]);

	if (!team) return <div className="loading-message"></div>;
	return (
		<div className="">
			{season} team games
			{/* 
			{gamesAreLoading ?  (<div className="loader"></div>) : (
				<h2 className="section-title">
					{season} games
				</h2>
			)} */}
		</div>
	);
};

export default TeamGames;
