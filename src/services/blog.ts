import axios from "axios";
import { API_ENDPOINTS, API_PARAMS } from "../config/api";
import { authService } from "./auth";

// Types
export interface BlogCategory {
  id: string;
  name: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image: string;
  category: string;
  author: string;
  posting_date: string;
  updated_at: string;
}

export interface BlogComment {
  id: string;
  post: string;
  author: string;
  content: string;
  created_at: string;
}

// Blog Service
class BlogService {
  private static instance: BlogService;

  private constructor() {}

  public static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService();
    }
    return BlogService.instance;
  }

  // Get all blog categories
  public async getCategories(): Promise<BlogCategory[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.BLOG_CATEGORIES);
      return response.data.results || [];
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  // Get category by ID
  public async getCategoryById(id: string): Promise<BlogCategory | null> {
    try {
      const response = await axios.get(API_ENDPOINTS.BLOG_CATEGORY_DETAIL(id));
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  // Get all blog posts with pagination and filters
  public async getPosts(
    page: number = 1,
    pageSize: number = 6,
    category?: string,
    author?: string,
    search?: string,
    ordering?: string,
  ): Promise<{ posts: BlogPost[]; total: number }> {
    try {
      const params: Record<string, string | number> = {
        [API_PARAMS.PAGE]: page,
        [API_PARAMS.PAGE_SIZE]: pageSize,
      };

      if (category) params[API_PARAMS.CATEGORY] = category;
      if (author) params[API_PARAMS.AUTHOR] = author;
      if (search) params[API_PARAMS.SEARCH] = search;
      if (ordering) params[API_PARAMS.ORDERING] = ordering;

      const response = await axios.get(API_ENDPOINTS.BLOG_POSTS, { params });
      return {
        posts: response.data.results || [],
        total: response.data.count || 0,
      };
    } catch (error) {
      this.handleError(error);
      return { posts: [], total: 0 };
    }
  }

  // Get post by ID
  public async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const response = await axios.get(API_ENDPOINTS.BLOG_POST_DETAIL(id));
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  // Create a new post
  public async createPost(
    postData: Partial<BlogPost>,
  ): Promise<BlogPost | null> {
    try {
      const response = await axios.post(API_ENDPOINTS.BLOG_POSTS, postData, {
        headers: authService.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  // Update a post
  public async updatePost(
    id: string,
    postData: Partial<BlogPost>,
  ): Promise<BlogPost | null> {
    try {
      const response = await axios.put(
        API_ENDPOINTS.BLOG_POST_DETAIL(id),
        postData,
        { headers: authService.getAuthHeaders() },
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  // Delete a post
  public async deletePost(id: string): Promise<boolean> {
    try {
      await axios.delete(API_ENDPOINTS.BLOG_POST_DETAIL(id), {
        headers: authService.getAuthHeaders(),
      });
      return true;
    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  // Get comments for a post
  public async getPostComments(id: string): Promise<BlogComment[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.BLOG_POST_COMMENTS(id));
      return response.data.results || [];
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  // Add a comment to a post
  public async addComment(
    postId: string,
    content: string,
  ): Promise<BlogComment | null> {
    try {
      const response = await axios.post(
        API_ENDPOINTS.BLOG_POST_COMMENTS(postId),
        { content },
        { headers: authService.getAuthHeaders() },
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  // Error handler
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      console.error(
        "Blog service error:",
        error.response?.data || error.message,
      );
    } else {
      console.error("Blog service error:", error);
    }
  }
}

export const blogService = BlogService.getInstance();
