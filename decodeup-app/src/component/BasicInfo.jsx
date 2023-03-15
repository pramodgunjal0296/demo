import React, { useState } from "react";

const BasicInfo = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Enter first name";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Enter last name";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Enter email address";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Select date of birth";
      isValid = false;
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
        isValid = false;
      }
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Enter contact number";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.contactNo.trim())) {
      newErrors.contactNo = "Enter 10 digit number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="container bg-gray-100 gap-2 border border-gray-400 p-8">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center flex-col items-start gap-6 w-full"
      >
        <div className="flex  flex-row items-start gap-6 w-full">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <p className="text-red-800">{errors.firstName}</p>
          )}
        </div>
        <div className="flex  flex-row items-start gap-6 w-full">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p className="text-red-800">{errors.lastName}</p>}
        </div>
        <div className="flex  flex-row items-start gap-6 w-full">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-800">{errors.email}</p>}
        </div>
        <div className="flex flex-row items-start gap-6 w-full">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
          {errors.dateOfBirth && (
            <p className="text-red-800">{errors.dateOfBirth}</p>
          )}
        </div>
        <div className="flex  flex-row items-start gap-6 w-full">
          <label htmlFor="contactNo"> contactNo:</label>
          <input
            type="number"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleInputChange}
          />
          {errors.contactNo && (
            <p className="text-red-800">{errors.contactNo}</p>
          )}
        </div>

        <button
          type="submit "
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check Validation
        </button>
      </form>
    </div>
  );
};
export default BasicInfo;
