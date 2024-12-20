// File: App.js
import React, { useState, useEffect } from 'react';
import '../Styles/AttractionsManagement.css';

const AttractionsManagement = () => {
  const [attractions, setAttractions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    phone: '',
    openingHours: '',
    rating: '',
    img_url: ''
  });

  useEffect(() => {
    fetch('/attraction/getAllAttraction')
      .then(res => res.json())
      .then(data => setAttractions(data))
      .catch(err => console.error(err));

      fetch('/location/allLocation')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (attraction_id) => {
    fetch(`/attraction/deleteAttractions/${attraction_id}`, {
      method: 'POST'
    })
      .then(() => setAttractions(attractions.filter(attraction => attraction.attraction_id !== attraction_id)))
      .catch(err => console.error(err));
  };

  const handleEdit = (attraction, attraction_id ) => {
    setEditingAttraction(attraction_id );
    setFormData(attraction);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingAttraction(null);
    setFormData({
      name: '',
      description: '',
      location: '',
      phone: '',
      openingHours: '',
      rating: '',
      img_url: ''
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    const method = 'POST';
    const url = editingAttraction ? `/attraction/updateAttractions/${editingAttraction}` : '/attraction/addAttractions';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (editingAttraction) {
          setAttractions(attractions.map(attraction => (attraction.attraction_id === data.attraction_id ? data : attraction)));
        } else {
          setAttractions([...attractions, data]);
        }
        setDialogOpen(false);
      })
      .catch(err => console.error(err));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const attractionsPerPage = 6;
  const indexOfLastAttraction = currentPage * attractionsPerPage;
  const indexOfFirstAttraction = indexOfLastAttraction - attractionsPerPage;
  const currentAttractions = attractions.slice(indexOfFirstAttraction, indexOfLastAttraction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="attracManage">
      <header className="attracManage-header">
        <h1>Attractions Management</h1>
        <button className="add-button" onClick={handleAdd}>Add Attraction</button>
      </header>
      <main>
        {currentAttractions.map(attraction => (
          <div key={attraction.attraction_id} className="attraction-card">
            <img src={attraction.img_url} alt={attraction.attraction_name} className="attraction-image" />
            <h2>{attraction.attraction_name}</h2>
            <p class="attraction-description">{attraction.description}</p>
            <p><b>Location:</b> {attraction.location_name}</p>
            <p><b>Phone:</b> {attraction.contact}</p>
            <div className="action-buttons">
              <button onClick={() => handleEdit({
                  name: attraction.attraction_name,
                  description: attraction.description,
                  location: attraction.location_name,
                  phone: attraction.contact,
                  openingHours: attraction.opening_hours,
                  rating: attraction.rating,
                  img_url: attraction.img_url
              },attraction.attraction_id )}>Edit</button>
              <button onClick={() => handleDelete(attraction.attraction_id)}>Delete</button>
            </div>
          </div>
        ))}
      </main>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(attractions.length / attractionsPerPage) }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === Math.ceil(attractions.length / attractionsPerPage)}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
</div>
      {dialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>{editingAttraction ? 'Edit Attraction' : 'Add Attraction'}</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              <option value="">Select Location</option>
              {locations.map(location => (
                <option key={location.location_id} value={location.location_name}>
                  {location.location_name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Opening Hours"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
            />
            <input
              type="number"
              placeholder="Rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.img_url}
              onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
            />
            <button onClick={handleSubmit}>{editingAttraction ? 'Save Changes' : 'Add Attraction'}</button>
            <button onClick={() => setDialogOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttractionsManagement;
