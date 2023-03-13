import { Sql } from "../db";
import { Cid } from "../utils/CodecCid";

import { Project } from "@/modules/business-types";
import { assert } from "@/modules/common-utils";
import { WithBufsAs } from "@/modules/with-bufs-as";

type Params = {
  projectId: string;
};

type Result =
  | { error: null; projectInfoWithCid: WithBufsAs<Project, Cid> }
  | { error: "not-found"; _debug?: unknown };

/**
 * A copied from ./getDetailedProject.ts
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isWithBufsAs<T, V>(obj: any): obj is WithBufsAs<T, V> {
  return typeof obj?.data === "object" && typeof obj?.bufs === "object";
}

export async function getProjectInfoWithCid(
  sql: Sql,
  { projectId }: Params
): Promise<Result> {
  const result = await sql`
    SELECT
      pi.contents
    FROM
      chain.project_detail pd
    INNER JOIN
      ipfs.project_info pi ON pi.cid = pd.information_cid
    INNER JOIN
      chain.output o ON o.id = pd.id
    WHERE o.spent_slot IS NULL
      AND pd.project_id = ${projectId}
    LIMIT
      2
  `;

  // console.log("[??] ", result);

  const row = result[0];

  if (!row) {
    return { error: "not-found" };
  }

  const { contents } = row;

  // console.log("[??] ", contents, isWithBufsAs<Project, Cid>(contents));
  assert(isWithBufsAs<Project, Cid>(contents));

  if (result.length === 2) console.warn("Why at least 2 valid project info");
  return {
    error: null,
    projectInfoWithCid: contents,
  };
}
