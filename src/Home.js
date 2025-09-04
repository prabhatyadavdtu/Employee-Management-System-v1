import React, { Component } from "react";

// export class Home extends Component {
//     render() {
//         return(
//             <div className="mt-5 d-flex justify-content-left">
//                 Home page.
//             </div>
//         )
//     }
// }

//import React from 'react';
import {
    Users,
    Building2,
    TrendingUp,
    Calendar,
    DollarSign,
    Award,
    Clock,
    UserPlus,
    BarChart3,
    PieChart,
    Activity,
    Bell,
    CheckCircle,
    AlertTriangle,
    Plus,
    ArrowRight,
    Target,
    Briefcase,
    Star,
    XCircle,
    Heart,
    Globe,
    BookOpen,
} from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen w-full">
            {/* Hero Section with Background Image */}
            <div className="relative overflow-hidden w-full">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-indigo-900/95"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                    <div className="w-full max-w-none mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                            {/* Hero Content */}
                            <div className="text-white order-2 lg:order-1">
                                <div className="mb-6">
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
                                        Welcome Back, Admin
                                    </h1>
                                    <p className="text-lg sm:text-xl text-black mb-2">
                                        Manage your workforce with confidence
                                    </p>
                                    <p className="text-sm text-muted text-black/80">
                                        Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-center sm:flex-row gap-4 mb-8">
                                    <button className="bg-black hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-white font-medium">
                                        <Plus className="h-5 w-5" />
                                        <span>Quick Add Employee</span>
                                    </button>
                                    <button className="bg-black hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-white font-medium">
                                        <BarChart3 className="h-5 w-5" />
                                        <span>View Reports</span>
                                    </button>
                                </div>

                                {/* Today's Summary */}
                                <div className="bg-white backdrop-blur-sm rounded-lg p-4 border border-black">
                                    <h3 className="font-semibold mb-3 text-black">Today's Summary</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-900">Present Today</p>
                                            <p className="text-2xl font-bold text-green-500">234/247</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-900">On Leave</p>
                                            <p className="text-2xl font-bold text-red-500">13</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="order-1 lg:order-2 flex justify-center">
                                <div className="relative">
                                    <div className="w-72 h-72 sm:w-96 sm:h-96 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                                        <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                                            <Users className="h-24 w-24 sm:h-32 sm:w-32 text-white" />
                                        </div>
                                    </div>
                                    {/* Floating Elements */}
                                    <div className="absolute -top-4 -right-4 bg-green-500 p-3 rounded-full animate-bounce">
                                        <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 bg-yellow-500 p-3 rounded-full animate-pulse">
                                        <TrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Key Metrics Grid - Fully Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Employees</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">247</p>
                                <div className="flex items-center mt-2">
                                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                                    <span className="text-xs sm:text-sm text-green-600 font-medium">+12%</span>
                                </div>
                            </div>
                            <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Departments</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">12</p>
                                <div className="flex items-center mt-2">
                                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                                    <span className="text-xs sm:text-sm text-green-600 font-medium">All active</span>
                                </div>
                            </div>
                            <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                                <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">New Hires</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">18</p>
                                <div className="flex items-center mt-2">
                                    <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 mr-1" />
                                    <span className="text-xs sm:text-sm text-yellow-600 font-medium">This month</span>
                                </div>
                            </div>
                            <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
                                <UserPlus className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Monthly Budget</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">$2.4M</p>
                                <div className="flex items-center mt-2">
                                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 mr-1" />
                                    <span className="text-xs sm:text-sm text-purple-600 font-medium">85% used</span>
                                </div>
                            </div>
                            <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid - Responsive Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Recent Activities - Takes full width on mobile, 2/3 on desktop */}
                    <div className="xl:col-span-2 bg-white rounded-xl shadow-lg p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                                Recent Activities
                            </h3>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center self-start sm:self-auto">
                                View All <ArrowRight className="h-4 w-4 ml-1" />
                            </button>
                        </div>

                        {/* Activities List */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-green-50 rounded-lg border-l-4 border-green-400 hover:shadow-md transition-shadow">
                                <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">Sarah Johnson completed onboarding</p>
                                    <p className="text-xs text-gray-500 mt-1">Marketing Department • 2 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 hover:shadow-md transition-shadow">
                                <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                                    <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">New team meeting scheduled</p>
                                    <p className="text-xs text-gray-500 mt-1">Engineering Department • 4 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
                                <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">Pending leave approval</p>
                                    <p className="text-xs text-gray-500 mt-1">3 requests awaiting review • 6 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400 hover:shadow-md transition-shadow">
                                <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                                    <Award className="h-4 w-4 text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">Employee of the month announced</p>
                                    <p className="text-xs text-gray-500 mt-1">Mike Chen - Engineering • Yesterday</p>
                                </div>
                            </div>
                            {/* <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-red-50 rounded-lg border-l-4 border-red-400 hover:shadow-md transition-shadow">
                                <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                                    <XCircle className="h-4 w-4 text-red-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">System downtime reported</p>
                                    <p className="text-xs text-gray-500 mt-1">IT Department • 15 minutes ago</p>
                                </div>
                            </div> */}

                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400 hover:shadow-md transition-shadow">
                                <div className="bg-pink-100 p-2 rounded-full flex-shrink-0">
                                    <Heart className="h-4 w-4 text-pink-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">Wellness workshop completed</p>
                                    <p className="text-xs text-gray-500 mt-1">HR Department • 1 hour ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 hover:shadow-md transition-shadow">
                                <div className="bg-teal-100 p-2 rounded-full flex-shrink-0">
                                    <Globe className="h-4 w-4 text-teal-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">International client signed</p>
                                    <p className="text-xs text-gray-500 mt-1">Sales Department • 3 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400 hover:shadow-md transition-shadow">
                                <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0">
                                    <BookOpen className="h-4 w-4 text-indigo-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">Training module updated</p>
                                    <p className="text-xs text-gray-500 mt-1">Learning & Development • 5 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400 hover:shadow-md transition-shadow">
                                <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                                    <Star className="h-4 w-4 text-orange-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">Top performer recognized</p>
                                    <p className="text-xs text-gray-500 mt-1">Finance Department • 2 days ago</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Sidebar - Stacks on mobile */}
                    <div className="xl:col-span-1 space-y-6">

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Target className="h-5 w-5 mr-2 text-green-600" />
                                Quick Actions
                            </h3>

                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                                    <div className="flex items-center space-x-3">
                                        <UserPlus className="h-5 w-5 text-blue-600" />
                                        <span className="text-blue-700 font-medium text-sm">Add Employee</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                                    <div className="flex items-center space-x-3">
                                        <Building2 className="h-5 w-5 text-green-600" />
                                        <span className="text-green-700 font-medium text-sm">Create Department</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
                                    <div className="flex items-center space-x-3">
                                        <BarChart3 className="h-5 w-5 text-purple-600" />
                                        <span className="text-purple-700 font-medium text-sm">Generate Report</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <button className="w-full flex items-center justify-between p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors group">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-5 w-5 text-yellow-600" />
                                        <span className="text-yellow-700 font-medium text-sm">Schedule Review</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <Bell className="h-5 w-5 mr-2 text-red-500" />
                                    Alerts
                                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                                    <p className="text-sm font-medium text-red-800">Contract Expiring</p>
                                    <p className="text-xs text-red-600 mt-1">John Doe - 7 days left</p>
                                </div>

                                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                    <p className="text-sm font-medium text-yellow-800">Pending Approvals</p>
                                    <p className="text-xs text-yellow-600 mt-1">5 leave requests</p>
                                </div>

                                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                                    <p className="text-sm font-medium text-blue-800">Reviews Due</p>
                                    <p className="text-xs text-blue-600 mt-1">12 performance reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* System Status with Visual Indicators */}
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <PieChart className="h-5 w-5 mr-2 text-green-600" />
                                System Health
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-700">Database</span>
                                    </div>
                                    <span className="text-xs text-green-600 font-medium">Online</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-700">Backup</span>
                                    </div>
                                    <span className="text-xs text-green-600 font-medium">Active</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Last Sync</span>
                                    <span className="text-xs text-gray-500">2 min ago</span>
                                </div>

                                {/* System Performance Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-gray-700 mb-1">
                                        <span>System Performance</span>
                                        <span>98%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Department Overview - Fully Responsive Cards */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                            Department Overview
                        </h3>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center self-start sm:self-auto">
                            View All Details <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        <div className="relative p-4 lg:p-6 rounded-lg border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-4 right-4 bg-blue-100 p-2 rounded-full">
                                <Building2 className="h-5 w-5 text-blue-600" />
                            </div>

                            <h4 className="font-bold text-gray-900 mb-3 text-lg pr-12">Engineering</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Employees</span>
                                    <span className="font-bold text-gray-900">45</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Budget</span>
                                    <span className="font-bold text-gray-900">$850K</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-bold text-blue-700">Excellent</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Growth</span>
                                    <span className="font-bold text-green-600">+8%</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative p-4 lg:p-6 rounded-lg border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-4 right-4 bg-green-100 p-2 rounded-full">
                                <Building2 className="h-5 w-5 text-green-600" />
                            </div>

                            <h4 className="font-bold text-gray-900 mb-3 text-lg pr-12">Marketing</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Employees</span>
                                    <span className="font-bold text-gray-900">28</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Budget</span>
                                    <span className="font-bold text-gray-900">$420K</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-bold text-green-700">Good</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Growth</span>
                                    <span className="font-bold text-green-600">+5%</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-green-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative p-4 lg:p-6 rounded-lg border-l-4 border-purple-500 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-4 right-4 bg-purple-100 p-2 rounded-full">
                                <Building2 className="h-5 w-5 text-purple-600" />
                            </div>

                            <h4 className="font-bold text-gray-900 mb-3 text-lg pr-12">Sales</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Employees</span>
                                    <span className="font-bold text-gray-900">38</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Budget</span>
                                    <span className="font-bold text-gray-900">$650K</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-bold text-purple-700">Excellent</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Growth</span>
                                    <span className="font-bold text-green-600">+12%</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative p-4 lg:p-6 rounded-lg border-l-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute top-4 right-4 bg-yellow-100 p-2 rounded-full">
                                <Building2 className="h-5 w-5 text-yellow-600" />
                            </div>

                            <h4 className="font-bold text-gray-900 mb-3 text-lg pr-12">Human Resources</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Employees</span>
                                    <span className="font-bold text-gray-900">12</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Budget</span>
                                    <span className="font-bold text-gray-900">$280K</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-bold text-yellow-700">Good</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Growth</span>
                                    <span className="font-bold text-green-600">+3%</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: '70%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="text-center py-1">
                    <p className="text-gray-500 text-sm">
                        Employee Management System • Last updated: {new Date().toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;


