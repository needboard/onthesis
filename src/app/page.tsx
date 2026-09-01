import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { WeSeeYou } from '@/components/sections/WeSeeYou';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Features } from '@/components/sections/Features';
import { Audience } from '@/components/sections/Audience';
import { Faq } from '@/components/sections/Faq';
import { FounderNote } from '@/components/sections/FounderNote';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { StackContainer } from '@/components/sections/StackContainer';

export default function Home() {
  return (
    <>
      <Header />
      <StackContainer totalSections={6}>
        <Hero />
        <Problem />
        <WeSeeYou />
        <HowItWorks />
        <Features />
        <Audience />
      </StackContainer>
      <Faq />
      {/* <FounderNote /> */}
      <FinalCta />
      <Footer />
    </>
  );
}