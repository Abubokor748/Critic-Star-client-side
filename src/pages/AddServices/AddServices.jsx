import React from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { FaCloudUploadAlt, FaTag, FaLink, FaDollarSign, FaAlignLeft } from "react-icons/fa";


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
        fetch("https://assignment-11-backend-seven.vercel.app/services", {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Critic Star | Add Services</title>
            </Helmet>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        Add New Service
                    </h2>
                    <p className="mt-3 text-lg text-gray-600">
                        Share your service with our community
                    </p>
                </div>

                <form onSubmit={handleAddService} className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Service Image */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FaCloudUploadAlt className="text-purple-600" />
                                Service Image URL
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="serviceImage"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLink />
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 ml-2">
                                Supported formats: .jpg, .jpeg, .png, .gif
                            </p>
                        </div>

                        {/* Service Title */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FaTag className="text-blue-500" />
                                Service Title
                            </label>
                            <input
                                type="text"
                                name="serviceTitle"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                placeholder="Amazing Web Service"
                                required
                            />
                        </div>

                        {/* Company Name */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FaTag className="text-blue-500" />
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                placeholder="Tech Corp Inc."
                                required
                            />
                        </div>

                        {/* Website */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FaLink className="text-purple-600" />
                                Website URL
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="website"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    placeholder="https://company.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FaTag className="text-blue-500" />
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    name="category"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl appearance-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white cursor-pointer"
                                >
                                    <option value="">Select Category</option>
                                    <option value="technology">Technology</option>
                                    <option value="health">Health</option>
                                    <option value="education">Education</option>
                                    <option value="finance">Finance</option>
                                    <option value="others">Others</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FaDollarSign className="text-green-500" />
                                Price
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    placeholder="0.00"
                                    required
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    $
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <FaAlignLeft className="text-purple-600" />
                            Description
                        </label>
                        <textarea
                            name="description"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                            placeholder="Describe your service in detail..."
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                        Publish Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;