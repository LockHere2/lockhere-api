import moment from 'moment';
import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    maxlength: 11
  },
  born: {
    type: Date,
    required: true
  }
});

export default mongoose.model('User', userSchema);
