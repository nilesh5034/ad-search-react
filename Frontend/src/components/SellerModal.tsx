import React from 'react';
import { User, Ad } from '../services/api';

interface SellerModalProps {
  user: User | null;
  ads: Ad[];
  onClose: () => void;
  show: boolean;
}

const SellerModal: React.FC<SellerModalProps> = ({ user, ads, onClose, show }) => {
  if (!show || !user) return null;

  const createdDate = new Date(user.createdDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className="modal fade show"
      style={{ display: show ? 'block' : 'none' }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">👤 Seller Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-8">
                <h5>{user.fullName}</h5>
                <p className="text-muted">@{user.username}</p>
              </div>
              <div className="col-md-4 text-end">
                <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  <strong>Email:</strong>
                </label>
                <p>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <strong>City:</strong>
                </label>
                <p>{user.city}</p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  <strong>Member Since:</strong>
                </label>
                <p>{createdDate}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <strong>User ID:</strong>
                </label>
                <p>{user.id}</p>
              </div>
            </div>

            <hr />
            <h6>Posted Ads</h6>
            {ads.length > 0 ? (
              <div className="row">
                {ads.map((ad) => {
                  const adDate = new Date(ad.createdDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });
                  return (
                    <div key={ad.id} className="col-md-6 mb-2">
                      <div className="card">
                        <div className="card-body p-2">
                          <h6 className="card-title">{ad.title}</h6>
                          <p className="card-text text-muted small">{ad.description}</p>
                          <div className="d-flex justify-content-between">
                            <span className="badge bg-secondary">{ad.category}</span>
                            <span className="text-success fw-bold">${ad.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="alert alert-info mb-0">This seller has not posted any ads yet.</div>
            )}
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default SellerModal;
