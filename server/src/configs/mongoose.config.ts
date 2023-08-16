import { ConfigModule, ConfigService } from '@nestjs/config';

export const mongooseConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
  }),
  inject: [ConfigService],
};
