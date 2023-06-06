import { Test, TestingModule } from "@nestjs/testing";
import { DeveloperResolver } from "./developer.resolver";
import { DevelopersDevService } from "./developer.repository.dev";
import { DeveloperProdService } from "./developer.repository.prod";
import { DeveloperInput, DeveloperUpdate } from "../types/developer";
import { DeveloperEntity } from "./developer.entity";
import { Repository } from "typeorm";

describe("DeveloperResolver", () => {
  let resolver: DeveloperResolver;
  let devService: DevelopersDevService;
  let prodService: DeveloperProdService;
  let developerRepository: Repository<DeveloperEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperResolver,
        DevelopersDevService,
        DeveloperProdService,
        DeveloperEntity,
        {
          provide: DevelopersDevService,
          useClass: DevelopersDevService,
        },
        {
          provide: DeveloperProdService,
          useExisting: DevelopersDevService,
        },
        {
          provide: DeveloperEntity,
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<DeveloperResolver>(DeveloperResolver);
    devService = module.get<DevelopersDevService>(DevelopersDevService);
    prodService = module.get<DeveloperProdService>(DeveloperProdService);
    developerRepository =
      module.get<Repository<DeveloperEntity>>(DeveloperEntity); // Get the developerRepository instance
  });

  describe("developers", () => {
    it("should call getAllDevelopers method of the appropriate service", async () => {
      const getAllDevelopersSpy = jest.spyOn(devService, "getAllDevelopers");

      await resolver.developers();

      expect(getAllDevelopersSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("developer", () => {
    it("should call getDeveloperById method of the appropriate service with the given ID", async () => {
      const id = 1;
      const getDeveloperByIdSpy = jest.spyOn(devService, "getDeveloperById");

      await resolver.developer(id);

      expect(getDeveloperByIdSpy).toHaveBeenCalledWith(id);
    });
  });

  describe("developersByLevel", () => {
    it("should call getDevelopersByLevel method of the appropriate service with the given level", async () => {
      const level = "JUNIOR";
      const getDevelopersByLevelSpy = jest.spyOn(
        devService,
        "getDevelopersByLevel"
      );

      await resolver.developersByLevel(level);

      expect(getDevelopersByLevelSpy).toHaveBeenCalledWith(level);
    });
  });

  describe("createDeveloper", () => {
    it("should call create method of the appropriate service with the given input", async () => {
      const input: DeveloperInput = {
        name: "Maryam Jalil",
        level: "JUNIOR",
        email: "maryam7jalil@gmail.com",
      };
      const createSpy = jest.spyOn(devService, "create");

      await resolver.createDeveloper(input);

      expect(createSpy).toHaveBeenCalledWith(input);
    });
  });

  describe("updateDeveloper", () => {
    it("should call updateDeveloper method of the appropriate service with the given input", async () => {
      const input: DeveloperUpdate = {
        id: 1,
        name: "Maryam Jalil",
      };
      const updateDeveloperSpy = jest.spyOn(devService, "updateDeveloper");

      await resolver.updateDeveloper(input);

      expect(updateDeveloperSpy).toHaveBeenCalledWith(input);
    });
  });

  describe("deleteDeveloper", () => {
    it("should call deleteDeveloper method of the appropriate service with the given ID", async () => {
      const id = 1;
      const deleteDeveloperSpy = jest.spyOn(devService, "deleteDeveloper");

      await resolver.deleteDeveloper(id);

      expect(deleteDeveloperSpy).toHaveBeenCalledWith(id);
    });
  });
});
