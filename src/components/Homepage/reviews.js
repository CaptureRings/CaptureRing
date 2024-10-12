// src/components/Reviews.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../assets/avatar.webp';

const reviews = [
  {
    name: 'Sarah Lilly',
    role: 'Teacher',
    image: Avatar,
    text: 'Incredible wedding photos that captured every moment perfectly. Thank you, Capture Rings.',
  },
  {
    name: 'John Doe',
    role: 'Freelancer',
    image: Avatar,
    text: 'Professional and creative graduation photos that exceeded my expectations.',
  },
  {
    name: 'Leo Daniel',
    role: 'Accountant',
    image: Avatar,
    text: "Amazing birthday shoot that captured our child's joy and personality. Thank you, Capture Rings.",
  },
];

const starRating = (
  <div className="flex items-center">
    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
    <FontAwesomeIcon icon={faStar} className="text-gray-300" />
  </div>
);

export const Reviews = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-12">
      <div className="container mx-auto px-6 md:px-36 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col md:items-start pr-8">
            <h2 className="text-lg text-gray-500 uppercase mb-2">
              Customer Review
            </h2>
            <h1 className="text-5xl font-bold font-serif mb-6 text-pink-500">
              What Our Clients Say
            </h1>
            <p className="text-lg md:text-start text-gray-700 mb-6">
              Discover what our clients have to say about their extraordinary
              experiences with Capture Rings. Read heartfelt testimonials that
              reflect the impeccable quality, professionalism, and passion our
              team brings to every project.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mb-12">
            <div className="text-7xl font-bold text-gray-800 mb-2">4.7</div>
            {starRating}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white rounded-lg shadow-lg p-6"
            >
              <p className="text-gray-700 mb-4 text-start px-4">
                {review.text}
              </p>
              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
