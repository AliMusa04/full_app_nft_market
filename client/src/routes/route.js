import AddArist from "../pages/AddArtist/AddArist";
import MainRoot from "../pages/MainRoot";
import MarketPlace from "../pages/MarketPlace/MarketPlace";
import Rankings from "../pages/Rankings/Rankings";

export const ROUTE = [
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        path: "",
        element: <MarketPlace />,
      },
      {
        path: "ranking-artists",
        element: <Rankings />,
      },
      {
        path: "add-artist",
        element: <AddArist />,
      },
    ],
  },
];
