import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 p-6">
            {/* Error Message */}
            <div className="text-center space-y-6">
                <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Oops!
                </h2>
                <p className="text-2xl text-gray-700">
                    What are you looking for?
                </p>
                <p className="text-lg text-gray-600">
                    The page you're trying to reach doesn't exist.
                </p>
            </div>

            {/* Home Button */}
            <Link
                to="/"
                className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600 hover:shadow-lg transition-all duration-300"
            >
                Return to Home
            </Link>
        </div>
    );
};

export default ErrorPage;