import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const categories = [
  { id: "crm", label: "CRM" },
  { id: "lead-generation", label: "Lead Generation" },
  { id: "virtual-staging", label: "Virtual Staging" },
  { id: "marketing-automation", label: "Marketing Automation" },
  { id: "analytics", label: "Analytics" },
];

const pricingOptions = [
  { id: "all", label: "All" },
  { id: "free-trial", label: "Free Trial Available" },
  { id: "freemium", label: "Freemium" },
  { id: "paid", label: "Paid Only" },
];

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedPricing: string;
  onPricingChange: (pricing: string) => void;
}

const FilterSidebar = ({
  selectedCategories,
  onCategoryChange,
  selectedPricing,
  onPricingChange,
}: FilterSidebarProps) => {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <aside className="w-full lg:w-64 lg:shrink-0">
      <div className="sticky top-24 rounded-lg border border-border bg-card p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Filters
        </h2>

        <Accordion type="multiple" defaultValue={["category", "pricing"]} className="w-full">
          <AccordionItem value="category" className="border-border">
            <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pb-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                      className="border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                    />
                    <Label
                      htmlFor={category.id}
                      className="text-sm font-normal text-foreground cursor-pointer"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pricing" className="border-border">
            <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
              Pricing
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={selectedPricing}
                onValueChange={onPricingChange}
                className="space-y-3 pb-2"
              >
                {pricingOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <RadioGroupItem
                      value={option.id}
                      id={`pricing-${option.id}`}
                      className="border-border text-gold"
                    />
                    <Label
                      htmlFor={`pricing-${option.id}`}
                      className="text-sm font-normal text-foreground cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {(selectedCategories.length > 0 || selectedPricing !== "all") && (
          <button
            onClick={() => {
              onCategoryChange([]);
              onPricingChange("all");
            }}
            className="mt-4 w-full text-sm text-gold hover:text-gold-hover transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
