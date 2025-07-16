import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { NewFeedbackDto } from './dto/new-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly entityManager: EntityManager
  ) {}

  async create(newFeedbackDto: NewFeedbackDto) {
    const feedback = new Feedback(newFeedbackDto);
    await this.entityManager.save(feedback);
  }
}