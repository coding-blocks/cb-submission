// Require variables from the environment.
const requireFromEnvironment = (variable) => {
  let value = process.env[variable];

  if (! value) {
    console.log("No $" + variable + " found in environment.");
    console.log("You probably forgot to export the correct variables specified in util/env.sh");
    process.exit(1);
  }

  return value;
}

exports.requireFromEnvironment = requireFromEnvironment;
