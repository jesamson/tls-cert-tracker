export interface CertificateSubject {
  commonName?: string
  organization?: string
  organizationalUnit?: string
  country?: string
  state?: string
  locality?: string
  emailAddress?: string
}

export interface CertificateIssuer {
  commonName?: string
  organization?: string
  organizationalUnit?: string
  country?: string
  state?: string
  locality?: string
  emailAddress?: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issuerDetails: CertificateIssuer
  subject: CertificateSubject
  domains: string[]
  issuedAt: string
  expiresAt: string
  description?: string
  notes?: string
  serialNumber?: string
  signatureAlgorithm?: string
}

export interface CertificateData {
  name: string
  issuer: string
  issuerDetails: CertificateIssuer
  subject: CertificateSubject
  domains: string[]
  issuedAt: string
  expiresAt: string
  description?: string
  notes?: string
  serialNumber?: string
  signatureAlgorithm?: string
}
