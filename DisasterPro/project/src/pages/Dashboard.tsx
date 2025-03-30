import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [resourceType, setResourceType] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleResourceSubmit = () => {
    if (resourceType && quantity) {
      alert(`Allocated ${quantity} ${resourceType}(s) successfully!`);
      setResourceType('');
      setQuantity('');
    } else {
      alert('Please select a resource and enter a valid quantity.');
    }
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1547683905-f686c993c794?auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      
      <div className="relative text-center text-white px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mr-4" />
          <h1 className="text-6xl md:text-7xl font-bold">
            Disaster Management Pro
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-200">
          Your comprehensive solution for disaster management and response coordination. 
          We help organizations prepare, respond, and recover from emergencies.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/disaster-identifier">
            <Button variant="emergency" size="lg" className="text-lg px-8 py-6">
              Identify Disaster
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 border-white">
              Emergency Login
            </Button>
          </Link>
        </div>

        {/* Government Resource Allocation Section */}
        <div className="bg-black/60 p-8 rounded-lg shadow-lg text-left max-w-lg mx-auto mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-white">Government Resource Allocation</h2>
          
          <div className="mb-5">
            <label className="block text-lg mb-2 text-gray-300">Select Resource Type:</label>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Resource --</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Food Kits">Food Kits</option>
              <option value="Rescue Teams">Rescue Teams</option>
              <option value="Shelter Tents">Shelter Tents</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2 text-gray-300">Enter Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
          </div>

          <Button 
            onClick={handleResourceSubmit} 
            variant="primary" 
            size="lg" 
            className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700"
          >
            Allocate Resource
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;