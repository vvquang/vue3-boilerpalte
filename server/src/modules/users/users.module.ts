import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
