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
        <div className='relative mb-0 ml-auto mr-auto w-1060 text-left'>
        <NavBar/>
        {children}
        </div>
        </body>
    </html>
  )
}
