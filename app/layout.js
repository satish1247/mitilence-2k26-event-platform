import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import AIAssistant from "@/components/AIAssistant";

export const metadata = {
  metadataBase: new URL("https://mitilencera.online"),
  title: "MITILENCE 2K26 | Department of Robotics & Automation",
  description:
    "A national-level technical symposium by the Department of Robotics & Automation. Join us on 14 March 2026 for exciting events, competitions, and innovation.",
  keywords: "MITILENCE, 2K26, robotics, symposium, technical events, college fest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MITILENCE 2K26 | Robotics & Automation Symposium",
    description: "Join the innovation wave at MITILENCE 2K26. National-level technical events on 14 March 2026.",
    url: "https://mitilencera.online",
    siteName: "MITILENCE 2K26",
    images: [
      {
        url: "/og-image.png", // Assume this will be created or provided
        width: 1200,
        height: 630,
        alt: "MITILENCE 2K26",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MITILENCE 2K26 | Robotics & Automation Symposium",
    description: "National-level technical symposium on 14 March 2026.",
    images: ["/og-image.png"],
  },
};

// SVG Noise Filter Overlay
const NoiseOverlay = () => (
  <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-[#0A0A14] text-[#F0EFF4] antialiased selection:bg-[#7B61FF]/30 selection:text-white">
        <NoiseOverlay />
        <AuthProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <AIAssistant />
        </AuthProvider>
      </body>
    </html>
  );
}
