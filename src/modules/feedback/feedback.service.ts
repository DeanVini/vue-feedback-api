import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { NewFeedbackDto } from './dto/new-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly entityManager: EntityManager
  ) {}

  async create(newFeedbackDto: NewFeedbackDto) {
    const feedback = new Feedback(newFeedbackDto);
    await this.entityManager.save(feedback);
  }

  async findAll(){
    return this.feedbackRepository.find()
  }

  async findOne(id: number) {
    return this.feedbackRepository.findOne({
      where: {id},
    })
  }
}