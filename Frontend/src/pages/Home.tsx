import React, { useState } from 'react';
import { adService, userService, Ad, User } from '../services/api';
import SearchResults from './SearchResults';
import SellerModal from './SellerModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Ad[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sellerAds, setSellerAds] = useState<Ad[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const response = await adService.search(searchTerm);
      setResults(response.data);
      setCount(response.count);
    } catch (error) {
      console.error('Search error:', error);
      alert('Error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const handleViewSeller = async (userId: number) => {
    try {
      const data = await userService.getUserById(userId);
      setSelectedUser(data.user);
      setSellerAds(data.ads);
      setShowModal(true);
    } catch (error) {
      console.error('Error loading seller details:', error);
      alert('Error loading seller details');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSellerAds([]);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">📦 Ad Search React</span>
        </div>
      </nav>

      <main className="pb-5" style={{ minHeight: '100vh' }}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <h1 className="mb-4">🔍 Search Ads</h1>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">🔎 Search for Ads</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSearch}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search by title, description, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn btn-primary btn-lg" type="submit">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <SearchResults
            results={results}
            count={count}
            searchTerm={searchTerm}
            onViewSeller={handleViewSeller}
            loading={loading}
          />
        </div>
      </main>

      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container text-center">
          <p>&copy; 2024 Ad Search React Application. All rights reserved.</p>
        </div>
      </footer>

      <SellerModal user={selectedUser} ads={sellerAds} onClose={handleCloseModal} show={showModal} />
    </>
  );
};

export default Home;
