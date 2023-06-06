import { Injectable } from "@nestjs/common";
import { Developer, DeveloperInput, DeveloperUpdate } from "../types/developer";
import * as _ from "lodash";

@Injectable()
export class DevelopersDevService {
  private developers: Developer[] = [];

  getAllDevelopers(): Developer[] {
    return this.developers;
  }

  getDeveloperById(id: number): Developer | undefined {
    return this.developers.find((developer) => developer.id === id);
  }

  getDevelopersByLevel(level: "SENIOR" | "JUNIOR"): Developer[] {
    return this.developers.filter((developer) => developer.level === level);
  }

  create(developer: DeveloperInput): Developer {
    const existingDeveloper = this.developers.find(
      (dev) => dev.email === developer.email
    );
    if (existingDeveloper) {
      throw new Error("Developer with the same email already exists.");
    }

    const newDeveloper: Developer = {
      id: Math.floor(Math.random() * 2147483647),
      name: developer.name,
      email: developer.email,
      level: developer.level,
    };

    this.developers.push(newDeveloper);

    return newDeveloper;
  }

  async updateDeveloper(
    input: DeveloperUpdate
  ): Promise<Developer | undefined> {
    const { id, name, email, level } = input;
    const developerIndex = await this.developers.findIndex(
      (developer) => developer.id === id
    );
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

  deleteDeveloper(id: number): Developer | undefined {
    const developerIndex = this.developers.findIndex(
      (developer) => developer.id === id
    );
    if (developerIndex !== -1) {
      return this.developers.splice(developerIndex, 1)[0];
    }
    return undefined;
  }
}
