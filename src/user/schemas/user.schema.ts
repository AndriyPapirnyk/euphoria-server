import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: false })
  password: string;

  @Prop({ required: true, unique: false })
  img: string;

  @Prop({ required: true, unique: false })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);