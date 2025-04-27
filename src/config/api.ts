// API Configuration
export const API_URL = "http://localhost:8000";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  TOKEN: `${API_URL}/api/token/`,
  TOKEN_REFRESH: `${API_URL}/api/token/refresh/`,
  LOGIN: `${API_URL}/api/user/users/login/`,
  REGISTER: `${API_URL}/api/user/users/register/`,

  // User Management
  USERS: `${API_URL}/api/user/users/`,
  USER_DETAIL: (id: string) => `${API_URL}/api/user/users/${id}/`,
  USER_KYC_VERIFY: (id: string) =>
    `${API_URL}/api/user/users/${id}/verify_kyc/`,
  USER_KYC_REJECT: (id: string) =>
    `${API_URL}/api/user/users/${id}/reject_kyc/`,

  // Landlord Management
  LANDLORDS: `${API_URL}/api/user/landlords/`,
  LANDLORD_DETAIL: (id: string) => `${API_URL}/api/user/landlords/${id}/`,
  LANDLORD_LISTINGS: (id: string) =>
    `${API_URL}/api/user/landlords/${id}/listings/`,
  LANDLORD_TRANSACTIONS: (id: string) =>
    `${API_URL}/api/user/landlords/${id}/transactions/`,

  // Tenant Management
  TENANTS: `${API_URL}/api/user/tenants/`,
  TENANT_DETAIL: (id: string) => `${API_URL}/api/user/tenants/${id}/`,
  TENANT_TRANSACTIONS: (id: string) =>
    `${API_URL}/api/user/tenants/${id}/transactions/`,
  TENANT_REVIEWS: (id: string) => `${API_URL}/api/user/tenants/${id}/reviews/`,

  // Location Management
  PROVINCES: `${API_URL}/api/location/provinces/`,
  PROVINCE_DETAIL: (id: string) => `${API_URL}/api/location/provinces/${id}/`,

  CITIES: `${API_URL}/api/location/cities/`,
  CITY_DETAIL: (id: string) => `${API_URL}/api/location/cities/${id}/`,

  DISTRICTS: `${API_URL}/api/location/districts/`,
  DISTRICT_DETAIL: (id: string) => `${API_URL}/api/location/districts/${id}/`,

  WARDS: `${API_URL}/api/location/wards/`,
  WARD_DETAIL: (id: string) => `${API_URL}/api/location/wards/${id}/`,

  STREETS: `${API_URL}/api/location/streets/`,
  STREET_DETAIL: (id: string) => `${API_URL}/api/location/streets/${id}/`,

  // Listing Management
  LISTINGS: `${API_URL}/api/listing/listings/`,
  LISTING_DETAIL: (id: string) => `${API_URL}/api/listing/listings/${id}/`,
  LISTING_APPROVE: (id: string) =>
    `${API_URL}/api/listing/listings/${id}/approve/`,
  LISTING_REJECT: (id: string) =>
    `${API_URL}/api/listing/listings/${id}/reject/`,
  LISTING_SIMILAR: (id: string) =>
    `${API_URL}/api/listing/listings/${id}/similar/`,

  // Listing Images
  LISTING_IMAGES: `${API_URL}/api/listing/images/`,
  LISTING_IMAGE_DETAIL: (id: string) => `${API_URL}/api/listing/images/${id}/`,

  // Reviews
  REVIEWS: `${API_URL}/api/listing/reviews/`,
  REVIEW_DETAIL: (id: string) => `${API_URL}/api/listing/reviews/${id}/`,

  // Blog Categories
  BLOG_CATEGORIES: `${API_URL}/api/blog/categories/`,
  BLOG_CATEGORY_DETAIL: (id: string) => `${API_URL}/api/blog/categories/${id}/`,

  // Blog Posts
  BLOG_POSTS: `${API_URL}/api/blog/posts/`,
  BLOG_POST_DETAIL: (id: string) => `${API_URL}/api/blog/posts/${id}/`,
  BLOG_POST_COMMENTS: (id: string) =>
    `${API_URL}/api/blog/posts/${id}/comments/`,
};

// API Query Parameters
export const API_PARAMS = {
  // Common params
  SEARCH: "search",
  PAGE: "page",
  PAGE_SIZE: "page_size",

  // Location params
  PROVINCE: "province",
  CITY: "city",
  DISTRICT: "district",
  WARD: "ward",

  // Listing params
  PROPERTY_TYPE: "property_type",
  STATUS: "status",
  MIN_PRICE: "min_price",
  MAX_PRICE: "max_price",
  MIN_AREA: "min_area",
  MAX_AREA: "max_area",
  LANDLORD: "landlord",
  ORDERING: "ordering",

  // Review params
  LISTING: "listing",
  TENANT: "tenant",
  MIN_RATING: "min_rating",

  // Blog params
  CATEGORY: "category",
  AUTHOR: "author",
};

// API Property Types
export const PROPERTY_TYPES = {
  ROOM: "room",
  APARTMENT: "apartment",
  HOUSE: "house",
} as const;

// API Status Types
export const LISTING_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

// API Ordering Options
export const ORDERING_OPTIONS = {
  PRICE_ASC: "price",
  PRICE_DESC: "-price",
  AREA_ASC: "area",
  AREA_DESC: "-area",
  POSTING_DATE_ASC: "posting_date",
  POSTING_DATE_DESC: "-posting_date",
  REVIEW_DATE_ASC: "review_date",
  REVIEW_DATE_DESC: "-review_date",
  RATING_ASC: "rating",
  RATING_DESC: "-rating",
} as const;
