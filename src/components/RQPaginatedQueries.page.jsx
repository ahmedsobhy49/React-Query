import { useState } from "react";
import fetchColors from "../services/fetchColors";
import { useQuery } from "react-query";

export default function Colors() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery(["colors", currentPage], () =>
    fetchColors(currentPage)
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data &&
        data?.data?.map((color) => (
          <div key={color.id} style={{ backgroundColor: color?.color }}>
            {color?.color}
          </div>
        ))}
      <button onClick={() => setCurrentPage(currentPage - 1)}>
        Previous Page
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
    </div>
  );
}
