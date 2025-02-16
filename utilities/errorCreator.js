export default class ErrorCreator extends Error {
    constructor() {
        super()
    }
    create(message, status) {
        this.message = message;
        this.status = status;
        return this;
    }
}