// src/utils/mapSidebarItemsToRoutes.ts

import { Suspense, type ComponentType } from "react";

// Utility function to wrap components with Suspense for lazy loading
const renderWithSuspense = (Component: React.ComponentType<any>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

// Function to map sidebar items to routes
export function mapSidebarItemsToRoutes(sidebarItems: any[]) {
  return sidebarItems.flatMap((group) =>
    group.items.map((item: { component: ComponentType<any>; url: any; }) => ({
      Component: () => renderWithSuspense(item.component), // Dynamically render component
      path: item.url, // Path from sidebar items
    }))
  );
}
