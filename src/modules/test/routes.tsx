import { lazy } from "react";
const TestView = lazy(() => import("@modules/test/TestView"));

const testRoutes = {
  path: "test",
  children: [{ path: "testView", element: <TestView /> }],
};

export { testRoutes };

