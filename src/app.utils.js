// Set of utils method to get CLI values

// - CLI('param') : returns '--param=value' if it exists in process.argv params
const CLI = (paramKey) =>
  process.argv.find((arg) => arg.split("=")[0] === `--${paramKey}`);

// - CLIValue('param') : returns 'value' if '--param=value' exists
const CLIValue = (paramKey) => CLI(paramKey)?.split("=")[1];

module.exports = { CLI, CLIValue };
