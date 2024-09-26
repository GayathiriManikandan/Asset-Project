import React, { useState } from 'react';
import './totalasset.css'; // Import the CSS file

const TotalAssetPage = () => {
  // State for assets
  const [assets, setAssets] = useState([]);
  const [assetID, setAssetID] = useState('');
  const [assetName, setAssetName] = useState('');
  const [model, setModel] = useState('');
  const [location, setLocation] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editAssetId, setEditAssetId] = useState(null);

  // Asset Form Submission
  const handleAssetSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateAsset(editAssetId, {
        assetID,
        assetName,
        model,
        location,
        purchaseDate,
      });
    } else {
      addAsset({ assetID, assetName, model, location, purchaseDate });
    }
    resetForm();
  };

  // Add asset to the list
  const addAsset = (newAsset) => {
    setAssets([...assets, { id: Date.now(), ...newAsset }]);
  };

  // Update asset details
  const updateAsset = (id, updatedAsset) => {
    setAssets(
      assets.map((asset) => (asset.id === id ? { id, ...updatedAsset } : asset))
    );
    setEditMode(false);
  };

  // Set asset details to form fields for editing
  const editAsset = (asset) => {
    setAssetID(asset.assetID);
    setAssetName(asset.assetName);
    setModel(asset.model);
    setLocation(asset.location);
    setPurchaseDate(asset.purchaseDate);
    setEditMode(true);
    setEditAssetId(asset.id);
    setShowAssetForm(true);
  };

  // Remove asset from the list
  const removeAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  // Reset form fields and states
  const resetForm = () => {
    setAssetID('');
    setAssetName('');
    setModel('');
    setLocation('');
    setPurchaseDate('');
    setShowAssetForm(false);
    setEditMode(false);
    setEditAssetId(null);
  };

  return (
    <div className="total-page">
      {/* Total Assets Heading */}
      <h2 className="total-assets-heading">Total Assets</h2>

      {/* Conditionally render the asset form */}
      {showAssetForm && (
        <div className="form-overlay">
          <form className="add-total-form" onSubmit={handleAssetSubmit}>
            <h2>{editMode ? 'Edit Asset' : 'Add Asset'}</h2>
            <div className="form-fields">
              <div>
                <label>Serial No:</label>
                <input
                  type="text"
                  value={assetID}
                  onChange={(e) => setAssetID(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Model:</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                {editMode ? 'Update' : 'Insert'}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Asset Table */}
      <table className="total-table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Model</th>
            <th>Location</th>
            <th>Purchase Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.assetID}</td>
              <td>{asset.assetName}</td>
              <td>{asset.model}</td>
              <td>{asset.location}</td>
              <td>{asset.purchaseDate}</td>
              <td>
                <button className="edit-button" onClick={() => editAsset(asset)}>
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

          {/* Four Empty Rows Based on Table Heading */}
          {[...Array(4)].map((_, index) => (
            <tr key={`empty-${index}`}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Asset button */}
      <div className="add-total-button-container">
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

export default TotalAssetPage;
