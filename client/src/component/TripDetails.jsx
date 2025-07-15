import React, { useEffect, useState } from "react";
import OverviewTab from "./OverviewTab";
import RitualsTab from "./RitualsTab";
import PackingTab from "./PackingTab";
import NotesTab from "./NotesTab";
import TripHeader from "./TripHeader";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const tabs = ["Overview", "Rituals", "Packing", "Notes"];

export default function TripDetails() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [trip, setTrip] = useState(null);
    const { tripId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await axios.get(`/api/trips/${tripId}`);
                setTrip(res.data);
            } catch (error) {
                console.error("Error fetching trip:", error);
            }
        };
        fetchTrip();
    }, [tripId]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "Overview":
                return <OverviewTab tripId={tripId} />;
            case "Rituals":
                return <RitualsTab tripId={tripId} />;
            case "Packing":
                return <PackingTab tripId={tripId} />;
            case "Notes":
                return <NotesTab tripId={tripId} />;
            default:
                return null;
        }
    };

    const handleBack = () => {
        // Try to go back in history, fallback to home if no history
        window.history.state?.idx > 0 ? navigate(-1) : navigate('/');
    };

    return (
        <>
            <button
                onClick={handleBack}
                className="mb-4 flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Trips
            </button>

            <div className="p-4 max-w-full sm:max-w-6xl mx-auto">
                {tripId && <TripHeader tripId={tripId} />}
                <div className="flex flex-wrap sm:flex-nowrap space-x-4 mt-4 border-b pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-medium text-sm sm:text-base ${activeTab === tab
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="mt-6">{renderTabContent()}</div>
            </div>
        </>
    );
}
