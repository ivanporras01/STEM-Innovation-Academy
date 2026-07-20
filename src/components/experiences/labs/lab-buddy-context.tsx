"use client";

import { createContext, useContext } from "react";
import type { BuddyId } from "@/lib/experiences/buddies";

type LabBuddyValue = {
  buddyId: BuddyId;
  buddyNickname: string;
};

const LabBuddyContext = createContext<LabBuddyValue | null>(null);

export function LabBuddyProvider({
  buddyId,
  buddyNickname,
  children,
}: LabBuddyValue & { children: React.ReactNode }) {
  return (
    <LabBuddyContext.Provider value={{ buddyId, buddyNickname }}>
      {children}
    </LabBuddyContext.Provider>
  );
}

/** Selected Explore Now buddy — available inside every LAB arena. */
export function useLabBuddy() {
  return useContext(LabBuddyContext);
}
