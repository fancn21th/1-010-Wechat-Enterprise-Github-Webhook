import { stringify, parse } from "./utils.js";

module.exports.handler = async (event) => {
  const _method = event.routeKey;
  const _body = parse(event.body); // body

  console.log({
    _method,
    _body,
  });

  return {
    statusCode: 200,
    body: stringify(
      {
        ok: true,
      },
      null,
      2
    ),
  };
};
