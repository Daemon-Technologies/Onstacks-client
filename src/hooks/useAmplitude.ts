import { useEffect } from "react";
import amplitude from "amplitude-js";

export default function useAmplitude() {
  const amplitudeClient = amplitude.getInstance();

  useEffect(() => {
    amplitudeClient.init(
      "1cf9e3ba5faf5ed34be98a9b187c3538",
      undefined,
      { includeReferrer: true, includeUtm: true },
      function () {
        console.log("Amplitude Init complete");
      }
    );
  }, [amplitudeClient]);

  const logEvent = (eventName: string) => {
    amplitudeClient.logEvent(eventName);
  };

  return {
    logEvent,
  };
}
