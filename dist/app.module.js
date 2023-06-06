"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const developer_module_1 = require("./developer/developer.module");
const configuration_1 = require("./config/configuration");
const developer_entity_1 = require("./developer/developer.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_1.ConfigModule],
                driver: apollo_1.ApolloDriver,
                useFactory: async (configService) => {
                    const playgroundEnabled = configService.get("app.graphqlPlaygroundEnabled");
                    console.log(process.env.NODE_ENV, "hbjnjnnjjnnj");
                    console.log("GraphQL Playground Enabled:", playgroundEnabled);
                    return {
                        typePaths: ["./**/*.graphql"],
                        playground: playgroundEnabled,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    console.log("database password:", configService.get("app.dbPassword"));
                    return {
                        type: "postgres",
                        host: configService.get("app.dbHost"),
                        port: configService.get("app.dbPort"),
                        username: configService.get("app.dbUsername"),
                        password: configService.get("app.dbPassword"),
                        database: configService.get("app.dbName"),
                        autoLoadEntities: true,
                        entities: [developer_entity_1.DeveloperEntity],
                        synchronize: true,
                        migrations: ["./src/migrations/*.ts"],
                    };
                },
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot({ load: [configuration_1.configuration] }),
            developer_module_1.DeveloperModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map