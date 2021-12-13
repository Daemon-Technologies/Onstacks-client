import React from "react";
import {
  getAssetAmounts,
  getAssetNameParts,
  getName,
  getTicker,
  truncateMiddle,
} from "../utils/utils";
import EventDark from "../assets/explorer/Event-Dark.svg";
import EventLight from "../assets/explorer/Event-Light.svg";

export const Events: React.FC<{ events: any; theme: any }> = ({
  events,
  theme,
}) => {
  const getParticipants = (event: any) => {
    if (
      event.event_type === "stx_asset" ||
      event.event_type === "fungible_token_asset" ||
      event.event_type === "non_fungible_token_asset"
    )
      if ("asset" in event && event.asset) {
        switch (event.asset.asset_event_type) {
          case "transfer": {
            return (
              <p>
                {truncateMiddle(event.asset.sender)} to{" "}
                {truncateMiddle(event.asset.recipient)}
              </p>
            );
          }
          case "mint":
            return event.asset.recipient ? (
              <p>{truncateMiddle(event.asset.recipient)}</p>
            ) : null;
        }
      }
    if (event.event_type === "stx_lock") {
      return <p>{truncateMiddle(event.stx_lock_event.locked_address)}</p>;
    }

    return null;
  };

  return (
    <>
      {events.map((event: any) => {
        const name = getName(event);
        // const assetEventType = getAssetEventType(event);
        const assetAmounts = getAssetAmounts(event);
        const participants = getParticipants(event);

        const assetId =
          event.event_type === "fungible_token_asset" ||
          event.event_type === "non_fungible_token_asset"
            ? event.asset.asset_id
            : undefined;

        const tokenType =
          event.event_type === "fungible_token_asset"
            ? "Fungible token"
            : event.event_type === "non_fungible_token_asset"
            ? "Non-fungible token"
            : undefined;
        return (
          <div className="transaction-row">
            <img
              className="transaction-image"
              alt="transaction"
              src={theme === "dark" ? EventDark : EventLight}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "80%",
              }}
            >
              <p style={{ textAlign: "left" }} className="subtitle">
                {name} ∙ {assetAmounts}{" "}
              </p>
              <p className="title">
                {participants && participants} {tokenType && tokenType} ∙{" "}
                {assetId &&
                  getTicker(getAssetNameParts(assetId).asset).toUpperCase()}
              </p>
            </div>
            <p>{event.event_index}</p>
          </div>
        );
      })}
    </>
  );
};
