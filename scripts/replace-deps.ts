#!/usr/bin/env bun

/**
 * Dependency Replacement Script
 * 
 * Replace package dependencies with local file: links for development
 * and restore them back to original versions.
 * 
 * Usage:
 *   bun scripts/replace-deps.ts replace @graviola ../path/to/monorepo
 *   bun scripts/replace-deps.ts restore
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, resolve, relative } from 'path';

// Types
interface PackageJson {
  name: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

interface ReplacedVersions {
  [packageName: string]: {
    version: string;
    type: 'dependencies' | 'devDependencies';
  };
}

// Constants
const BACKUP_FILE = 'replaced-versions.json';
const PACKAGE_JSON = 'package.json';

// Parse arguments
const args = process.argv.slice(2);
const mode = args[0] as 'replace' | 'restore' | undefined;

function printUsage() {
  console.log(`
📦 Dependency Replacement Script

Usage:
  Replace dependencies with local file paths:
    bun scripts/replace-deps.ts replace <prefix> <monorepo-path>
  
  Restore original versions:
    bun scripts/replace-deps.ts restore

Examples:
  bun scripts/replace-deps.ts replace @graviola ../ereignis-metadata-framework
  bun scripts/replace-deps.ts replace @myorg /absolute/path/to/monorepo
  bun scripts/replace-deps.ts restore

Options:
  <prefix>        Package name prefix to match (e.g., @graviola)
  <monorepo-path> Path to the monorepo containing packages/ directory
  `);
}

// Validate mode
if (!mode || (mode !== 'replace' && mode !== 'restore')) {
  console.error(`❌ Invalid or missing mode: ${mode || '(none)'}\n`);
  printUsage();
  process.exit(1);
}

/**
 * Find all packages in a monorepo
 */
function findPackagesInMonorepo(monorepoPath: string): Map<string, string> {
  const packages = new Map<string, string>();
  const packagesDir = join(monorepoPath, 'packages');
  
  if (!existsSync(packagesDir)) {
    console.error(`❌ Packages directory not found: ${packagesDir}`);
    return packages;
  }

  console.log(`📂 Scanning: ${packagesDir}\n`);

  const entries = readdirSync(packagesDir);
  
  for (const entry of entries) {
    const entryPath = join(packagesDir, entry);
    
    try {
      const stat = statSync(entryPath);
      
      if (stat.isDirectory()) {
        const packageJsonPath = join(entryPath, 'package.json');
        
        if (existsSync(packageJsonPath)) {
          const packageJson: PackageJson = JSON.parse(
            readFileSync(packageJsonPath, 'utf-8')
          );
          
          if (packageJson.name) {
            packages.set(packageJson.name, entryPath);
            console.log(`  ✓ Found: ${packageJson.name}`);
          }
        }
      }
    } catch (error) {
      console.warn(`  ⚠ Skipped: ${entry} (${error instanceof Error ? error.message : 'error'})`);
    }
  }
  
  return packages;
}

/**
 * Replace dependencies with file: links
 */
