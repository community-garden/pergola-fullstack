# Development Scripts

## replace-deps.ts

Temporarily replace package dependencies with local file paths for development and testing.

### Usage

#### Replace dependencies with local packages

```bash
bun scripts/replace-deps.ts replace @graviola /path/to/ereignis-metadata-framework
```

This will:
1. Scan the monorepo for all packages
2. Find all dependencies/devDependencies starting with `@graviola`
3. Replace their versions with `file:` paths to local packages
4. Save original versions to `replaced-versions.json`
5. Update `package.json`

#### Restore original versions

```bash
bun scripts/replace-deps.ts restore
```

This will:
1. Read backed-up versions from `replaced-versions.json`
2. Restore all replaced dependencies to original versions
3. Update `package.json`
4. Delete the backup file

### Example Workflow

```bash
# 1. Replace with local packages
bun scripts/replace-deps.ts replace @graviola ../../ereignis-metadata-framework

# 2. Install local packages
bun install

# 3. Make changes in the monorepo and test them here

# 4. When done, restore original versions
bun scripts/replace-deps.ts restore

# 5. Reinstall from registry
bun install
```

### Features

- ✅ Preserves original versions in backup file
- ✅ Handles both `dependencies` and `devDependencies`
- ✅ Uses relative paths for portability
- ✅ Colorful, user-friendly output
- ✅ Safe error handling
- ✅ Works with any package prefix

### Notes

- The backup file (`replaced-versions.json`) should not be committed to git
- Add it to `.gitignore` if you use this frequently
- The script looks for packages in `monorepo-path/packages/` directory
