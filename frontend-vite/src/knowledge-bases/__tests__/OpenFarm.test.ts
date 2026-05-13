import { describe, it, expect } from "bun:test";
import { OpenFarm } from "../OpenFarm";

describe("OpenFarm KnowledgeBase", () => {
  it("should search for tomato and return results", async () => {
    const results = await OpenFarm.find("tomato", "", "PlantSpecies", { limit: 5 });
    
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    
    const firstResult = results[0];
    expect(firstResult).toHaveProperty("id");
    expect(firstResult).toHaveProperty("title");
    expect(typeof firstResult.title).toBe("string");
    expect(firstResult.title.toLowerCase()).toContain("tomato");
  });
  
  it("should fetch full entity data for tomato", async () => {
    const entity = await OpenFarm.getEntity?.("tomato", "PlantSpecies");
    
    expect(entity).toBeDefined();
    expect(entity).toHaveProperty("id");
    expect(entity).toHaveProperty("attributes");
    expect(entity.attributes).toHaveProperty("name");
    expect(entity.attributes.name.toLowerCase()).toContain("tomato");
  });
  
  it("should handle search with no results gracefully", async () => {
    const results = await OpenFarm.find("xyznonexistentplant123", "", "PlantSpecies", { limit: 5 });
    
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(0);
  });
  
  it("should return valid structure with expected fields", async () => {
    const results = await OpenFarm.find("lettuce", "", "PlantSpecies", { limit: 1 });
    
    if (results.length > 0) {
      const result = results[0];
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("key");
      expect(result).toHaveProperty("title");
      expect(typeof result.id).toBe("string");
      expect(typeof result.title).toBe("string");
    }
  });
});

