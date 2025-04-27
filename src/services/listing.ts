import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../config/api";
import { authService } from "./auth";

// Types
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  property_type: "room" | "apartment" | "house";
  province: number;
  district: number;
  ward: number;
  street: number;
  specific_address: string;
  uploaded_images: string[];
  status: "pending" | "approved" | "rejected";
  landlord: string;
  posting_date: string;
}

export interface CreateListingData {
  title: string;
  description: string;
  price: number;
  area: number;
  property_type: "room" | "apartment" | "house";
  province: number;
  district: number;
  ward: number;
  street: number;
  specific_address: string;
  uploaded_images: string[];
}

// Listing Service
class ListingService {
  private static instance: ListingService;

  private constructor() {}

  public static getInstance(): ListingService {
    if (!ListingService.instance) {
      ListingService.instance = new ListingService();
    }
    return ListingService.instance;
  }

  // Create a new listing
  public async createListing(data: CreateListingData): Promise<Listing> {
    try {
      const response = await axios.post<Listing>(API_ENDPOINTS.LISTINGS, data, {
        headers: authService.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get a listing by ID
  public async getListing(id: string): Promise<Listing> {
    try {
      const response = await axios.get<Listing>(
        API_ENDPOINTS.LISTING_DETAIL(id),
        {
          headers: authService.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update a listing
  public async updateListing(
    id: string,
    data: Partial<CreateListingData>,
  ): Promise<Listing> {
    try {
      const response = await axios.patch<Listing>(
        API_ENDPOINTS.LISTING_DETAIL(id),
        data,
        {
          headers: authService.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete a listing
  public async deleteListing(id: string): Promise<void> {
    try {
      await axios.delete(API_ENDPOINTS.LISTING_DETAIL(id), {
        headers: authService.getAuthHeaders(),
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Approve a listing
  public async approveListing(id: string): Promise<Listing> {
    try {
      const response = await axios.post<Listing>(
        API_ENDPOINTS.LISTING_APPROVE(id),
        {},
        {
          headers: authService.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reject a listing
  public async rejectListing(id: string): Promise<Listing> {
    try {
      const response = await axios.post<Listing>(
        API_ENDPOINTS.LISTING_REJECT(id),
        {},
        {
          headers: authService.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get similar listings
  public async getSimilarListings(id: string): Promise<Listing[]> {
    try {
      const response = await axios.get<Listing[]>(
        API_ENDPOINTS.LISTING_SIMILAR(id),
        {
          headers: authService.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ detail: string }>;
      const message = axiosError.response?.data?.detail || axiosError.message;
      return new Error(message);
    }
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
}

export const listingService = ListingService.getInstance();
