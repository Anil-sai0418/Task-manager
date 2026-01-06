import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Heart, Users, CheckSquare } from "lucide-react";
import { useVisitor } from "../hooks/useVisitor";

function Footer() {
  const currentYear = new Date().getFullYear();

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  
  // Get visitor count from hook
  // eslint-disable-next-line no-unused-vars
  const { visitorCount, loading: visitorLoading, error: visitorError } = useVisitor();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    const updateNetworkSpeed = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      if (connection) {
        const slow =
          connection.effectiveType === "3g" ||
          connection.effectiveType === "slow-4g";
        setIsSlowNetwork(slow);
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      connection.addEventListener("change", updateNetworkSpeed);
      updateNetworkSpeed();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (connection) {
        connection.removeEventListener("change", updateNetworkSpeed);
      }
    };
  }, []);

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-5 ">
            <div>
              <div className="flex items-center  gap-2">
<img className="w-[30px] h-[30px] rounded-2xl" src="./TM.png" alt="tm icon" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Task Manager
                </h3>
              </div>
              <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
                Track tasks and monitor credits, debits,and<br />
                <span> balances in one place.</span>
              </p>
            </div>

            {/* Network Status */}
        <div className="flex flex-col gap-2 text-xs">
  <div className="flex items-center gap-2">
    <span className="text-gray-500 dark:text-gray-400">Connection status:</span>
    <span
      className={`h-2 w-2 rounded-full ${
        !isOnline
          ? "bg-red-500"
          : isSlowNetwork
          ? "bg-yellow-400 animate-pulse"
          : "bg-green-500 animate-pulse"
      }`}
    />
    <span
      className={`${
        !isOnline
          ? "text-red-600 dark:text-red-400"
          : isSlowNetwork
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-green-600 dark:text-green-400"
      } font-medium`}
    >
      {!isOnline
        ? "Offline"
        : isSlowNetwork
        ? "Slow network"
        : "Online"}
    </span>
  </div>

  {isOnline && isSlowNetwork && (
    <span className="text-[11px] text-gray-500 dark:text-gray-400">
      Sync may take longer than usual
    </span>
  )}
</div>


            {/* Visitor Count */}
            <div className="inline-flex items-center gap-2 self-start rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300">
              <Users size={14} className="text-green-600 dark:text-green-400" />
              <span>
                Total visitors:
                <span className="ml-1 font-semibold text-gray-900 dark:text-gray-100">
                  {visitorLoading ? "…" : visitorCount || "0"}
                </span>
              </span>
            </div>
          </div>

          {/* Features Section */}
       
          {/* Quick Links Section */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/list" className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                  Tasks
                </a>
              </li>
             
            
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-900 dark:text-gray-100">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className=" flex-shrink-0" />
                <a 
                  href="mailto:anilsainunnagamil@gmail.com"
                  className="text-gray-600 dark:text-gray-400 transition-colors break-all"
                >
                  anilsainunnagamil@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin size={16} className=" flex-shrink-0" />
                <a 
                  href="https://www.linkedin.com/in/anil-sai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  linkedin.com/in/anil-sai
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className=" flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:items-center md:justify-between gap-4">
          
          {/* Copyright */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Task Manager. All rights reserved.
          </div>

          {/* Visitor Count */}
        

          {/* Made with love */}
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
           Design & Developed By Anil.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;