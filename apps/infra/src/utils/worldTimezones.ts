/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { capitalize } from "lodash";
import moment from "moment-timezone";

const singleDigitPadding = (value: string) =>
  value.length < 2 ? `0${value}` : value;

// TODO: RENAME to MONTH
export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// TODO: RENAME to WEEKDAT
export const Weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
// TODO: RENAME to CALENDER_DAYS
export const CalenderDays = [...Array(31).keys()];

//TODO: RENAME to WEEKDAY_ABBR
export const WEEKDAYS = Weekdays.map((day) => capitalize(day).slice(0, 3));
//TODO: RENAME to MONTH_ABBR
export const MONTHS = Months.map((day) => capitalize(day).slice(0, 3));

export interface Timezone {
  label: string;
  tzCode: string;
  utc: string;
}

const supportedTimezones: Timezone[] = moment.tz.names().map((timezone) => {
  const utcOffsetInMinutes = moment().tz(timezone).utcOffset();
  const [utcOffsetHH, utcOffsetMM] = [
    Math.abs(Math.trunc(utcOffsetInMinutes / 60)),
    utcOffsetInMinutes % 60,
  ];
  const utcOffset = `${singleDigitPadding(utcOffsetHH.toString())}:${singleDigitPadding(utcOffsetMM.toString())}`;
  const plusOrMinus = utcOffsetInMinutes > 0 ? "+" : "-";
  return {
    label: `${timezone} (GMT${plusOrMinus}${utcOffset})`,
    tzCode: timezone,
    utc: `${plusOrMinus}${utcOffset}`,
  };
});

export interface TimezoneAbbreviations {
  [key: string]: { abbreviation: string; offset: string };
}

