import { useQuery } from "react-query";
import fetchHeros from "../services/fetchHeros";
import axios from "axios";

export default function ParallelQueriese() {
  async function fetchColors() {
    return axios.get("http://localhost:9000/colors");
  }
  const { data: heros } = useQuery("heros", fetchHeros);

  const { data: colors } = useQuery("colors", fetchColors);

  console.log(colors?.data);
  console.log(heros?.data);

  return <div>parallelQueries</div>;
}
