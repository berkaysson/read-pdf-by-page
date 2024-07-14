import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import PdfDrawer from "../main/forms/PdfDrawer";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import { logout } from "../../utilities/signOutUtilities";
import PdfListSheet from "../main/displays/PdfListSheet";
import { ProfileContext } from "../../context/profile.context";
import { useContext } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

export const Navbar = () => {
  const { profile } = useContext(ProfileContext);
  const windowWidth = useWindowWidth();

  return (
    <>
      {profile && (
        <NavigationMenu
          aria-hidden="true"
          className="fixed p-2 m-2 rounded-md shadow-sm bg-primary"
        >
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <PdfDrawer />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <PdfListSheet />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                type="button"
                onClick={logout}
                variant="destructive"
                size={"sm"}
              >
                <LogOut
                  className={`w-4 h-4 ${windowWidth < 425 ? "" : "mr-2"}`}
                />
                {windowWidth < 425 ? "" : "Logout"}
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  );
};
