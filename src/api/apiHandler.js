import axios from "axios";

const service = axios.create({
	baseURL: "https://www.balldontlie.io/api/v1",
});

function errorHandler(error) {
	if (error.response.data) {
		console.log(error.response && error.response.data);
		throw error;
	}
	throw error;
}

export default {
	service,

	async getAllTeams() {
		console.log("axios call to getAllTeams");
		try {
			const res = await service.get(`/teams`);
			return res.data.data;
		} catch (error) {
			errorHandler(error);
		}
	},

	async getAllPlayersFromAPI(page) {
		console.log("axios call to getAllPlayersFromAPI");
		try {
			const res = await service.get(`/players?per_page=100&page=${page}`);
			return res.data;
		} catch (error) {
			errorHandler(error);
		}
	},

	async getOnePlayer(id) {
		console.log("axios call to getOnePlayer");
		try {
			const res = await service.get(`/players/${id}`);
			return res.data.data;
		} catch (error) {
			errorHandler(error);
		}
	},

	async getPlayersStats(year, idsQueryParam) {
		console.log("axios call to getPlayersStats");
		try {
			const res = await service.get(
				`/season_averages?season=${year}${idsQueryParam}`
			);
			return res.data.data;
		} catch (error) {
			errorHandler(error);
		}
	},

	async getAllGamesOfTeam(year, teamId, page = 0) {
		console.log("axios call to getAllGames");
		try {
			const res = await service.get(
				`/games?seasons[]=${year}&team_ids[]=${teamId}&per_page=100&page=${page}`
			);
			return res.data;
		} catch (error) {
			errorHandler(error);
		}
	},
};
