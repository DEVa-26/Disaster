import React, { useState } from "react";
import { Search, Download, Edit } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ResourceManagement: React.FC = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: "Ambulance",
      count: 45,
      available: 32,
      deployed: 13,
      lastUpdated: "30 Mar 2025, 09:15 AM",
    },
    {
      id: 2,
      name: "Fire Truck",
      count: 28,
      available: 20,
      deployed: 8,
      lastUpdated: "30 Mar 2025, 08:45 AM",
    },
    {
      id: 3,
      name: "Helicopter Rescue",
      count: 6,
      available: 3,
      deployed: 3,
      lastUpdated: "29 Mar 2025, 06:30 PM",
    },
    {
      id: 4,
      name: "Earth Movers",
      count: 12,
      available: 10,
      deployed: 2,
      lastUpdated: "30 Mar 2025, 07:20 AM",
    },
    {
      id: 5,
      name: "Search and Rescue Team",
      count: 22,
      available: 15,
      deployed: 7,
      lastUpdated: "30 Mar 2025, 08:00 AM",
    },
    {
      id: 6,
      name: "First Aid Team",
      count: 34,
      available: 25,
      deployed: 9,
      lastUpdated: "30 Mar 2025, 08:00 AM",
    },
    {
      id: 7,
      name: "Rescue Boats",
      count: 18,
      available: 14,
      deployed: 4,
      lastUpdated: "30 Mar 2025, 08:00 AM",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    count: "",
    available: "",
    deployed: "",
  });

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  // New function to start editing a resource
  const handleEdit = (resource: any) => {
    setEditForm({
      count: resource.count.toString(),
      available: resource.available.toString(),
      deployed: resource.deployed.toString(),
    });
    setEditMode(resource.id);
  };

  const handleSave = (id: number) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id
          ? {
              ...resource,
              count: Number(editForm.count),
              available: Number(editForm.available),
              deployed: Number(editForm.deployed),
              lastUpdated: new Date().toLocaleString(),
            }
          : resource
      )
    );
    setEditMode(null);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Resource Name", "Total Units", "Available Units", "Deployed Units", "Last Updated"];
    const tableRows: (string | number)[][] = [];

    resources.forEach((resource) => {
      const resourceData = [
        resource.name,
        resource.count,
        resource.available,
        resource.deployed,
        resource.lastUpdated,
      ];
      tableRows.push(resourceData);
    });

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.text("Resource Management Report", 14, 15);
    doc.save(`resource_management_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Resource Management</h1>
      <p className="mb-4">Manage and track all disaster response resources</p>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search resources..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-black bg-white"
          />
        </div>
        <button onClick={handleExportPDF} className="bg-green-500 text-white px-4 py-2 rounded-lg">
          <Download className="inline-block mr-2" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {resources
          .filter((resource) => resource.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((resource) => (
            <div key={resource.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              {editMode === resource.id ? (
                <div>
                  <h2 className="text-xl font-semibold text-white">{resource.name}</h2>
                  {['count', 'available', 'deployed'].map((field) => (
                    <div key={field} className="mt-2">
                      <label className="text-white">{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                      <input
                        type="number"
                        name={field}
                        value={(editForm as any)[field]}
                        onChange={handleEditFormChange}
                        className="w-full px-2 py-1 mt-1 rounded-lg border border-gray-300 text-black bg-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => setEditMode(null)} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
                    <button onClick={() => handleSave(resource.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-white">{resource.name}</h2>
                    <button 
                      onClick={() => handleEdit(resource)} 
                      className="text-blue-400 hover:text-blue-300 p-1"
                      aria-label="Edit resource"
                    >
                      <Edit size={18} />
                    </button>
                  </div>
                  <p className="text-white">Total Units: {resource.count}</p>
                  <p className="text-white">Available Units: {resource.available}</p>
                  <p className="text-white">Deployed Units: {resource.deployed}</p>
                  <p className="text-gray-400 text-sm">Last Updated: {resource.lastUpdated}</p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ResourceManagement;