import { Cid } from "@teiki/protocol/types";

import { assert } from "@/modules/common-utils";
import { CipherMeta } from "@/modules/crypt/types";
import { fromJson } from "@/modules/json-utils";

type Response = CipherMeta & { cid: Cid };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isResponse(obj: any): obj is Response {
  return (
    obj?.cid &&
    typeof obj.cid === "string" &&
    obj?.enc &&
    typeof obj.enc === "string" &&
    obj?.kid &&
    typeof obj.kid === "string" &&
    obj?.iv &&
    typeof obj.iv === "string" &&
    obj?.aut &&
    typeof obj.aut === "string"
  );
}

export async function httpPostEncryptIpfsAdd(buf: Blob): Promise<Response> {
  const formData = new FormData();
  formData.append("data", buf);

  const response = await fetch("/api/v1/exclusive/encrypt/ipfs", {
    method: "POST",
    body: formData,
  });

  console.log("[RES_OK]: ", response.ok);

  assert(response.ok, "response not ok");
  const body = await response.text();
  const responseData = fromJson(body);

  console.log("[RESP_D]: ", responseData);
  assert(isResponse(responseData), "invalid response");

  console.log("[RESP_D]: ", responseData);

  return {
    enc: responseData.enc,
    kid: responseData.kid,
    iv: responseData.iv,
    aut: responseData.aut,
    cid: responseData.cid,
  };
}
