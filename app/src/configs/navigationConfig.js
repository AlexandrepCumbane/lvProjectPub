import React from "react";
import * as Icon from "react-feather";

import translate from "../i18n/translate";

const get_pages = () => {
  let navConf = [
    {
      id: "home",
      title: translate("Home"),
      type: "item",
      icon: <Icon.Home size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner", "admin"],
      navLink: "/",
    },

    {
      id: "cases",
      title: translate("Cases"),
      type: "collapse",
      icon: <Icon.File size={20} />,
      badge: "warning",
      // badgeText: "2",
      children: [
        {
          id: "all_cases",
          title: translate("Registered"),
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: [
            "operator",
            "manager",
            "focalpoint",
            "partner",
            "admin",
          ],

          navLink: "/lvforms",
        },
        {
          id: "referall_cases",
          title: translate("Fowarded"),
          type: "item",
          icon: <Icon.FileText size={12} />,
          permissions: [
            "operator",
            "manager",
            "focalpoint",
            "partner",
            "admin",
          ],

          navLink: "/lvforms_fowarded",
        },
      ],
    },

    {
      id: "tasks",
      title: translate("Tasks"),
      type: "item",
      icon: <Icon.Activity size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner", "admin"],
      navLink: "/tasks",
    },

    {
      id: "reports",
      title: translate("Reports"),
      type: "collapse",
      icon: <Icon.PieChart size={20} />,
      badge: "warning",
      // badgeText: "2",
      children: [
        {
          id: "general",
          title:  translate("General"),
          type: "item",
          icon: <Icon.BarChart size={12} />,
          permissions: [
            "operator",
            "manager",
            "focalpoint",
            "partner",
            "admin",
          ],

          navLink: "/reports",
        },
        {
          id: "advanced",
          title: translate("Advanced"),
          type: "item",
          icon: <Icon.Filter size={12} />,
          permissions: [
            "operator",
            "manager",
            "focalpoint",
            "partner",
            "admin",
          ],

          navLink: "/advanced",
        },
      ],
    },
    // {
    //   id: "reports",
    //   title: "Reports",
    //   type: "item",
    //   icon: <Icon.BarChart size={20} />,
    //   permissions: ["operator", "manager", "focalpoint", "partner", "admin"],
    //   navLink: "/reports",
    // },
    {
      id: "information",
      title: "Knowledge Base",
      type: "item",
      icon: <Icon.Database size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner"],
      navLink: "/information",
    },
    {
      id: "users",
      title: "Users Management",
      type: "item",
      icon: <Icon.Users size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner"],
      navLink: "/users",
    },
  ];

  return navConf;
};

let navigationConfig = get_pages();

export default navigationConfig;
