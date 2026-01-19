import * as React from "react";
import { TextField } from "@fluentui/react";

export const SearchBox = ({ onChange }: { onChange: (v: string) => void }) => (
  <TextField
    placeholder="Search news..."
    onChange={(_, v) => onChange(v || "")}
  />
);
