import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

export const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button
        onClick={() => toggleColorMode()}
        pos="absolute"
        top="0"
        right="0"
        margin="1rem"
      >
        {colorMode === "dark" ? (
          <SunIcon color={"orange.400"} />
        ) : (
          <MoonIcon color={"blue.700"} />
        )}
      </Button>
    </>
  );
};
