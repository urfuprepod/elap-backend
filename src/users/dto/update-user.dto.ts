import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  login?: string;

  @IsOptional()
  @IsInt()
  mentorId?: number;

  @IsOptional()
  @IsString()
  mentorRole?: string
}
