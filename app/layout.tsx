import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { CertificateProvider } from "@/components/certificate-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TLS Certificate Tracker",
  description: "Track and manage your TLS certificates and their expiration dates.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CertificateProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
          </CertificateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
