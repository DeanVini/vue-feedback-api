import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { NewFeedbackDto } from './dto/new-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('feedbacks')
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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(id, updateFeedbackDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.feedbackService.remove(id);
  }
}