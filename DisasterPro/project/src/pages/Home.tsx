import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?disaster,aid,help')" }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Section */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl text-center shadow-lg text-white max-w-lg">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to DisasterPro</h1>
        <p className="text-lg mb-6">
          Government departments and NGOs must register before accessing the website.
        </p>
        <div className="flex justify-center gap-4">
         
          <button
            className="bg-purple-600 px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            onClick={() => navigate('/login')}
          >
            Register/Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;