export enum ErrorTypes {
  // 204 - нет содержимого
  NoContent = 'No content',

  // 400 - плохой, неверный запрос (невалидный параметр)
  BadRequest = 'Bad request',

  // 401 - не авторизован (не представился). Нужна аутентификация. Как 403, но, аутентификация возможна.
  Unauthorized = 'Unauthorized',

  // 403 - запрещено (нет прав доступа к содержимому)
  Forbidden = 'Forbidden',

  // 404 - не найдено
  NotFound = 'Not Found',

  // 500 Внутренняя ошибка сервера
  InternalServerError = 'Internal Server Error',
}
