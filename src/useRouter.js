import { useState } from "react";

export const Empty = () => null;

const useRouter = (initialRoutes = []) => {
  const [activeRoute, setRoute] = useState(document.location.hash);
  const routes = [];
  let ActiveComponent = Empty;

  initialRoutes.forEach(route => {
    if (typeof route !== "object") return;

    // assume each route can have many properties, but we only require location and use component if present
    const { location, component = Empty, ...otherProps } = route;
    const isActive = location === activeRoute;

    // the ActiveComponent is either the first route with a component property or active route's component
    if ((ActiveComponent === Empty && component !== Empty) || isActive)
      ActiveComponent = component;

    const newRoute = { ...otherProps, location, component, isActive };
    routes.push(newRoute);
  });

  // we explicitly do not return activeRoute
  return { setRoute, routes, ActiveComponent };
};

export default useRouter;
