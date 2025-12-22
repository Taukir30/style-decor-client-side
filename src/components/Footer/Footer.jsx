import React from 'react';
import { Link } from 'react-router';
import Logo from '../Logo/Logo';
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { RiYoutubeLine } from "react-icons/ri";
import { TbBrandLinkedinFilled } from "react-icons/tb";

const Footer = () => {
    return (
        <footer className="bg-[#FFFBE6] pt-16 pb-8 border-t border-gray-200 font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li><Logo></Logo></li>
                            <li className="flex items-start space-x-3 text-gray-600">
                                <i className="fas fa-map-marker-alt mt-1 text-gray-400" />
                                <span>
                                    432/A Indira Road, Farmgate
                                    <br />
                                    Dhaka-1215, Bangladesh
                                </span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600 group">
                                <i className="fas fa-envelope text-gray-400 group-hover:text-orange-500 transition" />
                                <Link
                                    href="mailto:hello@eventpro.com"
                                    className="hover:text-orange-500 transition"
                                >
                                    style@decor.com
                                </Link>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-600 group">
                                <i className="fas fa-phone-alt text-gray-400 group-hover:text-orange-500 transition" />
                                <Link
                                    href="tel:+442071234567"
                                    className="hover:text-orange-500 transition"
                                >
                                    +880 1459 874586
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">
                            Business Hours
                        </h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex justify-between border-b border-gray-200/50 pb-2">
                                <span>Sunday - Thursday:</span>
                                <span className="font-medium text-orange-500">
                                    9:00 AM - 6:00 PM
                                </span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200/50 pb-2">
                                <span>Saturday:</span>
                                <span className="font-medium text-orange-500">
                                    10:00 AM - 4:00 PM
                                </span>
                            </li>
                            <li className="flex justify-between pb-2">
                                <span>Friday:</span>
                                <span className="font-medium text-gray-400">Closed</span>
                            </li>
                        </ul>
                    </div>
                    <div className="md:text-right flex flex-col md:items-end">
                        <Logo></Logo>
                        <p className="text-gray-600 mb-6 text-sm max-w-xs">
                            Experience seamless booking for breathtaking ceremony decorations and cutting-edge smart home solutions.
                        </p>
                        <h3 className="text-base font-bold text-gray-900 mb-4 tracking-tight">
                            Follow Us
                        </h3>
                        <div className="flex gap-3">
                            <Link
                                className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 bg-white/50"
                            >
                                <BsFacebook />
                            </Link>

                            <Link
                                className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 bg-white/50"
                            >
                                <BsInstagram />
                            </Link>

                            <Link
                                className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 bg-white/50"
                            >
                                <RiYoutubeLine />
                            </Link>

                            <Link
                                className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 bg-white/50"
                            >
                                <TbBrandLinkedinFilled />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300/50 pt-8 mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        © 2025 StyleDecor Home Decorator & Event Management. All rights reserved.
                        colors.
                    </p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;