import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterSidebar from "@/components/FilterSidebar";
import ToolsGrid from "@/components/ToolsGrid";
import Footer from "@/components/Footer";
import { useTools } from "@/hooks/useTools";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  const { data: tools = [], isLoading } = useTools({
    searchQuery,
    categories: selectedCategories,
    pricing: selectedPricing,
    sortBy,
  });

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
              tools={tools}
              isLoading={isLoading}
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
