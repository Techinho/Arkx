const os = require('os');

// Convert bytes to GB
const toGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2);

// Convert uptime seconds to hh:mm:ss
const formatUptime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
};

// Collect system information
const systemInfo = {
  hostname: os.hostname(),
  platform: os.platform(),
  architecture: os.arch(),
  cpuModel: os.cpus()[0].model,
  numberOfCores: os.cpus().length,
  totalMemory: `${toGB(os.totalmem())} GB`,
  freeMemory: `${toGB(os.freemem())} GB`,
  uptime: formatUptime(os.uptime()),
  userInfo: os.userInfo().username,
  homeDir: os.homedir(),
};

// Display it
console.log("🖥️  System Information:");
console.log("----------------------------");
for (const [key, value] of Object.entries(systemInfo)) {
  console.log(`${key}: ${value}`);
}
