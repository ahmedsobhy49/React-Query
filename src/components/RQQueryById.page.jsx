import { useParams } from "react-router-dom";
import useHeroData from "../hooks/useHeroData";

export default function SuperHeroDetails() {
  const { heroId } = useParams();
  const { data, isLoading } = useHeroData(heroId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{data?.data?.name}</p>
      <p>{data?.data?.alterEgo}</p>
    </div>
  );
}
