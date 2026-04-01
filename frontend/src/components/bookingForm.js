import React, { useState } from 'react';
import './bookingPage.css';

function BookingForm({ onBookingCreated }) {
  const [formData, setFormData] = useState({
    eventName: 'National Music Festival',
    customerName: '',
    ticketQuantity: 1,
    bookingDate: '2026-12-24',
    status: 'Confirmed',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const increaseQuantity = () => {
    setFormData({
      ...formData,
      ticketQuantity: Number(formData.ticketQuantity) + 1,
    });
  };

  const decreaseQuantity = () => {
    const nextValue = Math.max(1, Number(formData.ticketQuantity) - 1);
    setFormData({
      ...formData,
      ticketQuantity: nextValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: formData.eventName,
          customerName: formData.customerName,
          ticketQuantity: Number(formData.ticketQuantity),
          bookingDate: formData.bookingDate,
          status: formData.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to create booking');
        return;
      }

      alert('Booking created');

      setFormData({
        eventName: 'National Music Festival',
        customerName: '',
        ticketQuantity: 1,
        bookingDate: '2026-12-24',
        status: 'Confirmed',
      });

      if (onBookingCreated) {
        onBookingCreated(data);
      }
    } catch (error) {
      console.error(error);
      alert('Error creating booking');
    }
  };

  return (
    <div className="booking-form-card">
      <div className="section-header">
        <h2>Book Event</h2>
        <p>Complete your booking details</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="ticket-tabs">
          <button type="button" className="ticket-tab active">
            Economy
          </button>
          <button type="button" className="ticket-tab">
            VIP
          </button>
        </div>

        <div className="quantity-box">
          <label>Choose number of seats</label>
          <div className="quantity-control">
            <button type="button" onClick={decreaseQuantity}>
              −
            </button>
            <span>{formData.ticketQuantity}</span>
            <button type="button" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Event Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Booking Date</label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="terms-box">
          <input type="checkbox" checked readOnly />
          <span>
            I accept the Booking Terms of Service, Community Guidelines, and
            Privacy Policy.
          </span>
        </div>

        <button type="submit" className="primary-btn">
          Continue - ${(Number(formData.ticketQuantity) * 50).toFixed(2)}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;