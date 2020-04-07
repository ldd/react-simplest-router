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
