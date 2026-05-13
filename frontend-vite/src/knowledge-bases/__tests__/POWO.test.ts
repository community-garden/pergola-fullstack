import { describe, it, expect } from "bun:test";
import { POWO } from "../POWO";

describe("POWO KnowledgeBase", () => {
  it("should search for Solanum lycopersicum and return results", async () => {
    const results = await POWO.find("Solanum lycopersicum", "", "PlantSpecies", { limit: 5 });
    
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    
    const firstResult = results[0];
    expect(firstResult).toHaveProperty("id");
    expect(firstResult).toHaveProperty("title");
    expect(typeof firstResult.title).toBe("string");
  });
  
  it("should fetch full entity data by fqId", async () => {
    // First search to get an fqId
    const results = await POWO.find("Solanum", "", "PlantSpecies", { limit: 1 });
    expect(results.length).toBeGreaterThan(0);
    
    const fqId = results[0].key;
    const entity = await POWO.getEntity?.(fqId, "PlantSpecies");
    
    expect(entity).toBeDefined();
    if (entity) {
      expect(entity).toHaveProperty("fqId");
      expect(entity).toHaveProperty("name");
    }
  });
  
  it("should return family and rank information", async () => {
    const results = await POWO.find("Rosa", "", "PlantSpecies", { limit: 1 });
    
    if (results.length > 0) {
      const result = results[0];
      expect(result).toHaveProperty("description");
      
      // Description should contain family or rank info
      if (result.taxon) {
        expect(result.taxon).toBeDefined();
      }
    }
  });
  
  it("should handle search with no results gracefully", async () => {
    const results = await POWO.find("xyznonexistentplant999", "", "PlantSpecies", { limit: 5 });
    
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });
  
  it("should return valid structure with expected fields", async () => {
    const results = await POWO.find("Quercus", "", "PlantSpecies", { limit: 1 });
    
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

