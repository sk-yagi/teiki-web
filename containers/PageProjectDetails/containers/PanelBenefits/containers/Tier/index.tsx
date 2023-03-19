import cx from "classnames";

import WithAspectRatio from "../../../../../../components/WithAspectRatio";

import styles from "./index.module.scss";

import { formatLovelaceAmount } from "@/modules/bigint-utils";
import { ProjectBenefitsTier, ProjectImage } from "@/modules/business-types";
import ImageView from "@/modules/teiki-components/components/ImageView";
import RichTextViewer from "@/modules/teiki-components/components/RichTextViewer";
import Button from "@/modules/teiki-ui/components/Button";
import Flex from "@/modules/teiki-ui/components/Flex";
import Typography from "@/modules/teiki-ui/components/Typography";

const DEFAULT_IMAGE: ProjectImage = {
  url: "data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='100' height='100' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(118, 42%, 54%, 1)'/><path d='M100 20.234v41.641q-6.719 7.656-10.234 17.812-3.36 9.766-3.125 20.313h-3.438v-4.531q0-2.657.39-4.532l.626-3.359.703-3.281 2.265-7.656q1.329-4.22 2.813-7.344.781-1.719 2.812-4.453l2.891-4.297.86-2.578.312-2.735q.156-5-.547-13.203l-2.344-20.937Q92.656 8.516 92.422 0h6.797q-.078 6.172.078 10.156.156 5.547.703 10.078m0 49.532v20.468q-.469 2.11-.703 4.844L99.063 100H92.5l-.078-8.594q0-5.156.547-8.515.469-3.047 2.89-6.797L100 69.766M79.219 100h-3.672l.39-8.36.938-8.359q1.016-6.953 1.875-10.781 1.328-5.86 3.36-10.313l2.5-6.015 1.562-6.328.547-5q.078-2.813-.703-4.844l-3.282-9.531-3.28-9.531q-1.876-6.094-2.735-10.313Q75.547 4.922 75.547 0h3.672q.078 8.516 2.422 17.031 2.343 8.282 6.718 15.782l-2.03-11.016-1.876-11.016-.86-5.312L83.126 0h3.516l.234 4.531.547 4.532 2.5 16.25 2.422 16.328q1.015 8.125.156 15.625l-.625 3.28q-.547 1.798-1.562 2.97l-1.875 1.953q-1.094 1.172-1.641 2.187-1.64 2.735-2.89 7.813l-2.423 8.047q-1.406 3.515-1.875 8.125-.39 3.125-.39 8.359m-6.406 0H64.53q-2.11-9.922-1.718-18.828.39-4.922 1.796-8.203l2.97-7.5q1.405-4.219 1.718-7.89.312-2.735-.39-5.313-.704-2.657-2.345-4.844-2.343-3.125-5.78-6.328l-.938 2.5-.86 2.656q-2.343 6.797-4.922 11.953-3.125 6.25-7.03 10.86-1.485 2.265-2.579 5.312-.781 2.344-1.484 5.781Q41.25 88.75 41.25 100h-6.484l.312-12.266q.39-6.718 1.64-12.265 1.72-7.344 4.844-11.407l2.344-2.5 2.344-2.5q2.5-2.968 3.906-6.875 1.328-3.671 1.485-7.734.156-5.156-.86-12.5L48.906 19.61Q47.578 8.516 47.97 0h10.078q-.625 12.188 1.875 22.11 2.422 9.218 8.515 16.25l5 5.234q3.047 3.203 4.375 5.781 2.657 4.922.938 12.266-1.016 4.609-3.906 10.859-1.172 2.578-1.797 5.86-.547 2.5-.781 6.093-.391 7.266.546 15.547m-14.765 0H47.969V89.453q.312-5.937 1.718-10.39 4.297-12.657 10.157-22.813l1.797-3.047 2.109-2.812q1.25 4.687-1.094 11.562-5.625 16.953-4.61 38.047m-29.296 0H17.969l.234-5.781.469-5.782L21.25 65.86l2.422-22.578q1.172-12.031-1.875-21.797-1.719 3.047-2.969 7.5l-2.031 7.813q-.469 1.719-.547 4.219l.078 4.218-.547 11.094-1.797 10.469Q12.5 74.062 12.11 77.266q-.39 2.734-.312 6.406l.234 6.406.39 5q.235 2.813.704 4.922H5.781V81.25l-.078-6.016Q1.563 81.797 0 89.844v-20.39q5.86-10.47 7.422-22.657 1.25-9.14.078-23.36L6.406 11.72Q5.86 4.844 5.781 0h7.344l1.406 11.328 1.094 11.328q1.25-2.422 1.797-6.015l.625-6.25.078-5.157L17.969 0h10.86q.077 2.969.702 6.953l1.172 6.797 1.64 11.094q.626 6.172.157 11.172-.547 4.297-2.031 9.687L27.5 55.078q-2.031 6.719-2.344 14.531-.078 3.75.625 8.36l1.563 8.203.703-2.422 4.531-18.672q2.344-10.312 3.594-18.828.625-3.984.625-9.062l-.313-9.141-1.093-13.984Q34.688 5.547 34.766 0h6.484q-.078 8.984 1.953 19.688l1.64 8.75q.938 5.078.938 8.75 0 3.828-1.015 7.5-.938 3.671-2.813 6.874-4.61 9.375-7.812 20.47-2.813 9.687-4.766 21.405-.703 3.75-.625 6.563M0 61.797V19.766l.781 4.375.703 4.453 2.344 13.984.235 1.563.234 2.343Q5.078 54.61 0 61.797M64.61 0h8.202q-.39 7.266.157 11.953l.86 4.531 1.25 4.532 3.593 13.672 3.36 13.671.546 2.657.156 2.656-2.343-6.406q-1.407-3.516-3.047-6.172l-4.14-6.64-4.298-6.563q-1.172-1.953-1.875-4.61-.547-1.875-.937-4.922Q64.844 9.453 64.609 0'  stroke-width='1' stroke='none' fill='hsla(151, 33%, 18%, 1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>",
  x: 0,
  y: 0,
  width: 1.0,
  height: 1.0,
};

