"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopersDevService = void 0;
const common_1 = require("@nestjs/common");
let DevelopersDevService = class DevelopersDevService {
    constructor() {
        this.developers = [];
    }
    getAllDevelopers() {
        return this.developers;
    }
    getDeveloperById(id) {
        return this.developers.find((developer) => developer.id === id);
    }
    getDevelopersByLevel(level) {
        return this.developers.filter((developer) => developer.level === level);
    }
    create(developer) {
        const existingDeveloper = this.developers.find((dev) => dev.email === developer.email);
        if (existingDeveloper) {
            throw new Error("Developer with the same email already exists.");
        }
        const newDeveloper = {
            id: Math.floor(Math.random() * 2147483647),
            name: developer.name,
            email: developer.email,
            level: developer.level,
        };
        this.developers.push(newDeveloper);
        return newDeveloper;
    }
    async updateDeveloper(input) {
        const { id, name, email, level } = input;
        const developerIndex = await this.developers.findIndex((developer) => developer.id === id);
        if (developerIndex !== -1) {
            this.developers[developerIndex] = {
                id,
                name: name || this.developers[developerIndex].name,
                email: email || this.developers[developerIndex].email,
                level: level || this.developers[developerIndex].level,
            };
            return this.developers[developerIndex];
        }
        return undefined;
    }
    deleteDeveloper(id) {
        const developerIndex = this.developers.findIndex((developer) => developer.id === id);
        if (developerIndex !== -1) {
            return this.developers.splice(developerIndex, 1)[0];
        }
        return undefined;
    }
};
DevelopersDevService = __decorate([
    (0, common_1.Injectable)()
], DevelopersDevService);
exports.DevelopersDevService = DevelopersDevService;
//# sourceMappingURL=developer.repository.dev.js.map