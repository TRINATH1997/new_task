import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFreshNewsWebpartProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;

  pageSize: number;
  enableSearch: boolean;
}
