import { Motor_Data } from "./Motor_Data.js";
// const Chart = require("chart.js");

export const Graph_Manager = (() => {
    const graph_element = document.getElementById('main-chart');
    const data = {
        datasets: [{
            labels: [],
            label: 'Motors',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
        }],
    }
    const config = {
        type: 'scatter',
        data: data,
        options: {
            responsive: true,
            plugins: { // This is from here: https://stackoverflow.com/questions/44661671/chart-js-scatter-chart-displaying-label-specific-to-point-in-tooltip
                tooltip: {
                    callbacks: {
                        label: function (ctx) {
                            let label = ctx.dataset.labels[ctx.dataIndex];
                            // label += " (" + ctx.parsed.x + ", " + ctx.parsed.y + ")";
                            return label;
                        }
                    }
                }
            }
        }
    }
    return {
        render: async function () {
            const full_motor_data = await Motor_Data.key_sort('name', true);
            data.datasets[0].labels = full_motor_data.map(datum => datum.name);
            data.datasets[0].data = full_motor_data.map(datum => {
                return {
                    label: datum.name,
                    x: datum.price,
                    y: datum.power,
                }
            });
            this.chart = new Chart(
                graph_element,
                config,
            )
        },
    }
})();

Motor_Data.subscribe("graph-render", () => {
    Graph_Manager.chart.destroy();
    Graph_Manager.render();
});