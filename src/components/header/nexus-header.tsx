"use client";

import { usePathname } from "next/navigation";

import NexusHeaderBtn from "./nexus-header-btn";

const NexusHeader = () => {
  const pathname = usePathname();

  const headerBtns = [
    { value: "home", href: "/nexus", isActive: pathname === "/nexus" },
    {
      value: "mission",
      href: "/nexus/mission",
      isActive: pathname === "/nexus/mission",
    },
    {
      value: "projects",
      href: "/nexus/projects",
      isActive: pathname === "/nexus/projects",
    },
    {
      value: "contacts",
      href: "/nexus/contacts",
      isActive: pathname === "/nexus/contacts",
    },
  ];

  return (
    <div className="nexus-header">
      <div className="nexus-header__container">
        {headerBtns.map((btn, index) => {
          return (
            <NexusHeaderBtn
              isActive={btn.isActive}
              href={btn.href}
              value={btn.value}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NexusHeader;
