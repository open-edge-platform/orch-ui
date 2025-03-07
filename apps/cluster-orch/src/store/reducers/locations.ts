/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// TODO: removed cm.Location
// is there any type in eim that we can use?
type Location = {
  locationInfo?: string;
  locationType?:
    | "LOCATION_TYPE_SITE_ID"
    | "LOCATION_TYPE_SITE_NAME"
    | "LOCATION_TYPE_REGION_ID"
    | "LOCATION_TYPE_REGION_NAME";
};

const initialState: Location[] = [
  {
    locationType: "LOCATION_TYPE_REGION_NAME",
    locationInfo: "",
  },
  {
    locationType: "LOCATION_TYPE_REGION_ID",
    locationInfo: "",
  },
  {
    locationType: "LOCATION_TYPE_SITE_ID",
    locationInfo: "",
  },
  {
    locationType: "LOCATION_TYPE_SITE_NAME",
    locationInfo: "",
  },
];
export const locations = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations(state: Location[], action: PayloadAction<Location[]>) {
      state = action.payload;
      return state;
    },

    setInitialLocations(state: Location[], action: PayloadAction<Location[]>) {
      state = action.payload;
      return state;
    },

    clearLocations(state: Location[]) {
      state = initialState;
      return state;
    },

    updateSiteName(state: Location[], action: PayloadAction<string>) {
      state.forEach((location) => {
        if (location.locationType === "LOCATION_TYPE_SITE_NAME") {
          location.locationInfo = action.payload;
        }
      });
    },
    updateSiteId(state: Location[], action: PayloadAction<string>) {
      state.forEach((location) => {
        if (location.locationType === "LOCATION_TYPE_SITE_ID") {
          location.locationInfo = action.payload;
        }
      });
    },
    updateRegionName(state: Location[], action: PayloadAction<string>) {
      state.forEach((location) => {
        if (location.locationType === "LOCATION_TYPE_REGION_NAME") {
          location.locationInfo = action.payload;
        }
      });
    },
    updateRegionId(state: Location[], action: PayloadAction<string>) {
      state.forEach((location) => {
        if (location.locationType === "LOCATION_TYPE_REGION_ID") {
          location.locationInfo = action.payload;
        }
      });
    },
  },
});

// TODO: is this needed anymore?
export const getLocations = (state: RootState) => state.locations;
export const getInitialLabels = () => initialState;

export const getSiteId = (state: RootState) => {
  let siteId = "";
  state.locations.forEach((location) => {
    if (location.locationType == "LOCATION_TYPE_SITE_ID") {
      siteId = location.locationInfo ?? "";
    }
  });
  return siteId;
};
export const getSiteName = (state: RootState) => {
  let siteName = "";
  state.locations.forEach((location) => {
    if (location.locationType == "LOCATION_TYPE_SITE_NAME") {
      siteName = location.locationInfo ?? "";
    }
  });
  return siteName;
};
export const getRegionId = (state: RootState) => {
  let regionId = "";
  state.locations.forEach((location) => {
    if (location.locationType == "LOCATION_TYPE_REGION_ID") {
      regionId = location.locationInfo ?? "";
    }
  });
  return regionId;
};
export const getRegionName = (state: RootState) => {
  let regionName = "";

  state.locations.forEach((location) => {
    if (location.locationType == "LOCATION_TYPE_REGION_NAME") {
      regionName = location.locationInfo ?? "";
    }
  });
  return regionName;
};

export const {
  clearLocations,
  setLocations,
  setInitialLocations,
  updateRegionId,
  updateRegionName,
  updateSiteId,
  updateSiteName,
} = locations.actions;

export default locations.reducer;
