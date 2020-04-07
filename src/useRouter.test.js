import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import useRoute, { Empty } from "./useRouter";

describe("hook [useRouter]", () => {
  let container;
  let result;

  const renderComponent = Component => render(Component, container);

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    result = undefined;
  });

  it("has sane defaults", () => {
    let Content = () => {
      result = useRoute();
      return <div />;
    };
    renderComponent(<Content />);
    unmountComponentAtNode(container);
    Content = () => {
      result = useRoute([]);
      return <div />;
    };
    renderComponent(<Content />);
    unmountComponentAtNode(container);
  });

  it("can use routes", () => {
    const component = () => <div id="myDiv" />;
    const routes = [{ location: "#first", component }];
    const Content = () => {
      result = useRoute(routes);
      return <div />;
    };
    renderComponent(<Content />);
    const domComponent = container.querySelector("#myDiv");
    expect(domComponent).toBeDefined();
    expect(result.routes).toMatchObject(routes);
  });

  it("can use malformed routes", () => {
    let Content = () => {
      result = useRoute(["badRoute"]);
      return <div />;
    };
    renderComponent(<Content />);
    expect(result.ActiveComponent).toBe(Empty);
    expect(result.routes).toHaveLength(0);
    unmountComponentAtNode(container);

    const badRoutes = [{ l: "#first" }, { m: "#last" }];
    Content = () => {
      result = useRoute(badRoutes);
      return <div />;
    };
    renderComponent(<Content />);
    expect(result.ActiveComponent).toBe(Empty);
    expect(result.routes).toHaveLength(badRoutes.length);
    expect(result.routes).toMatchObject(badRoutes);
    result.routes.forEach(route =>
      expect(route).toHaveProperty("isActive", false)
    );
  });
});
