import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DeveloperModule } from "./developer/developer.module";
import { configuration } from "./config/configuration";
import { DeveloperEntity } from "./developer/developer.entity";

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: async (
        configService: ConfigService
      ): Promise<ApolloDriverConfig> => {
        const playgroundEnabled = configService.get<boolean>(
          "app.graphqlPlaygroundEnabled"
        );
        console.log(process.env.NODE_ENV, "hbjnjnnjjnnj");
        console.log("GraphQL Playground Enabled:", playgroundEnabled);

        return {
          typePaths: ["./**/*.graphql"],
          playground: playgroundEnabled,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => {
        console.log(
          "database password:",
          configService.get<string>("app.dbPassword")
        );
        return {
          type: "postgres",
          host: configService.get<string>("app.dbHost"),
          port: configService.get<number>("app.dbPort"),
          username: configService.get<string>("app.dbUsername"),
          password: configService.get<string>("app.dbPassword"),
          database: configService.get<string>("app.dbName"),
          autoLoadEntities: true,
          entities: [DeveloperEntity],
          synchronize: true,
          migrations: ["./src/migrations/*.ts"],
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ load: [configuration] }),
    DeveloperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
