import fetchHeros from "../services/fetchHeros";
import { useQuery } from "react-query";

export default function DataTransformation() {
  function onSuccess(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }
  const { isLoading, data } = useQuery(["heros"], fetchHeros, {
    onError,
    onSuccess,
    select: (data) => {
      return data?.data?.map((hero) => {
        return hero.name + "💪🏻";
      });
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })}
    </>
  );
}
