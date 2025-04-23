export function Footer() {
    return (
        <footer className="bg-white border-t">
            <div className="container mx-auto px-2 py-2">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-600 text-sm">
                        © {new Date().getFullYear()}. All rights reserved.
                    </div>

                    <div className="mt-4 md:mt-0">
                        <nav className="flex space-x-4 text-sm text-gray-600">
                            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-900">Terms of Service</a>
                            <a href="#" className="hover:text-gray-900">Contact Us</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}