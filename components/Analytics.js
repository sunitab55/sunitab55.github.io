import ReactGA from "react-ga";
import Router from "next/router";
import React from "react";

const AnalyticsContext = React.createContext();

function Analytics(props) {
  const [analytics, setAnalytics] = React.useState({
    isInitialized: false,
  });

  const handleRouteChange = (url) => {
    ReactGA.pageview(url);
  };

  const logEvent = (value) => {
    ReactGA.event(value);
  };

  React.useEffect(() => {
    if (typeof window === undefined) return;
    const { isInitialized } = analytics;
    if (!isInitialized) {
      ReactGA.initialize("UA-73305012-1", { debug: true });
      ReactGA.pageview(Router.pathname);
      setAnalytics((prev) => ({
        ...prev,
        isInitialized: true,
      }));
    }
    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      // clean up
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [analytics]);

  return <AnalyticsContext.Provider value={{ logEvent }} {...props} />;
}

const useTracking = () => React.useContext(AnalyticsContext);

export { Analytics };
