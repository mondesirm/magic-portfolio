import { Card, Column, Heading, Row, SmartLink, Tag, Text } from "@once-ui-system/core";
import type { BookingCard } from "@/types";

type BookingSectionProps = {
  cards: BookingCard[];
};

export function BookingSection({ cards }: BookingSectionProps) {
  return (
    <Row fillWidth gap="16" s={{ direction: "column" }}>
      {cards.map((card) => (
        <SmartLink key={card.title} href={card.href} fillWidth unstyled>
          <Card
            fillWidth
            flex={1}
            minWidth={15}
            padding="24"
            radius="l-4"
            border="neutral-alpha-weak"
            background="surface"
            direction="column"
            gap="16"
          >
            <Row gap="8" wrap>
              <Tag size="s">{card.duration}</Tag>

              <Tag size="s" onBackground="neutral-weak">
                {card.bestFor}
              </Tag>
            </Row>

            <Column gap="8">
              <Heading as="h3" variant="heading-strong-l" wrap="balance">
                {card.title}
              </Heading>

              <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
                {card.description}
              </Text>
            </Column>
          </Card>
        </SmartLink>
      ))}
    </Row>
  );
}
