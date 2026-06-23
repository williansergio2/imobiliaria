-- ============================================================
-- ImóvelPrime - Supabase Schema
-- Run this SQL in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Table: user_profiles ─────────────────────────────────────────────────────
-- Extends Supabase Auth users with additional profile data
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  role        TEXT NOT NULL DEFAULT 'corretor' CHECK (role IN ('admin', 'corretor')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Table: properties ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.properties (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT UNIQUE NOT NULL, -- IMV-1001
  title           TEXT NOT NULL,
  description     TEXT,
  listing_type    TEXT NOT NULL CHECK (listing_type IN ('venda', 'aluguel')),
  price           NUMERIC(15, 2) NOT NULL DEFAULT 0,
  city            TEXT NOT NULL,
  neighborhood    TEXT NOT NULL,
  address         TEXT,
  zip_code        TEXT,
  bedrooms        INTEGER DEFAULT 0,
  bathrooms       INTEGER DEFAULT 0,
  parking_spots   INTEGER DEFAULT 0,
  built_area      NUMERIC(10, 2),
  land_area       NUMERIC(10, 2),
  property_type   TEXT NOT NULL DEFAULT 'casa' CHECK (property_type IN ('casa', 'apartamento', 'terreno', 'comercial', 'rural', 'outro')),
  status          TEXT NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'reservado', 'em_negociacao', 'alugado', 'vendido', 'encerrado')),
  featured        BOOLEAN DEFAULT FALSE,
  main_image_url  TEXT,
  agent_id        UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  agent_name      TEXT,
  slug            TEXT UNIQUE,
  published_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Table: property_images ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.property_images (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id   UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  is_main       BOOLEAN DEFAULT FALSE,
  order_index   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Table: settings ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.settings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT UNIQUE NOT NULL,
  value       TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Default Settings ─────────────────────────────────────────────────────────
INSERT INTO public.settings (key, value) VALUES
  ('company_name', 'ImóvelPrime'),
  ('company_phone', '(11) 99999-9999'),
  ('company_whatsapp', '5511999999999'),
  ('company_email', 'contato@imovelprime.com.br'),
  ('company_address', 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP'),
  ('company_about', 'A ImóvelPrime é uma imobiliária especializada em locação e venda de imóveis residenciais e comerciais. Com mais de 10 anos de experiência no mercado, nossa equipe de corretores certificados está pronta para encontrar o imóvel ideal para você.')
ON CONFLICT (key) DO NOTHING;

-- ─── Auto-update updated_at ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Auto-generate property code ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION generate_property_code()
RETURNS TRIGGER AS $$
DECLARE
  next_num INTEGER;
  new_code TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(code FROM 5) AS INTEGER)), 1000) + 1
  INTO next_num
  FROM public.properties
  WHERE code ~ '^IMV-[0-9]+$';
  
  new_code := 'IMV-' || next_num::TEXT;
  NEW.code := new_code;
  
  -- Auto-generate slug if not provided
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := LOWER(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          TRANSLATE(NEW.title, 'áàãâäéèêëíìîïóòõôöúùûüçñÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇÑ',
                           'aaaaaaeeeeiiiiooooouuuucnAAAAAAAAEEEEIIIIOOOOOUUUUCN'),
          '[^a-z0-9\s-]', '', 'g'
        ),
        '\s+', '-', 'g'
      )
    ) || '-' || LOWER(new_code);
  END IF;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER auto_generate_property_code
  BEFORE INSERT ON public.properties
  FOR EACH ROW
  WHEN (NEW.code IS NULL OR NEW.code = '')
  EXECUTE FUNCTION generate_property_code();

-- ─── Row Level Security (RLS) ─────────────────────────────────────────────────

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- user_profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.user_profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles"
  ON public.user_profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- properties policies
CREATE POLICY "Properties are viewable by everyone"
  ON public.properties FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert properties"
  ON public.properties FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Agents can update their own properties"
  ON public.properties FOR UPDATE
  USING (
    agent_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete properties"
  ON public.properties FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- property_images policies
CREATE POLICY "Property images are viewable by everyone"
  ON public.property_images FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage property images"
  ON public.property_images FOR ALL
  USING (auth.uid() IS NOT NULL);

-- settings policies
CREATE POLICY "Settings are viewable by everyone"
  ON public.settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage settings"
  ON public.settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ─── Storage Bucket ───────────────────────────────────────────────────────────
-- Run this in Supabase Storage settings or via API:
-- Create a bucket named "property-images" with public access

INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Property images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update property images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete property images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

-- ─── Create initial admin user ────────────────────────────────────────────────
-- After running this schema, create the admin user via Supabase Auth dashboard:
-- Email: admin@teste.com
-- Password: admin123
-- Then run this to set the admin role:
-- UPDATE public.user_profiles SET role = 'admin' WHERE email = 'admin@teste.com';
-- Note: The user_profiles record is created automatically via the trigger below.

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'corretor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
