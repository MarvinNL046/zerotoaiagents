"use server";

import { revalidatePath } from "next/cache";

// Types
interface UserReview {
  id: string;
  agentSlug: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  content: string;
  usageType: string | null;
  usagePeriod: string | null;
  userPros: string[];
  userCons: string[];
  approved: boolean;
  featured: boolean;
  helpfulCount: number;
  unhelpfulCount: number;
  createdAt: Date;
}

// ==================== USER REVIEWS ====================

// Get approved reviews for an AI agent
// TODO: fetch from Convex once wired in
export async function getApprovedReviews(agentSlug: string, page = 1, limit = 10): Promise<{
  reviews: UserReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  void agentSlug;
  return {
    reviews: [],
    pagination: { page, limit, total: 0, totalPages: 0 },
  };
}

// Submit a new user review
// TODO: persist to Convex once wired in
export async function submitReview(formData: FormData): Promise<{ success: boolean; reviewId?: string; error?: string }> {
  const agentSlug = formData.get("agentSlug") as string;
  const authorName = formData.get("authorName") as string;
  const authorEmail = formData.get("authorEmail") as string;
  const rating = Number(formData.get("rating"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!agentSlug || !authorName || !authorEmail || !rating || !title || !content) {
    return { success: false, error: "Missing required fields" };
  }

  if (rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(authorEmail)) {
    return { success: false, error: "Invalid email address" };
  }

  console.log("Review submission received (not yet persisted):", {
    agentSlug,
    rating,
    authorName,
  });

  revalidatePath(`/reviews/${agentSlug}`);
  return { success: true };
}

// Vote on a review (helpful/unhelpful)
// TODO: persist to Convex once wired in
export async function voteOnReview(reviewId: string, isHelpful: boolean): Promise<{ success: boolean; error?: string }> {
  void reviewId;
  void isHelpful;
  return { success: true };
}

// ==================== SUBSCRIBERS ====================

// Subscribe to newsletter
// TODO: persist to Convex once wired in
export async function subscribeToNewsletter(formData: FormData): Promise<{ success: boolean; message?: string; error?: string }> {
  const email = formData.get("email") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  console.log("Newsletter subscription received (not yet persisted):", { email });
  return { success: true, message: "Successfully subscribed!" };
}

// ==================== CLICK TRACKING ====================

// Track affiliate click
// TODO: persist to Convex once wired in
export async function trackClick(
  agentSlug: string,
  page: string,
  country?: string,
  referrer?: string
): Promise<{ success: boolean }> {
  void agentSlug;
  void page;
  void country;
  void referrer;
  return { success: true };
}

// ==================== ADMIN ACTIONS ====================

// Get all reviews for admin (including unapproved)
// TODO: fetch from Convex once wired in
export async function getAdminReviews(
  filters: {
    approved?: boolean;
    agentSlug?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<{
  reviews: UserReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const { page = 1, limit = 20 } = filters;
  return {
    reviews: [],
    pagination: { page, limit, total: 0, totalPages: 0 },
  };
}

// Approve or reject a review
// TODO: persist to Convex once wired in
export async function moderateReview(reviewId: string, approved: boolean): Promise<{ success: boolean; error?: string }> {
  void reviewId;
  void approved;
  revalidatePath("/admin/reviews");
  return { success: true };
}

// Delete a review
// TODO: persist to Convex once wired in
export async function deleteReview(reviewId: string): Promise<{ success: boolean; error?: string }> {
  void reviewId;
  revalidatePath("/admin/reviews");
  return { success: true };
}

// Toggle featured status
// TODO: persist to Convex once wired in
export async function toggleFeatured(reviewId: string, featured: boolean): Promise<{ success: boolean; error?: string }> {
  void reviewId;
  void featured;
  revalidatePath("/admin/reviews");
  return { success: true };
}

// Get dashboard stats
// TODO: fetch from Convex once wired in
export async function getDashboardStats(): Promise<{
  reviews: { total: number; pending: number; thisWeek: number };
  subscribers: { total: number; thisWeek: number };
  clicks: { total: number; thisWeek: number };
}> {
  return {
    reviews: { total: 0, pending: 0, thisWeek: 0 },
    subscribers: { total: 0, thisWeek: 0 },
    clicks: { total: 0, thisWeek: 0 },
  };
}
