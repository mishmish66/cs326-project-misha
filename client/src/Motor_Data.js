export const Motor_Data = (() => {
    const subscribed = {};
    var next_motor_id = 0;
    const data = {};

    function change() {
        Object.keys(subscribed).forEach(key => {
            const func = subscribed[key];
            func();
        });
    }

    return {
        assign_field: function (motor_id, field, value) {
            if (this.valid_id(motor_id)) {
                data[motor_id][field] = value;
                change();
            } else { return false; }
        },
        update_motor: async function (motor) {
            const response = await fetch('/updateMotor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ motor: motor })
            });
            if (response.status < 400) {
                const data = await response.json();
                change();
                return data.motor;
            } else {
                return false;
            }
        },
        valid_id: function (motor_id) {
            return motor_id in data;
        },
        id_field: function (motor_id, field) {
            const motor = data[motor_id];
            if (field in motor) {
                return data[motor_id][field];
            } else { return false; }
        },
        get_motors_array: async function () {
            const response = await fetch(`/getMotors`, {
                method: 'GET'
            });
            const response_data = (await response.json()).motors;
            response_data.forEach(motor => data[motor.id] = motor);
            return response_data;
        },

        key_sort: async function (key, ascending) {
            let arr = await this.get_motors_array();
            arr.sort((lhs, rhs) => lhs[key] > rhs[key]);
            return arr;
        },

        add_motor: async function (motor) {
            const response = await fetch('/addMotor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ motor: motor }),
            });
            if (response.status < 400) {
                const response_motor = (await response.json()).motor;
                change();
                return response_motor;
            } else {
                return false;
            }
        },

        remove_motor: async function (motor_id) {
            const response = await fetch('/deleteMotor', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: motor_id }),
            });
            if (response.status < 400) {
                change();
                return true;
            } else {
                return false;
            }
        },

        subscribe: function (name, func) {
            subscribed[name] = func;
        },
        unsubscribe: function (name) {
            if (name in subscribed) {
                delete subscribed[name];
                return true;
            } else { return false; }
        },
    }
})();

