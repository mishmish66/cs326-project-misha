import { Motor_Data } from "./Motor_Data.js"
import { Table_Manager } from "./Table_Manager.js";

const number_formatting = {
    name: false,
    power: true,
    torque: true,
    price: true,
}


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
        if (update_motor_data(target_id)) {
            target_id = null;
        }
    }
}

function verify_inputs() {
    let pass = true;
    Object.keys(modal_fields).forEach(field_key => {
        const textbox = modal_textboxes[field_key]
        if (isNaN(textbox.value) && number_formatting[field_key]) {
            textbox.classList.add("text-danger");
            pass = false;
        } else {
            try {
                modal_textboxes[field_key].classList.remove("text-danger");
            } catch { }
        }
    });
    return pass;
}

function update_motor_data(motor_id) {
    if (!verify_inputs()) {
        return false;
    }
    Object.keys(modal_fields).forEach(field_key => {
        const textbox = modal_textboxes[field_key]
        Motor_Data.data[motor_id][field_key] = textbox.value;
    });
    modal.hide();
    Table_Manager.render();
    return true;
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