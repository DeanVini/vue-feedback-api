import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';


export class UpdateFeedbackDto {
  @IsOptional()
  @IsString()
  message: string

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}