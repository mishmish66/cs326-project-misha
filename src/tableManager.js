export class tableManager {
    constructor(table) {
        this.table_element = table;
        this.motors = {
            1: {name: "hellow", power: "world", torque: "your-mom", price: "onoin"},
        };
        this.data_displayed = [
            "name",
            "power",
            "torque",
            "price",
        ];
        this.render();
    }

    render() {
        this.table_element.innerHTML = "";
        const data = this.key_sort("name");

        const thead = document.createElement("thead");
        thead.classList.add("thead-dark");

        const head_row = document.createElement("tr");
        this.data_displayed.forEach(datum => {
            const head_row_entry = document.createElement("th");
            head_row_entry.innerText = datum;
            head_row_entry.setAttribute("scope", "col");
            head_row.appendChild(head_row_entry);
        });
        thead.appendChild(head_row);
        this.table_element.appendChild(thead);

        const tbody = document.createElement("tbody");
        const rows = data.map(motor => {
            const row = {};
            const data_row_element = document.createElement("tr");
            this.data_displayed.forEach(datum => {
                const data_row_entry = document.createElement("td");
                data_row_entry.innerText = motor.motor[datum];
                row[datum] = data_row_entry;
                row[motor.motor_id] = motor.motor_id;
                data_row_element.appendChild(data_row_entry);
            })
            tbody.appendChild(data_row_element);
            return row;
        });
        this.table_element.appendChild(tbody);
    }

    key_sort(key, ascending) {
        let arr = this.get_motors_array();
        arr.sort((lhs, rhs) => lhs.motor[key] > rhs.motor[key]);
        return arr;
    }

    get_motors_array() {
        const motor_ids = Object.keys(this.motors);
        const as_array = motor_ids.map(id => { return { motor_id: id, motor: this.motors[id] } });
        return as_array;
    }
}