import HomeSVG from "@/components/svg/HomeSVG";
import InventorySVG from "@/components/svg/InventorySVG";
import TicketFillSVG from "@/components/svg/TicketFillSVG";
import UserSVG from "@/components/svg/UserSVG";

type MenuItem = {
  name: string;
  icon: React.ReactElement;
  url: string;
};

const MobileMenuItems: MenuItem[] = [
  {
    name: "Inicio",
    icon: <HomeSVG />,
    url: "/",
  },
  {
    name: "Usuarios",
    icon: <UserSVG />,
    url: "/users",
  },
  {
    name: "Tickets",
    icon: <TicketFillSVG />,
    url: "/tickets",
  },
  {
    name: "Gráficos",
    icon: <InventorySVG />,
    url: "/charts",
  },
];

export default MobileMenuItems;
