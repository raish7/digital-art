import { Injectable, UseGuards } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}
  @UseGuards(AuthGuard)
  create(payload: any): Observable<any> {
    const paymentUrl = `https://a.khalti.com/api/v2/epayment/initiate/`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Key ${process.env.KHALTI_KEY}`,
    };

    return this.httpService.post(paymentUrl, payload, { headers }).pipe(
      map((response) => {
        return response.data;
      }),
    );
  }

  @UseGuards(AuthGuard)
  lookup(payload: any) {
    const url = `https://a.khalti.com/api/v2/epayment/lookup/`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Key ${process.env.KHALTI_KEY}`, 
    };

    return this.httpService.post(url, payload, { headers }).pipe(
      map((response) => {
        return response.data;
      }),
    );
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
