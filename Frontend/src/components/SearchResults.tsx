import React, { useState } from 'react';
import { adService, Ad } from '../services/api';

interface SearchResultsProps {
  results: Ad[];
  count: number;
  searchTerm: string;
  onViewSeller: (userId: number) => void;
  loading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  count,
  searchTerm,
  onViewSeller,
  loading,
}) => {
  return (
    <div className="mt-4">
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Searching...</p>
        </div>
      )}

      {!loading && count > 0 && (
        <>
          <div className="alert alert-info">
            Found <strong>{count}</strong> ad(s) matching "<strong>{searchTerm}</strong>"
          </div>
          <div className="row">
            {results.map((ad) => {
              const createdDate = new Date(ad.createdDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div key={ad.id} className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm" style={{ transition: 'all 0.3s ease' }}>
                    <div className="card-body">
                      <h5 className="card-title">{ad.title}</h5>
                      <p className="card-text text-muted">{ad.description}</p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-secondary">{ad.category}</span>
                        <span className="h5 mb-0 text-success">${ad.price.toFixed(2)}</span>
                      </div>
                      <small className="text-muted d-block mb-3">Posted: {createdDate}</small>
                    </div>
                    <div className="card-footer bg-white">
                      <button
                        className="btn btn-sm btn-info w-100"
                        onClick={() => onViewSeller(ad.userId)}
                      >
                        View Seller
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!loading && count === 0 && searchTerm && (
        <div className="alert alert-warning">
          <h5>No ads found</h5>
          <p>Try searching with different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
