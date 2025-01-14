import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/config/database-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfigService } from './database/database-config.service';
import authConfig from './modules/authentication/config/auth.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CompanyModule } from './modules/company/company.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PlansModule } from './modules/plans/plans.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthenticationModule,
    CompanyModule,
    PaymentsModule,
    PlansModule,
    TemplatesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
