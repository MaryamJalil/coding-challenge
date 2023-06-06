import { DevelopersDevService } from "./developer.repository.dev";
import { Developer, DeveloperInput, DeveloperUpdate } from "../types/developer";

describe("DevelopersDevService", () => {
  let service: DevelopersDevService;

  beforeEach(() => {
    service = new DevelopersDevService();
  });

  describe("getAllDevelopers", () => {
    it("should return all developers", () => {
      const developers: Developer[] = [
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

      service["developers"] = developers;

      const result = service.getAllDevelopers();

      expect(result).toEqual(developers);
    });
  });

  describe("getDeveloperById", () => {
    it("should return the developer with the specified ID", () => {
      const developers: Developer[] = [
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

      service["developers"] = developers;

      const result = service.getDeveloperById(1);

      expect(result).toEqual(developers[0]);
    });

    it("should return undefined if developer is not found", () => {
      const result = service.getDeveloperById(3);

      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    it("should create a new developer", () => {
      const developerInput: DeveloperInput = {
        name: "Maryam Jalil",
        email: "maryam7jalil@gmail.com",
        level: "JUNIOR",
      };

      const result = service.create(developerInput);

      expect(result).toHaveProperty("id");
      expect(result.name).toBe(developerInput.name);
      expect(result.email).toBe(developerInput.email);
      expect(result.level).toBe(developerInput.level);
      expect(service["developers"]).toContain(result);
    });

    it("should throw an error if a developer with the same email already exists", () => {
      const existingDeveloper: Developer = {
        id: 1,
        name: "Amna Imtiaz",
        email: "amna@gmail.com",
        level: "SENIOR",
      };

      service["developers"] = [existingDeveloper];

      const developerInput: DeveloperInput = {
        name: "Ayesha",
        email: "amna@gmail.com",
        level: "JUNIOR",
      };

      expect(() => service.create(developerInput)).toThrowError(
        "Developer with the same email already exists."
      );
    });
  });

  describe("updateDeveloper", () => {
    it("should update an existing developer", async () => {
      const existingDeveloper: Developer = {
        id: 1,
        name: "Maryam Jalil",
        email: "maryam7jalil@gmail.com",
        level: "JUNIOR",
      };

      service["developers"] = [existingDeveloper];

      const updatedDeveloper: DeveloperUpdate = {
        id: 1,
        name: "Mariam Jaleel",
        email: "maryam7jalil@gmail.com",
        level: "SENIOR",
      };

      const result = await service.updateDeveloper(updatedDeveloper);

      expect(result).toBeDefined();
      expect(result!.id).toBe(existingDeveloper.id);
      expect(result!.name).toBe(updatedDeveloper.name);
      expect(result!.email).toBe(updatedDeveloper.email);
      expect(result!.level).toBe(updatedDeveloper.level);
    });

    it("should return undefined if the developer is not found", async () => {
      const nonExistingDeveloperId = 100;

      const updatedDeveloper: DeveloperUpdate = {
        id: nonExistingDeveloperId,
        name: "Marry",
        email: "maryam7jalil@gmail.com",
        level: "SENIOR",
      };

      const result = await service.updateDeveloper(updatedDeveloper);

      expect(result).toBeUndefined();
    });
  });

  describe("deleteDeveloper", () => {
    it("should delete an existing developer", () => {
      const existingDeveloper: Developer = {
        id: 1,
        name: "Maryam Jalil",
        email: "maryam7jalil@gmail.com",
        level: "JUNIOR",
      };

      service["developers"] = [existingDeveloper];

      const deletedDeveloper = service.deleteDeveloper(existingDeveloper.id);

      expect(deletedDeveloper).toBeDefined();
      expect(deletedDeveloper!.id).toBe(existingDeveloper.id);
      expect(service["developers"]).not.toContain(existingDeveloper);
    });

    it("should return undefined if the developer is not found", () => {
      const nonExistingDeveloperId = 100;

      const result = service.deleteDeveloper(nonExistingDeveloperId);

      expect(result).toBeUndefined();
    });
  });
});
