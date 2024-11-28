import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Home.page";
import RQSuperHeroesPage from "./components/RQ.page";
import SuperHeroesPage from "./components/SuperHeros.page";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SuperHeroDetails from "./components/RQQueryById.page";
import Colors from "./components/RQPaginatedQueries.page";
import QueryOnClick from "./components/QueryOnClick.page";
import DataTransformation from "./components/RQDataTransformation.page";
import ParallelQueriese from "./components/RQParallelQueries.page";
import ParallelDynamicQueries from "./components/RQParallelDynamicQueries.page";
import RQInfiniteQuery from "./components/RQInfiniteQuery.page";
import RQUseMutation from "./components/RQUseMutation.page";
import RQOptimisticUpdates from "./components/RQOptimisticUpdates.page";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/query-on-click" element={<QueryOnClick />} />
            <Route path="/infinite-query" element={<RQInfiniteQuery />} />

            <Route
              path="/data-transformation"
              element={<DataTransformation />}
            />
            <Route path="/parallel-queires" element={<ParallelQueriese />} />
            <Route
              path="/parallel-dynamic-queires"
              element={<ParallelDynamicQueries ids={[1, 2]} />}
            />

            <Route
              path="/rq-super-heroes/:heroId"
              element={<SuperHeroDetails />}
            />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/use-mutation" element={<RQUseMutation />} />
            <Route
              path="/optimistic-updates"
              element={<RQOptimisticUpdates />}
            />

            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
