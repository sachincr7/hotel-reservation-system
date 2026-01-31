import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService: ConfigService) => ({
  type: 'postgres' as const,
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port'),
  username: configService.get<string>('database.user'),
  password: configService.get<string>('database.password'),
  database: configService.get<string>('database.name'),
  autoLoadEntities: true,
  synchronize: false,
});
