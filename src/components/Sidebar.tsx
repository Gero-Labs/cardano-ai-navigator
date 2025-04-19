
import { useNavigate, useLocation } from "react-router-dom";
import { ActivitySquare, LayoutDashboard, Store, Settings, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wallet, isAgentsDeployed } = useAppContext();

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Trading",
      path: "/trading",
      icon: ArrowLeftRight,
    },
    {
      name: "Marketplace",
      path: "/marketplace",
      icon: Store,
      disabled: true,
    },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center justify-center py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-1.5 flex items-center justify-center">
            <ActivitySquare className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg">Cardano AI</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.path}>
              <SidebarMenuButton
                asChild={!route.disabled}
                disabled={route.disabled}
                isActive={location.pathname === route.path}
                onClick={(e) => {
                  if (route.disabled) {
                    e.preventDefault();
                  } else {
                    e.preventDefault(); // Prevent default to avoid full page reload
                    navigate(route.path);
                  }
                }}
                tooltip={route.disabled ? "Coming soon" : undefined}
              >
                {!route.disabled ? (
                  <a href={route.path}>
                    <route.icon className="h-4 w-4 mr-2" />
                    <span>{route.name}</span>
                  </a>
                ) : (
                  <>
                    <route.icon className="h-4 w-4 mr-2" />
                    <span>{route.name}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              isActive={location.pathname === "/settings"}
              onClick={(e) => {
                e.preventDefault(); // Prevent default to avoid full page reload
                navigate("/settings");
              }}
            >
              <a href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
