import { defaultTheme } from "@pages/content/theme/defaultTheme";

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
export interface WeekSchedules {
  evenWeekSchedule: WeekSchedule;
  oddWeekSchedule: WeekSchedule;
}

export type UniClassWithEvenOdd = UniClass & { evenOdd?: "even" | "odd" };
export type DayScheduleWithEvenOdd = Array<UniClassWithEvenOdd | null>;
export type WeekScheduleWithEvenOdd = DayScheduleWithEvenOdd[];

export type ThemeColor = keyof typeof defaultTheme.colors;

export interface StudentIdentity {
  studentName: string;
  studentNumber: string;
  academicOrientation: string;
}

export interface ServerResponseForSendWeekSchedules {
  verificationCode: number;
  expire: number;
}
