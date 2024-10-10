// @/types/recipe.ts

// Define the recipe type (TRecipe)
export type TRecipe = {
    _id: string;
    title: string;
    description: string;
    images: string[];
    cookingTime: number; // Cooking time in minutes
    averageRating: number; // Average rating
    createdAt: string; // Date when the recipe was created
    premium: "yes" | "no"; // Premium status
  };
  
  // Define sorting options
  export type SortOption =
    | ""
    | "title-asc"
    | "title-desc"
    | "time-asc"
    | "time-desc"
    | "rating-asc"
    | "rating-desc"
    | "newest"
    | "oldest"
    | "premium";
  