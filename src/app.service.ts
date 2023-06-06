import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getEnvironmentVariable(): string {
    const envVariable = process.env.YOUR_ENV_VARIABLE || "default-value";
    console.log("Environment Variable:", envVariable);
    return envVariable;
  }
  getHello(): string {
    return "Hello World!";
  }
}
