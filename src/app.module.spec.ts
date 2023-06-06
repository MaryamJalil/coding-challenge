import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DeveloperEntity } from "./developer/developer.entity";
import { DevelopersDevService } from "./developer/developer.repository.dev";

describe("AppModule", () => {
  let app: TestingModule;

  beforeAll(async () => {
    process.env.NODE_ENV = "production";

    app = await Test.createTestingModule({
      imports: [
        AppModule,
        DeveloperEntity,
        ConfigModule.forRoot({
          envFilePath: ".env.test",
          isGlobal: true,
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  it("should use production service", () => {
    const developersDevService =
      app.get<DevelopersDevService>(DevelopersDevService);
    expect(developersDevService).toBeDefined();
  });
});
