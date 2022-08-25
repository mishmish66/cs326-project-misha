export const Login_Manager = (() => {
    const modal_body = document.getElementById("login-modal-body");

    const modal = new bootstrap.Modal(document.getElementById('login-modal'), {
        keyboard: false,
    });

    document.getElementById("sumbit-login-button").addEventListener('click', submit_modal_action);

    document.getElementById("delete-button").addEventListener('click', delete_modal_action);

    document.getElementById("login-button").addEventListener('click', async () => {
        await Login_Modal_Manager.show_modal();
    });

    const modal_textboxes = {
        username: document.getElementById("username-input"),
        password: document.getElementById("password-input"),
    }

    async function sign_up() {
        if (!verify_inputs()) {
            return false;
        }
        let motor = {};
        Object.keys(modal_fields).forEach(field_key => {
            const textbox = modal_textboxes[field_key]
            motor[field_key] = number_formatting[field_key] ?
                parseFloat(textbox.value) : textbox.value;
        });
        await Motor_Data.add_motor(motor);
        modal.hide();
        await Table_Manager.render();
        return true;
    }

    async function sign_in(username, password) {
        const response = await fetch('/updateMotor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: modal_textboxes.username.value,
                password: modal_textboxes.password.value,
            }),
        });
        if (response.status < 400) {
            const data = await response.json();
            change();
            return data.motor;
        } else {
            return false;
        }
    }

    async function encryption_check(password, login) {

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

    async function delete_modal_action() {
        if (buffered_modal_delete_action) {
            await buffered_modal_delete_action();
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
        show_modal: async function show_modal(motor_id) {
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
                buffered_modal_submit_action = async () => await update_motor_data(motor_id);
                buffered_modal_delete_action = async () => await delete_motor(motor_id);
            } else {
                buffered_modal_submit_action = modal_create_new_motor;
            }

            modal.show();
        },
    }
})()
