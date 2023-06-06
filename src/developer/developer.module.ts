import { Module } from "@nestjs/common";
import { DeveloperResolver } from "./developer.resolver";
import { DevelopersDevService } from "./developer.repository.dev";
import { DeveloperProdService } from "./developer.repository.prod";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeveloperEntity } from "./developer.entity";
import { configuration } from "../config/configuration";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forFeature([DeveloperEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => ({
        type: "postgres",
        host: configService.get<string>("app.dbHost"),
        port: configService.get<number>("app.dbPort"),
        username: configService.get<string>("app.dbUsername"),
        password: configService.get<string>("app.dbPassword"),
        database: configService.get<string>("app.dbName"),
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
})
export class DeveloperModule {}
