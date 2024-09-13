import { Test, TestingModule } from '@nestjs/testing';
import { PalabrasController } from './palabras.controller';
import { PalabrasService } from './palabras.service';

describe('PalabrasController', () => {
  let controller: PalabrasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PalabrasController],
      providers: [PalabrasService],
    }).compile();

    controller = module.get<PalabrasController>(PalabrasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
