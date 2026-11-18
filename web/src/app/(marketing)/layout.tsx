import SmoothScroll from '@/components/SmoothScroll';
import CursorGlow from '@/components/CursorGlow';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
export default function MarketingLayout({children}:{children:React.ReactNode}) { return <SmoothScroll><CursorGlow/><CustomCursor/><Navbar/>{children}<Footer/><WhatsAppFloat/></SmoothScroll>; }
