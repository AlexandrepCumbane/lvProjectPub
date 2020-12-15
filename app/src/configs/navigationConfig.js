import React from "react";
import * as Icon from "react-feather";

import { default as config } from "../data/config";

const get_pages = () => {
  let navConf = [
    {
      id: "home",
      title: "Home",
      type: "item",
      icon: <Icon.Home size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner", "admin"],
      navLink: "/",
    },
    {
      id: "cases",
      title: "Cases",
      type: "item",
      icon: <Icon.Archive size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner"],
      navLink: "/lvforms",
    },
    {
      id: "tasks",
      title: "Tasks",
      type: "item",
      icon: <Icon.Activity size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner", "admin"],
      navLink: "/tasks",
    },
    {
      id: "reports",
      title: "Reports",
      type: "item",
      icon: <Icon.BarChart size={20} />,
      permissions: ["operator", "manager", "focalpoint", "partner"],
      navLink: "/reports",
    },
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

  const { pages } = config;

  const urls = Object.keys(pages).map(function (key, index) {
    return {
      id: pages[key].name,
      title: pages[key].name,
      type: "item",
      icon: <Icon.File size={20} />,
      permissions: ["admin", "editor"],
      navLink: pages[key].url,
    };
  });

  return navConf;
};

let navigationConfig = get_pages();

export default navigationConfig;
