import axios from "axios";

const instane = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
