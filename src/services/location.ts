import axios from "axios";
import { API_ENDPOINTS, API_PARAMS } from "../config/api";

// Types
export interface Province {
  id: string;
  name: string;
  code: string;
}

export interface District {
  id: string;
  name: string;
  code: string;
  province_id: string;
}

export interface Ward {
  id: string;
  name: string;
  code: string;
  district_id: string;
}

export interface Street {
  id: string;
  name: string;
  code: string;
  ward_id: string;
}

// Location Service
class LocationService {
  private static instance: LocationService;

  private constructor() {}

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  // Get all provinces
  public async getProvinces(): Promise<Province[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.PROVINCES);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  // Get districts by province
  public async getDistrictsByProvince(provinceId: string): Promise<District[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.DISTRICTS, {
        params: {
          [API_PARAMS.PROVINCE]: provinceId,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  // Get wards by district
  public async getWardsByDistrict(districtId: string): Promise<Ward[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.WARDS, {
        params: {
          [API_PARAMS.DISTRICT]: districtId,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  // Get streets by ward
  public async getStreetsByWard(wardId: string): Promise<Street[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.STREETS, {
        params: {
          [API_PARAMS.WARD]: wardId,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  // Error handler
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      console.error(
        "Location service error:",
        error.response?.data || error.message,
      );
    } else {
      console.error("Location service error:", error);
    }
  }
}

export const locationService = LocationService.getInstance();
