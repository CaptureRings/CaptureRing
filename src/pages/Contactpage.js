import React from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { MapComponent } from '../components/MapComponent';

export const Contactpage = () => {
  return (
    <div>
      <Header />
      <MapComponent />
      <div className="container mx-auto text-start md:mx-36 my-8">
        <h2 className="text-3xl font-domine">Contact Info</h2>
        <p className="text-lg text-gray-800">
          Some information that you may want to know
        </p>
        <p className="text-lg text-gray-500 mt-8">Phone Number</p>
        <p className="text-3xl font-domine my-4">070 224 0388 / 077 738 2000</p>
        <div className="border border-l-2 w-3/4 mb-4"></div>
        <p className="text-lg text-gray-500 mt-8">Address</p>
        <p className="text-3xl font-domine my-4">
          Upper floor, Super Sound electronic, <br />
          No. 210 lower st, <br />
          Badulla
        </p>
        <div className="border border-l-2 w-3/4 mb-4"></div>
        <p className="text-lg text-gray-500 my-8">Email</p>
        <p className="text-3xl font-domine my-4">capturerings@gmail.com</p>
      </div>
      <Footer />
    </div>
  );
};
