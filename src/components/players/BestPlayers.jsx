import React, { useContext } from "react";
import { SeasonContext } from "./../../contexts/SeasonContext";
import { PlayersContext } from "./../../contexts/PlayersContext";

import Fgm3PlayersList from "./Fgm3PlayersList";
import FtmPlayersList from "./FtmPlayersList";
import OrbPlayersList from "./OrbPlayersList";
import PtsPlayersList from "./PtsPlayersList";
// -----------------------------------------------
import "./../../styles/bestPlayers.css";
// -----------------------------------------------
const BestPlayers = () => {
	const { season } = useContext(SeasonContext);
	const { playersAreLoading, statsAreLoading } = useContext(PlayersContext);

	//-----------
	if (playersAreLoading && statsAreLoading)
		return <div>Loading players infos...</div>;
	return (
		<div className="BestPlayers">
			<h2 className="section-title">{season} best players</h2>

			<div className="container">
				<div className="row">
					<div className="col strong">Total points</div>
					<div className="col strong">3 point field goals</div>
					<div className="col strong">Free throws</div>
					<div className="col strong">Offensive rebounds</div>
				</div>
				<div className="row">
					<div className="col">
						<PtsPlayersList />
					</div>
					<div className="col">
						<Fgm3PlayersList />
					</div>
					<div className="col">
						<FtmPlayersList />
					</div>
					<div className="col">
						<OrbPlayersList />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BestPlayers;
