import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { NewFeedbackDto } from './dto/new-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() newFeedbackDto: NewFeedbackDto) {
    return this.feedbackService.create(newFeedbackDto);
  }

  @Get()
  async findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.feedbackService.findOne(id);
  }
}