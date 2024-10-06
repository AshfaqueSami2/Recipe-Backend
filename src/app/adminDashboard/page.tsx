'use client'
import PrivateRoute from "@/src/utils/privateRoute";
import React from "react";
import { useAuth } from "@/src/utils/AuthContext";// Import useAuth to get the user's role
import Link from "next/link";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth(); // Get the user's role from the context
 
  
  return (
    <PrivateRoute allowedRoles={['admin']}> {/* Allow both user and admin roles */}
       <div className="min-h-screen bg-gray-50/50">
        {/* Sidebar */}
        <aside
          style={{ marginTop: "86px" }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 -translate-x-80 xl:translate-x-0"
        >
          <div className="relative border-b border-white/20">
            <a className="flex items-center gap-4 py-6 px-8" href="#">
              {/* Display either "User Panel" or "Admin Panel" based on the role */}
              <h6 className="text-white text-lg font-semibold">
                {user?.role === "admin" ? "Admin Panel" : "User Panel"}
              </h6>
            </a>
          </div>
          <div className="m-4">
            <ul className="flex flex-col gap-2">
              {/* Update links with Next.js Link for better navigation */}
              <li>
                <Link href="/dashboard">
                  <button
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white transition-all ${
                      true // Set active dynamically if needed
                        ? "bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      {/* Icons */}
                    </svg>
                    <p className="capitalize">Dashboard</p>
                  </button>
                </Link>
              </li>
              <li>
                <Link  href={`/userDashboard/profile`}>
                  <button
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      {/* Icons */}
                    </svg>
                    <p className="capitalize">Profile</p>
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/userDashboard/changePassword">
                  <button
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      {/* Icons */}
                    </svg>
                    <p className="capitalize">Chnage Password</p>
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/notifications">
                  <button
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      {/* Icons */}
                    </svg>
                    <p className="capitalize">Notifications</p>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="p-4 xl:ml-80">
          {/* Header */}
          <nav className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      Dashboard
                    </a>
                  </li>
                  <li>/</li>
                  <li>Home</li>
                </ol>
              </nav>
              <h6 className="text-gray-900 text-base font-semibold">Home</h6>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-56">
                <input
                  type="text"
                  className="w-full border border-blue-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-blue-gray-400"
                  placeholder="Type here"
                />
              </div>
              <button className="hidden xl:inline-flex items-center gap-1 px-4 py-2 text-gray-500 rounded-lg hover:bg-blue-gray-500/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-5 w-5 text-blue-gray-500"
                  viewBox="0 0 24 24"
                >
                  {/* Icon */}
                </svg>
                Sign In
              </button>
            </div>
          </nav>

          {/* Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Today's Money",
                amount: "$53k",
                change: "+55%",
                color: "blue",
              },
              {
                title: "Today's Users",
                amount: "2,300",
                change: "+3%",
                color: "pink",
              },
              {
                title: "New Clients",
                amount: "3,462",
                change: "-2%",
                color: "green",
              },
              {
                title: "Sales",
                amount: "$103,430",
                change: "+5%",
                color: "orange",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="relative bg-white p-4 rounded-xl shadow-md"
              >
                <div
                  className={`absolute -top-4 left-4 h-16 w-16 rounded-xl grid place-items-center bg-gradient-to-tr from-${card.color}-600 to-${card.color}-400 shadow-lg`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    {/* Icons */}
                  </svg>
                </div>
                <div className="ml-20 text-right">
                  <p className="text-sm text-blue-gray-600">{card.title}</p>
                  <h4 className="text-2xl font-semibold">{card.amount}</h4>
                  <p className="text-sm text-blue-gray-600">
                    <span
                      className={`font-bold ${
                        card.change.includes("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {card.change}
                    </span>{" "}
                    than last week
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Projects Table */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6">
                <h6 className="text-blue-gray-900 text-base font-semibold">
                  Projects
                </h6>
                <p className="text-sm text-blue-gray-600 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-blue-500"
                  >
                    {/* Checkmark Icon */}
                  </svg>
                  <strong>30 done</strong> this month
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      {["Companies", "Budget", "Completion"].map((header) => (
                        <th
                          key={header}
                          className="py-3 px-6 text-left text-blue-gray-400 text-xs uppercase font-medium"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        company: "Material XD Version",
                        budget: "$14,000",
                        completion: 60,
                      },
                      {
                        company: "Add Progress Track",
                        budget: "$3,000",
                        completion: 10,
                      },
                      {
                        company: "Fix Platform Errors",
                        budget: "Not set",
                        completion: 100,
                      },
                      {
                        company: "Launch our Mobile App",
                        budget: "$20,500",
                        completion: 100,
                      },
                      {
                        company: "Add the New Pricing Page",
                        budget: "$500",
                        completion: 25,
                      },
                    ].map((project, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-6">{project.company}</td>
                        <td className="py-3 px-6">{project.budget}</td>
                        <td className="py-3 px-6">
                          <div className="w-full h-1 bg-blue-gray-50 rounded-sm overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-tr from-blue-600 to-blue-400`}
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-blue-gray-600 mt-1">
                            {project.completion}%
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 py-6 text-center text-sm text-blue-gray-600">
            © 2023, made with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline-block h-4 w-4 ml-1"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.54 0 4.5 1.91 5.5 4.36C14.5 4.91 16.46 3 19 3 22.08 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            by{" "}
            <a
              href="https://www.creative-tim.com"
              className="hover:text-blue-500 transition-colors"
            >
              Creative Tim
            </a>{" "}
            for a better web.
          </footer>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminDashboard;
