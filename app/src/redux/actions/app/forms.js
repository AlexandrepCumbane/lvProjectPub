import config from "../../../data/config";

const pages = config.pages;

// let state = pages.map((item) => {
//   return {
//     url: item.url,
//     name: item.name,
//     type: String(item.name),
//   };
// });

const state = Object.keys(pages).map(function (key, index) {
  return {
    url: pages[key].url,
    name: pages[key].name,
  };
});

export { state };
