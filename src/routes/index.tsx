import { Layout } from "@/components/layout";
import { Dashboard } from "@/features/dashboard/components";
import { Smaple1Home } from "@/features/sample1/components/Smaple1Home";
import { TrainingHome } from "@/features/training/TrainingHome";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      // { path: "trade", element: <TradeHome /> },
      // { path: "asset", element: <AssetHome /> },
      { path: "sample", element: <Smaple1Home /> },
      { path: "training", element: <TrainingHome /> },
      { path: "", element: <Navigate to="dashboard" /> },
      { path: "*", element: <Navigate to="dashboard" /> },
    ],
  },
];

export const AppRoutes = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};
