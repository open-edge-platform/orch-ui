/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  convert24hrTimeTo12hr,
  convertLocalTimeToUTC,
  convertTimeInLocalTimezone,
  getDateOffsetAccrossTimezone,
  getDateTimeFromSeconds,
  getHumanReadableDuration,
  getNextCircularValue,
  hasFieldError,
  singleDigitPadding,
} from "./utils";

const isOnMarchDaylightSavings = false;

describe("helper store/utils", () => {
  it("convert24hrTimeTo12hr", () => {
    expect(convert24hrTimeTo12hr("00:00")).to.be.eq("12:00 AM");
    expect(convert24hrTimeTo12hr("10:15")).to.be.eq("10:15 AM");
    expect(convert24hrTimeTo12hr("12:15")).to.be.eq("12:15 PM");
    expect(convert24hrTimeTo12hr("23:15")).to.be.eq("11:15 PM");
  });
  it("getHumanReadableDuration", () => {
    expect(getHumanReadableDuration(30)).to.be.eq(
      "0 hours, 0 minutes and 30 seconds",
    );
    expect(getHumanReadableDuration(78)).to.be.eq(
      "0 hours, 1 minutes and 18 seconds",
    );
    expect(getHumanReadableDuration(90)).to.be.eq(
      "0 hours, 1 minutes and 30 seconds",
    );
    expect(getHumanReadableDuration(1800)).to.be.eq(
      "0 hours, 30 minutes and 0 seconds",
    );
    expect(getHumanReadableDuration(4809)).to.be.eq(
      "1 hours, 20 minutes and 9 seconds",
    );
    expect(getHumanReadableDuration(85545)).to.be.eq(
      "23 hours, 45 minutes and 45 seconds",
    );
  });
  it("getDateTimeFromSeconds", () => {
    const testDateTime = (
      seconds: number,
      expectedDate: string,
      expectedTime: string,
    ) => {
      const [date, hh, mm] = getDateTimeFromSeconds(seconds);
      expect(date).to.be.eq(expectedDate);
      expect(`${hh}:${mm}`).to.be.eq(expectedTime);
    };

    testDateTime(1713000000, "13/Apr/2024", "09:20");
    testDateTime(1715886058, "16/May/2024", "19:00");
    testDateTime(1813060000, "15/Jun/2027", "11:46");
  });

  it("getNextCircularValue", () => {
    expect(getNextCircularValue(0, 0, 6, 1)).to.be.eq(1); //Next day test
    expect(getNextCircularValue(0, 0, 6, 0)).to.be.eq(0); //Same day test
    //(Circular queue value for 0 when offseting by 1 backward is 6)
    expect(getNextCircularValue(0, 0, 6, -1)).to.be.eq(6); //Prev day test

    //(Circular queue value for 31 when offseting by 1 forward is 1)
    expect(getNextCircularValue(31, 1, 31, 1)).to.be.eq(1); //Next day test
    expect(getNextCircularValue(31, 1, 31, 0)).to.be.eq(31); //Same day test
    expect(getNextCircularValue(31, 1, 31, -1)).to.be.eq(30); //Prev day test

    //(Circular queue value for 31 when offseting by 1 forward is 1)
    expect(getNextCircularValue(13, 1, 31, 1)).to.be.eq(14); //Next day test
    expect(getNextCircularValue(3, 0, 6, 1)).to.be.eq(4); //Same day test
  });

  it("getDateOffsetAccrossTimezone", () => {
    expect(
      getDateOffsetAccrossTimezone("17:42", "Asia/Calcutta", "GMT"),
    ).to.be.eq(0); //Same day test
    expect(
      getDateOffsetAccrossTimezone("02:42", "Asia/Calcutta", "GMT"),
    ).to.be.eq(1); //Next day test - Asia 1 day ahead GMT
    expect(
      getDateOffsetAccrossTimezone("22:42", "GMT", "Asia/Calcutta"),
    ).to.be.eq(-1); //Prev day test - GMT 1 day behind India

    expect(getDateOffsetAccrossTimezone("00:00", "GMT", "GMT")).to.be.eq(0); //Same day test

    // Note: The identifiers in the IANA database such as (GMT+1200 ==> Etc/GMT-12) have their offset inverted intentionally.
    expect(getDateOffsetAccrossTimezone("00:00", "Etc/GMT-12", "GMT")).to.be.eq(
      1,
    ); // 00:00/today and 12:00/yesterday are 1 day apart
    expect(getDateOffsetAccrossTimezone("00:00", "Etc/GMT+12", "GMT")).to.be.eq(
      0,
    ); // (00:00/today) and 12:00/today are same day

    expect(getDateOffsetAccrossTimezone("12:00", "Etc/GMT+12", "GMT")).to.be.eq(
      -1,
    ); // 12:00 and (24:00 or 00:00/tomorrow) are 1 day apart
    expect(getDateOffsetAccrossTimezone("12:00", "Etc/GMT-12", "GMT")).to.be.eq(
      0,
    ); // (12:00 or 00:00/today) are in same day
  });

  it("singleDigitPadding", () => {
    expect(singleDigitPadding("0")).to.be.eq("00");
    expect(singleDigitPadding("00")).to.be.eq("00");
    expect(singleDigitPadding("9")).to.be.eq("09");
    expect(singleDigitPadding("09")).to.be.eq("09");
    expect(singleDigitPadding("12")).to.be.eq("12");
    expect(singleDigitPadding("30")).to.be.eq("30");
    expect(singleDigitPadding("59")).to.be.eq("59");
  });

  it("convertLocalTimeToUTC", () => {
    expect(
      convertLocalTimeToUTC({
        time: "17:42",
        date: "12/12/2024",
        tzCode: "IST",
      }) * 1000,
    ).to.be.eq(+new Date("12/Dec/2024 12:12 GMT"));
    expect(
      convertLocalTimeToUTC({
        time: "05:12",
        date: "12/13/2024",
        tzCode: "IST",
      }) * 1000,
    ).to.be.eq(+new Date("12/Dec/2024 23:42 GMT"));

    expect(
      convertLocalTimeToUTC({
        time: "00:00",
        date: "12/Dec/2024",
        tzCode: "PST",
      }) * 1000,
    ).to.be.eq(
      +new Date(`12/Dec/2024 0${isOnMarchDaylightSavings ? "7" : "8"}:00 GMT`),
    ); // PST is 7 hrs behind GMT
  });

  describe("hasFieldError", () => {
    it("should be valid", () => {
      expect(hasFieldError(undefined)).to.be.eq("valid");
    });
    it("should be invalid", () => {
      expect(
        hasFieldError({ type: "maxLength", message: "exceeded 40 char" }),
      ).to.be.eq("invalid");
    });
  });

  describe("UI/user's timezone dependent tests", () => {
    // NOTE: timezone test doesnot work on windows due to a cypress bug in `cyVersion > 9.1.1`
    // Refer to Issue: https://github.com/cypress-io/cypress/issues/1043
    if (window.navigator.platform.toLowerCase().startsWith("win")) {
      // TODO: Timezone/time tests are skipped on Windows environment! Check alternative way to set timezone for cypress in windows.
      return;
    }

    it("convertTimeInLocalTimezone", () => {
      const commonExpectedResult = {
        timezoneName: "India Standard Time",
        timezoneAbbreviation: "IST",
        timezoneOffset: "+05:30",
      };

      //Same day test
      expect(
        convertTimeInLocalTimezone("12", "12", "12/12/2024"),
      ).to.be.deep.eq({
        ...commonExpectedResult,
        localDate: "12/12/2024",
        localTime: "17:42",
      });

      // Next day test
      expect(convertTimeInLocalTimezone("23", "42", "12/12/2024")).to.deep.eq({
        ...commonExpectedResult,
        localDate: "12/13/2024",
        localTime: "05:12",
      });
    });
  });
});
