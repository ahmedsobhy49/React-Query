import { useQuery } from "react-query";
import fetchHeros from "../services/fetchHeros";

export default function useHerosData(onError, onSuccess, enabled) {
  return useQuery(["heros"], fetchHeros, {
    onError,
    onSuccess,
    enabled,
  });
}
