const Booking = require('./bookingModel');

// Create
exports.createBooking = async (req, res) => {
    try{
      const booking = await Booking.create(req.body);
      res.status(201).json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message});
    }
};

// Read all 
exports.getBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};

// Read one
exports.getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  res.json(booking);
};

// Update
exports.updateBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true});
  res.json(booking);
};

// Delete
exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted'});
};

