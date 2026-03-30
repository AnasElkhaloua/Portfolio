import { Row, Text } from "@once-ui-system/core";
import { person } from "@/resources";

export const Footer = () => {
  return (
    <Row as="footer" fillWidth padding="8" horizontal="center">
      <Row
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        horizontal="center"
        vertical="center"
      >
        <Text variant="body-default-s" onBackground="neutral-weak">
          For collaboration, contact me at{" "}
          <a 
            href={`mailto:${person.email}`}
            style={{ 
              color: "inherit",
              textDecoration: "none",
              fontWeight: 500,
              borderBottom: "1px solid currentColor",
            }}
          >
            {person.email}
          </a>
        </Text>
      </Row>
    </Row>
  );
};
