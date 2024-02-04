class FunctionNotImplementedError extends Error {
    constructor(message) {
        super(`function ${message} does not exist`);
        this.name = "FunctionNotImplementedError";
    }
}

class UserAlreadyExists extends Error {
    constructor(message) {
        super(`username ${message} already taken`);
        this.name = "UserAlreadyExists"
    }
}

class CityDoesNotExistError extends Error {
    constructor(message) {
        super(`city ${message} could not be found`);
        this.name = "CityDoesNotExist"
    }
}

module.exports = {
    FunctionNotImplementedError: FunctionNotImplementedError,
    UserAlreadyExists: UserAlreadyExists,
    CityDoesNotExistError: CityDoesNotExistError
}