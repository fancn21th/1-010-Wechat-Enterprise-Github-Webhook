const stringify = (obj) => JSON.stringify(obj, null, 2);
const parse = (str) => JSON.parse(str || "{}");

export { stringify, parse };
