import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Anime List Clone',
  description: 'Website Clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-color-dark`}>
        <NavBar/>
        {children}
        </body>
    </html>
  )
}
