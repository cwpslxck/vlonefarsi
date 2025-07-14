import React from "react";
import Card from "./card";

function Container() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-between px-4 gap-8 flex-wrap">
      <Card />
    </div>
  );
}

export default Container;
