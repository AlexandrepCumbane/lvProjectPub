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
      permissions: ["admin", "editor"],
      navLink: "/",
    },
    {
      id: "Cases",
      title: "Lv Forms",
      type: "item",
      icon: <Icon.File size={20} />,
      permissions: ["admin", "editor"],
      navLink: "/lvforms",
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
