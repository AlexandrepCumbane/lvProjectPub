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
      permissions: [
        "operator",
        "manager",
        "focalpoint",
        "partner",
        "admin",
        "user",
      ],
      navLink: "/home",
    },

    {
      id: "cases",
      title: translate("Cases"),
      type: "collapse",
      icon: <Icon.File size={20} />,
      badge: "warning",
      permissions: ["operator", "manager", "focalpoint", "partner"],
      // badgeText: "2",
      children: [
        {
          id: "all_cases",
          title: translate("Registered"),
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["operator", "manager"],

          navLink: "/lvforms",
        },
        {
          id: "all_cases_received_fp",
          title: translate("Received"),
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["focalpoint"],

          navLink: "/forwardcasetofocalpoints",
        },
        {
          id: "all_cases_forwarded_partner",
          title: translate("Received"),
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["partner"],

          navLink: "/forwardinginstitutionspartner",
        },
        {
          id: "all_cases_forwarded_fp",
          title: translate("Forwarded"),
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["focalpoint"],

          navLink: "/forwardinginstitutionsfpoint",
        },
        {
          id: "referall_cases",
          title: translate("Forwarded"),
          type: "item",
          icon: <Icon.FileText size={12} />,
          permissions: ["manager"],

          navLink: "/lvforms_fowarded",
        },
      ],
    },

    {
      id: "tasks",
      title: translate("Tasks"),
      type: "item",
      icon: <Icon.Activity size={20} />,
      permissions: ["operator", "manager"],
      navLink: "/tasks",
    },

    {
      id: "reports",
      title: translate("Reports"),
      type: "collapse",
      icon: <Icon.PieChart size={20} />,
      badge: "warning",
      permissions: ["manager"],
      // badgeText: "2",
      children: [
        {
          id: "general",
          title: translate("General"),
          type: "item",
          icon: <Icon.BarChart size={12} />,
          permissions: ["manager"],

          navLink: "/reports",
        },
        // {
        //   id: "advanced",
        //   title: translate("Advanced"),
        //   type: "item",
        //   icon: <Icon.Filter size={12} />,
        //   permissions: ["manager"],

        //   navLink: "/advanced",
        // },
      ],
    },
    {
      id: "information",
      title: translate("Knowledge Base"),
      type: "item",
      icon: <Icon.Database size={20} />,
      permissions: ["operator", "focalpoint", "partner"],
      navLink: "/information",
    },
    {
      id: "articles",
      title: translate("Knowledge Base"),
      type: "item",
      icon: <Icon.Database size={20} />,
      permissions: ["manager"],
      navLink: "/articles",
    },

    {
      id: "users",
      title: translate("Users"),
      type: "item",
      icon: <Icon.Users size={20} />,
      permissions: ["manager"],
      navLink: "/users",
    },

    {
      id: "cluster_sectors",
      title: translate("Sector"),
      type: "collapse",
      icon: <Icon.Disc size={20} />,
      badge: "warning",
      permissions: ["manager"],
      children: [
        {
          id: "clusteragencys",
          title: translate("Agencies"),
          type: "item",
          icon: <Icon.Airplay size={20} />,
          permissions: ["manager"],
          navLink: "/clusteragencys",
        },
        {
          id: "clusterregions",
          title: translate("Regions"),
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/clusterregions",
        },
      ],
    },
  ];

  return navConf;
};

let navigationConfig = get_pages();

export default navigationConfig;
