import { Button } from "@chakra-ui/button";
import { Box, Center, Heading, Stack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Fade } from "@chakra-ui/transition";
import { useRef, useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import AppTable from "../components/AppTable";
import { AddIcon } from "@chakra-ui/icons";

function Home() {
  const [isLoading, setLoading] = useState<boolean>(true);

  // simulating an API call
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (isLoading) {
    return (
      <Center
        height="100%"
        display="flex"
        justifyContent="center"
        alignContent="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <>
      <Fade in={!isLoading}>
        <Box>
          <Box display="flex" justifyContent="space-between" marginBottom="5">
            <Heading>Users</Heading>
            <_CreateUserDrawer />
          </Box>
          <Box borderRadius="md">
            <AppTable></AppTable>
          </Box>
        </Box>
      </Fade>
    </>
  );
}

export default Home;

// DMV
// Th, Fri, Saturday, 8AM

function _CreateUserDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const firstField = useRef();

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} size="lg">
        Create
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Create a new account
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="username"
                    placeholder="Please enter user name"
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="url">Url</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>http://</InputLeftAddon>
                    <Input
                      type="url"
                      id="url"
                      placeholder="Please enter domain"
                    />
                    <InputRightAddon>.com</InputRightAddon>
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel htmlFor="owner">Select Owner</FormLabel>
                  <Select id="owner" defaultValue="segun">
                    <option value="segun">Segun Adebayo</option>
                    <option value="kola">Kola Tioluwani</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea id="desc" />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  toast({
                    title: "User created.",
                    description: "A new user has been created.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  onClose();
                }}
              >
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
