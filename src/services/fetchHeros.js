import axios from "axios";

export default function fetchHeros() {
  return axios.get("http://localhost:9000/superheroes");
}
