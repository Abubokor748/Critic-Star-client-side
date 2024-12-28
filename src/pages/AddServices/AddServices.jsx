import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddService = () => {

    const handleAddService = (e) => {
        e.preventDefault();

        const form = e.target;

        // Form data
        const serviceImage = form.serviceImage.value;
        const serviceTitle = form.serviceTitle.value;
        const companyName = form.companyName.value;
        const website = form.website.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;

        // Validations
        if (!serviceImage.startsWith("http")) {
            toast.error("Please enter a valid image URL");
            return;
        }
        if (serviceTitle.length < 2) {
            toast.error("Service title must have at least 2 characters!");
            return;
        }
        if (companyName.length < 2) {
            toast.error("Company name must have at least 2 characters!");
            return;
        }
        if (!website.startsWith("http")) {
            toast.error("Please enter a valid website URL");
            return;
        }
        if (description.length < 10) {
            toast.error("Description must be at least 10 characters long!");
            return;
        }
        if (category === "") {
            toast.error("Please select a category!");
            return;
        }
        if (isNaN(price) || Number(price) <= 0) {
            toast.error("Please enter a valid price!");
            return;
        }


        // Sending data to the server
        // fetch("https://example.com/api/services", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newService),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if (data.insertedId) {
        //       Swal.fire({
        //         title: "Success!",
        //         text: "Service added successfully",
        //         icon: "success",
        //         confirmButtonText: "OK",
        //       });

        //       // Reset form after successful submission
        //       form.reset();
        //     }
        //   })
        //   .catch((err) => {
        //     console.error("Error:", err);
        //     toast.error("Failed to add service!");
        //   });
    };

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Add a New Service</h2>
            </div>

            <div>
                <form onSubmit={handleAddService} className="card-body">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Service Image */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Service Image (URL):</label>
                            <input
                                type="text"
                                name="serviceImage"
                                className="w-full p-2 border rounded"
                                placeholder="Enter a valid image URL"
                                required
                            />
                        </div>

                        {/* Service Title */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Service Title:</label>
                            <input
                                type="text"
                                name="serviceTitle"
                                className="w-full p-2 border rounded"
                                placeholder="Enter the service title"
                                required
                            />
                        </div>

                        {/* Company Name */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Company Name:</label>
                            <input
                                type="text"
                                name="companyName"
                                className="w-full p-2 border rounded"
                                placeholder="Enter the company name"
                                required
                            />
                        </div>

                        {/* Website */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Website:</label>
                            <input
                                type="text"
                                name="website"
                                className="w-full p-2 border rounded"
                                placeholder="Enter the website URL"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Category:</label>
                            <select name="category" className="w-full p-2 border rounded">
                                <option value="">Select Category</option>
                                <option value="technology">Technology</option>
                                <option value="health">Health</option>
                                <option value="education">Education</option>
                                <option value="finance">Finance</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Price (USD):</label>
                            <input
                                type="number"
                                name="price"
                                className="w-full p-2 border rounded"
                                placeholder="Enter the price"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Description:</label>
                        <textarea
                            name="description"
                            className="w-full p-2 border rounded"
                            placeholder="Write a short description"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Add Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
