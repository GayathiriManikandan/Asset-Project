import React, { useState } from 'react';
import './utilizeasset.css';

const UtilizationPage = () => {
  const [assets, setAssets] = useState([]); // State for assets
  const [serialNumber, setSerialNumber] = useState(''); // State for serial number
  const [assetName, setAssetName] = useState(''); // State for asset name
  const [assetModel, setAssetModel] = useState(''); // State for asset model
  const [issued, setIssued] = useState(false); // State for issued status
  const [issuedDate, setIssuedDate] = useState(''); // State for issued date
  const [notIssued, setNotIssued] = useState(false); // State for not issued status
  const [purchasedDate, setPurchasedDate] = useState(''); // State for purchase date
  const [returned, setReturned] = useState(false); // State for returned status
  const [returnedDate, setReturnedDate] = useState(''); // State for returned date
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState(null); // Track asset being edited

  // Asset Handlers
  const handleAssetSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateAsset(editingAssetId, {
        serialNumber,
        assetName,
        assetModel,
        issued,
        issuedDate,
        notIssued,
        purchasedDate,
        returned,
        returnedDate,
      });
    } else {
      addAsset({
        serialNumber,
        assetName,
        assetModel,
        issued,
        issuedDate,
        notIssued,
        purchasedDate,
        returned,
        returnedDate,
      });
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
    setSerialNumber(asset.serialNumber);
    setAssetName(asset.assetName);
    setAssetModel(asset.assetModel);
    setIssued(asset.issued);
    setIssuedDate(asset.issuedDate);
    setNotIssued(asset.notIssued);
    setPurchasedDate(asset.purchasedDate);
    setReturned(asset.returned);
    setReturnedDate(asset.returnedDate);
    setIsEditing(true);
    setEditingAssetId(asset.id);
    setShowAssetForm(true);
  };

  const removeAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const resetAssetForm = () => {
    setSerialNumber('');
    setAssetName('');
    setAssetModel('');
    setIssued(false);
    setIssuedDate('');
    setNotIssued(false);
    setPurchasedDate('');
    setReturned(false);
    setReturnedDate('');
    setIsEditing(false);
    setEditingAssetId(null);
    setShowAssetForm(false);
  };

  return (
    <div className="update-page">
      <h1>Manage Assets Utilization</h1>

      {/* Asset Form */}
      {showAssetForm && (
        <div className="form-overlay">
          <form className="add-asset-form" onSubmit={handleAssetSubmit}>
            <h2>{isEditing ? 'Edit Asset Utilization' : 'Add Asset Utilization'}</h2>
            <div className="form-fields">
              <div>
                <label>Serial Number:</label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Assets:</label>
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
                <label>Issued:</label>
                <input
                  type="checkbox"
                  checked={issued}
                  onChange={(e) => setIssued(e.target.checked)}
                />
              </div>
              <div>
                <label>Issued Date:</label>
                <input
                  type="date"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                />
              </div>
              <div>
                <label>Not Issued:</label>
                <input
                  type="checkbox"
                  checked={notIssued}
                  onChange={(e) => setNotIssued(e.target.checked)}
                />
              </div>
              <div>
                <label>Purchased Date:</label>
                <input
                  type="date"
                  value={purchasedDate}
                  onChange={(e) => setPurchasedDate(e.target.value)}
                />
              </div>
              <div>
                <label>Returned:</label>
                <input
                  type="checkbox"
                  checked={returned}
                  onChange={(e) => setReturned(e.target.checked)}
                />
              </div>
              <div>
                <label>Returned Date:</label>
                <input
                  type="date"
                  value={returnedDate}
                  onChange={(e) => setReturnedDate(e.target.value)}
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

      {/* Assets Utilization Table */}
      <table className="asset-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Assets</th>
            <th>Asset Model</th>
            <th>Issued</th>
            <th>Issued Date</th>
            <th>Not Issued</th>
            <th>Purchased Date</th>
            <th>Returned</th>
            <th>Returned Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.serialNumber}</td>
              <td>{asset.assetName}</td>
              <td>{asset.assetModel}</td>
              <td>{asset.issued ? 'Yes' : 'No'}</td>
              <td>{asset.issuedDate}</td>
              <td>{asset.notIssued ? 'Yes' : 'No'}</td>
              <td>{asset.purchasedDate}</td>
              <td>{asset.returned ? 'Yes' : 'No'}</td>
              <td>{asset.returnedDate}</td>
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
          Add Asset Utilization
        </button>
      </div>
    </div>
  );
};

export default UtilizationPage;
