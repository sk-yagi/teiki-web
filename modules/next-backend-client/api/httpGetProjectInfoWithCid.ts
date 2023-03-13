// Rename if needed

import { Project } from "@/modules/business-types";
import { assert } from "@/modules/common-utils";
import { fromJson } from "@/modules/json-utils";
import { WithBufsAs } from "@/modules/with-bufs-as";

type Cid = string;

type Params = {
  projectId: string;
};

type Response =
  | { error: undefined; projectInfoWithCid: WithBufsAs<Project, Cid> }
  | { error: 48; _debug?: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isResponse(obj: any): obj is Response {
  if (obj?.error === 48) return true;
  return (
    obj?.error === undefined && typeof obj?.projectInfoWithCid === "object"
  );
}

export default async function httpGetProjectInfoWithCid({ projectId }: Params) {
  const search = new URLSearchParams({ projectId });

  const response = await fetch(
    `/api/v1/project-info-with-cid?${search.toString()}`
  );

  assert(response.ok, "response not ok");
  const body = await response.text();
  const data = fromJson(body);

  assert(isResponse(data), "invalid response");

  return data;
}
