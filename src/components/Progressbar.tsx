// eslint-disable-next-line
import React from "react";

const ProgressBar: React.FC<{ completed: any; theme: any }> = (props: any) => {
  const { completed, theme } = props;

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: theme === "dark" ? "rgba(250, 250, 250,0.1)" : "#eeedff",
  };

  const fillerStyles: any = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#5546FF",
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles: any = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
