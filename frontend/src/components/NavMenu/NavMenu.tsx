"use client";

import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import "./styles.css";

const NavMenu = () => {
  return (
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Plik</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContent"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="MenubarItem">
              Przeglądaj <div className="RightSlot">⌘ T</div>
            </Menubar.Item>
            <Menubar.Item className="MenubarItem">
              New Window <div className="RightSlot">⌘ N</div>
            </Menubar.Item>
            <Menubar.Item className="MenubarItem" disabled>
              New Incognito Window
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Sub>
              <Menubar.SubTrigger className="MenubarSubTrigger">
                Share
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent
                  className="MenubarSubContent"
                  alignOffset={-5}
                >
                  <Menubar.Item className="MenubarItem">
                    Email Link
                  </Menubar.Item>
                  <Menubar.Item className="MenubarItem">Messages</Menubar.Item>
                  <Menubar.Item className="MenubarItem">Notes</Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item className="MenubarItem">About</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default NavMenu;
