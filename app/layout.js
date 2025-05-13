export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>BookWorm - Online Book Store</title>
        <meta name="description" content="Your favorite online bookstore" />
      </head>
      <body>{children}</body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
