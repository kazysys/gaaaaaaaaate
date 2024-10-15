import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  machines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' }],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
