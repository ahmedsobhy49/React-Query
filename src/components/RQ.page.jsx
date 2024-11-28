import { Link } from "react-router-dom";
import useHerosData from "../hooks/useHerosData";

export default function RQSuperHeroesPage() {
  function onSuccess(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }
  const { data: heros, isLoading } = useHerosData(onError, onSuccess, true);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {heros?.data.map((hero) => {
        return (
          <Link key={hero.name} to={`/rq-super-heroes/${hero.id}`}>
            <div>{hero.name}</div>
          </Link>
        );
      })}
    </>
  );
}
