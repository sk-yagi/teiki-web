import { GetServerSideProps } from "next";

import { TEIKI_CONTENT_KEYS } from "../../config/server";

import * as crypt from "@/modules/crypt";

type Props = {
  plainText: string;
};

function decrypt() {
  const kid = "dev";
  const iv = "iwfusjmH34WLjxqnv7LvPw";
  const aut = "LkywnX9gimIf_NSurBWUUA";

  const { key } = crypt.selectKey(TEIKI_CONTENT_KEYS, kid);
  const b_iv = Buffer.from(iv, crypt.b64); // Becareful with Buffer at FE
  const b_aut = Buffer.from(aut, crypt.b64);
  const decipher = crypt.createDecipher(key, b_iv);
  decipher.setAuthTag(b_aut);

  const encrypted =
    "JX5il9810ckMknGfWsoJ6BjWqxSGKTAsmDlNpicZwITRaJ7UH2kU-IgGx3Ih3_G1-zQ5B-AVRbhP1KCP3xjdpnh2_hqzZnCIDVYh84GwAjLrZR1OCfIdibOpALDbyao0ovdswG_ATfVUvkficjPHfYNI0HsG3RlojMzK95Z97FN-1f5GL5LUTZ1iaCq9FuYg63SzDyQ8o55bT4e2eN_7rpq8fpEUkw3QtciE9QpADxoXE06ZIGktscAvso0C9Uv_GrXyHljsy6Cwcuke6Bi-O7hvPGAdQkYhEcMGywVIb7MKseDBymoNCWXD54Bd68EWhpsL4W6pYO9fat_huVL_MfxWkvWt9_GzxL8HTU2e9HjIwEIsLlBgqMgDJ4nPCA7Bnmd_Au6ZscG-JC9zJ8THHhFfVP5oexCzoIf8kAxIs3IJpaWIvwfEcR_vGUfm1878qWI";
  let decrypted = decipher.update(encrypted, "base64url", "utf8");
  decrypted += decipher.final("utf8");
  console.log("[DECR]: ", decrypted);
  return decrypted;
}

export default function Demo({ plainText }: Props) {
  return (
    <button onClick={() => console.log("[TEXT]: ", plainText)}>KayHill</button>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const plainText = decrypt();
  return {
    props: {
      plainText,
    },
  };
};
