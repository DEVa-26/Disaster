import React, { useEffect, useState } from "react";

interface Resource {
  type: string;
  quantity: number | string;
}

interface ImageResult {
  severity: "Little to None" | "Mild" | "Severe";
  type: string;
  image: string;
}

const ResourcePage = () => {
  const [resourcesData, setResourcesData] = useState<
    { name: string; image: string; resources: Resource[] }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("imageResults");
    if (storedResults) {
      const imageResults: ImageResult[] = JSON.parse(storedResults);
      const dynamicResources = imageResults.map((result) => {
        let resources: Resource[];
        switch (result.severity) {
          case "Severe":
            resources = [
              { type: "Medical Units", quantity: 15 },
              { type: "Rescue Teams", quantity: 10 },
              { type: "Food Supplies", quantity: "1000 Packs" },
            ];
            break;
          case "Mild":
            resources = [
              { type: "Medical Units", quantity: 5 },
              { type: "Rescue Teams", quantity: 3 },
              { type: "Food Supplies", quantity: "300 Packs" },
            ];
            break;
          default:
            resources = [
              { type: "Medical Units", quantity: 0 },
              { type: "Rescue Teams", quantity: 0 },
              { type: "Food Supplies", quantity: "0 Packs" },
            ];
            break;
        }
        return {
          name: `${result.type} Response`,
          image: result.image,
          resources,
        };
      });
      setResourcesData(dynamicResources);
      localStorage.removeItem("imageResults");
    }
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-9">
          Allocation of Resources
        </h1>

        {resourcesData.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resourcesData.map((disaster, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={disaster.image}
                  alt={disaster.name}
                  className="w-full h-48 object-cover cursor-pointer" // Ensure image fills height
                  onClick={() => {
                    setSelectedImage(disaster.image);
                    setIsModalOpen(true);
                  }}
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    {disaster.name}
                  </h2>
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
        ) : (
          <p className="text-gray-400 text-center">
            No resources available. Please analyze a disaster first.
          </p>
        )}

        {/* Modal with Fixed Size Image */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <div className="w-[800px] h-[600px] bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Full size"
                  className="w-full h-full object-cover" // Use object-cover to fill the modal
                />
              </div>
              <button
                className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcePage;
