import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeveloperEntity } from "./developer.entity";
import { Developer, DeveloperUpdate } from "../types/developer";
import { FindManyOptions, FindOneOptions } from "typeorm";

@Injectable()
export class DeveloperProdService {
  constructor(
    @InjectRepository(DeveloperEntity)
    private readonly developerRepository: Repository<DeveloperEntity>
  ) {}

  async getAllDevelopers(): Promise<Developer[]> {
    return this.developerRepository.find();
  }

  async getDeveloperById(id: any): Promise<Developer> {
    return this.developerRepository.findOne({ where: { id } });
  }

  async getDevelopersByLevel(level: "SENIOR" | "JUNIOR"): Promise<Developer[]> {
    const options: FindManyOptions<DeveloperEntity> = { where: { level } };
    return this.developerRepository.find(options);
  }
  async create(developer: any): Promise<Developer> {
    return this.developerRepository.save(developer);
  }

  async updateDeveloper(input: DeveloperUpdate): Promise<Developer> {
    const { id, ...developer } = input;
    this.developerRepository.update(id, developer);
    return this.developerRepository.findOne({ where: { id } });
  }

  async getDeveloperByEmail(email: string): Promise<DeveloperEntity> {
    const options: FindOneOptions<DeveloperEntity> = { where: { email } };
    return this.developerRepository.findOne(options);
  }

  async deleteDeveloper(id: number): Promise<void> {
    await this.developerRepository.delete(id);
  }
}
