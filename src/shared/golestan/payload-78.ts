import * as types from "@src/types/types";

function convertToLatinNumber(arabicNumber) {
  const latinNumbers = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  const arabicDigits = arabicNumber.split("");
  let latinNumber = "";

  for (const digit of arabicDigits) {
    if (Object.prototype.hasOwnProperty.call(latinNumbers, digit)) {
      latinNumber += latinNumbers[digit];
    } else {
      latinNumber += digit;
    }
  }

  return latinNumber;
}

function textBefore(text: string, anchor: string) {
  return text.substring(0, text.search(anchor));
}

function textAfter(text: string, anchor: string) {
  return text.substring(text.search(anchor) + anchor.length);
}

function parseTextContent(textContent) {
  let [className, classLocation] = textContent.split("محل:").map((t) => t.trim());

  const evenOdd = className.endsWith("زوج")
    ? "even"
    : className.endsWith("فرد")
    ? "odd"
    : undefined;

  className = textBefore(className, "گروه").replace(/ي/g, "ی");

  if (classLocation.search("امتحان") !== -1) {
    classLocation = textBefore(classLocation, "امتحان");
  }

  if (classLocation.search("-") !== -1) {
    classLocation = textAfter(classLocation, "-");
  }

  classLocation = classLocation.replace("-", " - ").replace("/", "").replace(/ي/g, "ی");

  return {
    name: className.trim(),
    location: classLocation.trim(),
    evenOdd,
  } as types.UniClassWithEvenOdd;
}

function getTimeIndex(timeString) {
  switch (timeString) {
    case "10:00-08:00":
      return 0;

    case "12:00-10:00":
      return 1;

    case "14:00-12:00":
      return 2;

    case "16:00-14:00":
      return 3;

    case "18:00-16:00":
      return 4;
  }
}

function parseTr(tr: HTMLTableRowElement) {
  const tds = [...tr.children].filter((td) => td.hasAttribute("title"));
  const daySchedule = Array.from({ length: 5 }).fill(null);

  for (const td of tds) {
    const timeIndex = getTimeIndex(td.getAttribute("title").match(/\d{2}:\d{2}-\d{2}:\d{2}/)[0]);

    const parsed = parseTextContent(td.textContent);
    daySchedule[timeIndex] = parsed;
  }

  return daySchedule as types.DayScheduleWithEvenOdd;
}

function getCorrectIframeToQuery() {
  const outerFrame1 = [...document.querySelectorAll("iframe")]
    .filter((e) => e.src.match(".*fid=.*;78.*"))[0]
    .contentDocument.querySelector("[name=Master]") as HTMLIFrameElement;

  const outerFrame2 = outerFrame1.contentDocument.querySelector(
    "[name=Header]",
  ) as HTMLIFrameElement;

  return outerFrame2.contentDocument.getElementById("Form_Body") as HTMLIFrameElement;
}

export function extractIdentity(): types.StudentIdentity {
  const iframe = getCorrectIframeToQuery();

  let [studentNumber, studentName, academicOrientation] = ["Table2_1", "Table2_2", "Table2_5"].map(
    (string) => iframe.contentDocument.getElementById(string).textContent,
  );

  studentName = textAfter(studentName, "نام و نام خانوادگي : ").replace(/ي/g, "ی");

  studentNumber = convertToLatinNumber(textAfter(studentNumber, "شماره دانشجو : "));

  academicOrientation = textAfter(academicOrientation, "تحصيلي          : ").replace(/ي/g, "ی");

  return {
    studentName,
    studentNumber,
    academicOrientation,
  };
}

export function extractGeneralWeekSchedule() {
  const iframe = getCorrectIframeToQuery();

  const tableDiv =
    iframe.contentDocument.getElementById("DIVVarRem_2") ??
    iframe.contentDocument.getElementById("DIVVarRem_3");

  const days = [...tableDiv.querySelectorAll("tr")];

  days.shift();

  return days.map(parseTr) as types.WeekScheduleWithEvenOdd;
}

export function constructWeekSchedule(
  generalWeekSchedule: types.WeekScheduleWithEvenOdd,
  evenOrOdd: "even" | "odd",
) {
  return generalWeekSchedule.map((day) =>
    day.map((uniClass) => {
      if (uniClass !== null) {
        if (uniClass.evenOdd === undefined || uniClass.evenOdd === evenOrOdd) {
          return { name: uniClass.name, location: uniClass.location };
        }
      }

      return null;
    }),
  ) as types.WeekSchedule;
}
