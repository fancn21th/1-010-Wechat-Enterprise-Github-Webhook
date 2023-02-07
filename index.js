import { stringify, parse } from "./utils.js";
import fetch from "node-fetch";

export const handler = async (event) => {
  const body = parse(event.body);

  const message = {
    msgtype: "text",
    text: {
      content: `${body.issue.html_url}`,
    },
  };

  const response = await fetch(process.env.wechat_webhook_url, {
    method: "post",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: stringify(
      {
        message,
      },
      null,
      2
    ),
  };
};
