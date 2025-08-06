import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export const Layout = () => {
  return (
    <div className="bg-slate-50 h-screen">
      <AppHeader />
      <Outlet />
    </div>
  );
};
