import { defaultTheme } from "../pages/content/theme/defaultTheme";

export interface MessageObject {
  action: string;
  payload?: any;
}

export interface UniClass {
  name: string;
  location: string;
}

export type DaySchedule = Array<UniClass | null>;
export type WeekSchedule = DaySchedule[];

export type UniClassWithEvenOdd = UniClass & { evenOdd?: "even" | "odd" };
export type DayScheduleWithEvenOdd = Array<UniClassWithEvenOdd | null>;
export type WeekScheduleWithEvenOdd = DayScheduleWithEvenOdd[];

export type ThemeColor = keyof typeof defaultTheme.colors;
