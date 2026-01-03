import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  short_description: z.string().trim().min(10, "Description must be at least 10 characters").max(140, "Description must be less than 140 characters"),
  long_description: z.string().trim().min(50, "Long description must be at least 50 characters").max(2000, "Long description must be less than 2000 characters"),
  category: z.string().min(1, "Please select a category"),
  pricing_type: z.string().trim().min(1, "Please enter pricing information").max(50, "Pricing must be less than 50 characters"),
  website_url: z.string().url("Please enter a valid URL"),
  image_url: z.string().url("Please enter a valid image URL"),
  submitter_email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
  { value: "crm", label: "CRM" },
  { value: "lead-generation", label: "Lead Generation" },
  { value: "virtual-staging", label: "Virtual Staging" },
  { value: "marketing-automation", label: "Marketing Automation" },
  { value: "analytics", label: "Analytics" },
];

const SubmitTool = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      short_description: "",
      long_description: "",
      category: "",
      pricing_type: "",
      website_url: "",
      image_url: "",
      submitter_email: "",
    },
  });

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const slug = generateSlug(data.name) + "-" + Date.now().toString(36);

      const { error } = await supabase.from("real_estate_tools").insert({
        name: data.name,
        short_description: data.short_description,
        long_description: data.long_description,
        category: data.category,
        pricing_type: data.pricing_type,
        website_url: data.website_url,
        image_url: data.image_url,
        submitter_email: data.submitter_email,
        slug: slug,
        status: "pending",
        is_verified: false,
      });

      if (error) throw error;

      toast({
        title: "Tool Submitted Successfully!",
        description: "Your tool submission is pending review. We'll notify you once it's approved.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting tool:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your tool. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Helmet>
        <title>Submit a Tool | The Real Estate Directory</title>
        <meta
          name="description"
          content="Submit your real estate software or tool to be featured in The Real Estate Directory. Get discovered by thousands of real estate professionals."
        />
      </Helmet>

      <main className="container py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Submit Your Tool
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Get your real estate software discovered by thousands of agents, brokers, and investors.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
                <h2 className="text-lg font-semibold text-foreground">Tool Information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Provide details about your tool to help users understand what it does.
                </p>

                <div className="mt-6 space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., LeadFlow AI" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="short_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A brief tagline for your tool (max 140 characters)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value.length}/140 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="long_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your tool's features, benefits, and what makes it unique..."
                            className="min-h-32 resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value.length}/2000 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pricing_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pricing</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Freemium, $49/mo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="website_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourtool.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Screenshot/Logo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourtool.com/screenshot.png" {...field} />
                        </FormControl>
                        <FormDescription>
                          Use a 16:9 aspect ratio image for best results
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 shadow-subtle md:p-8">
                <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll use this to notify you about your submission status.
                </p>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="submitter_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Tool for Review"}
              </Button>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitTool;