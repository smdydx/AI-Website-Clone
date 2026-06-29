import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { ParticleBackground } from "@/components/ParticleBackground";

const Features = lazy(() => import("@/components/Features").then((m) => ({ default: m.Features })));
const Gallery = lazy(() => import("@/components/Gallery").then((m) => ({ default: m.Gallery })));
const HowItWorks = lazy(() => import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const Pricing = lazy(() => import("@/components/Pricing").then((m) => ({ default: m.Pricing })));
const Testimonials = lazy(() => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials })));
const CTA = lazy(() => import("@/components/Footer").then((m) => ({ default: m.CTA })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const SectionDoor = lazy(() => import("@/components/SectionDoor").then((m) => ({ default: m.SectionDoor })));
const TorchLight = lazy(() => import("@/components/TorchLight").then((m) => ({ default: m.TorchLight })));
const OneAIUseCases = lazy(() => import("@/components/OneAIUseCases").then((m) => ({ default: m.OneAIUseCases })));
const OneAICapabilities = lazy(() => import("@/components/OneAICapabilities").then((m) => ({ default: m.OneAICapabilities })));
const OneAIPerformanceTeam = lazy(() => import("@/components/OneAIPerformanceTeam").then((m) => ({ default: m.OneAIPerformanceTeam })));
const CookieConsent = lazy(() => import("@/components/CookieConsent").then((m) => ({ default: m.CookieConsent })));

const NotFound = lazy(() => import("@/pages/not-found"));
const PagesPage = lazy(() => import("@/pages/PagesPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AffiliatePage = lazy(() => import("@/pages/AffiliatePage"));
const PlatformPage = lazy(() => import("@/pages/PlatformPage"));
const IndustriesPage = lazy(() => import("@/pages/IndustriesPage"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage"));

const queryClient = new QueryClient();

function SectionFallback() {
  return <div className="py-20" />;
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white relative overflow-x-hidden">
      <Navbar />
      <Suspense fallback={null}>
        <TorchLight />
      </Suspense>
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Ticker />

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="horizontal" color="#050913">
            <Features />
          </SectionDoor>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="vertical" color="#050913" delay={0.05}>
            <OneAIUseCases />
          </SectionDoor>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Gallery />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="horizontal" color="#050913" delay={0.05}>
            <OneAICapabilities />
          </SectionDoor>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="horizontal" color="#050913" delay={0.05}>
            <HowItWorks />
          </SectionDoor>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="iris" color="#050913" delay={0.05}>
            <Pricing />
          </SectionDoor>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="horizontal" color="#050913" delay={0.05}>
            <Testimonials />
          </SectionDoor>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="vertical" color="#050913" delay={0.05}>
            <OneAIPerformanceTeam />
          </SectionDoor>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SectionDoor direction="vertical" color="#050913" delay={0.05}>
            <CTA />
          </SectionDoor>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pages">
        <Suspense fallback={<SectionFallback />}><PagesPage /></Suspense>
      </Route>
      <Route path="/blog">
        <Suspense fallback={<SectionFallback />}><BlogPage /></Suspense>
      </Route>
      <Route path="/shop">
        <Suspense fallback={<SectionFallback />}><ShopPage /></Suspense>
      </Route>
      <Route path="/contacts">
        <Suspense fallback={<SectionFallback />}><ContactPage /></Suspense>
      </Route>
      <Route path="/affiliate">
        <Suspense fallback={<SectionFallback />}><AffiliatePage /></Suspense>
      </Route>
      <Route path="/platform">
        <Suspense fallback={<SectionFallback />}><PlatformPage /></Suspense>
      </Route>
      <Route path="/industries">
        <Suspense fallback={<SectionFallback />}><IndustriesPage /></Suspense>
      </Route>
      <Route path="/resources">
        <Suspense fallback={<SectionFallback />}><ResourcesPage /></Suspense>
      </Route>
      <Route>
        <Suspense fallback={<SectionFallback />}><NotFound /></Suspense>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ParticleBackground />
            <Router />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