function replaceDeps(prefix: string, monorepoPath: string) {
  console.log(`\n🔄 Replace Mode\n${'='.repeat(50)}\n`);
  
  const resolvedMonorepoPath = resolve(monorepoPath);
  
  if (!existsSync(resolvedMonorepoPath)) {
    console.error(`❌ Monorepo path does not exist: ${resolvedMonorepoPath}`);
    process.exit(1);
  }
  
  console.log(`Prefix: ${prefix}`);
  console.log(`Monorepo: ${resolvedMonorepoPath}\n`);
  
  const packagesMap = findPackagesInMonorepo(resolvedMonorepoPath);
  
  if (packagesMap.size === 0) {
    console.error(`\n❌ No packages found in monorepo!`);
    process.exit(1);
  }
  
  console.log(`\n✓ Found ${packagesMap.size} packages in monorepo\n`);
  
  if (!existsSync(PACKAGE_JSON)) {
    console.error(`❌ ${PACKAGE_JSON} not found in current directory`);
    process.exit(1);
  }
  
  const packageJson: PackageJson = JSON.parse(
    readFileSync(PACKAGE_JSON, 'utf-8')
  );
  
  const backup: ReplacedVersions = {};
  let replacedCount = 0;
  
  console.log('📝 Replacing dependencies:\n');
  
  // Process dependencies
  if (packageJson.dependencies) {
    for (const [name, version] of Object.entries(packageJson.dependencies)) {
      if (name.startsWith(prefix) && packagesMap.has(name)) {
        const packagePath = packagesMap.get(name)!;
        const relativePath = relative(process.cwd(), packagePath) || '.';
        backup[name] = { version, type: 'dependencies' };
        packageJson.dependencies[name] = `file:${relativePath}`;
        replacedCount++;
        console.log(`  ✓ ${name}`);
        console.log(`    ${version} → file:${relativePath}`);
      }
    }
  }
  
  // Process devDependencies
  if (packageJson.devDependencies) {
    for (const [name, version] of Object.entries(packageJson.devDependencies)) {
      if (name.startsWith(prefix) && packagesMap.has(name)) {
        const packagePath = packagesMap.get(name)!;
        const relativePath = relative(process.cwd(), packagePath) || '.';
        backup[name] = { version, type: 'devDependencies' };
        packageJson.devDependencies[name] = `file:${relativePath}`;
        replacedCount++;
        console.log(`  ✓ ${name}`);
        console.log(`    ${version} → file:${relativePath}`);
      }
    }
  }
  
  if (replacedCount === 0) {
    console.log(`  ℹ No dependencies starting with "${prefix}" found.`);
    console.log(`\n💡 Make sure the prefix matches your dependencies.`);
    return;
  }
  
  // Save backup
  writeFileSync(BACKUP_FILE, JSON.stringify(backup, null, 2) + '\n');
  console.log(`\n✓ Saved backup to ${BACKUP_FILE}`);
  
  // Save modified package.json
  writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`✓ Updated ${PACKAGE_JSON}`);
  
  console.log(`\n✅ Replaced ${replacedCount} ${replacedCount === 1 ? 'dependency' : 'dependencies'}`);
  console.log(`\n📦 Next steps:`);
  console.log(`   1. Run your package manager install (yarn/bun/npm) to link local packages`);
  console.log(`   2. Make your changes in the monorepo`);
  console.log(`   3. Run "bun scripts/replace-deps.ts restore" when done`);
}

/**
 * Restore original dependencies
 */
function restoreDeps() {
  console.log(`\n🔄 Restore Mode\n${'='.repeat(50)}\n`);
  
  if (!existsSync(BACKUP_FILE)) {
    console.error(`❌ Backup file ${BACKUP_FILE} not found.`);
    console.error(`   Nothing to restore. Dependencies are likely already at original versions.`);
    process.exit(1);
  }
  
  if (!existsSync(PACKAGE_JSON)) {
    console.error(`❌ ${PACKAGE_JSON} not found in current directory`);
    process.exit(1);
  }
  
  const backup: ReplacedVersions = JSON.parse(
    readFileSync(BACKUP_FILE, 'utf-8')
  );
  
  const packageJson: PackageJson = JSON.parse(
    readFileSync(PACKAGE_JSON, 'utf-8')
  );
  
  let restoredCount = 0;
  
  console.log('📝 Restoring dependencies:\n');
  
  // Restore all backed up dependencies
  for (const [name, { version, type }] of Object.entries(backup)) {
    const deps = type === 'dependencies' 
      ? packageJson.dependencies 
      : packageJson.devDependencies;
    
    if (deps && deps[name]) {
      const currentVersion = deps[name];
      deps[name] = version;
      restoredCount++;
      console.log(`  ✓ ${name}`);
      console.log(`    ${currentVersion} → ${version}`);
    } else {
      console.log(`  ⚠ ${name} not found in ${type}`);
    }
  }
  
  if (restoredCount === 0) {
    console.log('  ℹ No dependencies to restore.');
    return;
  }
  
  // Save modified package.json
  writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`\n✓ Updated ${PACKAGE_JSON}`);
  
  // Remove backup file
  const fs = require('fs');
  fs.unlinkSync(BACKUP_FILE);
  console.log(`✓ Removed ${BACKUP_FILE}`);
  
  console.log(`\n✅ Restored ${restoredCount} ${restoredCount === 1 ? 'dependency' : 'dependencies'}`);
  console.log(`\n📦 Next step:`);
  console.log(`   Run your package manager install (yarn/bun/npm) to reinstall original packages`);
}

// Main execution
try {
  if (mode === 'replace') {
    if (args.length < 3) {
      console.error('❌ Missing arguments for replace mode\n');
      printUsage();
      process.exit(1);
    }
    
    const prefix = args[1];
    const monorepoPath = args[2];
    
    replaceDeps(prefix, monorepoPath);
  } else if (mode === 'restore') {
    restoreDeps();
  }
} catch (error) {
  console.error(`\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  if (error instanceof Error && error.stack) {
    console.error(`\n${error.stack}`);
  }
  process.exit(1);
}

