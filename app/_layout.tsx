import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from "expo-router";
import { ReactNode } from "react";
type RootLayoutProps = {
  children: ReactNode;
};

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ConvexProvider client={convex}>
      <Slot />
    </ConvexProvider>
  );
}
