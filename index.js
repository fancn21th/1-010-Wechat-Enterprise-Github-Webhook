import { stringify, parse } from "./utils.js";
import fetch from "node-fetch";

export const handler = async (event) => {
  const body = parse(event.body);

  const map = parse(process.env.idmap);

  const author = map[body.issue.user.login];

  const assignees = body.issue.assignees.map((a) => map[a.login]);

  console.log({
    githubid: body.issue.user.login,
    wechatid: author,
    assignees,
  });

  const message = {
    msgtype: "text",
    text: {
      content: `
        [ Issue ]
        标题：${body.issue.title}
        事件：评论更新
        地址：${body.issue.html_url}
      `,
      mentioned_list: [author, ...assignees],
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
        data,
      },
      null,
      2
    ),
  };
};
