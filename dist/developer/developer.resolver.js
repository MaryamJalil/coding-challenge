"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const developer_repository_dev_1 = require("./developer.repository.dev");
const developer_repository_prod_1 = require("./developer.repository.prod");
let DeveloperResolver = class DeveloperResolver {
    constructor(devService, prodService) {
        this.devService = devService;
        this.prodService = prodService;
        const nodeEnv = process.env.NODE_ENV;
        console.log(nodeEnv, "nodeEnv");
        this.developerService =
            nodeEnv === "production" ? this.prodService : this.devService;
    }
    async developers() {
        return this.developerService.getAllDevelopers();
    }
    async developer(id) {
        return this.developerService.getDeveloperById(id);
    }
    async developersByLevel(level) {
        return this.developerService.getDevelopersByLevel(level);
    }
    async createDeveloper(input) {
        return this.developerService.create(input);
    }
    async updateDeveloper(input) {
        return this.developerService.updateDeveloper(input);
    }
    async deleteDeveloper(id) {
        await this.developerService.deleteDeveloper(id);
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeveloperResolver.prototype, "developers", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeveloperResolver.prototype, "developer", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)("level")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeveloperResolver.prototype, "developersByLevel", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeveloperResolver.prototype, "createDeveloper", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeveloperResolver.prototype, "updateDeveloper", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeveloperResolver.prototype, "deleteDeveloper", null);
DeveloperResolver = __decorate([
    (0, graphql_1.Resolver)("Developer"),
    __metadata("design:paramtypes", [developer_repository_dev_1.DevelopersDevService,
        developer_repository_prod_1.DeveloperProdService])
], DeveloperResolver);
exports.DeveloperResolver = DeveloperResolver;
//# sourceMappingURL=developer.resolver.js.map