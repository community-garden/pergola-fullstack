import { describe, it, expect } from "bun:test";
import { GBIF } from "../GBIF";

describe("GBIF KnowledgeBase", () => {
  it("should search for Solanum lycopersicum and return results", async () => {
    const results = await GBIF.find("Solanum lycopersicum", "", "PlantSpecies", { limit: 5 });
    
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    
    const firstResult = results[0];
    expect(firstResult).toHaveProperty("id");
    expect(firstResult).toHaveProperty("title");
    expect(typeof firstResult.title).toBe("string");
  });
  
  it("should fetch full entity data by key", async () => {
    // First search to get a key
    const results = await GBIF.find("tomato", "", "PlantSpecies", { limit: 1 });
    expect(results.length).toBeGreaterThan(0);
    
    const key = results[0].key;
    const entity = await GBIF.getEntity?.(String(key), "PlantSpecies");
    
    expect(entity).toBeDefined();
    expect(entity).toHaveProperty("key");
    expect(entity).toHaveProperty("scientificName");
    expect(entity.key).toBe(key);
  });
  
  it("should return taxonomy information", async () => {
    const results = await GBIF.find("Solanum lycopersicum", "", "PlantSpecies", { limit: 1 });
    
    expect(results.length).toBeGreaterThan(0);
    
    const result = results[0];
    expect(result).toHaveProperty("species");
    
    if (result.species) {
      expect(result.species).toHaveProperty("family");
      expect(result.species).toHaveProperty("genus");
    }
  });
  
  it("should handle search with no results gracefully", async () => {
    const results = await GBIF.find("xyznonexistentspecies999", "", "PlantSpecies", { limit: 5 });
    
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });
  
  it("should return valid structure with expected fields", async () => {
    const results = await GBIF.find("rosa", "", "PlantSpecies", { limit: 1 });
    
    if (results.length > 0) {
      const result = results[0];
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("key");
      expect(result).toHaveProperty("title");
      expect(typeof result.id).toBe("string");
      expect(typeof result.key).toBe("number");
    }
  });
});

