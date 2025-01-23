import { AuthenticationModule } from '@auth_modules/authentication.module';
import authConfig from '@auth_modules/config/auth.config';
import { CompanyModule } from '@company_modules/company.module';
import databaseConfig from '@database/config/database-config';
import { DatabaseConfigService } from '@database/database-config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from '@payments_modules/payments.module';
import { PlansModule } from '@plans_modules/plans.module';
import { TemplatesModule } from '@templates_modules/templates.module';
import { UsersModule } from '@users_modules/users.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import urlConfig from './env-config/url-config/url-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, urlConfig],
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
