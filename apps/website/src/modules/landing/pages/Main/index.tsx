import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AudienceFamilies } from "./components/AudienceFamilies";
import { AudienceDoctors } from "./components/AudienceDoctors";
import { HowItWorks } from "./components/HowItWorks";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function LandingMain() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AudienceFamilies />
        <AudienceDoctors />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
