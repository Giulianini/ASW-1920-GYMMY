import checkApiEndpoint from "./Api";

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const setup = () => {
    checkApiEndpoint((message, apiUrl) => console.log(`Connected to ${apiUrl}: ${message}`), (error) => `${error}`)
}