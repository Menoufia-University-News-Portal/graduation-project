import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilSetting,
    UilChart,
    UilFileEditAlt,
    UilUserPlus,
    UilUniversity,
    UilUserCheck,
    UilSignOutAlt,
    UilBooks,
    UisScenery

} from "@iconscout/react-unicons";
import { UisImageV } from '@iconscout/react-unicons-solid'
export const SidebarData = [
    {
        path: "/dashboard",
        icon: UilEstate,
        heading: "Dashboard",
    },

    {
        path: "/news",
        icon: UilFileEditAlt,
        heading: "News",
    },
    {
        path: "/events",
        icon: UilClipboardAlt,
        heading: "Events",
    },
    {
        path: "/comersnews",
        icon: UilClipboardAlt,
        heading: "Comers News",
    },
    {
        path: "/sectorhead",
        icon: UilClipboardAlt,
        heading: "Sector Head",
    },

    {
        path: "/Uni_leadear",
        icon: UilClipboardAlt,
        heading: "Uni Leadear",
    },

    {
        path: "/gallary",
        icon: UisImageV,
        heading: "Gallery"
    },


    // {
    //     path:"/website",
    //     icon:UilChart,
    //     heading:"Website View",
    // },
    {
        path: "/admins",
        icon: UilUsersAlt,
        heading: "Admins",
    },
    {
        path: "/permissionsTable",
        icon: UilUserCheck,
        heading: "Permissions",
    },
    {
        path: "/facultiesTable",
        icon: UilUniversity,
        heading: "Faculties",
    },
    {
        path: "/createNewAdmin",
        icon: UilUserPlus,
        heading: "New Admin",
    },
    {
        path: "/department",
        icon: UilBooks,
        heading: "Department",
    },
    {
        path: "/Staff",
        icon: UilUsersAlt,
        heading: "Staff",
    },
    {
        path: "/setting",
        icon: UilSetting,
        heading: "Settings",
    },

];