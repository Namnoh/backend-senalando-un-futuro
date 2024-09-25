import { PartialType } from '@nestjs/mapped-types';
import { CreatePalabraDto } from './create-palabra.dto';

export class UpdatePalabraDto extends PartialType(CreatePalabraDto) {}
