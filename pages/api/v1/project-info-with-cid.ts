import { NextApiRequest, NextApiResponse } from "next";

import { apiCatch, ClientError } from "@/modules/next-backend/api/errors";
import { sendJson } from "@/modules/next-backend/api/helpers";
import { db } from "@/modules/next-backend/db";
import { getProjectInfoWithCid } from "@/modules/next-backend/logic/getProjectInfoWithCid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { projectId } = req.query;

    console.log("[HERE] ", projectId);

    ClientError.assert(typeof projectId === "string", {
      _debug: "Invalid request",
    });

    const result = await getProjectInfoWithCid(db, { projectId });

    const response = (() => {
      switch (result.error) {
        case null:
          return { projectInfoWithCid: result.projectInfoWithCid };
        case "not-found":
          return { error: 48, _debug: result };
      }
    })();

    sendJson(res.status(200), response);
  } catch (error) {
    apiCatch(req, res, error);
  }
}
