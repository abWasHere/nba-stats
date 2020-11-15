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
	// getAllTeams() {
	// 	return service
	// 		.get(`/teams`)
	// 		.then((res) => res.data.data)
	// 		.catch(errorHandler);
	// },

	// getAllPlayersFromSeason(page) {
	// 	return service
	// 		.get(`/players?per_page=100&page=${page}`)
	// 		.then((res) => res.data)
	// 		.catch(errorHandler);
	// },

	// getOnePlayer(id) {
	// 	return service
	// 		.get(`/players/${id}`)
	// 		.then((res) => res.data.data)
	// 		.catch(errorHandler);
	// },

	// getPlayersStats(year, idsQueryParam) {
	// 	return service
	// 		.get(`/season_averages?season=${year}${idsQueryParam}`)
	// 		.then((res) => res.data.data)
	// 		.catch(errorHandler);
	// },
};
