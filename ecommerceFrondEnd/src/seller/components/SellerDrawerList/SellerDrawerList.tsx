import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBox from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import DrawerList from "../../../component/DrawerList";
import ReceiptIcon from "@mui/icons-material/Receipt";

const menu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <DashboardIcon className="text-[#00927c]" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBagIcon className="text-[#00927c]" />,
    activeIcon: <ShoppingBagIcon className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <InventoryIcon className="text-[#00927c]" />,
    activeIcon: <InventoryIcon className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <AddIcon className="text-[#00927c]" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWalletIcon className="text-[#00927c]" />,
    activeIcon: <AccountBalanceWalletIcon className="text-white" />,
  },
  {
    name: "Transaction",

    path: "/seller/transaction",
    icon: <ReceiptIcon className="text-[#00927c]" />,
    activeIcon: <ReceiptIcon className="text-white" />,
  },
  /*  {
        name: "Inventory",
        path:"/seller/inventory",
        icon: <MailIcon className="text-[#00927c]"/>,
        activeIcon: <MailIcon classname="text-white"/>
    }, */
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-[#00927c]" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-[#00927c]" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];

const SellerDrawerList = ({ toggleDrawer }: { toggleDrawer: any }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};
export default SellerDrawerList;
