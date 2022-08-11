export class Table_Manager {
    constructor(table, motor_data) {
        this.table_element = table;
        this.motor_data = motor_data;
        this.data_displayed = [
            "name",
            "power",
            "torque",
            "price",
        ];
        this.render();
    }

    render_head_row(thead) {
        const head_row = document.createElement("tr");
        this.data_displayed.forEach(datum => {
            const head_row_entry = document.createElement("th");
            head_row_entry.innerText = datum;
            head_row_entry.setAttribute("scope", "col");
            head_row.appendChild(head_row_entry);
        });
        thead.appendChild(head_row);
    }

    add_datum_to_row(datum, data_row_element) {
        const data_row_entry = document.createElement("td");
        data_row_entry.innerText = datum;
        data_row_element.appendChild(data_row_entry);
    }

    add_data_row(motor, tbody) {
        const data_row_element = document.createElement('tr');
        this.data_displayed.forEach(datum => {
            this.add_datum_to_row(motor[datum], data_row_element);
        });
        data_row_element.addEventListener('click', () => {
            this.display_modal(motor.motor_id);
        });
        tbody.appendChild(data_row_element);
    }

    render_data_rows(tbody) {
        this.motor_data.key_sort("name", true).forEach(motor => {
            this.add_data_row(motor, tbody);
        })
    }

    render() {
        this.table_element.innerHTML = "";

        const thead = document.createElement("thead");
        thead.classList.add("thead-dark");
        this.render_head_row(thead);
        this.table_element.appendChild(thead);

        const tbody = document.createElement("tbody");
        this.render_data_rows(tbody);
        this.table_element.appendChild(tbody);
    }

    display_modal(motor_id) {
        alert("Motor with motor_id: " + motor_id + " was clicked!!!");
    }
}