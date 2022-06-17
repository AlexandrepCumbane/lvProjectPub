import React from "react";
import * as Icon from "react-feather";

const get_pages = () => {
  let navConf = [
    {
      id: "home",
      title: "Home",
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
      title: "Cases",
      type: "collapse",
      icon: <Icon.File size={20} />,
      badge: "warning",
      permissions: ["operator", "manager", "focalpoint", "partner"],
      // badgeText: "2",
      children: [
        {
          id: "all_cases",
          title: "Registered",
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["operator", "manager"],

          navLink: "/lvforms",
        },
        {
          id: "all_cases_received_fp",
          title: "Received",
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["focalpoint"],

          navLink: "/forwardcasetofocalpoints",
        },
        {
          id: "all_cases_forwarded_partner",
          title: "Received",
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["partner"],

          navLink: "/forwardinginstitutionspartner",
        },
        {
          id: "all_cases_forwarded_fp",
          title: "Forwarded",
          type: "item",
          icon: <Icon.Archive size={12} />,
          permissions: ["focalpoint"],

          navLink: "/forwardinginstitutionsfpoint",
        },
        {
          id: "import_cases",
          title: "Import",
          type: "item",
          icon: <Icon.UploadCloud size={12} />,
          permissions: ["manager"],

          navLink: "/import",
        },
        {
          id: "referall_cases",
          title: "Forwarded",
          type: "item",
          icon: <Icon.FileText size={12} />,
          permissions: ["manager"],

          navLink: "/lvforms_fowarded",
        },
      ],
    },

    {
      id: "tasks",
      title: "Tasks",
      type: "item",
      icon: <Icon.Activity size={20} />,
      permissions: ["operator", "manager"],
      navLink: "/tasks",
    },

    {
      id: "reports",
      title: "Reports",
      type: "collapse",
      icon: <Icon.PieChart size={20} />,
      badge: "warning",
      permissions: ["manager"],
      // badgeText: "2",
      children: [
        {
          id: "general",
          title: "General",
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
      title: "Knowledge Base",
      type: "item",
      icon: <Icon.Database size={20} />,
      permissions: ["operator", "focalpoint", "partner"],
      navLink: "/information",
    },
    {
      id: "articles",
      title: "Knowledge Base",
      type: "item",
      icon: <Icon.Database size={20} />,
      permissions: ["manager"],
      navLink: "/articles",
    },

    {
      id: "users",
      title: "Users",
      type: "item",
      icon: <Icon.Users size={20} />,
      permissions: ["manager"],
      navLink: "/users",
    },

    {
      id: "cluster_sectors",
      title: "Sector",
      type: "collapse",
      icon: <Icon.Disc size={20} />,
      badge: "warning",
      permissions: ["manager"],
      children: [
        {
          id: "clusteragencys",
          title: "Agencies",
          type: "item",
          icon: <Icon.Airplay size={20} />,
          permissions: ["manager"],
          navLink: "/clusteragencys",
        },
        {
          id: "clusterregions",
          title: "Regions",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/clusterregions",
        },
        {
          id: "clustersector",
          title: "Sector",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/clustersectors",
        },
      ],
    },
    {
      id: "casetipology",
      title: "Case category",
      type: "collapse",
      icon: <Icon.File size={20} />,
      badge: "warning",
      permissions: ["manager"],
      children: [
        {
          id: "subcategoryissue",
          title: "Sub-category issue",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/subcategoryissue",
        },
        {
          id: "subcategory",
          title: "Other category",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/subcategory",
        },
        {
          id: "casetipologys",
          title: "Case category",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/casetipology",
        },
      ],
    },
    {
      id: "location",
      title: "location",
      type: "collapse",
      icon: <Icon.File size={20} />,
      badge: "warning",
      permissions: ["manager"],
      children: [
        {
          id: "locations",
          title: "location",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/location",
        },
        {
          id: "locationclassification",
          title: "location classification",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/locationclassification",
        },
        {
          id: "district",
          title: "district",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/district",
        },
        {
          id: "province",
          title: "province",
          type: "item",
          icon: <Icon.Map size={20} />,
          permissions: ["manager"],
          navLink: "/province",
        },

      ],
    },


  ];

  return navConf;
};

let navigationConfig = get_pages();

export default navigationConfig;
