import { useState } from "react";
import useHerosData from "../hooks/useHerosData";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function RQOptimisticUpdates() {
  const [heroName, setHeroName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  function handleAlterEgo(e) {
    setAlterEgo(e.target.value);
  }

  function handleHeroName(e) {
    setHeroName(e.target.value);
  }

  function onSuccess() {}
  function onError() {}

  const { data: heros } = useHerosData(onError, onSuccess);

  function addNewHero(hero) {
    return axios.post("http://localhost:9000/superheroes", hero);
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addNewHero, {
    onMutate: async (hero) => {
      await queryClient.cancelQueries(["heros"]);
      const oldData = queryClient.getQueryData(["heros"]);
      queryClient.setQueryData(["heros"], (prevData) => {
        return {
          ...prevData,
          data: [
            ...(prevData?.data || []),
            {
              id: uuidv4(),
              name: hero.name,
              alterEgo: hero.alterEgo,
              isOptimistic: true,
            },
          ],
        };
      });
      return {
        oldData,
      };
    },

    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["heros"], context.oldData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["heros"]);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({
      name: heroName,
      alterEgo,
    });
  }

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
        {heros?.data?.map((hero) => {
          const heroStyle = hero.isOptimistic
            ? { color: "gray", fontStyle: "italic" } // Example style for optimistic data
            : {};
          return (
            <p key={hero?.id} style={heroStyle}>
              {hero?.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}
