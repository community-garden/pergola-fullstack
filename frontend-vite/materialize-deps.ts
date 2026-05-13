import { execSync } from "node:child_process";
import fs from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const TARBALL_REGEX = /([^\s]+\.tgz)\s*$/m;
const OUTPUT_FILE = "package_materialized.json";

let tarballName: string | null = null;
let tempDir: string | null = null;

try {
  const packOutput = execSync("bun pm pack", { encoding: "utf8", stdio: "pipe" });
  process.stdout.write(packOutput);

  const tarballMatch = packOutput.match(TARBALL_REGEX);
  if (!tarballMatch) {
    throw new Error("Could not detect generated .tgz file from `bun pm pack` output.");
  }

  tarballName = tarballMatch[1];
  tempDir = fs.mkdtempSync(join(tmpdir(), "frontend-vite-pack-"));

  execSync(`tar xzf "${tarballName}" -C "${tempDir}"`, { stdio: "inherit" });
  fs.copyFileSync(join(tempDir, "package", "package.json"), OUTPUT_FILE);

  console.log(`Wrote ${OUTPUT_FILE} from ${tarballName}`);
} finally {
  if (tempDir) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  if (tarballName) {
    fs.rmSync(tarballName, { force: true });
  }
}
