export interface ILicenseData {
  description: string;
  note?: string;
  title: string;
  "spdx-id": string;
  hidden?: boolean;
  how: string;
  using?: Record<string, string>;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  text: string;
  redirect_from?: string;
  nickname?: string;
  featured?: boolean;
}
