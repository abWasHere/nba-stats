import axios from "axios";

/* TODO: */
const service = axios.create({
	baseURL: "https://www.balldontlie.io/api/v1",
});

const errorHandler = (error) => {
	if (error.response && error.response.data) {
		console.log(error.response.data);
	}
	throw error;
};

export default {
	service,

	getAllTeams() {
		return service
			.get(`/teams`)
			.then((res) => res.data.data)
			.catch(errorHandler);
	},

	getAllPlayersFromSeason(year, page) {
		return service
			.get(`/players?seasons[]=${year}&per_page=100&page=${page}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getOnePlayer(id) {
		return service
			.get(`/players/${id}`)
			.then((res) => res.data.data)
			.catch(errorHandler);
	},

	getOnePlayerStats(year, id) {
		return service
			.get(`/season_averages?season=${year}&player_ids[]=${id}`)
			.then((res) => res.data.data)
			.catch(errorHandler);
	},

	getOnePlayerStats(year, id) {
		return service
			.get(`/season_averages?season=${year}&player_ids[]=${id}`)
			.then((res) => res.data.data)
			.catch(errorHandler);
	},
};
