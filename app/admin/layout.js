export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>BookWorm Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for BookWorm online bookstore" />
      </head>
      <body>{children}</body>
    </html>
  )
}
