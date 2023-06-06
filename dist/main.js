"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
async function bootstrap() {
    if (process.env.NODE_ENV === "production") {
        dotenv.config({ path: ".env.production" });
    }
    else {
        dotenv.config({ path: ".env.development" });
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    console.log("Application is running on port 3000");
    console.log(`Application is running on env ${process.env.NODE_ENV}`);
}
bootstrap();
//# sourceMappingURL=main.js.map