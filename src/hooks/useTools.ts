import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type RealEstateTool = Tables<"real_estate_tools">;

interface UseToolsParams {
  searchQuery: string;
  categories: string[];
  pricing: string;
  sortBy: string;
}

export const useTools = ({ searchQuery, categories, pricing, sortBy }: UseToolsParams) => {
  return useQuery({
    queryKey: ["tools", searchQuery, categories, pricing, sortBy],
    queryFn: async (): Promise<RealEstateTool[]> => {
      let query = supabase.from("real_estate_tools").select("*").eq("status", "approved");

      // Apply category filter
      if (categories.length > 0) {
        query = query.in("category", categories);
      }

      // Apply pricing filter
      if (pricing !== "all") {
        switch (pricing) {
          case "free-trial":
            query = query.ilike("pricing_type", "%Free Trial%");
            break;
          case "freemium":
            query = query.ilike("pricing_type", "%Freemium%");
            break;
          case "paid":
            query = query.like("pricing_type", "$%");
            break;
        }
      }

      // Apply sorting
      switch (sortBy) {
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;
        case "name":
          query = query.order("name", { ascending: true });
          break;
        default:
          query = query.order("is_verified", { ascending: false }).order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Apply client-side search filter (for name and description)
      let filteredData = data || [];
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredData = filteredData.filter(
          (tool) =>
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.short_description.toLowerCase().includes(lowerQuery) ||
            tool.category.toLowerCase().includes(lowerQuery)
        );
      }

      return filteredData;
    },
  });
};
