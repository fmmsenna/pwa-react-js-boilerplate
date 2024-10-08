import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Site from "./pages/Site";
import Welcome from "./pages/Welcome";
import UpdateHandler from "./components/UpdateHandler";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Site />} />
      <Route path="/welcome" element={<Welcome />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <UpdateHandler />
    </div>
  );
}

export default App;
