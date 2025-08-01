'use client'
import React, { useState } from 'react'
import {
  Plus, Package,
  Search, Filter, Upload, RefreshCw, MoreHorizontal
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';
import {ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const ProductManagement = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Product Management")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const router = useRouter()
  const pathname = usePathname()

  const [activeTab, setActiveTab] = useState<string>('All Products');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Status');

  const products = [
    {
      id: '#PROD-1001',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 'Rs. 1,990',
      stock: 48,
      status: 'Active',
      statusColor: 'text-[#0FBE06] bg-[#EFFFF9]'
    },
    {
      id: '#PROD-1002',
      name: "Men's Casual T-Shirts",
      category: 'Clothing',
      price: 'Rs. 1,390',
      stock: 8,
      status: 'Low Stock',
      statusColor: 'text-blue-600 bg-[#E9F3FF]'
    },
    {
      id: '#PROD-1003',
      name: 'Stainless Steel Water Bottle',
      category: 'Home & Garden',
      price: 'Rs. 4,990',
      stock: 0,
      status: 'Out of Stock',
      statusColor: 'text-[#DEA802] bg-[#FFF9DE]'
    },
    {
      id: '#PROD-1004',
      name: 'Organic Cotton Bed Sheets',
      category: 'Home & Garden',
      price: 'Rs. 990',
      stock: 22,
      status: 'Draft',
      statusColor: 'text-[#FF0000] bg-[#FFF2F2]'
    }
  ];

const tabs = [
    { label: 'All Products', href: '/shopkeeper/Products' },
    { label: 'Categories', href: '/shopkeeper/Products/Categories' },
    { label: 'Inventory', href: '/shopkeeper/Products/Inventory' },
    { label: 'Pricing Rules', href: '/shopkeeper/Pricing' }
  ];


  const Select = ({ value, onChange, options }: any) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option: string) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 border rounded-top">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeMenuItem}
        setActiveItem={setActiveMenuItem}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Product Management Dashboard</h1>
            <button className="inline-flex items-center px-4 py-2 bg-[#3801FF33] text-[#0000FF] text-xs font-medium rounded-sm hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
                Add New Product
            </button>
          </div>

          {/* Tabs */}
           <div className="border-b border-gray-200 mb-8">
           <nav className="-mb-px flex space-x-8">
           {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <button
              key={tab.label}
              onClick={() => router.push(tab.href)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search Products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={['All Categories', 'Electronics', 'Clothing', 'Home & Garden']}
              />
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={['All Status', 'Active', 'Low Stock', 'Out of Stock', 'Draft']}
              />
              <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </button>
              <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                <Upload className="w-4 h-4 mr-2" /> Bulk Import
              </button>
              <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="rounded-lg shadow-lg border">
            <div className="p-6  flex items-center justify-between bg-gray-300 border rounded-t-lg">
              <div className="flex items-center ">
                <Package className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="font-medium text-[#000000] flex items-center text-[22px]">All Products</h2>
              </div>
              <button className="text-[#2F1DF7] text-[18px] hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border">
                  <tr>
                    {['Product ID', 'Product Name', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-[15px] font-medium text-[#282727] uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {products.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-[14px] font-medium text-[#282727]">{product.id}</td>
                      <td className="px-6 py-4 text-[15px] text-[#282727]">{product.name}</td>
                      <td className="px-6 py-4 text-[15px] text-[#282727]">{product.category}</td>
                      <td className="px-6 py-4 text-[15px] text-[#282727]">{product.price}</td>
                      <td className="px-6 py-4 text-[15px] text-[#282727]">{product.stock}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 font-small rounded-sm ${product.statusColor}border-1 text-[12px] font-bold`}>{product.status}</span>
                      </td>
                      <td className="px-6 py-4 text-[15px] font-medium text-[#282727]">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Showing 4 of 198 shops</p>
                <div className="flex items-center space-x-2 ml-170">
                  <button className="p-1 rounded hover:bg-gray-200 active:bg-blue-600">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[1, 2, 3, "...", 24].map((num, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-sm rounded cursor-pointer hover:bg-gray-200 ${
                        num === 1 ? "bg-blue-600 text-white" : "text-gray-700" 
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                  <button className="p-1 rounded hover:bg-gray-200">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProductManagement
