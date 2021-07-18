import React from "react";
import { Header } from "../components/Header";
import { InfoCard } from "../components/InfoCard";

export const Overview: React.FC = () => {
  return (
    <div className="screen-container">
      <Header />
      <p className="screen-title">Overview</p>
      <InfoCard />
    </div>
  );
};
