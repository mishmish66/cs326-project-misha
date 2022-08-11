import { Motor_Data } from "./Motor_Data";

const labels = [];

const data = {
    labels: labels,
    datasets: [{
        // label: 'My First dataset',
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

export const Graph_Manager = {
    render: function () {
        full_motor_data = Motor_Data.key_sort('name', true);
        labels = full_motor_data.map(datum => datum.name);
        data.datasets.data = full_motor_data.map(datum => datum.power);
    },
}