import { Repository } from "typeorm";
import { DeveloperEntity } from "./developer.entity";
import { Developer, DeveloperUpdate } from "../types/developer";
export declare class DeveloperProdService {
    private readonly developerRepository;
    constructor(developerRepository: Repository<DeveloperEntity>);
    getAllDevelopers(): Promise<Developer[]>;
    getDeveloperById(id: any): Promise<Developer>;
    getDevelopersByLevel(level: "SENIOR" | "JUNIOR"): Promise<Developer[]>;
    create(developer: any): Promise<Developer>;
    updateDeveloper(input: DeveloperUpdate): Promise<Developer>;
    getDeveloperByEmail(email: string): Promise<DeveloperEntity>;
    deleteDeveloper(id: number): Promise<void>;
}
