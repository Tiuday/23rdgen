export default function DashboardPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '48px 24px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: 'var(--font-dm-serif), "DM Serif Display", serif',
            fontSize: 32,
            color: '#0A0A0F',
            margin: '0 0 8px',
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontFamily: 'var(--font-ibm-mono), monospace', fontSize: 13, color: '#8A7A6A', margin: 0 }}>
          Your uploads, deployments, and points — coming soon.
        </p>
      </div>
    </div>
  )
}
