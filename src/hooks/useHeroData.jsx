import { useQuery } from "react-query";
import axios from "axios";

async function getHeroById(heroId) {
  // const { heroId } = queryKey[1];
  return await axios.get(`http://localhost:9000/superheroes/${heroId}`);
}
export default function useHeroData(heroId) {
  return useQuery(["hero", heroId], () => getHeroById(heroId));
}
