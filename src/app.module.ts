import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    FeedbackModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
})
export class AppModule {}
