import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, BadgeCheck, ExternalLink, Tag, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categoryLabels: Record<string, string> = {
  crm: "CRM",
  "lead-generation": "Lead Generation",
  "virtual-staging": "Virtual Staging",
  "marketing-automation": "Marketing Automation",
  analytics: "Analytics",
};

const ToolDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: tool, isLoading, error } = useQuery({
    queryKey: ["tool", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("real_estate_tools")
        .select("*")
        .eq("slug", slug)
        .eq("status", "approved")
        .maybeSingle();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("Tool not found");
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 rounded bg-secondary" />
            <div className="aspect-video w-full max-w-3xl rounded-lg bg-secondary" />
            <div className="h-6 w-3/4 rounded bg-secondary" />
            <div className="h-32 w-full max-w-3xl rounded bg-secondary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Helmet>
          <title>Tool Not Found | The Real Estate Directory</title>
        </Helmet>
        <main className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Tool Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The tool you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="mt-6" variant="gold">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Directory
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Helmet>
        <title>{tool.name} | The Real Estate Directory</title>
        <meta name="description" content={tool.short_description} />
        <meta property="og:title" content={`${tool.name} | The Real Estate Directory`} />
        <meta property="og:description" content={tool.short_description} />
        <meta property="og:image" content={tool.image_url} />
        <link rel="canonical" href={`${window.location.origin}/tool/${tool.slug}`} />
      </Helmet>

      <main className="container py-8 md:py-12">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        <article className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-subtle">
              <div className="aspect-video w-full overflow-hidden bg-secondary">
                <img
                  src={tool.image_url}
                  alt={`${tool.name} screenshot`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {tool.name}
                  </h1>
                  {tool.is_verified && (
                    <BadgeCheck className="h-6 w-6 text-gold" aria-label="Verified tool" />
                  )}
                </div>

                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {tool.short_description}
                </p>

                {tool.long_description && (
                  <div className="mt-6 border-t border-border pt-6">
                    <h2 className="text-lg font-semibold text-foreground">About This Tool</h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {tool.long_description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-subtle">
              <h2 className="text-lg font-semibold text-foreground">Details</h2>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Tag className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Category</p>
                    <Badge variant="secondary" className="mt-1">
                      {categoryLabels[tool.category] || tool.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Pricing</p>
                    <Badge variant="outline" className="mt-1 border-border">
                      {tool.pricing_type}
                    </Badge>
                  </div>
                </div>
              </div>

              <Button
                variant="gold"
                size="lg"
                className="mt-6 w-full"
                asChild
              >
                <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ToolDetails;