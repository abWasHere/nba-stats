import React from "react";
import { Doughnut } from "react-chartjs-2";

const TeamStatsChart = ({ team }) => {
	const data = {
		labels: ["Wins", "Draws", "Losses"],
		datasets: [
			{
				label: "Games results",
				data: [team.wins, team.draws, team.losses],
				backgroundColor: ["#c9082a", "#E0E0E0", "#455A64"],
			},
		],
	};
	return (
		<div className="TeamChart">
			<Doughnut
				data={data}
				width={100}
				height={150}
				options={{
					maintainAspectRatio: false,
				}}
			/>
		</div>
	);
};

export default TeamStatsChart;
