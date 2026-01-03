import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import ToolsGrid from "@/components/ToolsGrid";
import Footer from "@/components/Footer";

// Mock data for initial display - will be replaced with Supabase data
const mockTools = [
  {
    id: "1",
    name: "RealtyPro CRM",
    short_description: "All-in-one CRM designed specifically for real estate agents with lead tracking, automated follow-ups, and transaction management.",
    category: "crm",
    pricing_type: "$49/mo",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    website_url: "https://example.com",
    is_verified: true,
  },
  {
    id: "2",
    name: "LeadFlow AI",
    short_description: "AI-powered lead generation platform that identifies and qualifies potential buyers and sellers in your target market.",
    category: "lead-generation",
    pricing_type: "Freemium",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    website_url: "https://example.com",
    is_verified: true,
  },
  {
    id: "3",
    name: "StageVirtual",
    short_description: "Transform empty rooms into beautifully staged spaces with AI-powered virtual staging in minutes.",
    category: "virtual-staging",
    pricing_type: "$29/mo",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=450&fit=crop",
    website_url: "https://example.com",
    is_verified: true,
  },
  {
    id: "4",
    name: "MarketPulse",
    short_description: "Comprehensive marketing automation suite with email campaigns, social media scheduling, and performance analytics.",
    category: "marketing-automation",
    pricing_type: "$79/mo",
    image_url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop",
    website_url: "https://example.com",
    is_verified: true,
  },
  {
    id: "5",
    name: "PropertyMetrics",
    short_description: "Deep analytics platform providing market trends, price predictions, and investment opportunity scoring.",
    category: "analytics",
    pricing_type: "Free Trial",
    image_url: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=450&fit=crop",
    website_url: "https://example.com",
    is_verified: true,
  },
  {
    id: "6",
    name: "AgentHub Pro",
    short_description: "Complete CRM solution with integrated MLS feeds, client portals, and mobile-first design for agents on the go.",
    category: "crm",
    pricing_type: "$39/mo",
    image_url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop",
    website_url: "https://example.com",
    is_verified: false,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredTools = useMemo(() => {
    let filtered = [...mockTools];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.short_description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((tool) =>
        selectedCategories.includes(tool.category)
      );
    }

    // Apply pricing filter
    if (selectedPricing !== "all") {
      filtered = filtered.filter((tool) => {
        const pricing = tool.pricing_type.toLowerCase();
        switch (selectedPricing) {
          case "free-trial":
            return pricing.includes("free trial");
          case "freemium":
            return pricing.includes("freemium");
          case "paid":
            return pricing.includes("$") && !pricing.includes("free");
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered = filtered.reverse();
        break;
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedPricing, sortBy]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main id="tools" className="flex-1 py-12">
        <div className="container">
          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedPricing={selectedPricing}
              onPricingChange={setSelectedPricing}
            />
            <ToolsGrid
              tools={filteredTools}
              isLoading={false}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