type Props = {
  className?: string;
  style?: React.CSSProperties;
  value: ProjectBenefitsTier;
  onClickBecomeMember?: () => void;
};

export default function Tier({
  className,
  style,
  value,
  onClickBecomeMember,
}: Props) {
  const actualBanner = value.banner || DEFAULT_IMAGE;
  return (
    <div className={cx(className, styles.container)} style={style}>
      <Flex.Col
        gap="20px"
        padding="32px"
        justifyContent="center"
        alignItems="center"
      >
        <Typography.Div
          content={value.title}
          size="heading4"
          fontWeight="bold"
          className={styles.required}
        />
        <div className={styles.bannerContainer}>
          <WithAspectRatio aspectRatio={16 / 9}>
            <ImageView
              className={styles.banner}
              src={actualBanner.url}
              crop={{
                x: actualBanner.x,
                y: actualBanner.y,
                w: actualBanner.width,
                h: actualBanner.height,
              }}
            />
          </WithAspectRatio>
        </div>
        <Flex.Row alignItems="center" gap="8px">
          <Typography.Span content="Staking from" size="bodySmall" />
          <Typography.Span
            content={formatLovelaceAmount(value.requiredStake, {
              compact: true,
              includeCurrencySymbol: true,
            })}
            size="heading4"
            fontWeight="bold"
          />
        </Flex.Row>
        <Button.Solid
          content="Become a member"
          size="medium"
          color="primary"
          style={{ width: "100%" }}
          onClick={onClickBecomeMember}
        />
        {!value.contents ? null : (
          <RichTextViewer
            value={value.contents.body}
            className={styles.richText}
          />
        )}
      </Flex.Col>
    </div>
  );
}
