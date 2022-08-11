import { Table_Manager } from "./src/Table_Manager.js";
import { Motor_Data } from "./src/Motor_Data.js";

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        // layout: {
        //     padding: 100
        // },
        // maintainAspectRatio: false,
        responsive: true,
    }
};

const myChart = new Chart(
    document.getElementById('main-chart'),
    config
);

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

const md = new Motor_Data();

const tm = new Table_Manager(document.getElementById("main-table"), md);

document.getElementById("add-button").addEventListener("click", () => {
})

var input_modal = new bootstrap.Modal(document.getElementById('input-modal'), {
    keyboard: false,
});

input_modal.show();