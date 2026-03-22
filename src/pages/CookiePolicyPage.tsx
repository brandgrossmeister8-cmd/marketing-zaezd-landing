import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-dashboard-bg text-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          На главную
        </Link>

        <h1 className="text-2xl font-bold mb-8 lg:text-3xl">
          Политика использования файлов cookie
        </h1>

        <div className="space-y-6 text-sm text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Что такое файлы cookie</h2>
            <p>
              Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем
              устройстве (компьютере, планшете, смартфоне) при посещении веб-сайтов. Они
              позволяют сайту запоминать ваши действия и предпочтения в течение определённого
              времени, чтобы вам не приходилось вводить их заново при каждом посещении.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Какие файлы cookie мы используем</h2>

            <h3 className="text-base font-semibold text-white/90 mt-4 mb-2">
              2.1. Необходимые (технические) cookie
            </h3>
            <p>
              Эти файлы cookie необходимы для корректной работы сайта. Они обеспечивают базовые
              функции, такие как навигация по страницам и доступ к защищённым разделам.
              Сайт не может функционировать должным образом без этих файлов cookie.
            </p>

            <h3 className="text-base font-semibold text-white/90 mt-4 mb-2">
              2.2. Функциональные cookie
            </h3>
            <p>
              Эти файлы cookie позволяют запоминать ваши предпочтения (например, согласие
              с использованием cookie) и обеспечивают расширенную функциональность сайта.
            </p>

            <h3 className="text-base font-semibold text-white/90 mt-4 mb-2">
              2.3. Аналитические cookie
            </h3>
            <p>
              Мы можем использовать аналитические cookie для сбора статистики о посещении
              сайта. Эти данные помогают нам понимать, как пользователи взаимодействуют
              с сайтом, и улучшать его работу. Данные собираются в обезличенном виде.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Управление файлами cookie</h2>
            <p>
              Вы можете управлять файлами cookie через настройки вашего браузера. Большинство
              браузеров позволяют:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Просматривать сохранённые файлы cookie</li>
              <li>Удалять отдельные или все файлы cookie</li>
              <li>Блокировать файлы cookie от определённых сайтов</li>
              <li>Блокировать все файлы cookie</li>
              <li>Удалять все файлы cookie при закрытии браузера</li>
            </ul>
            <p className="mt-2">
              Обратите внимание: отключение файлов cookie может повлиять на функциональность
              сайта.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Сторонние файлы cookie</h2>
            <p>
              На нашем сайте могут использоваться сторонние сервисы (например, Telegram),
              которые могут устанавливать собственные файлы cookie. Мы не контролируем
              эти файлы cookie. Рекомендуем ознакомиться с политиками конфиденциальности
              соответствующих сервисов.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Согласие на использование cookie</h2>
            <p>
              Продолжая использовать наш сайт, вы соглашаетесь с использованием файлов
              cookie в соответствии с настоящей Политикой. При первом посещении сайта
              вам будет показано уведомление о cookie с возможностью принять их использование.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Изменения в Политике</h2>
            <p>
              Мы оставляем за собой право обновлять данную Политику. Все изменения
              вступают в силу с момента публикации обновлённой версии на данной странице.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Контактная информация</h2>
            <p>
              Если у вас есть вопросы относительно использования файлов cookie, свяжитесь
              с нами через Telegram: @brandgros.
            </p>
          </section>

          <p className="pt-4 text-white/40 text-xs">
            Дата последнего обновления: 22 марта 2026 года.
          </p>
        </div>
      </div>
    </div>
  )
}
