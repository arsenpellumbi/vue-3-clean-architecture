import { Notify } from 'quasar';
import { injectable } from 'inversify';
import { IToastService } from '~/core/interfaces/services';

@injectable()
export class ToastService implements IToastService {
  public success(message: string): void {
    Notify.create({
      type: 'positive',
      message: message,
    });
  }

  public error(message: string): void {
    Notify.create({
      type: 'negative',
      message: message,
    });
  }

  public warning(message: string): void {
    Notify.create({
      type: 'warning',
      message: message,
    });
  }

  public info(message: string): void {
    Notify.create({
      type: 'info',
      message: message,
    });
  }
}
