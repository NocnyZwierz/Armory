import { Module } from '@nestjs/common';
import { SurfaceFinishController } from './surface-finish.controller';
import { SurfaceFinishService } from './surface-finish.service';

@Module({
  controllers: [SurfaceFinishController],
  providers: [SurfaceFinishService]
})
export class SurfaceFinishModule {}
