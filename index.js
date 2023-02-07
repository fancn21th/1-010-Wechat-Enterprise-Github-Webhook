import { stringify } from "./utils.js";
import fetch from "node-fetch";

export const handler = async (event) => {
  const body = {
    msgtype: "text",
    text: {
      content: `msg from github`,
    },
  };

  const response = await fetch(process.env.wechat_webhook_url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: stringify(
      {
        data,
      },
      null,
      2
    ),
  };
};
