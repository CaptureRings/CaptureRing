import React, { useState } from 'react';

export const BasicDetails = ({ formData, setFormData, nextStep, prevStep }) => {
  const [fname, setFname] = useState(formData.fname || '');
  const [lname, setLname] = useState(formData.lname || '');
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [location, setLocation] = useState(formData.location || '');

  const [errors, setErrors] = useState({});

  const countryCode = '+94';

  const validateFields = () => {
    const newErrors = {};

    if (!fname.trim()) newErrors.fname = 'First Name is required';
    if (!lname.trim()) newErrors.lname = 'Last Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!location.trim()) newErrors.location = 'Location is required';

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length === 0) {
      setFormData({ ...formData, fname, lname, email, phone, location });
      nextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="m-6">
      <h2 className="text-2xl font-bold mb-4">Basic Details</h2>
      <div className="mb-4">
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className={`w-full p-2 border rounded-lg ${
            errors.fname ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.fname && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className={`w-full p-2 border rounded-lg ${
            errors.lname ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.lname && (
          <p className="text-red-500 text-sm">{errors.lastname}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 border rounded-lg ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone</label>
        <div className="flex">
          <div className="w-16 p-2 border rounded-l-lg bg-gray-100">
            {countryCode}
          </div>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-3/4 p-2 border rounded-r-lg ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Location (Event Venue)</label>
        <textarea
          type="text"
          value={location}
          rows="4"
          onChange={(e) => setLocation(e.target.value)}
          className={`w-full p-2 border rounded-lg ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
      </div>
      <div className="border w-full my-4"></div>
      <div className="flex justify-end gap-4">
        <button
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-primaryBtn text-white px-4 py-2 rounded-lg"
        >
          Next: Summary
        </button>
      </div>
    </div>
  );
};
