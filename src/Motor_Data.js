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
        valid_id: function (motor_id) {
            return motor_id in data;
        },
        id_field: function (motor_id, field) {
            const motor = data[motor_id];
            if (field in motor) {
                return data[motor_id][field];
            } else { return false; }
        },
        get_motors_array: function () {
            const keys = Object.keys(data);
            const as_array = keys.map(key => {
                const copy = {};
                Object.assign(copy, data[key]);
                copy.motor_id = key;
                return copy;
            });
            return as_array;
        },

        key_sort: function (key, ascending) {
            let arr = this.get_motors_array();
            arr.sort((lhs, rhs) => lhs[key] > rhs[key]);
            return arr;
        },

        add_motor: function (motor) {
            data[next_motor_id] = motor;
            change();
            return next_motor_id++;
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

