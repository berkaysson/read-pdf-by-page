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
      className="fixed p-2 m-2 rounded-md shadow-sm bg-primary"
    >
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <PdfDrawer />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button type="button" onClick={logout} variant="destructive" size={"sm"}>
            <LogOut className="w-4 h-4 mr-2" /> Log Out
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
