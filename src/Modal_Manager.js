import { Motor_Data } from "./Motor_Data.js"
import { Table_Manager } from "./Table_Manager.js";

// This singleton pattern is from https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-a-singleton-in-javascript
export const Modal_Manager = (() => {
    const modal_body = document.getElementById("input-modal-body");
    const number_formatting = {
        name: false,
        power: true,
        torque: true,
        price: true,
        mass: true,
    }

    const modal = new bootstrap.Modal(document.getElementById('input-modal'), {
        keyboard: false,
    });

    document.getElementById("submit-modal").addEventListener('click', submit_modal_action);

    document.getElementById("delete-button").addEventListener('click', delete_modal_action);

    document.getElementById("add-button").addEventListener('click', () => {
        Modal_Manager.show_modal(null);
    });

    const modal_fields = {
        name: document.getElementById("name-field"),
        power: document.getElementById("power-field"),
        torque: document.getElementById("torque-field"),
        price: document.getElementById("price-field"),
        mass: document.getElementById("mass-field"),
    }
    const modal_textboxes = {
        name: document.getElementById("name-input"),
        power: document.getElementById("power-input"),
        torque: document.getElementById("torque-input"),
        price: document.getElementById("price-input"),
        mass: document.getElementById("mass-input"),
    }
    const modal_title = document.getElementById("input-modal-title");

    function modal_create_new_motor() {
        if (!verify_inputs()) {
            return false;
        }
        let motor = {};
        Object.keys(modal_fields).forEach(field_key => {
            const textbox = modal_textboxes[field_key]
            motor[field_key] = number_formatting[field_key] ?
                parseFloat(textbox.value) : textbox.value;
        });
        Motor_Data.add_motor(motor);
        modal.hide();
        Table_Manager.render();
        return true;
    }

    function update_motor_data(motor_id) {
        if (!verify_inputs()) {
            return false;
        }
        Object.keys(modal_fields).forEach(field_key => {
            const textbox = modal_textboxes[field_key]
            Motor_Data.assign_field(motor_id, field_key, number_formatting[field_key] ?
                parseFloat(textbox.value) : textbox.value);
        });
        modal.hide();
        // Table_Manager.render();
        return true;
    }

    function delete_motor(motor_id) {
        Motor_Data.remove_motor(motor_id);
    }

    function verify_inputs() {
        let pass = true;
        Object.keys(modal_fields).forEach(field_key => {
            const textbox = modal_textboxes[field_key]
            if (!(textbox.value) || isNaN(textbox.value) && number_formatting[field_key]) {
                textbox.classList.add("text-bg-danger");
                setTimeout(() => { textbox.classList.remove("text-bg-danger") }, 600);
                pass = false;
            } else {
                try {
                    modal_textboxes[field_key].classList.remove("text-danger");
                } catch { }
            }
        });
        return pass;
    }

    function submit_modal_action() {
        if (buffered_modal_submit_action) {
            if (buffered_modal_submit_action()) {
                clear_actions();
            }
        }
    }

    function delete_modal_action() {
        if (buffered_modal_delete_action) {
            buffered_modal_delete_action();
        }
        clear_actions();
        modal.hide();
    }

    var buffered_modal_submit_action = null;
    var buffered_modal_delete_action = null;

    function clear_actions() {
        buffered_modal_submit_action = null;
        buffered_modal_delete_action = null;
    }

    return {
        show_modal: function show_modal(motor_id) {
            Object.keys(modal_fields).forEach(field_key => {
                if (motor_id) {
                    const value = Motor_Data.id_field(motor_id, field_key);
                    modal_textboxes[field_key].value = value ? value : "";
                }

                modal_fields[field_key].remove();
            });
            Table_Manager.data_displayed.forEach(field => {
                modal_body.appendChild(modal_fields[field]);
            });

            if (motor_id) {
                modal_title.innerText = "ID: " + motor_id + ", " + Motor_Data.id_field(motor_id, "name");
            } else {
                modal_title.innerText = "New Motor";
            }

            if (motor_id) {
                buffered_modal_submit_action = () => update_motor_data(motor_id);
                buffered_modal_delete_action = () => delete_motor(motor_id);
            } else {
                buffered_modal_submit_action = modal_create_new_motor;
            }

            modal.show();
        },
    }
})()
