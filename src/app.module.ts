import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
