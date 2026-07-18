import { SmartLink } from "@once-ui-system/core";

type Tag = "br" | "b" | "i" | "p" | "a";

type Props = {
  children(tags: Record<Tag, (chunks: React.ReactNode) => React.ReactNode>): React.ReactNode;
};

export const RichText = ({ children }: Props) => {
  return (
    <div className="prose">
      {children({
        br: () => <br />,
        b: (chunks: React.ReactNode) => <b>{chunks}</b>,
        i: (chunks: React.ReactNode) => <i>{chunks}</i>,
        p: (chunks: React.ReactNode) => <p>{chunks}</p>,
        a: (chunks: React.ReactNode) => (
          <SmartLink href={`/${(chunks as string).split("@")[0]}`}>
            {(chunks as string).split("@")[1]}
          </SmartLink>
        ),
      })}
    </div>
  );
};
