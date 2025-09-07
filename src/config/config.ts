import os from "os";
import * as fs from "fs";

interface ConfigInterface {
  provider: string;
  model: string;
  apiKey: string;
}

const userHome = os.homedir();
const configPath = `${userHome}/.commitia/config.json`;

if (!fs.existsSync(`${userHome}/.commitia`)) {
  fs.mkdirSync(`${userHome}/.commitia`);
}

export default class Config {
  static set(key: keyof ConfigInterface, value: string) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8") ?? "{}");
    config[key] = value;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  static define(object: Partial<ConfigInterface>) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8") ?? "{}");
    Object.assign(config, object);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  static get(key: keyof ConfigInterface): string | null {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return config[key] || null;
  }

  static getAll(): ConfigInterface {
    const config = JSON.parse(
      fs.readFileSync(configPath, "utf8") ??
        "{ provider: '', model: '', apiKey: '' }",
    );

    return config as ConfigInterface;
  }
}
