import { Avatar } from "@/components/Avatar";
import { PortfolioSections } from "@/components/PortfolioSections";
import { CalendarBooking } from "@/components/CalendarBooking";
import { NavigationBar } from "@/components/NavigationBar";
import { AboutMe } from "@/components/AboutMe";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main className="min-h-screen selection:bg-accent/30 relative">

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-24 md:space-y-32">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight tracking-tight">
                AI Lead & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-title-accent to-accent">
                  Agentic Systems
                </span> <br/>
                Engineer.
              </h1>
              <p className="text-xl text-secondary max-w-lg leading-relaxed font-light">
                Building bleeding-edge AI platforms, real-time voice agents, and hyperpersonalized systems for 8+ years.
              </p>
              
              <div className="pt-6">
                <a href="#contact" className="inline-block px-10 py-4 rounded-full bg-foreground text-background font-medium hover:scale-105 hover:bg-foreground/90 transition-all shadow-2xl active:scale-95">
                  Book a Session
                </a>
              </div>
            </div>

            <div className="relative">
              {/* The Anam Avatar takes the place of the profile picture */}
              <Avatar />
            </div>
          </section>

          {/* About Me */}
          <section id="about">
            <AboutMe />
          </section>

          {/* Portfolio trajectory */}
          <section id="trajectory">
            <PortfolioSections />
          </section>

          {/* Contact / Calendar */}
          <section id="contact" className="pt-16 pb-32">
            <CalendarBooking />
          </section>
        </div>
      </main>
    </>
  );
}
