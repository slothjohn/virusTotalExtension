// import { json } from "express";

(function () {
  "use strict";
  setTimeout(createButtons, 400);

  function createButtons() {
    const links = document.querySelectorAll(
      "[data-sokoban-container] [data-header-feature] a"
    );
    for (const link of links) {
      const button = document.createElement("button");
      button.innerText = "Click me";
      button.addEventListener("click", onClick(link.href));
      link.parentElement.append(button);
    }
      
    const key = "7e6079eaa86612c6873ced2c45977cf5b6098d847db36eb2699f02882d732391";

    function onClick(url) {
      console.log(url)
      return async function (event) {
        // QUERY API
        const host = new URL(url).host
        let response = await fetch("http://localhost:4000/?url=" + host)
        let data = await response.json()
        // ADD STATS TO DOCUMENT
        let button = event.target
        button.parentElement.append(processData(data))
      };
    }

    function processData(data) {
      let clean = 0;
      let count = 0;
      let vendorResults = data.data.attributes.last_analysis_results;

      for (let vendor in vendorResults) {
        if (vendorResults[vendor].result == "clean") {
          clean = clean + 1
        }
        else if(vendorResults[vendor].result == "unrated") {
          count = count -1
        }
        count = count + 1
      }
      let result = clean + "/" + count + " clean";
      return result
      // const links = document.querySelectorAll(
      //   "[data-sokoban-container] [data-header-feature] a"
      // );
      // for (const link of links) {
      //   const p = document.createElement("p");
      //   p.innerText = result;
      //   link.parentElement.append(p);
      // }
    }

  }
})();
