import axios from "axios";

export default async function fetchColors(page) {
  const start = (page - 1) * 2;
  return axios.get(`http://localhost:9000/colors?_start=${start}&_limit=2`);
}
