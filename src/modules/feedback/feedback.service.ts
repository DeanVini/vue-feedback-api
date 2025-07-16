import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { NewFeedbackDto } from './dto/new-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageDto } from './dto/page.dto';

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

  async findAll(limit: number = 10, page: number = 1) {
    const query = this.feedbackRepository.createQueryBuilder('feedback')
    const itemCount = await query.getCount()
    const offset = Math.max(0, (page - 1) * limit);

    query
      .orderBy('feedback.createdAt')
      .skip(offset)
      .take(limit)

    const { entities } = await query.getRawAndEntities()
    const pageMetaDto = new PageMetaDto({ page, limit, itemCount });

    return new PageDto(entities, pageMetaDto);
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

  async remove(id: number) {
    await this.feedbackRepository.delete(id);
  }
}