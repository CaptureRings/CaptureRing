import React from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Hero } from '../components/Homepage/hero';
import { Services } from '../components/Homepage/services';
import { Reviews } from '../components/Homepage/reviews';
import { Portfolio } from '../components/Homepage/portfolio';

export const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Services />
      <Reviews />
      <Portfolio />
      <Footer />
    </div>
  );
};
