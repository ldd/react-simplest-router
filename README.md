# react-simplest-router

> Simplest React router using hooks

[![NPM](https://img.shields.io/npm/v/react-simplest-router.svg)](https://www.npmjs.com/package/react-simplest-router)

_Tired of very big routers with a lot of options and documentation?_

_Need the absolutely simplest router?_

_URL Hash routers are ok with you?_

Use this package

## Install

```bash
npm install --save react-simplest-router
```

or

```bash
yarn add react-simplest-router
```

## Usage

`react-simplest-router` exports by default a hook that you can use to handle routing.

In the spirit of show-dont-tell, here's an example:

```jsx
import React from "react";
import useRouter from "react-simplest-router";
import "./App.css";

const A = () => <label>A</label>;
const B = () => <label>B</label>;

const initialRoutes = [
  { location: "#A", component: A },
  { location: "#B", component: B }
];

const Picker = ({ routes, changeRoute }) => (
  <div>
    {routes.map(({ location, isActive }) => (
      <button
        key={location}
        onClick={() => changeRoute(location)}
        className={isActive ? "active" : "inactive"}
      >
        {location}
      </button>
    ))}
  </div>
);

const App = () => {
  const { setRoute, routes, ActiveComponent } = useRouter(initialRoutes);
  const changeRoute = newRoute => {
    setRoute(newRoute);
    document.location.hash = newRoute;
  };
  return (
    <div>
      <Picker changeRoute={changeRoute} routes={routes} />
      <ActiveComponent />
    </div>
  );
};

export default App;
```

As you can see, `useRouter` only takes in a routes array. Each route should have two properties:

- `location` to know where to go
- `component` to know what to render

> `react-simplest-router` doesn't have ANY other functionality or API to learn. It is truly the simplest router

## License

MIT © [ldd](https://github.com/ldd)
