import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    members: { type: Number, default: 0 },
    goal: { type: String, default: 'Stay active' },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
