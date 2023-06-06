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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperProdService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const developer_entity_1 = require("./developer.entity");
let DeveloperProdService = class DeveloperProdService {
    constructor(developerRepository) {
        this.developerRepository = developerRepository;
    }
    async getAllDevelopers() {
        return this.developerRepository.find();
    }
    async getDeveloperById(id) {
        return this.developerRepository.findOne({ where: { id } });
    }
    async getDevelopersByLevel(level) {
        const options = { where: { level } };
        return this.developerRepository.find(options);
    }
    async create(developer) {
        return this.developerRepository.save(developer);
    }
    async updateDeveloper(input) {
        const { id } = input, developer = __rest(input, ["id"]);
        this.developerRepository.update(id, developer);
        return this.developerRepository.findOne({ where: { id } });
    }
    async getDeveloperByEmail(email) {
        const options = { where: { email } };
        return this.developerRepository.findOne(options);
    }
    async deleteDeveloper(id) {
        await this.developerRepository.delete(id);
    }
};
DeveloperProdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(developer_entity_1.DeveloperEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DeveloperProdService);
exports.DeveloperProdService = DeveloperProdService;
//# sourceMappingURL=developer.repository.prod.js.map