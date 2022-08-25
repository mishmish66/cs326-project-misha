import { Modal_Manager } from "./Modal_Manager.js";
import { Motor_Data } from "./Motor_Data.js";

export const Table_Manager = (() => {
    const table_element = document.getElementById("main-table");
    let sort_by = "name";
    function render_head_row(thead) {
        const head_row = document.createElement("tr");
        Table_Manager.data_displayed.forEach(datum => {
            const head_row_entry = document.createElement("th");
            head_row_entry.innerText = datum;
            head_row_entry.setAttribute("scope", "col");
            head_row_entry.addEventListener('click', () => { change_sort(datum) });
            head_row.appendChild(head_row_entry);
        });
        thead.appendChild(head_row);
    }
    function add_datum_to_row(datum, data_row_element) {
        const data_row_entry = document.createElement("td");
        data_row_entry.innerText = datum;
        data_row_element.appendChild(data_row_entry);
    }
    function add_data_row(motor, tbody) {
        const data_row_element = document.createElement('tr');
        Table_Manager.data_displayed.forEach(datum => {
            add_datum_to_row(motor[datum], data_row_element);
        });
        data_row_element.addEventListener('click', async () => {
            await display_modal(motor.id);
        });
        tbody.appendChild(data_row_element);
    }
    async function render_data_rows(tbody) {
        (await Motor_Data.key_sort(sort_by, true)).forEach(motor => {
            add_data_row(motor, tbody);
        })
    }
    async function display_modal(motor_id) {
        await Modal_Manager.show_modal(motor_id);
    }
    function change_sort(key) {
        sort_by = key;
        Table_Manager.render();
    }
    return {
        data_displayed: [
            "name",
            "power",
            "torque",
            "price",
            "mass",
        ],

        render: async function () {
            table_element.innerHTML = "";

            const thead = document.createElement("thead");
            thead.classList.add("thead-dark");
            render_head_row(thead);
            table_element.appendChild(thead);

            const tbody = document.createElement("tbody");
            await render_data_rows(tbody);
            table_element.appendChild(tbody);
        },
    }
})();

Motor_Data.subscribe("table-render", Table_Manager.render);