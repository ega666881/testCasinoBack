import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type TowerDocument = TowerSession & Document;

@Schema({ timestamps: true })
export class TowerSession {
  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 }) 
  level: number;

  @Prop({ default: 1.0 }) 
  multiplier: number;

  @Prop({ default: false })
  isFinished: boolean;

  @Prop()
  startedAt: Date;
}

export const TowerSessionSchema = SchemaFactory.createForClass(TowerSession);