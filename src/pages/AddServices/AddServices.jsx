import React from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const AddService = () => {
    const handleAddService = (e) => {
        e.preventDefault();
        const form = e.target;

        // Get and trim form values
        const serviceImage = form.serviceImage.value.trim();
        const serviceTitle = form.serviceTitle.value.trim();
        const companyName = form.companyName.value.trim();
        const website = form.website.value.trim();
        const description = form.description.value.trim();
        const category = form.category.value;
        const price = form.price.value.trim();

        // Validation patterns
        const imageUrlPattern = /^https?:\/\/.+\.(jpe?g|png|gif|bmp|webp)$/i;
        const websitePattern = /^https?:\/\/.+/i;

        // Validations
        if (!imageUrlPattern.test(serviceImage)) {
            toast.error("Image URL must start with http/https and be a valid image file (jpg, jpeg, png, gif, bmp, webp)");
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
        if (!websitePattern.test(website)) {
            toast.error("Website must be a valid URL starting with http:// or https://");
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
            toast.error("Please enter a valid positive price!");
            return;
        }

        // Prepare service object
        const newService = {
            serviceImage,
            serviceTitle,
            companyName,
            website,
            description,
            category,
            price: Number(price),
        };

        // Submit to server
        fetch("http://localhost:5000/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newService),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Service added successfully",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    form.reset();
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                toast.error("Failed to add service!");
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Helmet>
                <title>Critic Star | Add Services</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Add a New Service
            </h2>

            <form onSubmit={handleAddService} className="bg-white shadow-lg rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Service Image */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Service Image URL *
                        </label>
                        <input
                            type="text"
                            name="serviceImage"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Must start with http/https and end with .jpg, .jpeg, .png, .gif
                        </p>
                    </div>

                    {/* Service Title */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Service Title *
                        </label>
                        <input
                            type="text"
                            name="serviceTitle"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter service title"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter company name"
                            required
                        />
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Website URL *
                        </label>
                        <input
                            type="text"
                            name="website"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://company-website.com"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Category *
                        </label>
                        <select
                            name="category"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Select Category</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="education">Education</option>
                            <option value="finance">Finance</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Price (USD) *
                        </label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe the service in detail..."
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 hover:scale-105"
                >
                    Add Service
                </button>
            </form>
        </div>
    );
};

export default AddService;