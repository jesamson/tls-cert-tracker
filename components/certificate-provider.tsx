"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import type { Certificate } from "@/lib/types"

interface CertificateContextType {
  certificates: Certificate[]
  addCertificate: (certificate: Omit<Certificate, "id">) => void
  removeCertificate: (id: string) => void
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void
}

const CertificateContext = createContext<CertificateContextType | undefined>(undefined)

export function CertificateProvider({ children }: { children: React.ReactNode }) {
  const [certificates, setCertificates] = useState<Certificate[]>([])

  // Load certificates from localStorage on mount
  useEffect(() => {
    const storedCertificates = localStorage.getItem("certificates")
    if (storedCertificates) {
      setCertificates(JSON.parse(storedCertificates))
    }
  }, [])

  // Save certificates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("certificates", JSON.stringify(certificates))
  }, [certificates])

  const addCertificate = (certificate: Omit<Certificate, "id">) => {
    try {
      const newCertificate = {
        ...certificate,
        id: uuidv4(),
      }
      setCertificates((prev) => {
        const updatedCertificates = [...prev, newCertificate]
        // Immediately save to localStorage
        localStorage.setItem("certificates", JSON.stringify(updatedCertificates))
        return updatedCertificates
      })
    } catch (error) {
      console.error("Error in addCertificate:", error)
      throw error
    }
  }

  const removeCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id))
  }

  const updateCertificate = (id: string, certificate: Partial<Certificate>) => {
    setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, ...certificate } : cert)))
  }

  return (
    <CertificateContext.Provider
      value={{
        certificates,
        addCertificate,
        removeCertificate,
        updateCertificate,
      }}
    >
      {children}
    </CertificateContext.Provider>
  )
}

export function useCertificates() {
  const context = useContext(CertificateContext)
  if (context === undefined) {
    throw new Error("useCertificates must be used within a CertificateProvider")
  }
  return context
}
