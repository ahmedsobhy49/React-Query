import axios from "axios";
import { useInfiniteQuery } from "react-query";
export default function RQInfiniteQuery() {
  async function fetchColors({ pageParam = 1 }) {
    const start = (pageParam - 1) * 2;
    return axios.get(`http://localhost:9000/colors?_start=${start}&_limit=2`);
  }

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(["infinite-colors"], fetchColors, {
      getNextPageParam: (_, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  console.log({ isFetching, isFetchingNextPage });

  return (
    <div>
      {data?.pages.map((group) => {
        return group?.data.map((color) => {
          return (
            <div key={color.id} style={{ backgroundColor: color?.color }}>
              {color?.color}
            </div>
          );
        });
      })}
      {hasNextPage && (
        <button onClick={fetchNextPage} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
