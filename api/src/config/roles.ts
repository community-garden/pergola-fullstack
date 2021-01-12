export enum roles {
  developer = "developer",
  cron = "cron",
  deployment_admin = "deployment_admin",
  deployment_manager = "deployment_manager",
  garden_manager = "garden_manager",
}

export const presets = {
  developer: [roles.developer],
  cron: [roles.developer, roles.cron],
  deployment_admin: [roles.developer, roles.deployment_admin],
  deployment_manager: [
    roles.developer,
    roles.deployment_admin,
    roles.deployment_manager,
  ],
  garden_manager: [
    roles.developer,
    roles.deployment_admin,
    roles.deployment_manager,
    roles.garden_manager,
  ],
}
