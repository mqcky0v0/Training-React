import { cn } from "@/lib/utils";
import { ActorRoleType } from "@/types";
import { actorRoleTypeStr } from "@/types/i18n";
import {
  Banknote,
  Dumbbell,
  EllipsisVertical,
  House,
  KeySquare,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const AppHeader = () => {
  const navStyle = "flex items-center h-8 px-8 space-x-1";
  const user = { roleType: ActorRoleType.USER, name: "山田 太郎" };
  return (
    <div className="flex w-full justify-between bg-slate-100 shadow text-sm">
      <div className="flex items-center h-8">
        <div className="flex font-brand px-2">
          <ShieldCheck size="18" />
          <span className="ml-1">React Training</span>
        </div>

        <>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive
                ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                : navStyle
            }
          >
            <div className="flex">
              <House size="18" />
              <span className="ml-2">Home</span>
            </div>
          </NavLink>
          {/* <NavLink
            to="trade"
            className={({ isActive }) =>
              isActive
                ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                : navStyle
            }
          >
            <div className="flex">
              <CandlestickChart size="18" />
              <span className="ml-2">Trade</span>
            </div>
          </NavLink> */}
          {/* <NavLink
            to="asset"
            className={({ isActive }) =>
              isActive
                ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                : navStyle
            }
          >
            <div className="flex">
              <Banknote size="18" />
              <span className="ml-2">Asset</span>
            </div>
          </NavLink> */}
          <NavLink
            to="sample"
            className={({ isActive }) =>
              isActive
                ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                : navStyle
            }
          >
            <div className="flex">
              <Banknote size="18" />
              <span className="ml-2">Sample</span>
            </div>
          </NavLink>
          <NavLink
            to="training"
            className={({ isActive }) =>
              isActive
                ? cn(navStyle, "border-b-2 bg-slate-200 border-b-primary/80")
                : navStyle
            }
          >
            <div className="flex">
              <Dumbbell size="18" />
              <span className="ml-2">Training</span>
            </div>
          </NavLink>
        </>
      </div>
      <div className="flex items-center space-x-2 px-2">
        <div>
          <Badge variant={"outline"}>{actorRoleTypeStr(user.roleType)}</Badge>
        </div>
        <div>{user.name}</div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
              <EllipsisVertical className="mt-1" size="18" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <KeySquare size={18} className="mr-2" />
                Change Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut size={18} className="mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
