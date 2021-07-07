import ReactGA from "react-ga";
import Router from "next/router";
import React from "react";

function Analytics(props) {
  const { trackingID } = props;
  const [analytics, setAnalytics] = React.useState({
    isInitialized: false,
  });

  const handleRouteChange = (url) => {
    ReactGA.set({ page: url });
    ReactGA.pageview(url);
  };

  React.useEffect(() => {
    const { isInitialized } = analytics;
    if (!isInitialized) {
      ReactGA.initialize(trackingID);
    }
    Router.events.on("routeChangeComplete", handleRouteChange);
    setAnalytics((prev) => ({
      ...prev,
      isInitialized: true,
    }));

    return () => {
      // clean up
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [trackingID]);

  return <div></div>;
}

export default Analytics;
