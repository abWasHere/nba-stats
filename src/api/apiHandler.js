import axios from "axios";

/* TODO: */
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

	getAllTeams() {
		return service
			.get(`/teams`)
			.then((res) => res.data.data)
			.catch(errorHandler);
	},

	getAllPlayersFromSeason(page) {
		return service
			.get(`/players?per_page=100&page=${page}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getOnePlayer(id) {
		return service
			.get(`/players/${id}`)
			.then((res) => res.data.data)
			.catch(errorHandler);
	},

	getPlayersStats(year, idsQueryParam) {
		return service
			.get(`/season_averages?season=${year}${idsQueryParam}`)
			.then((res) => res.data.data)
			.catch(errorHandler);
	},
};
