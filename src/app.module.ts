import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DietsController } from './diets/diets.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; //paso 1 importar
import { DietsModule } from './diets/diets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1489',
      database: 'db_food',
      entities: ['dist/**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'], // lee culaquier archivo q se llame entity y sea ts o js para crear las tablas
      synchronize: true,
    }),
    DietsModule,
  ],
  controllers: [AppController, DietsController],
  providers: [AppService],
})
export class AppModule {}
