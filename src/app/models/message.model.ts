export interface Message {
  from: string;
  text?: string;
  url?: string;
  createdAt: number | string;
}
