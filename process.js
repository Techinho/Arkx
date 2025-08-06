// process-info.js

// ✅ CLI arguments
console.log("🧾 Command Line Arguments:");
console.log(process.argv.slice(2)); // Exclude node path & file path

// ✅ Environment variables
console.log("\n🌍 Environment Variables:");
console.log("NODE_ENV:", process.env.NODE_ENV || "Not set");
console.log("PORT:", process.env.PORT || "3000");

// ✅ Current working directory
console.log("\n📁 Current Working Directory:");
console.log(process.cwd());

// ✅ Process ID and platform
console.log("\n🧠 Process Info:");
console.log("PID:", process.pid);
console.log("Platform:", process.platform);
console.log("Node Version:", process.version);

// ✅ Memory usage
const mem = process.memoryUsage();
console.log("\n📊 Memory Usage:");
console.log(`RSS: ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Total: ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Used: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);

// ✅ Uptime
console.log("\n⏱️ Process Uptime:");
console.log(`${process.uptime().toFixed(2)} seconds`);

// ✅ Exit handler
process.on('exit', (code) => {
  console.log(`\n👋 Process is exiting with code: ${code}`);
});
