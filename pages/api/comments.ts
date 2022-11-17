// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CreatePostCommentMutationVariables } from "../../generated-graphql/graphql";
import { createPostComment } from "../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST").status(405).json({});
    return;
  }

  const body = req.body as CreatePostCommentMutationVariables;

  try {
    const data = await createPostComment({ data: body });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error);
  }
}
