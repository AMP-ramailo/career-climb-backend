import { ApiProperty } from '@nestjs/swagger';

export class SelfResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email:string;
  @ApiProperty()
  image_url:string;
  @ApiProperty()
  role:string;
  @ApiProperty()
  createAt:string;
  @ApiProperty()
  updateAt:string;
  @ApiProperty()
  hasProfile:boolean;
}
