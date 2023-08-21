import { Schema } from 'mongoose';
import { ERole } from '../enums/role.enum';

export const UsersSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  role: { type: Number, enum: ERole, default: ERole.USER, required: true },
  username: { type: String, required: false },
  password: { type: String, required: true, select: false },
});
