import * as React from "react";
import { Dropdown } from "@fluentui/react";

export const FilterDropdown = ({ onChange }: any) => (
  <Dropdown
    label="Filter by Author"
    options={[
      { key: "All", text: "All" },
      { key: "Admin", text: "Admin" },
      { key: "User", text: "User" }
    ]}
    onChange={(_, o) => onChange(o?.key)}
  />
);
