import { GlobalStore } from '@store/global/globalStore';

/**
 * Обрабатывает ошибку HTTP и вызывает уведомление.
 * @param err — неизвестная ошибка из catch
 * @param fallback — текст, если ничего не извлечено
 * @param global — мой стор для уведомлений
 */
export function handleHttpError(
  global: GlobalStore,
  err: unknown,
  fallback = 'Что-то пошло не так',
) {
  let message = fallback;

  if (
    typeof err === 'object' &&
    err !== null &&
    'error' in err &&
    typeof (err as any).error?.message === 'string'
  ) {
    message = (err as any).error.message;
  }

  global.createNotification(message, 'notification-error');
}
