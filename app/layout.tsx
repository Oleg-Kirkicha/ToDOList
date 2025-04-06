export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#1e1e1e] w-full h-screen">{children}</body>
    </html>
  )
  
}
