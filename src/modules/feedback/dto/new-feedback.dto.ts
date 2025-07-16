import { IsInt, Min, Max, IsString, IsEmail } from 'class-validator';
import { Feedback } from '../entities/feedback.entity';


export class NewFeedbackDto {
  @IsString()
  customerName: string

  @IsEmail({}, {message: 'Por favor, insira um e-mail válido!'})
  customerEmail: string

  @IsString()
  message: string

  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}