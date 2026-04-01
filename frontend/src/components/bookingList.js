import React, { useEffect, useState } from 'react';
import BookingForm from './bookingForm';
import './bookingPage.css';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/bookings');
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleMarkCancelled = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Cancelled',
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(errorText);
        alert('Update failed');
        return;
      }

      fetchBookings();
    } catch (error) {
      console.error(error);
      alert('Error updating booking');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/bookings/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to delete booking');
        return;
      }

      fetchBookings();
    } catch (error) {
      console.error(error);
      alert('Error deleting booking');
    }
  };


  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="event-card">
          <img
            className="event-image"
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80"
            alt="National Music Festival"
          />

          <div className="event-content">
            <h1>National Music Festival</h1>
            <p className="event-tagline">Live music experience in Brisbane</p>

            <div className="event-info-group">
              <div className="event-info-item">
                <span className="event-label">Date</span>
                <span className="event-value">Monday, December 24, 2026</span>
              </div>

              <div className="event-info-item">
                <span className="event-label">Time</span>
                <span className="event-value">18:00 - 23:00</span>
              </div>

              <div className="event-info-item">
                <span className="event-label">Location</span>
                <span className="event-value">Sunnybank, Brisbane, AU</span>
              </div>

              <div className="event-info-item">
                <span className="event-label">Price</span>
                <span className="event-value">$50.00</span>
              </div>
            </div>

            <p className="event-description">
              Enjoy an unforgettable night of live performances, vibrant crowds,
              and festival energy.
            </p>
          </div>
        </div>

        <BookingForm onBookingCreated={fetchBookings} />
      </div>

      <div className="booking-list-card">
        <div className="section-header">
          <h2>Booking List</h2>
          <p>View all created bookings below</p>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">No bookings yet.</div>
        ) : (
          <div className="booking-list">
            {bookings.map((b) => (
              <div className="booking-item" key={b._id}>
                <div className="booking-item-main">
                  <h3>{b.eventName}</h3>
                  <p><strong>Customer:</strong> {b.customerName}</p>
                  <p><strong>Tickets:</strong> {b.ticketQuantity}</p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {b.bookingDate
                      ? new Date(b.bookingDate).toLocaleDateString()
                      : '-'}
                  </p>
                </div>

                <div className="booking-item-side">
                 <span className={`status-badge status-${String(b.status || '').toLowerCase()}`}>
                   {b.status}
                </span>

                <button
                    className="update-btn"
                    onClick={() => handleMarkCancelled(b._id)}
                >
                Cancel
                </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(b._id)}
  >
    Delete
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingList;