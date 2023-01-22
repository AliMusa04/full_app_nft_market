import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE } from "./routes/route";

function App() {
  const route = createBrowserRouter(ROUTE);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
