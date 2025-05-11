// import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';

// export class CreateSubsectiontContentDto {
  
//   @IsArray()  
//   text: string;
// }

export interface ISubsectionData {
    type: 'text' | 'image' | 'audio' | 'video',
    data: any

}