import * as React from "react";

export const NewsTile = ({ item }: any) => (
  <div style={{ border: "1px solid #ddd", padding: 12 }}>
    <h3>{item.title}</h3>
    <small>{item.date}</small>
  </div>
);
