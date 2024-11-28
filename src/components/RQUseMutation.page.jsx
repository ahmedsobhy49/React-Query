import { useState } from "react";
import useHerosData from "../hooks/useHerosData";
import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
export default function RQUseMutation() {
  const { data } = useHerosData(onError, onSuccess);

  function onError(err) {
    console.log(err);
  }

  function onSuccess() {}

  const [heroName, setHeroName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  function handleAlterEgo(e) {
    setAlterEgo(e.target.value);
  }

  function handleHeroName(e) {
    setHeroName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate({
      name: heroName,
      alterEgo,
    });
  }

  function addNewHero(hero) {
    return axios.post("http://localhost:9000/superheroes", hero);
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addNewHero, {
    /*
    invalidate heros query onSuccess to refetch heros after adding new ones to sync the ui with the server
     adding new hero will trigger post request then get request

     onSuccess: () => {
       queryClient.invalidateQueries(["heros"]);
     },

     */
    /*
     there are a better way to keep ui in sync with the server without triggering get request after the post request
     (that is only possible if the posted data are returned from the server in the response).
     and that is my manually mutate the data that in the cache  by keeoping the prev data and insert the new one that is returned by the response 
     */
    onSuccess: (data) => {
      queryClient.setQueryData(["heros"], (prevData) => {
        return {
          ...prevData,
          data: [...(prevData?.data || []), data?.data],
        };
      });
    },
  });

  return (
    <div>
      <form>
        <div>
          <label htmlFor="hero-name">Hero Name</label>
          <input
            type="text"
            id="hero-name"
            value={heroName}
            onChange={(e) => handleHeroName(e)}
          />
        </div>
        <div>
          <label htmlFor="alter-ego">Alter Ego</label>
          <input
            type="text"
            id="alter-ego"
            value={alterEgo}
            onChange={(e) => handleAlterEgo(e)}
          />
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Add Hero
        </button>
      </form>

      <div>
        {data?.data?.map((hero) => {
          return <p key={hero.id}>{hero.name}</p>;
        })}
      </div>
    </div>
  );
}
