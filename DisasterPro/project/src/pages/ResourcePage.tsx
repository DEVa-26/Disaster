import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const resourcesData = [
  {
    name: "Earthquake Response",
    image: "https://images.unsplash.com/photo-1607083204094-712d92d78f64?auto=format&fit=crop&w=600&q=80",
    resources: [
      { type: "Medical Units", quantity: 10 },
      { type: "Rescue Teams", quantity: 5 },
      { type: "Food Supplies", quantity: "500 Packs" },
    ],
  },
  {
    name: "Flood Relief",
    image: "https://images.unsplash.com/photo-1577985051167-d38e80a07b26?auto=format&fit=crop&w=600&q=80",
    resources: [
      { type: "Rescue Boats", quantity: 8 },
      { type: "Emergency Shelters", quantity: 20 },
      { type: "Water Bottles", quantity: "1000 Litres" },
    ],
  },
  {
    name: "Wildfire Support",
    image: "https://images.unsplash.com/photo-1591644911364-c7f82c4b79b3?auto=format&fit=crop&w=600&q=80",
    resources: [
      { type: "Firefighters", quantity: 15 },
      { type: "Fire Trucks", quantity: 6 },
      { type: "Protective Gear", quantity: "300 Sets" },
    ],
  },
];

const ResourcePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Disaster Response Resources</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resourcesData.map((disaster, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={disaster.image} alt={disaster.name} className="w-full h-48 object-cover" />
              
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{disaster.name}</h2>
                <ul className="space-y-2">
                  {disaster.resources.map((resource, idx) => (
                    <li key={idx} className="text-lg">
                      🔹 <strong>{resource.type}:</strong> {resource.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        
       
      </div>
    </div>
  );
};

export default ResourcePage;