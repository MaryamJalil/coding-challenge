import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

async function bootstrap() {
  if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.production" });
  } else {
    dotenv.config({ path: ".env.development" });
  }

  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  console.log("Application is running on port 3000");
  console.log(`Application is running on env ${process.env.NODE_ENV}`);
}

bootstrap();
