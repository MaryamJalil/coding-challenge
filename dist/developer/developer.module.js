"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperModule = void 0;
const common_1 = require("@nestjs/common");
const developer_resolver_1 = require("./developer.resolver");
const developer_repository_dev_1 = require("./developer.repository.dev");
const developer_repository_prod_1 = require("./developer.repository.prod");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const developer_entity_1 = require("./developer.entity");
const configuration_1 = require("../config/configuration");
let DeveloperModule = class DeveloperModule {
};
DeveloperModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ load: [configuration_1.configuration] }),
            typeorm_1.TypeOrmModule.forFeature([developer_entity_1.DeveloperEntity]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: "postgres",
                    host: configService.get("app.dbHost"),
                    port: configService.get("app.dbPort"),
                    username: configService.get("app.dbUsername"),
                    password: configService.get("app.dbPassword"),
                    database: configService.get("app.dbName"),
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            developer_resolver_1.DeveloperResolver,
            {
                provide: developer_repository_dev_1.DevelopersDevService,
                useClass: developer_repository_dev_1.DevelopersDevService,
            },
            {
                provide: developer_repository_prod_1.DeveloperProdService,
                useClass: developer_repository_prod_1.DeveloperProdService,
            },
        ],
    })
], DeveloperModule);
exports.DeveloperModule = DeveloperModule;
//# sourceMappingURL=developer.module.js.map