import { Route } from "atomic-router-react";
import { useStore } from "effector-react";

import { routes } from "src/shared/routes";
import { OrdersPage } from "./orders";
import { UiKitPage } from "./ui-kit";

export const Pages = () => (
  <>
    <Route route={routes.uiKit} view={UiKitPage} />
    <Route route={routes.orders} view={OrdersPage} />
  </>
);

export const routesMap = [
  { path: "/ui-kit", route: routes.uiKit },
  { path: "/", route: routes.orders },
];

