import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Diagnostico from "@/components/Diagnostico";
import Sistemas from "@/components/Sistemas";
import Diferenciador from "@/components/Diferenciador";
import Secuencia from "@/components/Secuencia";
import Hangar from "@/components/Hangar";
import Transmisiones from "@/components/Transmisiones";
import Despegue from "@/components/Despegue";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <CursorGlow />
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Diagnostico />
        <Sistemas />
        <Diferenciador />
        <Secuencia />
        <Hangar />
        <Transmisiones />
        <Despegue />
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
