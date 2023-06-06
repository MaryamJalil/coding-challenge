import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { DevelopersDevService } from "./developer.repository.dev";
import { DeveloperProdService } from "./developer.repository.prod";
import { DeveloperInput, DeveloperUpdate } from "../types/developer";

@Resolver("Developer")
export class DeveloperResolver {
  private developerService: DeveloperProdService | DevelopersDevService;

  constructor(
    private readonly devService: DevelopersDevService,
    private readonly prodService: DeveloperProdService
  ) {
    const nodeEnv = process.env.NODE_ENV;
    console.log(nodeEnv, "nodeEnv");
    this.developerService =
      nodeEnv === "production" ? this.prodService : this.devService;
  }

  @Query()
  async developers() {
    return this.developerService.getAllDevelopers();
  }

  @Query()
  async developer(@Args("id") id: number) {
    return this.developerService.getDeveloperById(id);
  }

  @Query()
  async developersByLevel(@Args("level") level: "JUNIOR" | "SENIOR") {
    return this.developerService.getDevelopersByLevel(level);
  }

  @Mutation()
  async createDeveloper(@Args("input") input: DeveloperInput) {
    return this.developerService.create(input);
  }

  @Mutation()
  async updateDeveloper(@Args("input") input: DeveloperUpdate) {
    return this.developerService.updateDeveloper(input);
  }

  @Mutation()
  async deleteDeveloper(@Args("id") id: number) {
    await this.developerService.deleteDeveloper(id);
    return true;
  }
}
