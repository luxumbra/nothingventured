import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "../hooks/useWindowSize";

const DRAWER_WIDTH = "325px";
const SIDEBAR_PADDING = "3";
const SIDEBAR_LIST_TILE_MARGIN = "5px 0px 5px 0px";
const APP_NAME = "🌩️ App Name";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main
        style={{
          height: "100vh",
          display: "flex",
        }}
      >
        <_AppDrawer></_AppDrawer>

        <Box marginLeft={DRAWER_WIDTH} width="100%" padding="5">
          {children}
        </Box>
      </main>
    </>
  );
}

export default AdminLayout;

function _AppDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();
  const [width, height] = useWindowSize();

  function toMainView() {
    router.replace("/");
  }

  return (
    <>
      {/* <Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
        Open
      </Button> */}

      <Box
        height="100%"
        width={DRAWER_WIDTH}
        bgColor="white"
        padding={SIDEBAR_PADDING}
        outline="solid 1px"
        outlineColor="gray.300"
        position="fixed"
      >
        <Center>
          <Heading size="lg">{APP_NAME}</Heading>
        </Center>

        <Box marginTop="16" />

        <_SidebarListTile
          label="Home"
          onClick={toMainView}
          margin={SIDEBAR_LIST_TILE_MARGIN}
        />
        <_SidebarListTile
          label="Users"
          onClick={toMainView}
          margin={SIDEBAR_LIST_TILE_MARGIN}
        />
        <_SidebarListTile
          label="Products"
          onClick={toMainView}
          margin={SIDEBAR_LIST_TILE_MARGIN}
        />
        <_SidebarListTile
          label="Settings"
          onClick={toMainView}
          margin={SIDEBAR_LIST_TILE_MARGIN}
        />

        <_AppSidebarAvatar></_AppSidebarAvatar>
      </Box>

      {/* The Drawer Component */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

function _SidebarListTile({
  label = "Label",
  margin = null,
  onClick = function () {},
}) {
  return (
    <Box
      backgroundColor="gray.50"
      borderRadius="md"
      padding="3"
      display="flex"
      cursor="pointer"
      margin={margin}
      _hover={{
        color: "white",
        backgroundColor: "blue.500",
      }}
      onClick={onClick}
    >
      <Center>
        <Icon />
      </Center>
      <Box width="5" />
      <Text>{label}</Text>
    </Box>
  );
}

function _AppSidebarAvatar() {
  const router = useRouter();

  function onClickAvatarTile() {
    router.push("profile");
  }

  return (
    <Box
      position="absolute"
      onClick={onClickAvatarTile}
      display="flex"
      bottom="15"
      left="2"
      right="2"
      cursor="pointer"
      borderRadius="md"
      padding={SIDEBAR_PADDING}
      _hover={{
        color: "white",
        backgroundColor: "blue.500",
      }}
    >
      <Avatar></Avatar>
      <Box width="5" />
      <Box>
        <Text fontWeight="bold">Full Name</Text>
        <Text>user@email.com</Text>
      </Box>
    </Box>
  );
}
