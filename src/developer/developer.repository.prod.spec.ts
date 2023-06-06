import { Test, TestingModule } from "@nestjs/testing";
import { DeveloperProdService } from "./developer.repository.prod";
import { Repository } from "typeorm";
import { DeveloperEntity } from "./developer.entity";
import { DeveloperInput, DeveloperUpdate } from "src/types/developer";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("DeveloperProdService", () => {
  let service: DeveloperProdService;
  let repository: Repository<DeveloperEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperProdService,
        {
          provide: getRepositoryToken(DeveloperEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DeveloperProdService>(DeveloperProdService);
    repository = module.get<Repository<DeveloperEntity>>(
      getRepositoryToken(DeveloperEntity)
    );
  });

  describe("getAllDevelopers", () => {
    it("should return all developers", async () => {
      const mockDevelopers: DeveloperEntity[] = [
        {
          id: 1,
          name: "Maryam Jalil",
          email: "maryam7jalil@gmail.com",
          level: "JUNIOR",
        },
        {
          id: 2,
          name: "Amna Imtiaz",
          email: "amna@gmail.com",
          level: "SENIOR",
        },
      ];

      jest
        .spyOn(repository, "find")
        .mockImplementation(() => Promise.resolve(mockDevelopers));

      const result = await service.getAllDevelopers();

      expect(result).toEqual(mockDevelopers);
    });
  });

  describe("getDeveloperById", () => {
    it("should return a developer by ID", async () => {
      const mockDeveloper: DeveloperEntity = {
        id: 1,
        name: "Maryam Jalil",
        email: "maryam7jalil@gmail.com",
        level: "JUNIOR",
      };
      jest
        .spyOn(repository, "findOne")
        .mockImplementation(() => Promise.resolve(mockDeveloper));

      const result = await service.getDeveloperById(1);

      expect(result).toEqual(mockDeveloper);
    });
  });

  describe("getDevelopersByLevel", () => {
    it("should return developers by level", async () => {
      const level = "SENIOR";
      const mockDevelopers: DeveloperEntity[] = [
        {
          id: 1,
          name: "Amna Imtiaz",
          email: "amna@gmail.com",
          level: "SENIOR",
        },
        {
          id: 2,
          name: "Alex",
          email: "alex@example.com",
          level: "SENIOR",
        },
      ];

      jest
        .spyOn(repository, "find")
        .mockImplementation(() => Promise.resolve(mockDevelopers));

      const result = await service.getDevelopersByLevel(level);

      expect(result).toEqual(mockDevelopers);
    });
  });

  describe("create", () => {
    it("should create a new developer", async () => {
      const newDeveloper: DeveloperInput = {
        name: "Maryam Jalil",
        email: "maryam7jalil@gmail.com",
        level: "JUNIOR",
      };

      const createdDeveloper: DeveloperEntity = {
        id: 1,
        name: "Maryam Jalil",
        email: "maryam7jalil@gmail.com",
        level: "JUNIOR",
      };

      jest
        .spyOn(repository, "save")
        .mockImplementation(() => Promise.resolve(createdDeveloper));

      const result = await service.create(newDeveloper);

      expect(result).toEqual(createdDeveloper);
    });
  });

  describe("updateDeveloper", () => {
    it("should update an existing developer", async () => {
      const input: DeveloperUpdate = {
        id: 1,
        name: "Marry",
        email: "maryam7jalil@gmail.com",
        level: "SENIOR",
      };

      const updatedDeveloper: DeveloperEntity = {
        id: 1,
        name: "Marry",
        email: "maryam7jalil@gmail.com",
        level: "SENIOR",
      };

      jest.spyOn(repository, "update").mockImplementation();
      jest
        .spyOn(repository, "findOne")
        .mockImplementation(() => Promise.resolve(updatedDeveloper));

      const result = await service.updateDeveloper(input);

      expect(repository.update).toHaveBeenCalledWith(input.id, {
        name: input.name,
        email: input.email,
        level: input.level,
      });

      expect(result).toEqual(updatedDeveloper);
    });
  });

  describe("getDeveloperByEmail", () => {
    it("should return a developer by email", async () => {
      const email = "maryam7jalil@gmail.com";
      const mockDeveloper: DeveloperEntity = {
        id: 1,
        name: "Maryam Jalil",
        email: "maryam7jalil@gmail.com",
        level: "JUNIOR",
      };

      jest
        .spyOn(repository, "findOne")
        .mockImplementation(() => Promise.resolve(mockDeveloper));

      const result = await service.getDeveloperByEmail(email);

      expect(result).toEqual(mockDeveloper);
    });
  });

  describe("deleteDeveloper", () => {
    it("should delete an existing developer", async () => {
      const id = 1;

      jest.spyOn(repository, "delete").mockImplementation();

      await service.deleteDeveloper(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
