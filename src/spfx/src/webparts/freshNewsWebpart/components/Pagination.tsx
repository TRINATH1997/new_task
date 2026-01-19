import * as React from "react";
import { DefaultButton } from "@fluentui/react";

export const Pagination = ({ onNext }: any) => (
  <DefaultButton text="Load More" onClick={onNext} />
);