const abbreviations: TimezoneAbbreviations = {
  "Australian Central Daylight Time": {
    abbreviation: "ACDT",
    offset: "+10:30",
  },
  "Australian Central Standard Time": {
    abbreviation: "ACST",
    offset: "+09:30",
  },
  "Acre Time": {
    abbreviation: "ACT",
    offset: "-05:00",
  },
  "Australian Central Time": {
    abbreviation: "ACT",
    offset: "+09:30", // daylight: +10:30
  },
  "Australian Central Western Standard Time": {
    abbreviation: "ACWST",
    offset: "+08:45",
  },
  "Arabia Daylight Time": {
    abbreviation: "ADT",
    offset: "+04:00",
  },
  "Atlantic Daylight Time": {
    abbreviation: "ADT",
    offset: "-03:00",
  },
  "Australian Eastern Daylight Time": {
    abbreviation: "AEDT",
    offset: "+11:00",
  },
  "Australian Eastern Standard Time": {
    abbreviation: "AEST",
    offset: "+10:00",
  },
  "Australian Eastern Time": {
    abbreviation: "AET",
    offset: "+10:00", // daylight: +11:00
  },
  "Afghanistan Time": {
    abbreviation: "AFT",
    offset: "+04:30",
  },
  "Alaska Daylight Time": {
    abbreviation: "AKDT",
    offset: "-08:00",
  },
  "Alaska Standard Time": {
    abbreviation: "AKST",
    offset: "-09:00",
  },
  "Alma-Ata Time": {
    abbreviation: "ALMT",
    offset: "+06:00",
  },
  "Amazon Summer Time": {
    abbreviation: "AMST",
    offset: "-03:00",
  },
  "Armenia Summer Time": {
    abbreviation: "AMST",
    offset: "+05:00",
  },
  "Amazon Time": {
    abbreviation: "AMT",
    offset: "-04:00",
  },
  "Armenia Time": {
    abbreviation: "AMT",
    offset: "+04:00",
  },
  "Anadyr Summer Time": {
    abbreviation: "ANAST",
    offset: "+12:00",
  },
  "Anadyr Time": {
    abbreviation: "ANAT",
    offset: "+12:00",
  },
  "Aqtobe Time": {
    abbreviation: "AQTT",
    offset: "+05:00",
  },
  "Argentina Time": {
    abbreviation: "ART",
    offset: "-03:00",
  },
  "Arabia Standard Time": {
    abbreviation: "AST",
    offset: "+03:00",
  },
  "Atlantic Standard Time": {
    abbreviation: "AST",
    offset: "-04:00",
  },
  "Atlantic Time": {
    abbreviation: "AT",
    offset: "-04:00", // daylight: -3:00
  },
  "Australian Western Daylight Time": {
    abbreviation: "AWDT",
    offset: "+09:00",
  },
  "Australian Western Standard Time": {
    abbreviation: "AWST",
    offset: "+08:00",
  },
  "Azores Summer Time": {
    abbreviation: "AZOST",
    offset: "+00:00",
  },
  "Azores Time": {
    abbreviation: "AZOT",
    offset: "-01:00",
  },
  "Azerbaijan Summer Time": {
    abbreviation: "AZST",
    offset: "+05:00",
  },
  "Azerbaijan Time": {
    abbreviation: "AZT",
    offset: "+04:00",
  },
  "Anywhere on Earth": {
    abbreviation: "AoE",
    offset: "-12:00",
  },
  "Brunei Darussalam Time": {
    abbreviation: "BNT",
    offset: "+08:00",
  },
  "Bolivia Time": {
    abbreviation: "BOT",
    offset: "-04:00",
  },
  "Brasilia Summer Time": {
    abbreviation: "BRST",
    offset: "-02:00",
  },
  "Brasilia Time": {
    abbreviation: "BRT",
    offset: "-03:00",
  },
  "Brasilia Standard Time": {
    abbreviation: "BRT",
    offset: "-03:00",
  },
  "Bangladesh Standard Time": {
    abbreviation: "BST",
    offset: "+06:00",
  },
  "Bougainville Standard Time": {
    abbreviation: "BST",
    offset: "+11:00",
  },
  "British Summer Time": {
    abbreviation: "BST",
    offset: "+01:00",
  },
  "Bhutan Time": {
    abbreviation: "BTT",
    offset: "+06:00",
  },
  "Casey Time": {
    abbreviation: "CAST",
    offset: "+08:00",
  },
  "Central Africa Time": {
    abbreviation: "CAT",
    offset: "+02:00",
  },
  "Cocos Islands Time": {
    abbreviation: "CCT",
    offset: "+06:30",
  },
  "Central Daylight Time": {
    abbreviation: "CDT",
    offset: "-05:00",
  },
  "Cuba Daylight Time": {
    abbreviation: "CDT",
    offset: "-04:00",
  },
  "Central European Summer Time": {
    abbreviation: "CEST",
    offset: "+02:00",
  },
  "Central European Time": {
    abbreviation: "CET",
    offset: "+01:00",
  },
  "Chatham Island Daylight Time": {
    abbreviation: "CHADT",
    offset: "+13:45",
  },
  "Chatham Island Standard Time": {
    abbreviation: "CHAST",
    offset: "+12:45",
  },
  "Choibalsan Summer Time": {
    abbreviation: "CHOST",
    offset: "+09:00",
  },
  "Choibalsan Time": {
    abbreviation: "CHOT",
    offset: "+08:00",
  },
  "Chuuk Time": {
    abbreviation: "CHUT",
    offset: "+10:00",
  },
  "Cayman Islands Daylight Saving Time": {
    abbreviation: "CIDST",
    offset: "-04:00",
  },
  "Cayman Islands Standard Time": {
    abbreviation: "CIST",
    offset: "-05:00",
  },
  "Cook Island Time": {
    abbreviation: "CKT",
    offset: "-10:00",
  },
  "Chile Summer Time": {
    abbreviation: "CLST",
    offset: "-3:00",
  },
  "Chile Standard Time": {
    abbreviation: "CLT",
    offset: "-4:00",
  },
  "Colombia Time": {
    abbreviation: "COT",
    offset: "-5:00",
  },
  "Central Standard Time": {
    abbreviation: "CST",
    offset: "-6:00",
  },
  "China Standard Time": {
    abbreviation: "CST",
    offset: "+08:00",
  },
  "Cuba Standard Time": {
    abbreviation: "CST",
    offset: "-05:00",
  },
  "Central Time": {
    abbreviation: "CT",
    offset: "-06:00", // daylight: -5:00
  },
  "Cape Verde Time": {
    abbreviation: "CVT",
    offset: "-01:00",
  },
  "Christmas Island Time": {
    abbreviation: "CXT",
    offset: "+07:00",
  },
  "Chamorro Standard Time": {
    abbreviation: "ChST",
    offset: "+10:00",
  },
  "Davis Time": {
    abbreviation: "DAVT",
    offset: "+07:00",
  },
  "Dumont-d'Urville Time": {
    abbreviation: "DDUT",
    offset: "+10:00",
  },
  "Easter Island Summer Time": {
    abbreviation: "EASST",
    offset: "-05:00",
  },
  "Easter Island Standard Time": {
    abbreviation: "EAST",
    offset: "-06:00",
  },
  "Eastern Africa Time": {
    abbreviation: "EAT",
    offset: "+03:00",
  },
  "Ecuador Time": {
    abbreviation: "ECT",
    offset: "-05:00",
  },
  "Eastern Daylight Time": {
    abbreviation: "EDT",
    offset: "-04:00",
  },
  "Eastern European Summer Time": {
    abbreviation: "EEST",
    offset: "+03:00",
  },
  "Eastern European Time": {
    abbreviation: "EET",
    offset: "+02:00",
  },
  "Eastern Greenland Summer Time": {
    abbreviation: "EGST",
    offset: "+00:00",
  },
  "East Greenland Time": {
    abbreviation: "EGT",
    offset: "-01:00",
  },
  "Eastern Standard Time": {
    abbreviation: "EST",
    offset: "-05:00",
  },
  "Eastern Time": {
    abbreviation: "ET",
    offset: "-05:00", // daylight: -4:00
  },
  "Further-Eastern European Time": {
    abbreviation: "FET",
    offset: "+03:00",
  },
  "Fiji Summer Time": {
    abbreviation: "FJST",
    offset: "+13:00",
  },
  "Fiji Time": {
    abbreviation: "FJT",
    offset: "+12:00",
  },
  "Falkland Islands Summer Time": {
    abbreviation: "FKST",
    offset: "-03:00",
  },
  "Falkland Island Time": {
    abbreviation: "FKT",
    offset: "-04:00",
  },
  "Fernando de Noronha Time": {
    abbreviation: "FNT",
    offset: "-02:00",
  },
  "Galapagos Time": {
    abbreviation: "GALT",
    offset: "-06:00",
  },
  "Gambier Time": {
    abbreviation: "GAMT",
    offset: "-09:00",
  },
  "Georgia Standard Time": {
    abbreviation: "GET",
    offset: "+04:00",
  },
  "French Guiana Time": {
    abbreviation: "GFT",
    offset: "-03:00",
  },
  "Gilbert Island Time": {
    abbreviation: "GILT",
    offset: "+12:00",
  },
  "Greenwich Mean Time": {
    abbreviation: "GMT",
    offset: "+00:00",
  },
  "Gulf Standard Time": {
    abbreviation: "GST",
    offset: "+04:00",
  },
  "South Georgia Time": {
    abbreviation: "GST",
    offset: "-02:00",
  },
  "Guyana Time": {
    abbreviation: "GYT",
    offset: "-04:00",
  },
  "Hawaii-Aleutian Daylight Time": {
    abbreviation: "HDT",
    offset: "-09:00",
  },
  "Hong Kong Time": {
    abbreviation: "HKT",
    offset: "+08:00",
  },
  "Hovd Summer Time": {
    abbreviation: "HOVST",
    offset: "+08:00",
  },
  "Hovd Time": {
    abbreviation: "HOVT",
    offset: "+07:00",
  },
  "Hawaii Standard Time": {
    abbreviation: "HST",
    offset: "-10:00",
  },
  "Indochina Time": {
    abbreviation: "ICT",
    offset: "+07:00",
  },
  "Israel Daylight Time": {
    abbreviation: "IDT",
    offset: "+03:00",
  },
  "Indian Chagos Time": {
    abbreviation: "IOT",
    offset: "+06:00",
  },
  "Iran Daylight Time": {
    abbreviation: "IRDT",
    offset: "+04:30",
  },
  "Irkutsk Summer Time": {
    abbreviation: "IRKST",
    offset: "+09:00",
  },
  "Irkutsk Time": {
    abbreviation: "IRKT",
    offset: "+08:00",
  },
  "Iran Standard Time": {
    abbreviation: "IRST",
    offset: "+03:30",
  },
  "India Standard Time": {
    abbreviation: "IST",
    offset: "+05:30",
  },
  "Irish Standard Time": {
    abbreviation: "IST",
    offset: "+01:00",
  },
  "Israel Standard Time": {
    abbreviation: "IST",
    offset: "+02:00",
  },
  "Japan Standard Time": {
    abbreviation: "JST",
    offset: "+09:00",
  },
  "Kyrgyzstan Time": {
    abbreviation: "KGT",
    offset: "+06:00",
  },
  "Kosrae Time": {
    abbreviation: "KOST",
    offset: "+11:00",
  },
  "Krasnoyarsk Summer Time": {
    abbreviation: "KRAST",
    offset: "+08:00",
  },
  "Krasnoyarsk Time": {
    abbreviation: "KRAT",
    offset: "+07:00",
  },
  "Korea Standard Time": {
    abbreviation: "KST",
    offset: "+09:00",
  },
  "Kuybyshev Time": {
    abbreviation: "KUYT",
    offset: "+04:00",
  },
  "Lord Howe Daylight Time": {
    abbreviation: "LHDT",
    offset: "+11:00",
  },
  "Lord Howe Standard Time": {
    abbreviation: "LHST",
    offset: "+10:30",
  },
  "Line Islands Time": {
    abbreviation: "LINT",
    offset: "+14:00",
  },
  "Magadan Summer Time": {
    abbreviation: "MAGST",
    offset: "+12:00",
  },
  "Magadan Time": {
    abbreviation: "MAGT",
    offset: "+11:00",
  },
  "Marquesas Time": {
    abbreviation: "MART",
    offset: "-09:30",
  },
  "Mawson Time": {
    abbreviation: "MAWT",
    offset: "+05:00",
  },
  "Mountain Daylight Time": {
    abbreviation: "MDT",
    offset: "-06:00",
  },
  "Marshall Islands Time": {
    abbreviation: "MHT",
    offset: "+12:00",
  },
  "Myanmar Time": {
    abbreviation: "MMT",
    offset: "+06:30",
  },
  "Moscow Daylight Time": {
    abbreviation: "MSD",
    offset: "+04:00",
  },
  "Moscow Standard Time": {
    abbreviation: "MSK",
    offset: "+03:00",
  },
  "Mountain Standard Time": {
    abbreviation: "MST",
    offset: "-07:00",
  },
  "Mountain Time": {
    abbreviation: "MT",
    offset: "-07:00", // daylight: -6:00
  },
  "Mauritius Time": {
    abbreviation: "MUT",
    offset: "+04:00",
  },
  "Maldives Time": {
    abbreviation: "MVT",
    offset: "+05:00",
  },
  "Malaysia Time": {
    abbreviation: "MYT",
    offset: "+08:00",
  },
  "New Caledonia Time": {
    abbreviation: "NCT",
    offset: "+11:00",
  },
  "Newfoundland Daylight Time": {
    abbreviation: "NDT",
    offset: "-02:30",
  },
  "Norfolk Time": {
    abbreviation: "NFT",
    offset: "+11:00",
  },
  "Novosibirsk Summer Time": {
    abbreviation: "NOVST",
    offset: "+07:00",
  },
  "Novosibirsk Time": {
    abbreviation: "NOVT",
    offset: "+06:00",
  },
  "Nepal Time": {
    abbreviation: "NPT",
    offset: "+05:45",
  },
  "Nauru Time": {
    abbreviation: "NRT",
    offset: "+12:00",
  },
  "Newfoundland Standard Time": {
    abbreviation: "NST",
    offset: "-03:30",
  },
  "Niue Time": {
    abbreviation: "NUT",
    offset: "-11:00",
  },
  "New Zealand Daylight Time": {
    abbreviation: "NZDT",
    offset: "+13:00",
  },
  "New Zealand Standard Time": {
    abbreviation: "NZST",
    offset: "+12:00",
  },
  "Omsk Summer Time": {
    abbreviation: "OMSST",
    offset: "+07:00",
  },
  "Omsk Standard Time": {
    abbreviation: "OMST",
    offset: "+06:00",
  },
  "Oral Time": {
    abbreviation: "ORAT",
    offset: "+05:00",
  },
  "Pacific Daylight Time": {
    abbreviation: "PDT",
    offset: "-07:00",
  },
  "Peru Time": {
    abbreviation: "PET",
    offset: "-05:00",
  },
  "Kamchatka Summer Time": {
    abbreviation: "PETST",
    offset: "+12:00",
  },
  "Kamchatka Time": {
    abbreviation: "PETT",
    offset: "+12:00",
  },
  "Papua New Guinea Time": {
    abbreviation: "PGT",
    offset: "+10:00",
  },
  "Phoenix Island Time": {
    abbreviation: "PHOT",
    offset: "+13:00",
  },
  "Philippine Time": {
    abbreviation: "PHT",
    offset: "+08:00",
  },
  "Pakistan Standard Time": {
    abbreviation: "PKT",
    offset: "+05:00",
  },
  "Pierre & Miquelon Daylight Time": {
    abbreviation: "PMDT",
    offset: "-02:00",
  },
  "Pierre & Miquelon Standard Time": {
    abbreviation: "PMST",
    offset: "-03:00",
  },
  "Pohnpei Standard Time": {
    abbreviation: "PONT",
    offset: "+11:00",
  },
  "Pacific Standard Time": {
    abbreviation: "PST",
    offset: "-08:00",
  },
  "Pitcairn Standard Time": {
    abbreviation: "PST",
    offset: "-08:00",
  },
  "Pacific Time": {
    abbreviation: "PT",
    offset: "-08:00", // daylight: -7:00
  },
  "Palau Time": {
    abbreviation: "PWT",
    offset: "+09:00",
  },
  "Paraguay Summer Time": {
    abbreviation: "PYST",
    offset: "-03:00",
  },
  "Paraguay Time": {
    abbreviation: "PYT",
    offset: "-04:00",
  },
  "Pyongyang Time": {
    abbreviation: "PYT",
    offset: "+08:30",
  },
  "Qyzylorda Time": {
    abbreviation: "QYZT",
    offset: "+06:00",
  },
  "Reunion Time": {
    abbreviation: "RET",
    offset: "+04:00",
  },
  "Rothera Time": {
    abbreviation: "ROTT",
    offset: "-03:00",
  },
  "Sakhalin Time": {
    abbreviation: "SAKT",
    offset: "+11:00",
  },
  "Samara Time": {
    abbreviation: "SAMT",
    offset: "+04:00",
  },
  "South Africa Standard Time": {
    abbreviation: "SAST",
    offset: "+02:00",
  },
  "Solomon Islands Time": {
    abbreviation: "SBT",
    offset: "+11:00",
  },
  "Seychelles Time": {
    abbreviation: "SCT",
    offset: "+04:00",
  },
  "Singapore Time": {
    abbreviation: "SGT",
    offset: "+08:00",
  },
  "Srednekolymsk Time": {
    abbreviation: "SRET",
    offset: "+11:00",
  },
  "Suriname Time": {
    abbreviation: "SRT",
    offset: "-03:00",
  },
  "Samoa Standard Time": {
    abbreviation: "SST",
    offset: "-11:00",
  },
  "Syowa Time": {
    abbreviation: "SYOT",
    offset: "+03:00",
  },
  "Tahiti Time": {
    abbreviation: "TAHT",
    offset: "-10:00",
  },
  "French Southern and Antarctic Time": {
    abbreviation: "TFT",
    offset: "+05:00",
  },
  "Tajikistan Time": {
    abbreviation: "TJT",
    offset: "+05:00",
  },
  "Tokelau Time": {
    abbreviation: "TKT",
    offset: "+13:00",
  },
  "East Timor Time": {
    abbreviation: "TLT",
    offset: "+09:00",
  },
  "Turkmenistan Time": {
    abbreviation: "TMT",
    offset: "+05:00",
  },
  "Tonga Summer Time": {
    abbreviation: "TOST",
    offset: "+14:00",
  },
  "Tonga Time": {
    abbreviation: "TOT",
    offset: "+13:00",
  },
  "Turkey Time": {
    abbreviation: "TRT",
    offset: "+03:00",
  },
  "Tuvalu Time": {
    abbreviation: "TVT",
    offset: "+12:00",
  },
  "Ulaanbaatar Summer Time": {
    abbreviation: "ULAST",
    offset: "+09:00",
  },
  "Ulaanbaatar Time": {
    abbreviation: "ULAT",
    offset: "+08:00",
  },
  "Coordinated Universal Time": {
    abbreviation: "UTC",
    offset: "UTC",
  },
  "Uruguay Summer Time": {
    abbreviation: "UYST",
    offset: "-02:00",
  },
  "Uruguay Time": {
    abbreviation: "UYT",
    offset: "-03:00",
  },
  "Uzbekistan Time": {
    abbreviation: "UZT",
    offset: "+05:00",
  },
  "Venezuelan Standard Time": {
    abbreviation: "VET",
    offset: "-04:00",
  },
  "Vladivostok Summer Time": {
    abbreviation: "VLAST",
    offset: "+11:00",
  },
  "Vladivostok Time": {
    abbreviation: "VLAT",
    offset: "+10:00",
  },
  "Vostok Time": {
    abbreviation: "VOST",
    offset: "+06:00",
  },
  "Vanuatu Time": {
    abbreviation: "VUT",
    offset: "+11:00",
  },
  "Wake Time": {
    abbreviation: "WAKT",
    offset: "+12:00",
  },
  "Western Argentine Summer Time": {
    abbreviation: "WARST",
    offset: "-03:00",
  },
  "West Africa Summer Time": {
    abbreviation: "WAST",
    offset: "+02:00",
  },
  "West Africa Time": {
    abbreviation: "WAT",
    offset: "+01:00",
  },
  "Western European Summer Time": {
    abbreviation: "WEST",
    offset: "+01:00",
  },
  "Western European Time": {
    abbreviation: "WET",
    offset: "+00:00",
  },
  "Wallis and Futuna Time": {
    abbreviation: "WFT",
    offset: "+12:00",
  },
  "Western Greenland Summer Time": {
    abbreviation: "WGST",
    offset: "-02:00",
  },
  "West Greenland Time": {
    abbreviation: "WGT",
    offset: "-03:00",
  },
  "Western Indonesian Time": {
    abbreviation: "WIB",
    offset: "+07:00",
  },
  "Eastern Indonesian Time": {
    abbreviation: "WIT",
    offset: "+09:00",
  },
  "Central Indonesian Time": {
    abbreviation: "WITA",
    offset: "+08:00",
  },
  "West Samoa Time": {
    abbreviation: "WST",
    offset: "+13:00",
  },
  "Western Sahara Summer Time": {
    abbreviation: "WST",
    offset: "+01:00",
  },
  "Western Sahara Standard Time": {
    abbreviation: "WT",
    offset: "+00:00",
  },
  "Yakutsk Summer Time": {
    abbreviation: "YAKST",
    offset: "+10:00",
  },
  "Yakutsk Time": {
    abbreviation: "YAKT",
    offset: "+09:00",
  },
  "Yap Time": {
    abbreviation: "YAPT",
    offset: "+10:00",
  },
  "Yekaterinburg Summer Time": {
    abbreviation: "YEKST",
    offset: "+06:00",
  },
  "Yekaterinburg Time": {
    abbreviation: "YEKT",
    offset: "+05:00",
  },
};

export { supportedTimezones, abbreviations };
