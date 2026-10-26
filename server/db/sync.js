// "alter: true" on every cold start is slow and risky on serverless.
// A plain sync() only creates tables that are missing.
const alterSync = (postgresClient) => postgresClient.sync();
const forceSync = (postgresClient) => postgresClient.sync({ force: true });

module.exports = { alterSync, forceSync };
