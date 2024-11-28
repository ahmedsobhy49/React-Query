import useHerosData from "../hooks/useHerosData";

export default function QueryOnClick() {
  function onError() {}
  function onSuccess() {}

  const { data, isLoading, refetch, isFetching } = useHerosData(
    onError,
    onSuccess,
    false
  );
  console.log({ isLoading, isFetching });
  return (
    <div>
      <div>
        {data?.data?.map((hero) => {
          return <div key={hero.id}>{hero.name}</div>;
        })}
      </div>
      {isLoading && <div>Loading...</div>}
      <button onClick={refetch}>fetch Heros</button>
    </div>
  );
}
