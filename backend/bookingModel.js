const mongoose = require ('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        eventName :{ type: String, required: true },
        customerName:{ type: String, required: true },
        ticketQuantity:{ type: Number, required: true },
        bookingDate:{ type: Date, required: true },
        status: {
          type: String,
          enum : ['Pending', 'Confirmed', 'Cancelled'],
          default: 'Pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);