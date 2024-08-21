import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InterbankRateType } from '@schema';
import axios, { AxiosInstance } from 'axios';
import typia from 'typia';

/**
 * 환율 정보
 *
 * @export
 * @class InterbankRateService
 */
@Injectable()
export class InterbankRateService implements OnModuleInit {
  private caller: AxiosInstance;
  private data: InterbankRateType;

  constructor(private readonly config: ConfigService) {
    this.caller = axios.create({
      baseURL: this.config.get('INTERBANK_RATE_API_URL'),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async onModuleInit() {
    Logger.log('The module has been initialized.', this.constructor.name);

    await this.cron();
  }

  @Cron('5 0 * * *', { timeZone: 'Asia/Seoul', name: 'cronInterbankRate', disabled: false })
  async cron(): Promise<InterbankRateType | undefined> {
    try {
      const response = await this.caller({
        method: 'GET',
      });

      this.data = typia.misc.assertClone(response.data);
    } catch (ignoreError) {
      console.error(ignoreError);
    }

    return this.data;
  }
}
