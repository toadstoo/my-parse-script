import fs from 'fs/promises';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  'Accept': 'application/json, text/html;q=0.9',
};

async function fetchJSON(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('json')) {
    throw new Error(`Response is not JSON: ${contentType}`);
  }
  return res.json();
}

async function main() {
  console.log('Запуск парсера...');
  
  // Пример публичного API для демонстрации работы парсера (JSONPlaceholder)
  const targetUrl = 'https://jsonplaceholder.typicode.com/posts';
  
  try {
    console.log(`Запрос данных с: ${targetUrl}`);
    const data = await fetchJSON(targetUrl);
    
    // Выведем первые 3 поста для примера
    const sample = data.slice(0, 3);
    console.log('Получены данные (первые 3 записи):');
    console.log(JSON.stringify(sample, null, 2));

    // Сохраняем результат в файл
    const filename = 'result.json';
    await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Данные успешно сохранены в файл: ${filename}`);
  } catch (error) {
    console.error('Ошибка при выполнении парсинга:', error.message);
  }
}

main();
