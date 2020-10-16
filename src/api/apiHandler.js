import axios from "axios";

/* TODO: */
const service = axios.create({
	baseURL: "https://www.balldontlie.io/api/v1/",
});

const errorHandler = (error) => {
	if (error.response && error.response.data) {
		console.log(error.response.data);
	}
	throw error;
};

export default {
	service,

	getGames(year) {
		return service
			.get(`/games?seasons[]=${year}`)
			.then((res) => res)
			.catch(errorHandler);
	},
};
