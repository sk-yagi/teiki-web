import { httpPostEncrypt } from "../api/httpPostEncrypt";
import { httpPostEncryptIpfsAdd } from "../api/httpPostEncryptIpfsAdd";
import { httpPostIpfsAdd } from "../api/httpPostIpfsAdd";

import {
  ExclusivePost,
  LovelaceAmount,
  ProjectAnnouncement,
} from "@/modules/business-types";
import { Base64, CipherMeta } from "@/modules/crypt/types";
import { toJsonStable } from "@/modules/json-utils";
import {
  mapBufsAsync,
  mapValuesAsync,
  WithBufsAs,
} from "@/modules/with-bufs-as";

type Cid = string;

async function blobToCipherMetaCid(
  blob: Blob
): Promise<CipherMeta & { cid: Cid }> {
  const cipherMetaCid: CipherMeta & { cid: Cid } = await httpPostEncryptIpfsAdd(
    blob
  );
  return cipherMetaCid;
}

async function blobToCipherMetaBase64(
  blob: string
): Promise<CipherMeta & { data: Base64 }> {
  const cipherMetaData = await httpPostEncrypt(blob);
  return cipherMetaData;
}

async function blobToCid(blob: Blob): Promise<Cid> {
  const { cid } = await httpPostIpfsAdd(blob);
  return cid;
}

export async function ipfsAdd$WithBufsAs$CipherMetaCid(
  blobWBA: WithBufsAs<ProjectAnnouncement, Blob>,
  totalActiveStakeToView: LovelaceAmount
): Promise<Cid> {
  const cidWBA: WithBufsAs<ProjectAnnouncement, CipherMeta & { cid: Cid }> =
    await mapBufsAsync(
      blobWBA,
      async (bufs) =>
        await mapValuesAsync(
          bufs,
          async (buf) => await blobToCipherMetaCid(buf)
        )
    );

  // Refine this...
  const newBody = await blobToCipherMetaBase64(toJsonStable(cidWBA.data.body));

  const cidWBAEncryptedBody: WithBufsAs<
    ExclusivePost,
    CipherMeta & { cid: Cid }
  > = {
    bufs: cidWBA.bufs,
    data: {
      body: newBody,
      title: cidWBA.data.title,
      summary: cidWBA.data.summary,
      totalActiveStakeToView,
    },
  };

  return blobToCid(new Blob([toJsonStable(cidWBAEncryptedBody)]));
}
