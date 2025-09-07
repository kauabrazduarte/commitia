"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const fs = __importStar(require("fs"));
const userHome = os_1.default.homedir();
const configPath = `${userHome}/.commitia/config.json`;
if (!fs.existsSync(`${userHome}/.commitia`)) {
    fs.mkdirSync(`${userHome}/.commitia`);
}
class Config {
    static set(key, value) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8") ?? "{}");
        config[key] = value;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }
    static define(object) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8") ?? "{}");
        Object.assign(config, object);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }
    static get(key) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        return config[key] || null;
    }
    static getAll() {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8") ??
            "{ provider: '', model: '', apiKey: '' }");
        return config;
    }
}
exports.default = Config;
