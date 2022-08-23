import { Table_Manager } from "./client/src/Table_Manager.js.js";
import { Motor_Data } from "./src/Motor_Data.js";
import { Graph_Manager } from "./client/src/Graph_Manager.js.js";

Graph_Manager.render();

window.addEventListener("scroll", () => {
    let window_bottom = window.visualViewport.pageTop + window.visualViewport.height;
    const button = document.getElementById("add-button");
    const default_bottom_pos = window.visualViewport.height + button.offsetHeight * 1.25;

    if (window_bottom > default_bottom_pos) {
        button.classList.remove("add-button-unstuck");
        button.classList.add("add-button-stuck");
    } else {
        button.classList.remove("add-button-stuck");
        button.classList.add("add-button-unstuck");
    }
})

document.getElementById("add-button").addEventListener("click", () => {
})

Table_Manager.render();