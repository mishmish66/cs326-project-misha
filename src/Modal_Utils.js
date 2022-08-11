import { Motor_Data } from "./Motor_Data.js"
import { Table_Manager } from "./Table_Manager.js";


const modal = new bootstrap.Modal(document.getElementById('input-modal'), {
    keyboard: false,
});

const modal_body = document.getElementById("input-modal-body");
const modal_fields = {
    name: document.getElementById("name-field"),
    power: document.getElementById("power-field"),
    torque: document.getElementById("torque-field"),
    price: document.getElementById("price-field"),
}
const modal_textboxes = {
    name: document.getElementById("name-input"),
    power: document.getElementById("power-input"),
    torque: document.getElementById("torque-input"),
    price: document.getElementById("price-input"),
}
const modal_title = document.getElementById("input-modal-title");

var target_id = null;

function motor_modify_click() {
    if (target_id) {
        update_motor_data(target_id);
        target_id = null;
    }
}

function update_motor_data(motor_id) {
    Object.keys(modal_fields).forEach(field_key => {
        Motor_Data.data[motor_id][field_key] = modal_textboxes[field_key].value;
    });
    modal.hide();
    Table_Manager.render();
}

document.getElementById('submit-modal')

export function show_modal(motor_id) {
    Object.keys(modal_fields).forEach(field_key => {
        modal_textboxes[field_key].value = Motor_Data.data[motor_id][field_key];
        modal_fields[field_key].remove();
    });
    Table_Manager.data_displayed.forEach(field => {
        modal_body.appendChild(modal_fields[field]);
    });

    modal_title.innerText = "ID: " + motor_id + ", " + Motor_Data.data[motor_id].name;

    const submit_modal_button = document.getElementById("submit-modal");

    target_id = motor_id;
    submit_modal_button.addEventListener('click', motor_modify_click);

    modal.show();
}