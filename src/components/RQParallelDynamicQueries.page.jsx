import axios from "axios";
import { useQueries } from "react-query";

// eslint-disable-next-line react/prop-types
export default function ParallelDynamicQueries({ ids }) {
  async function fetchHeroById(id) {
    return await axios.get(`http://localhost:9000/superheroes/${id}`);
  }

  const result = useQueries(
    // eslint-disable-next-line react/prop-types
    ids?.map((id) => {
      return {
        queryKey: ["hero", id],
        queryFn: () => fetchHeroById(id),
      };
    })
  );

  return (
    <div>
      {result.map((data) => {
        return <p key={data?.data?.data.name}>{data?.data?.data.name}</p>;
      })}
    </div>
  );
}
