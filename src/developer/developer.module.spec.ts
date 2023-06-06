import { Test, TestingModule } from "@nestjs/testing";
import { DeveloperModule } from "./developer.module";
import { DeveloperResolver } from "./developer.resolver";
import { DevelopersDevService } from "./developer.repository.dev";
import { DeveloperProdService } from "./developer.repository.prod";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeveloperEntity } from "./developer.entity";
import { configuration } from "../config/configuration";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

describe("DeveloperModule", () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        TypeOrmModule.forFeature([DeveloperEntity]),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (
            configService: ConfigService
          ): Promise<TypeOrmModuleOptions> => ({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "maryam",
            database: "postgres",
            autoLoadEntities: true,
            entities: [DeveloperEntity],
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        DeveloperResolver,
        {
          provide: DevelopersDevService,
          useClass: DevelopersDevService,
        },
        {
          provide: DeveloperProdService,
          useClass: DeveloperProdService,
        },
      ],
    }).compile();
  });

  it("should be defined", () => {
    expect(module).toBeDefined();
  });

  it("should resolve DeveloperResolver", () => {
    const resolver = module.get<DeveloperResolver>(DeveloperResolver);
    expect(resolver).toBeDefined();
  });

  it("should resolve DevelopersDevService", () => {
    const service = module.get<DevelopersDevService>(DevelopersDevService);
    expect(service).toBeDefined();
  });

  it("should resolve DeveloperProdService", () => {
    const service = module.get<DeveloperProdService>(DeveloperProdService);
    expect(service).toBeDefined();
  });
});
