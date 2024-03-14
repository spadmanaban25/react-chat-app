import {firebase} from "../firebase";

const db = firebase.database();
const ref = db.ref("messages");

class Message {
    getAll() {
        return ref;
    }

    create(userData) {
        return ref.push(userData);
    }

    update(key, value) {
        return ref.child(key).update(value);
    }

    delete(key) {
        return ref.child(key).remove();
    }

    deleteAll() {
        return ref.remove();
    }
}

export default new Message();