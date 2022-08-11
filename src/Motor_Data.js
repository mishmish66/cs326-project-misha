export class Motor_Data {
    constructor() {
        this.data = {
            1: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            2: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            3: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            4: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            5: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            6: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            7: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            8: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            9: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            10: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            11: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            12: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            13: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            14: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            15: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            16: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            17: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
            18: { name: "hellow", power: "world", torque: "your-mom", price: "onoin" },
        };
    }

    get_motors_array() {
        const keys = Object.keys(this.data);
        const as_array = keys.map(key => {
            const copy = {};
            Object.assign(copy, this.data[key]);
            copy.motor_id = key;
            return copy;
        });
        return as_array;
    }

    key_sort(key, ascending) {
        let arr = this.get_motors_array();
        arr.sort((lhs, rhs) => lhs[key] > rhs[key]);
        return arr;
    }
}