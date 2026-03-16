import { useMemo, useState } from 'react'
import { IconDownload } from '../components/Icons.jsx'

const PAYMENTS = [
  { id: 'INV-10021', date: '2026-02-01', planName: 'Standard Plan', amount: 1499, status: 'Paid' },
  { id: 'INV-10009', date: '2026-01-01', planName: 'Standard Plan', amount: 1499, status: 'Paid' },
  { id: 'INV-09987', date: '2025-12-01', planName: 'Basic Plan', amount: 799, status: 'Paid' },
  { id: 'INV-09965', date: '2025-11-01', planName: 'Basic Plan', amount: 799, status: 'Paid' },
  { id: 'INV-09940', date: '2025-10-05', planName: 'Premium Plan', amount: 2499, status: 'Paid' },
]

function formatMoneyINR(v) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v)
  } catch {
    return `₹ ${v}`
  }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function PaymentHistory() {
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PAYMENTS
    return PAYMENTS.filter(
      (p) =>
        p.planName.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        String(p.amount).includes(q) ||
        p.date.includes(q),
    )
  }, [query])

  function handleDownloadReceipt(payment) {
    // Demo: in a real app this would fetch/generate a PDF
    const blob = new Blob(
      [`Receipt ${payment.id}\nDate: ${formatDate(payment.date)}\nPlan: ${payment.planName}\nAmount: ${formatMoneyINR(payment.amount)}\nStatus: ${payment.status}`],
      { type: 'text/plain' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt-${payment.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Payment History</h1>
          <p className="pageSub">View your payments and download receipts.</p>
        </div>
        <div style={{ width: 'min(280px, 100%)' }}>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by plan, date, amount..."
          />
        </div>
      </div>

      <div className="dashCard">
        <div className="tableWrap">
          <table className="paymentTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Plan Name</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td className="muted">{formatDate(p.date)}</td>
                  <td style={{ fontWeight: 700 }}>{p.planName}</td>
                  <td>{formatMoneyINR(p.amount)}</td>
                  <td>
                    <span className={`paymentStatus paymentStatus${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn secondary btnSm"
                      onClick={() => handleDownloadReceipt(p)}
                    >
                      <IconDownload className="btnIcon" />
                      Receipt Download
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="muted" style={{ textAlign: 'center', padding: 24 }}>
                    No matching payments.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
