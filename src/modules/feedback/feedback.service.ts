import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { NewFeedbackDto } from './dto/new-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

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
    const feedback: Feedback | null = await this.feedbackRepository.findOne({
      where: {id},
    })

    if (!feedback) {
      throw new NotFoundException(`Não foi possível encontrar o feedback.`);
    }

    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback: Feedback | null = await this.findOne(id)

    if (!feedback) {
      throw new NotFoundException(`Não foi possível encontrar o feedback.`);
    }

    feedback.message = updateFeedbackDto.message;
    feedback.rating = updateFeedbackDto.rating;

    await this.entityManager.save(feedback);
  }
}