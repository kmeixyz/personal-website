import coreWebVitals from "eslint-config-next/core-web-vitals";

/**
 * Flat config. eslint-config-next 16 ships flat config natively, so it is
 * spread in directly rather than wrapped in FlatCompat — the compat shim tries
 * to JSON-serialise the config for schema validation and throws on the
 * circular plugin references a flat config legitimately contains.
 */
const eslintConfig = [
  ...coreWebVitals,
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**", "next-env.d.ts"] },
];

export default eslintConfig;
