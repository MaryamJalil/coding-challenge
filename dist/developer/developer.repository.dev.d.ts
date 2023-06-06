import { Developer, DeveloperInput, DeveloperUpdate } from "../types/developer";
export declare class DevelopersDevService {
    private developers;
    getAllDevelopers(): Developer[];
    getDeveloperById(id: number): Developer | undefined;
    getDevelopersByLevel(level: "SENIOR" | "JUNIOR"): Developer[];
    create(developer: DeveloperInput): Developer;
    updateDeveloper(input: DeveloperUpdate): Promise<Developer | undefined>;
    deleteDeveloper(id: number): Developer | undefined;
}
