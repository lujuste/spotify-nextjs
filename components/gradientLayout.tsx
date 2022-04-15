import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image, SkeletonText } from "@chakra-ui/react";
import { ReactNode } from "react";

interface GradientProps {
  children?: ReactNode;
  color?: string;
  image?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  roundImage?: boolean;
  isLoading?: any;
}

const GradientLayout = ({
  children,
  color,
  image,
  subtitle,
  title,
  description,
  roundImage,
  isLoading,
}: GradientProps) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box>
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>

        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="sm" fontWeight="bold" casing="uppercase">
            {isLoading ? (
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
            ) : (
              subtitle
            )}
          </Text>
          {isLoading ? (
            <SkeletonText mt="4" noOfLines={2} spacing="4" />
          ) : (
            <Text fontSize="6xl"> {title} </Text>
          )}

          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
