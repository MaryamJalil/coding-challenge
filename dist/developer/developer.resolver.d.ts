import { DevelopersDevService } from "./developer.repository.dev";
import { DeveloperProdService } from "./developer.repository.prod";
import { DeveloperInput, DeveloperUpdate } from "../types/developer";
export declare class DeveloperResolver {
    private readonly devService;
    private readonly prodService;
    private developerService;
    constructor(devService: DevelopersDevService, prodService: DeveloperProdService);
    developers(): Promise<import("../types/developer").Developer[]>;
    developer(id: number): Promise<import("../types/developer").Developer>;
    developersByLevel(level: "JUNIOR" | "SENIOR"): Promise<import("../types/developer").Developer[]>;
    createDeveloper(input: DeveloperInput): Promise<import("../types/developer").Developer>;
    updateDeveloper(input: DeveloperUpdate): Promise<import("../types/developer").Developer>;
    deleteDeveloper(id: number): Promise<boolean>;
}
