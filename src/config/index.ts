const env = import.meta.env.MODE || "production";

const EnvConfig = {
  development: {},
  test: {},
  prod: {},
};

export default {
  env,
  mock: false,
  ...EnvConfig[env],
};
