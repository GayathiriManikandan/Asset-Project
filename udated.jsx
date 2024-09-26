import React, { useState } from 'react';
import './update.css';

const UpdatePage = () => {
  const [assets, setAssets] = useState([]); // State for assets
  const [assetID, setAssetID] = useState(''); // State for asset ID
  const [assetName, setAssetName] = useState(''); // State for asset name
  const [assetModel, setAssetModel] = useState(''); // State for asset model
  const [status, setStatus] = useState(''); // State for asset status
  const [assignedLocation, setAssignedLocation] = useState(''); // State for assigned location
  const [purchaseDate, setPurchaseDate] = useState(''); // State for purchase date
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState(null); // Track asset being edited

  // Asset Handlers
  const handleAssetSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateAsset(editingAssetId, { assetID, assetName, assetModel, status, assignedLocation, purchaseDate });
    } else {
      addAsset({ assetID, assetName, assetModel, status, assignedLocation, purchaseDate });
    }
    resetAssetForm();
  };

  const addAsset = (newAsset) => {
    setAssets([...assets, { id: Date.now(), ...newAsset }]);
  };

  const updateAsset = (id, updatedAsset) => {
    setAssets(
      assets.map((asset) =>
        asset.id === id ? { ...asset, ...updatedAsset } : asset
      )
    );
  };

  const editAsset = (asset) => {
    setAssetID(asset.assetID);
    setAssetName(asset.assetName);
    setAssetModel(asset.assetModel);
    setStatus(asset.status);
    setAssignedLocation(asset.assignedLocation);
    setPurchaseDate(asset.purchaseDate);
    setIsEditing(true);
    setEditingAssetId(asset.id);
    setShowAssetForm(true);
  };

  const removeAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const resetAssetForm = () => {
    setAssetID('');
    setAssetName('');
    setAssetModel('');
    setStatus('');
    setAssignedLocation('');
    setPurchaseDate('');
    setIsEditing(false);
    setEditingAssetId(null);
    setShowAssetForm(false);
  };

  return (
    <div className="update-page">
      <h1>Updated Assets</h1>

      {/* Asset Form */}
      {showAssetForm && (
        <div className="form-overlay">
          <form className="add-asset-form" onSubmit={handleAssetSubmit}>
            <h2>{isEditing ? 'Edit Asset' : 'Add Asset'}</h2>
            <div className="form-fields">
              <div>
                <label>Asset ID:</label>
                <input
                  type="text"
                  value={assetID}
                  onChange={(e) => setAssetID(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Asset Name:</label>
                <input
                  type="text"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Asset Model:</label>
                <input
                  type="text"
                  value={assetModel}
                  onChange={(e) => setAssetModel(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Assigned Location:</label>
                <input
                  type="text"
                  value={assignedLocation}
                  onChange={(e) => setAssignedLocation(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Purchase Date:</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-buttons">
              <button className="insert-button" type="submit">
                {isEditing ? 'Update' : 'Insert'}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={resetAssetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assets Table */}
      <table className="asset-table">
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Asset Name</th>
            <th>Asset Model</th>
            <th>Status</th>
            <th>Assigned Location</th>
            <th>Purchase Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.assetID}</td>
              <td>{asset.assetName}</td>
              <td>{asset.assetModel}</td>
              <td>{asset.status}</td>
              <td>{asset.assignedLocation}</td>
              <td>{asset.purchaseDate}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => editAsset(asset)}
                >
                  Edit
                </button>
                <button
                  className="remove-button"
                  onClick={() => removeAsset(asset.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to toggle asset form */}
      <div className="add-asset-button-container">
        <button
          className="toggle-form-button"
          onClick={() => setShowAssetForm(true)}
        >
          Add Asset
        </button>
      </div>
    </div>
  );
};

export default UpdatePage;
