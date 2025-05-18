'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-blue-600 flex items-center justify-center font-mono text-white p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    <div className="text-2xl mb-8">
                        <h1 className="text-7xl font-bold mb-8 animate-pulse ">
                            ERROR_404_PAGE_NOT_FOUND
                        </h1>
                        <div className="space-y-4 text-lg mb-8">
                            <p>
                                A problem has been detected and the page has been stopped to prevent damage
                                to your browsing experience.
                            </p>
                            <p className="font-semibold">
                                Technical information:
                            </p>
                            <p className="font-mono">
                                *** STOP: 0x00000404 (0x0000000000000000, 0x0000000000000000)
                            </p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="space-y-4"
                    >
                        <p>
                            If this is the first time you've seen this error screen:
                        </p>
                        <p>
                            * Try going back to the home page
                        </p>
                        <p>
                            * If problems continue, contact the system administrator
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8"
                        >
                            <Link
                                href="/"
                                className="inline-block bg-white text-blue-600 px-6 py-3 rounded
                                    hover:bg-gray-200 transition-colors duration-300 font-bold animate-pulse "
                            >
                                Return to Home
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-sm"
                >
                    <p>
                        Collecting error information... (100% complete)
                    </p>
                    <p>
                        A dump of the physical memory is being saved
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}