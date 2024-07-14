import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import PdfDrawer from "../main/forms/PdfDrawer";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import { logout } from "../../utilities/signOutUtilities";

export const Navbar = () => {
  return (
    <NavigationMenu
      aria-hidden="true"
      className="fixed w-full px-4 py-4 shadow-md bg-secondary"
    >
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <PdfDrawer />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button type="button" onClick={logout} variant="destructive">
            <LogOut className="w-4 h-4 mr-2" /> Log Out
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
