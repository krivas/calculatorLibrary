"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenManager = void 0;
const jwt_decode_1 = require("jwt-decode");
const moment = require("moment");
class tokenManager {
    constructor(outputId, configCallback) {
        this.authenticate = async () => {
            const rtv = await fetch(this.urlToGetToken)
                .then(response => response.json())
                .catch(error => console.log('error', error));
            console.log(rtv);
            return rtv.token;
        };
        this.outputId = outputId;
        const config = configCallback();
        this.urlToGetToken = config.urlToGetToken;
        this.urlForPrompt = config.urlForPrompt;
    }
    saveTokenInfo(token) {
        localStorage.setItem("token", token);
        const decode = (0, jwt_decode_1.jwtDecode)(token);
        if (decode.exp)
            localStorage.setItem("expires_at", `${decode.exp}`);
    }
    isLoggedIn() {
        const token = this.getToken();
        if (token) {
            const expiration = this.getExpiration();
            if (expiration !== -1) {
                return moment().isBefore(expiration);
            }
        }
        return false;
    }
    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (expiration) {
            const expirationTimestamp = parseInt(expiration);
            if (!isNaN(expirationTimestamp)) {
                return moment.unix(expirationTimestamp);
            }
        }
        return -1;
    }
    getToken() {
        return localStorage.getItem("token");
    }
}
exports.tokenManager = tokenManager;
