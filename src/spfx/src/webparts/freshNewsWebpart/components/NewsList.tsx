import * as React from "react";
import { NewsTile } from "./NewsTile";

export const NewsList = ({ items }: any) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
    {items.map((i: any) => <NewsTile key={i.id} item={i} />)}
  </div>
);
