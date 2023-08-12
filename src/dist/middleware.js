"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.middleware = void 0;
var server_1 = require("next/server");
var jose = require("jose");
// This function can be marked `async` if using `await` inside
function middleware(request) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var jwt, secret, host, loginUrl, _b, payload, protectedHeader, headers;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    jwt = (_a = request.cookies.get("token")) === null || _a === void 0 ? void 0 : _a.value;
                    console.log("inside middleware with jwt:", jwt);
                    secret = new TextEncoder().encode(process.env.JWT_SECRET);
                    if (!!jwt) return [3 /*break*/, 1];
                    host = request.headers.get("host");
                    loginUrl = "http://" + host + "/api/auth/login";
                    // Check if the current URL is already the login URL to avoid a loop
                    if (request.url !== loginUrl) {
                        return [2 /*return*/, server_1.NextResponse.redirect(loginUrl)];
                        console.log("not the login page:", request.url);
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, jose.jwtVerify(jwt, secret)];
                case 2:
                    _b = _c.sent(), payload = _b.payload, protectedHeader = _b.protectedHeader;
                    headers = new Headers(request.headers);
                    headers.set("user", JSON.stringify(payload.email));
                    console.log(protectedHeader);
                    console.log(payload);
                    return [2 /*return*/, server_1.NextResponse.next({
                            request: {
                                headers: headers
                            }
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.middleware = middleware;
