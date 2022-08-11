import { show_modal } from "./Modal_Utils.js";
import { Motor_Data } from "./Motor_Data.js";

export const Table_Manager = {
    table_element: document.getElementById("main-table"),
    data_displayed: [
            "name",
            "power",
            "torque",
            "price",
    ],
    render_head_row: function (thead) {
        const head_row = document.createElement("tr");
        this.data_displayed.forEach(datum => {
            const head_row_entry = document.createElement("th");
            head_row_entry.innerText = datum;
            head_row_entry.setAttribute("scope", "col");
            head_row.appendChild(head_row_entry);
        });
        thead.appendChild(head_row);
    },

    add_datum_to_row: function (datum, data_row_element) {
        const data_row_entry = document.createElement("td");
        data_row_entry.innerText = datum;
        data_row_element.appendChild(data_row_entry);
    },

    add_data_row: function (motor, tbody) {
        const data_row_element = document.createElement('tr');
        this.data_displayed.forEach(datum => {
            this.add_datum_to_row(motor[datum], data_row_element);
        });
        data_row_element.addEventListener('click', () => {
            this.display_modal(motor.motor_id);
        });
        tbody.appendChild(data_row_element);
    },

    render_data_rows: function (tbody) {
        Motor_Data.key_sort("name", true).forEach(motor => {
            this.add_data_row(motor, tbody);
        })
    },

    render: function () {
        this.table_element.innerHTML = "";

        const thead = document.createElement("thead");
        thead.classList.add("thead-dark");
        this.render_head_row(thead);
        this.table_element.appendChild(thead);

        const tbody = document.createElement("tbody");
        this.render_data_rows(tbody);
        this.table_element.appendChild(tbody);
    },

    display_modal: function (motor_id) {
        show_modal(motor_id);
    }
}