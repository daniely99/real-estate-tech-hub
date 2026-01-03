-- Create real_estate_tools table for the directory
CREATE TABLE public.real_estate_tools (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    short_description TEXT NOT NULL CHECK (char_length(short_description) <= 200),
    category TEXT NOT NULL CHECK (category IN ('crm', 'lead-generation', 'virtual-staging', 'marketing-automation', 'analytics')),
    pricing_type TEXT NOT NULL,
    website_url TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.real_estate_tools ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (directory is publicly viewable)
CREATE POLICY "Anyone can view tools" 
ON public.real_estate_tools 
FOR SELECT 
USING (true);

-- Insert sample data
INSERT INTO public.real_estate_tools (name, short_description, category, pricing_type, website_url, image_url, is_verified) VALUES
('RealtyPro CRM', 'All-in-one CRM designed specifically for real estate agents with lead tracking, automated follow-ups, and transaction management.', 'crm', '$49/mo', 'https://example.com', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop', true),
('LeadFlow AI', 'AI-powered lead generation platform that identifies and qualifies potential buyers and sellers in your target market.', 'lead-generation', 'Freemium', 'https://example.com', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop', true),
('StageVirtual', 'Transform empty rooms into beautifully staged spaces with AI-powered virtual staging in minutes.', 'virtual-staging', '$29/mo', 'https://example.com', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=450&fit=crop', true),
('MarketPulse', 'Comprehensive marketing automation suite with email campaigns, social media scheduling, and performance analytics.', 'marketing-automation', '$79/mo', 'https://example.com', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop', true),
('PropertyMetrics', 'Deep analytics platform providing market trends, price predictions, and investment opportunity scoring.', 'analytics', 'Free Trial', 'https://example.com', 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=450&fit=crop', true),
('AgentHub Pro', 'Complete CRM solution with integrated MLS feeds, client portals, and mobile-first design for agents on the go.', 'crm', '$39/mo', 'https://example.com', 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop', false),
('ProspectEngine', 'Intelligent lead scoring and nurturing system that converts cold leads into qualified prospects.', 'lead-generation', '$59/mo', 'https://example.com', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop', true),
('VirtualSpace', 'Create stunning 3D virtual tours and virtual staging for any property with our easy-to-use platform.', 'virtual-staging', 'Free Trial', 'https://example.com', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop', true),
('BrandBuilder', 'Automated marketing platform with templated campaigns, listing syndication, and social media management.', 'marketing-automation', 'Freemium', 'https://example.com', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop', true);