// src/components/TripPlanner.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateJourney from "../component/CreateJourney";

const BASE_URL = "https://ziyaarah.vercel.app";

export default function TripPlanner() {
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token"); // Get token from localStorage

    // Load trips from API
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/trips`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    // Create a new trip
    const handleCreateTrip = async (newTrip) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/trips`, newTrip, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setTrips([...trips, response.data]); // Add the new trip
            setShowCreateModal(false);
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Trip Planner</h1>
                        <p className="text-sm text-gray-500">Plan and organize your spiritual journey</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        <span>+</span>
                        <span>New Journey</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {loading ? (
                    <p className="text-gray-500">Loading trips...</p>
                ) : trips.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">You don't have any trips yet</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Create Your First Journey
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-5 rounded-xl">
                        {trips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                trip={trip}
                                onView={() => navigate(`/trip/${trip.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Create Journey Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <CreateJourney
                            onSubmit={handleCreateTrip}
                            onCancel={() => setShowCreateModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function TripCard({ trip, onView }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{trip.title}</h3>
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full mt-1">
                            {trip.type}
                        </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${trip.status === "Active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                        }`}>
                        {trip.status}
                    </span>
                    <button
                        onClick={onView}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                        View Trip
                    </button>
                </div>

                <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <span>{trip.startDate}</span>
                    <span>{trip.endDate}</span>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Progress</span>
                        <span className="font-medium">{trip.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${trip.progress || 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
