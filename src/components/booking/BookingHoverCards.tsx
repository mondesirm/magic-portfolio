import { Avatar, Column, Flex, HoverCard, Row, SmartLink, Tag, Text } from "@once-ui-system/core";
import type { BookingCard } from "@/types";

type BookingHoverCardsProps = {
  cards: BookingCard[];
};

export function BookingHoverCards({ cards }: BookingHoverCardsProps) {
  return (
    <Flex gap="64">
      {cards.map((card) => (
        <SmartLink key={card.title} href={card.href} fillWidth unstyled>
          <HoverCard
            placement="top"
            trigger={<Avatar size="l" src="/images/avatar.jpg" tabIndex={0} />}
          >
            <Column
              padding="20"
              gap="20"
              radius="l"
              maxWidth={24}
              background="page"
              border="neutral-alpha-weak"
            >
              <Row gap="20" fillWidth vertical="center">
                <Avatar size={3} src="/images/avatar.jpg" />

                <Column gap="4">
                  <Text variant="heading-strong-m">{card.title}</Text>

                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {card.bestFor}
                  </Text>
                </Column>
              </Row>

              <Text variant="body-default-s" onBackground="neutral-weak">
                {card.description}
              </Text>

              <Row gap="8" wrap>
                <Tag>{card.duration}</Tag>
              </Row>
            </Column>
          </HoverCard>
        </SmartLink>
      ))}
    </Flex>
  );
}
