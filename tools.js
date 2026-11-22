/* Chuqur bilim sahifasi: Kali vositalari, xatolar, haftalik challenge */
(function () {
  'use strict';

  var LANGS = ['uz', 'ru', 'en'];
  var CHALLENGE_KEY = 'kali_weekly_challenge';
  var I18N = {
    uz: {
      skip: "Asosiy qismga o'tish", navHome: 'Bosh sahifa', navTools: 'Kali vositalari', navCommands: 'Buyruqlar',
      navLab: 'Laboratoriya', navCards: 'Kartalar', navDeep: 'Chuqur bilim', langLabel: 'Til', menuLabel: 'Menyu',
      pageTitle: 'Chuqur bilim sahifasi',
      pageLead: "Vositani tushunish, xatodan qochish va har hafta yangi vazifada mashq qilish — hammasi bir joyda.",
      safetyTitle: 'Xavfsizlik eslatmasi',
      safetyText: "Faqat o'zingizga tegishli yoki yozma ruxsat olingan tizimlarda mashq qiling. Ushbu maqolalar ta'lim uchun.",
      tablistLabel: "Chuqur bilim bo'limlari", tabTools: 'Kali vositalari', tabMistakes: 'Keng tarqalgan xatolar', tabChallenge: 'Haftalik challenge',
      toolsTitle: "Kali vositalari: qisqa qo'llanma",
      toolsLead: "Kartani bosing — maqsadi, misoli va ehtiyot choralari ochiladi. Har bir vositadagi havola uning buyruq maqolasiga olib boradi.",
      mistakesTitle: 'Keng tarqalgan xatolar',
      mistakesLead: "Qizil — qilmang, yashil — to'g'ri usul. Har bir xato qisqa izoh bilan uch tilda tushuntirilgan.",
      challengeTitle: 'Haftalik challenge',
      challengeLead: "Har hafta laboratoriya vazifalari ichidan siz uchun barqaror tanlangan bitta vazifa. Yechim yashirin, bajarish natijasi saqlanadi.",
      purpose: 'Maqsadi', example: 'Misoli', caution: 'Ehtiyot choralari', cmdLink: "Buyruq sahifasiga o'tish",
      copy: 'Nusxalash', copied: 'Nusxalandi', expand: 'Ochish', collapse: 'Yopish',
      wrong: 'Xato', right: "To'g'ri usul", why: 'Nima uchun',
      week: 'Hafta', points: 'ball', scenario: 'Stsenariy', steps: 'Bosqichlar', hint: "Ko'rsatma",
      showSolution: "Yechimni ko'rsatish", hideSolution: 'Yechimni yashirish', solution: 'Yechim',
      markDone: 'Bajarildi deb belgilash', done: 'Bajarildi!', streak: 'Ketma-ket haftalar',
      nextIn: 'Keyingi challengegacha', days: 'kun', hours: 'soat', minutes: 'daqiqa',
      challengeEmpty: 'Hozircha challenge topilmadi. labs.js yuklanganini tekshiring.',
      footerText: "O'zbek linuxchilari uchun qilingan ♥"
    },
    ru: {
      skip: 'Перейти к содержимому', navHome: 'Главная', navTools: 'Инструменты Kali', navCommands: 'Команды',
      navLab: 'Лаборатория', navCards: 'Карточки', navDeep: 'Глубокие знания', langLabel: 'Язык', menuLabel: 'Меню',
      pageTitle: 'Страница глубоких знаний',
      pageLead: 'Понять инструмент, избежать ошибки и каждую неделю тренироваться на новой задаче — всё в одном месте.',
      safetyTitle: 'Напоминание о безопасности',
      safetyText: 'Практикуйтесь только на своих системах или там, где есть письменное разрешение. Материалы только для обучения.',
      tablistLabel: 'Разделы глубоких знаний', tabTools: 'Инструменты Kali', tabMistakes: 'Частые ошибки', tabChallenge: 'Недельный challenge',
      toolsTitle: 'Инструменты Kali: краткий гид',
      toolsLead: 'Нажмите на карточку — откроются цель, пример и меры предосторожности. Ссылка ведёт на страницу команды.',
      mistakesTitle: 'Частые ошибки',
      mistakesLead: 'Красное — не делайте так, зелёное — правильный способ. Каждая ошибка кратко объяснена на трёх языках.',
      challengeTitle: 'Недельный challenge',
      challengeLead: 'Каждую неделю из лабораторных задач стабильно выбирается одна задача. Решение скрыто, результат сохраняется.',
      purpose: 'Назначение', example: 'Пример', caution: 'Меры предосторожности', cmdLink: 'Перейти к команде',
      copy: 'Копировать', copied: 'Скопировано', expand: 'Открыть', collapse: 'Закрыть',
      wrong: 'Ошибка', right: 'Правильно', why: 'Почему',
      week: 'Неделя', points: 'баллов', scenario: 'Сценарий', steps: 'Шаги', hint: 'Подсказка',
      showSolution: 'Показать решение', hideSolution: 'Скрыть решение', solution: 'Решение',
      markDone: 'Отметить выполненным', done: 'Выполнено!', streak: 'Недель подряд',
      nextIn: 'До следующего challenge', days: 'дн.', hours: 'ч.', minutes: 'мин.',
      challengeEmpty: 'Challenge не найден. Проверьте, что labs.js загружен.',
      footerText: 'Сделано для узбекских линуксоидов ♥'
    },
    en: {
      skip: 'Skip to main content', navHome: 'Home', navTools: 'Kali tools', navCommands: 'Commands',
      navLab: 'Lab', navCards: 'Flashcards', navDeep: 'Deep dive', langLabel: 'Language', menuLabel: 'Menu',
      pageTitle: 'Deep Dive Page',
      pageLead: 'Understand the tool, avoid mistakes, and practice a new task every week — all in one place.',
      safetyTitle: 'Safety reminder',
      safetyText: 'Practice only on systems you own or have written permission to test. This content is for education only.',
      tablistLabel: 'Deep dive sections', tabTools: 'Kali tools', tabMistakes: 'Common mistakes', tabChallenge: 'Weekly challenge',
      toolsTitle: 'Kali tools: quick guide',
      toolsLead: 'Click a card to reveal its purpose, example, and cautions. Each link goes to the command article.',
      mistakesTitle: 'Common mistakes',
      mistakesLead: 'Red — do not do this, green — the right way. Each mistake is briefly explained in three languages.',
      challengeTitle: 'Weekly challenge',
      challengeLead: 'Each week one lab task is selected deterministically for you. The solution is hidden and your result is saved.',
      purpose: 'Purpose', example: 'Example', caution: 'Cautions', cmdLink: 'Open command page',
      copy: 'Copy', copied: 'Copied', expand: 'Expand', collapse: 'Collapse',
      wrong: 'Wrong', right: 'Right', why: 'Why',
      week: 'Week', points: 'points', scenario: 'Scenario', steps: 'Steps', hint: 'Hint',
      showSolution: 'Show solution', hideSolution: 'Hide solution', solution: 'Solution',
      markDone: 'Mark as done', done: 'Done!', streak: 'Week streak',
      nextIn: 'Next challenge in', days: 'days', hours: 'hours', minutes: 'min',
      challengeEmpty: 'No challenge found. Check that labs.js is loaded.',
      footerText: 'Made for Uzbek Linux users ♥'
    }
  };

  var TOOLS = [
    { id: 'nmap', icon: '🔎', cmd: 'nmap',
      title: { uz: 'Nmap — tarmoq skaneri', ru: 'Nmap — сетевой сканер', en: 'Nmap — Network Scanner' },
      short: { uz: 'Xostlar, ochiq portlar va xizmatlarni aniqlaydi.', ru: 'Обнаруживает хосты, открытые порты и службы.', en: 'Discovers hosts, open ports, and services.' },
      purpose: { uz: "Tarmoq xaritasini tuzish, portlar va xizmat versiyalarini ko'rish.", ru: 'Составить карту сети, увидеть порты и версии служб.', en: 'Map a network, see ports and service versions.' },
      example: 'nmap -sV -p 1-1000 127.0.0.1',
      caution: { uz: "Faqat ruxsat olingan manzillarni skanerlang; agressiv scan loglarda ko'rinadi.", ru: 'Сканируйте только разрешённые цели; агрессивный скан виден в логах.', en: 'Scan only authorized targets; aggressive scans are visible in logs.' }
    },
    { id: 'gobuster', icon: '📂', cmd: 'gobuster',
      title: { uz: 'Gobuster — katalog topuvchi', ru: 'Gobuster — поиск каталогов', en: 'Gobuster — Directory Brute-forcer' },
      short: { uz: 'Veb-serverdagi yashirin papka va fayllarni topadi.', ru: 'Находит скрытые каталоги и файлы на веб-сервере.', en: 'Finds hidden directories and files on a web server.' },
      purpose: { uz: "Wordlist yordamida URL yo'llarini aniqlash.", ru: 'Находить пути URL с помощью словаря.', en: 'Discover URL paths using a wordlist.' },
      example: 'gobuster dir -u http://127.0.0.1 -w /usr/share/wordlists/dirb/common.txt',
      caution: { uz: "Faqat o'z test serveringizda ishlating; ko'p so'rov WAF/IDS ni ishga tushiradi.", ru: 'Только на своём тестовом сервере; много запросов вызывает WAF/IDS.', en: 'Use only on your own test server; many requests can trigger WAF/IDS.' }
    },
    { id: 'nikto', icon: '🕸️', cmd: 'nikto',
      title: { uz: 'Nikto — veb skaner', ru: 'Nikto — веб-сканер', en: 'Nikto — Web Scanner' },
      short: { uz: "Veb-serverdagi ma'lum muammolarni tekshiradi.", ru: 'Проверяет веб-сервер на известные проблемы.', en: 'Checks a web server for known issues.' },
      purpose: { uz: "Eskirgan dastur, noto'g'ri konfiguratsiya va xavfli fayllarni aniqlash.", ru: 'Находить устаревшее ПО, ошибки конфигурации и опасные файлы.', en: 'Find outdated software, misconfigurations, and risky files.' },
      example: 'nikto -h http://127.0.0.1 -o scan.txt',
      caution: { uz: 'Juda shovqinli; faqat ruxsat bilan va test muhitida.', ru: 'Очень шумный; только с разрешением и в тестовой среде.', en: 'Very noisy; only with permission and in a test environment.' }
    },
    { id: 'sqlmap', icon: '🗄️', cmd: 'sqlmap',
      title: { uz: "sqlmap — SQL in'ektsiya testi", ru: 'sqlmap — тест SQL-инъекций', en: 'sqlmap — SQL Injection Testing' },
      short: { uz: "SQL in'ektsiya zaifliklarini avtomatik tekshiradi.", ru: 'Автоматически проверяет уязвимости SQL-инъекций.', en: 'Automatically tests for SQL injection vulnerabilities.' },
      purpose: { uz: "Parametrlar orqali SQL zaiflik bor-yo'qligini aniqlash.", ru: 'Определять наличие SQL-уязвимостей в параметрах.', en: 'Identify SQL vulnerabilities in parameters.' },
      example: 'sqlmap -u "http://127.0.0.1/page?id=1" --batch --dbs',
      caution: { uz: "Faqat o'zingiz yaratgan test ilovada; ruxsatsiz ishlatish noqonuniy.", ru: 'Только на своём тестовом приложении; без разрешения это незаконно.', en: 'Only on your own test app; unauthorized use is illegal.' }
    },
    { id: 'hydra', icon: '🔑', cmd: 'hydra',
      title: { uz: 'Hydra — parol sinovi', ru: 'Hydra — проверка паролей', en: 'Hydra — Password Testing' },
      short: { uz: "Xizmatlar uchun lug'at asosida parol sinovini bajaradi.", ru: 'Проверяет пароли по словарю для разных сервисов.', en: 'Tests passwords against services using wordlists.' },
      purpose: { uz: 'Kuchsiz parollarni laboratoriyada aniqlash.', ru: 'Находить слабые пароли в лаборатории.', en: 'Find weak passwords in a lab.' },
      example: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://127.0.0.1',
      caution: { uz: "Faqat o'z lab tizimingizda; hisoblarni bloklashi va qonuniy muammo tug'dirishi mumkin.", ru: 'Только в своей лаборатории; может блокировать аккаунты и создать юридические проблемы.', en: 'Only in your own lab; can lock accounts and create legal issues.' }
    },
    { id: 'john', icon: '🧱', cmd: 'john',
      title: { uz: 'John the Ripper — hash tiklash', ru: 'John the Ripper — восстановление хэшей', en: 'John the Ripper — Hash Cracking' },
      short: { uz: "Parol xeshlarini lug'at va qoidalar bilan tekshiradi.", ru: 'Проверяет хэши паролей по словарю и правилам.', en: 'Checks password hashes with wordlists and rules.' },
      purpose: { uz: "Xesh kuchsiz paroldan chiqqan-chiqmaganini tekshirish.", ru: 'Проверять, получен ли хэш из слабого пароля.', en: 'Check whether a hash came from a weak password.' },
      example: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
      caution: { uz: "Faqat o'zingizga tegishli hashlar bilan ishlang.", ru: 'Работайте только со своими хэшами.', en: 'Work only with hashes you own.' }
    },
    { id: 'hashcat', icon: '⚡', cmd: 'hashcat',
      title: { uz: 'Hashcat — GPU hash tiklash', ru: 'Hashcat — восстановление хэшей на GPU', en: 'Hashcat — GPU Hash Cracking' },
      short: { uz: 'GPU yordamida xeshlarni juda tez tekshiradi.', ru: 'Очень быстро проверяет хэши с помощью GPU.', en: 'Checks hashes very fast using GPU.' },
      purpose: { uz: "Katta hash to'plamlarini turli hujum rejimlarida sinash.", ru: 'Тестировать большие наборы хэшей в разных режимах атаки.', en: 'Test large hash sets in different attack modes.' },
      example: 'hashcat -m 0 -a 0 hashes.txt wordlist.txt',
      caution: { uz: "Faqat ruxsat etilgan ma'lumotlar; GPU qizishi va resurs sarfiga e'tibor bering.", ru: 'Только с разрешёнными данными; следите за нагревом GPU и ресурсами.', en: 'Only with authorized data; watch GPU heat and resource use.' }
    },
    { id: 'tcpdump', icon: '📡', cmd: 'tcpdump',
      title: { uz: 'tcpdump — paket ushlash', ru: 'tcpdump — захват пакетов', en: 'tcpdump — Packet Capture' },
      short: { uz: 'Tarmoq paketlarini real vaqtda ushlaydi.', ru: 'Перехватывает сетевые пакеты в реальном времени.', en: 'Captures network packets in real time.' },
      purpose: { uz: 'Tarmoq muammolari va trafikni tahlil qilish.', ru: 'Анализировать сетевые проблемы и трафик.', en: 'Analyze network issues and traffic.' },
      example: 'sudo tcpdump -i any -c 20 port 53',
      caution: { uz: "Boshqalarning trafikini faqat ruxsat bilan ushlang; maxfiy ma'lumotlar ko'rinishi mumkin.", ru: 'Чужой трафик — только с разрешения; могут быть видны конфиденциальные данные.', en: "Capture others' traffic only with permission; sensitive data may be visible." }
    },
    { id: 'tshark', icon: '🦈', cmd: 'tshark',
      title: { uz: 'TShark — terminal Wireshark', ru: 'TShark — Wireshark в терминале', en: 'TShark — Terminal Wireshark' },
      short: { uz: 'Pcap fayllarini terminalda tahlil qiladi.', ru: 'Анализирует pcap-файлы в терминале.', en: 'Analyzes pcap files in the terminal.' },
      purpose: { uz: 'Saqlangan trafikdan protokol va maydonlarni ajratish.', ru: 'Извлекать протоколы и поля из сохранённого трафика.', en: 'Extract protocols and fields from saved traffic.' },
      example: 'tshark -r capture.pcap -Y "dns"',
      caution: { uz: "Pcap ichida maxfiy ma'lumot bo'lishi mumkin; fayllarni ehtiyot saqlang.", ru: 'В pcap могут быть конфиденциальные данные; храните файлы осторожно.', en: 'Pcaps may contain sensitive data; store files carefully.' }
    },
    { id: 'aircrack-ng', icon: '📶', cmd: 'aircrack-ng',
      title: { uz: 'Aircrack-ng — Wi-Fi sinovi', ru: 'Aircrack-ng — тест Wi-Fi', en: 'Aircrack-ng — Wi-Fi Testing' },
      short: { uz: "Simsiz tarmoq xavfsizligini sinash to'plami.", ru: 'Набор для проверки безопасности беспроводных сетей.', en: 'A suite for testing wireless network security.' },
      purpose: { uz: "O'z Wi-Fi tarmog'ingizdagi zaif konfiguratsiyani aniqlash.", ru: 'Находить слабую конфигурацию в собственной Wi-Fi-сети.', en: 'Find weak configuration in your own Wi-Fi network.' },
      example: 'aircrack-ng -w wordlist.txt capture.cap',
      caution: { uz: "Faqat o'zingizning tarmog'ingizda; begona Wi-Fi ga aralashish noqonuniy.", ru: 'Только в своей сети; вмешательство в чужой Wi-Fi незаконно.', en: "Only on your own network; interfering with others' Wi-Fi is illegal." }
    },
    { id: 'msfconsole', icon: '💥', cmd: 'msfconsole',
      title: { uz: 'Metasploit — xavfsizlik platformasi', ru: 'Metasploit — платформа безопасности', en: 'Metasploit — Security Platform' },
      short: { uz: 'Zaifliklarni sinash va exploit modullarini boshqarish konsoli.', ru: 'Консоль для тестирования уязвимостей и управления модулями.', en: 'Console for testing vulnerabilities and managing exploit modules.' },
      purpose: { uz: 'Laboratoriyada zaifliklarni tekshirish va himoyani baholash.', ru: 'Проверять уязвимости и оценивать защиту в лаборатории.', en: 'Test vulnerabilities and assess defenses in a lab.' },
      example: 'msfconsole -q',
      caution: { uz: 'Faqat izolyatsiya qilingan lab muhitida; real tizimlarda ruxsat talab qilinadi.', ru: 'Только в изолированной лаборатории; на реальных системах нужно разрешение.', en: 'Only in an isolated lab; real systems require permission.' }
    },
    { id: 'burpsuite', icon: '🧪', cmd: 'burpsuite',
      title: { uz: 'Burp Suite — veb proxy/test', ru: 'Burp Suite — веб-прокси/тест', en: 'Burp Suite — Web Proxy/Testing' },
      short: { uz: "Veb ilovalar trafikini ushlash va tahlil qilish vositasi.", ru: 'Инструмент для перехвата и анализа трафика веб-приложений.', en: 'Tool for intercepting and analyzing web application traffic.' },
      purpose: { uz: "HTTP so'rov/javoblarni ko'rish, parametrlarni sinash.", ru: 'Смотреть HTTP-запросы/ответы, тестировать параметры.', en: 'Inspect HTTP requests/responses and test parameters.' },
      example: 'burpsuite',
      caution: { uz: "Faqat o'z test ilovangizda; proxy orqali maxfiy ma'lumotlar o'tishi mumkin.", ru: 'Только на своём тестовом приложении; через прокси могут проходить конфиденциальные данные.', en: 'Only on your own test app; sensitive data may pass through the proxy.' }
    }
  ];

  var MISTAKES = [
    { id: 'rm-rf', wrong: 'rm -rf /', right: 'rm -ri ./target-dir', why: { uz: "Ildizni o'chirish tizimni buzadi. Avval yo'lni tekshiring va -i bilan tasdiqlang.", ru: 'Удаление корня ломает систему. Проверяйте путь и используйте -i для подтверждения.', en: 'Deleting root breaks the system. Check the path and use -i for confirmation.' } },
    { id: 'sudo-careless', wrong: 'sudo <notanish-buyruq>', right: 'man <buyruq> && sudo <tekshirilgan-buyruq>', why: { uz: "sudo root huquq beradi. Noma'lum buyruqni root sifatida ishga tushirmang.", ru: 'sudo даёт права root. Не запускайте неизвестные команды от root.', en: 'sudo grants root. Do not run unknown commands as root.' } },
    { id: 'chmod-777', wrong: 'chmod 777 -R /var/www', right: 'chmod 755 dir && chmod 644 file', why: { uz: '777 hamma uchun yozish huquqi beradi. Minimal ruxsat bering.', ru: '777 даёт запись всем. Выдавайте минимальные права.', en: '777 gives write access to everyone. Grant minimal permissions.' } },
    { id: 'curl-sh', wrong: 'curl http://example.com/install.sh | sh', right: 'curl -fsSL URL -o install.sh && less install.sh', why: { uz: "Skriptni ko'rmasdan ishga tushirish xavfli. Avval yuklab, o'qing.", ru: 'Опасно запускать скрипт не читая. Сначала скачайте и прочитайте.', en: 'Running a script unread is risky. Download and read it first.' } },
    { id: 'history-pass', wrong: 'mysql -pMySecret123', right: 'mysql -p  # parolni so\'raydi', why: { uz: "Parol buyruq tarixida qoladi. Interaktiv so'rash yoki secret manager ishlating.", ru: 'Пароль остаётся в истории команд. Используйте интерактивный ввод или менеджер секретов.', en: 'Passwords stay in command history. Use interactive prompt or a secret manager.' } },
    { id: 'redirect-clobber', wrong: 'echo "yangi" > config.yml', right: 'cp config.yml config.yml.bak && echo "yangi" > config.yml', why: { uz: "> faylni to'liq ustidan yozadi. Avval nusxa oling yoki >> ni ehtiyot ishlating.", ru: '> полностью перезаписывает файл. Сначала сделайте копию или осторожно используйте >>.', en: '> overwrites the whole file. Back it up first or use >> carefully.' } },
    { id: 'nmap-noauth', wrong: 'nmap -A 10.0.0.0/24', right: "nmap -sV 127.0.0.1  # faqat o'z lab", why: { uz: "Ruxsatsiz skanerlash noqonuniy va axloqsiz. Faqat o'z lab/ruxsatli tizim.", ru: 'Сканирование без разрешения незаконно и неэтично. Только своя лаборатория/разрешённые системы.', en: 'Unauthorized scanning is illegal and unethical. Only your lab/authorized systems.' } },
    { id: 'grep-huge', wrong: 'grep "err" /var/log/huge.log', right: 'grep -n "err" /var/log/huge.log | tail -n 50', why: { uz: "Katta faylda cheksiz chiqish terminalni to'ldiradi. Cheklang yoki ripgrep ishlating.", ru: 'На большом файле бесконечный вывод забьёт терминал. Ограничивайте или используйте ripgrep.', en: 'Unlimited output floods the terminal on huge files. Limit it or use ripgrep.' } },
    { id: 'upgrade-nobackup', wrong: 'sudo apt upgrade -y', right: 'sudo apt update && sudo apt --simulate upgrade && backup', why: { uz: "Backup va simulate yo'q bo'lsa, yangilanish tizimni buzishi mumkin.", ru: 'Без бэкапа и simulate обновление может сломать систему.', en: 'Without backup and simulate, upgrades can break the system.' } },
    { id: 'cd-dotdot', wrong: 'cd .. && rm -rf build', right: 'cd /project && rm -rf ./build', why: { uz: "Nisbiy yo'l noto'g'ri papkada xavfli. Absolyut yoki aniq nisbiy yo'l ishlating.", ru: 'Относительный путь опасен в неверной папке. Используйте абсолютный или явный относительный путь.', en: 'Relative paths are dangerous in the wrong directory. Use absolute or explicit relative paths.' } },
    { id: 'wildcard', wrong: 'rm -rf * .bak', right: 'rm -rf ./*.bak', why: { uz: "Wildcard bo'shliqdan keyin boshqa argumentga aylanadi. Yo'lni aniq yozing.", ru: 'Пробел после wildcard превращает его в другой аргумент. Пишите путь явно.', en: 'A space after a wildcard turns it into another argument. Write paths explicitly.' } },
    { id: 'clear-logs', wrong: 'rm -rf /var/log/*', right: 'sudo logrotate -f /etc/logrotate.conf', why: { uz: "Loglarni o'chirish tekshiruv izlarini yo'qotadi va muammolarni yashiradi. Rotatsiya ishlating.", ru: 'Удаление логов стирает следы аудита и скрывает проблемы. Используйте ротацию.', en: 'Deleting logs destroys audit trails and hides problems. Use log rotation.' } }
  ];

  function getLang() {
    try { return (window.I18N && window.I18N.getLang) ? window.I18N.getLang() : 'uz'; }
    catch (e) { return 'uz'; }
  }
  function tw(key) {
    var l = getLang();
    return (I18N[l] && I18N[l][key]) || I18N.uz[key] || key;
  }
  function loc(obj, l) {
    if (!obj) return '';
    var code = l || getLang();
    return obj[code] || obj.uz || obj.ru || obj.en || '';
  }
  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function byId(id) { return document.getElementById(id); }
  function reduceMotion() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (e) { return false; }
  }
  function store(key, value) {
    try {
      if (value === undefined) { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } catch (e) { return value === undefined ? null : value; }
  }
  function announce(msg) {
    var node = byId('twLive');
    if (node) node.textContent = String(msg || '');
  }

  function applyTexts() {
    document.querySelectorAll('[data-tw]').forEach(function (node) {
      var key = node.getAttribute('data-tw');
      if (key) node.textContent = tw(key);
    });
    document.querySelectorAll('[data-tw-title]').forEach(function (node) {
      var key = node.getAttribute('data-tw-title');
      if (key) { node.setAttribute('title', tw(key)); node.setAttribute('aria-label', tw(key)); }
    });
    document.documentElement.lang = getLang();
  }

  /* ---------- copy ---------- */
  function copyText(text, btn) {
    var done = function (ok) {
      if (!btn) return;
      var old = btn.textContent;
      btn.textContent = ok ? tw('copied') : tw('copy');
      btn.classList.toggle('is-copied', !!ok);
      setTimeout(function () { btn.textContent = old; btn.classList.remove('is-copied'); }, 1200);
      announce(ok ? tw('copied') : '');
    };
    var val = String(text || '');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).then(function () { done(true); }, function () { fallbackCopy(val, done); });
    } else { fallbackCopy(val, done); }
  }
  function fallbackCopy(val, done) {
    var ta = document.createElement('textarea');
    ta.value = val; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = !!document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    done(ok);
  }

  /* ---------- command link resolution ---------- */
  function cmdHref(cmd) {
    var commands = Array.isArray(window.LINUX_COMMANDS) ? window.LINUX_COMMANDS : [];
    var name = String(cmd || '').toLowerCase();
    for (var i = 0; i < commands.length; i++) {
      if (String(commands[i].id).toLowerCase() === name) return 'index.html#cmd=' + encodeURIComponent(commands[i].id);
    }
    return 'index.html#cmd=' + encodeURIComponent(cmd);
  }

  /* ---------- tools ---------- */
  var openTool = null;
  function renderTools() {
    var grid = byId('twToolsGrid');
    if (!grid) return;
    var l = getLang();
    var html = '';
    for (var i = 0; i < TOOLS.length; i++) {
      var t = TOOLS[i];
      var expanded = openTool === t.id;
      var panelId = 'twToolPanel-' + t.id;
      var btnId = 'twToolBtn-' + t.id;
      html += '<article class="tw-card' + (expanded ? ' is-open' : '') + '" data-tool-id="' + esc(t.id) + '">' +
        '<button type="button" class="tw-card__head" id="' + btnId + '" aria-expanded="' + (expanded ? 'true' : 'false') + '" aria-controls="' + panelId + '">' +
          '<span class="tw-card__icon" aria-hidden="true">' + esc(t.icon) + '</span>' +
          '<span class="tw-card__meta">' +
            '<span class="tw-card__title">' + esc(loc(t.title, l)) + '</span>' +
            '<span class="tw-card__short">' + esc(loc(t.short, l)) + '</span>' +
          '</span>' +
          '<span class="tw-card__chev" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="tw-card__body" id="' + panelId + '" role="region" aria-labelledby="' + btnId + '"' + (expanded ? '' : ' hidden') + '>' +
          '<dl class="tw-dl">' +
            '<div class="tw-dl__row"><dt>' + esc(tw('purpose')) + '</dt><dd>' + esc(loc(t.purpose, l)) + '</dd></div>' +
            '<div class="tw-dl__row"><dt>' + esc(tw('example')) + '</dt><dd><div class="tw-code"><code>' + esc(t.example) + '</code><button type="button" class="mini-btn tw-copy" data-copy="' + esc(t.example) + '">' + esc(tw('copy')) + '</button></div></dd></div>' +
            '<div class="tw-dl__row"><dt>' + esc(tw('caution')) + '</dt><dd class="tw-caution">' + esc(loc(t.caution, l)) + '</dd></div>' +
          '</dl>' +
          '<a class="btn btn--ghost btn--sm tw-cmd-link" href="' + esc(cmdHref(t.cmd)) + '">' + esc(tw('cmdLink')) + '</a>' +
        '</div>' +
      '</article>';
    }
    grid.innerHTML = html;
  }

  function onToolsClick(e) {
    var copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) { copyText(copyBtn.getAttribute('data-copy'), copyBtn); return; }
    var head = e.target.closest('.tw-card__head');
    if (!head) return;
    var card = head.closest('[data-tool-id]');
    if (!card) return;
    var id = card.getAttribute('data-tool-id');
    openTool = openTool === id ? null : id;
    renderTools();
    if (openTool) {
      var next = byId('twToolBtn-' + openTool);
      if (next && !reduceMotion()) { try { next.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (err) {} }
    }
  }
  /* ---------- mistakes ---------- */
  function renderMistakes() {
    var grid = byId('twMistakesGrid');
    if (!grid) return;
    var l = getLang();
    var html = '';
    for (var i = 0; i < MISTAKES.length; i++) {
      var m = MISTAKES[i];
      html += '<article class="tw-mistake">' +
        '<div class="tw-mistake__row tw-mistake__row--bad">' +
          '<span class="tw-badge tw-badge--bad">❌ ' + esc(tw('wrong')) + '</span>' +
          '<code class="tw-mistake__code">' + esc(m.wrong) + '</code>' +
        '</div>' +
        '<div class="tw-mistake__row tw-mistake__row--good">' +
          '<span class="tw-badge tw-badge--good">✅ ' + esc(tw('right')) + '</span>' +
          '<code class="tw-mistake__code">' + esc(m.right) + '</code>' +
        '</div>' +
        '<p class="tw-mistake__why"><strong>' + esc(tw('why')) + ':</strong> ' + esc(loc(m.why, l)) + '</p>' +
      '</article>';
    }
    grid.innerHTML = html;
  }

  /* ---------- challenge ---------- */
  function isoWeek(date) {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { year: d.getUTCFullYear(), week: week };
  }
  function weekKey(info) { return info.year + '-W' + String(info.week).padStart(2, '0'); }
  function hashStr(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function pickChallenge() {
    var labs = Array.isArray(window.KALI_LABS) ? window.KALI_LABS : [];
    if (!labs.length) return null;
    var info = isoWeek(new Date());
    var key = weekKey(info);
    var idx = hashStr(key) % labs.length;
    return { lab: labs[idx], info: info, key: key, index: idx };
  }
  function nextMondayCountdown() {
    var now = new Date();
    var day = now.getDay();
    var daysUntilMon = (8 - (day || 7)) % 7;
    if (daysUntilMon === 0) daysUntilMon = 7;
    var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMon, 0, 0, 0, 0);
    var diff = Math.max(0, next - now);
    var totalMin = Math.floor(diff / 60000);
    var days = Math.floor(totalMin / (60 * 24));
    var hours = Math.floor((totalMin % (60 * 24)) / 60);
    var mins = totalMin % 60;
    return { days: days, hours: hours, minutes: mins };
  }
  function readChallengeState() {
    var data = store(CHALLENGE_KEY);
    return data && typeof data === 'object' ? data : {};
  }
  function writeChallengeState(data) { store(CHALLENGE_KEY, data); }

  function computeStreak(key, prev) {
    var cur = parseWeekKey(key);
    if (!cur) return 1;
    if (prev && prev.done && prev.week) {
      var p = parseWeekKey(prev.week);
      if (p && isConsecutiveWeek(p, cur)) return (Number(prev.streak) || 1) + 1;
      if (prev.week === key) return Number(prev.streak) || 1;
    }
    return 1;
  }
  function parseWeekKey(key) {
    var m = /^(\d{4})-W(\d{2})$/.exec(String(key || ''));
    if (!m) return null;
    return { year: Number(m[1]), week: Number(m[2]) };
  }
  function isoWeeksInYear(year) {
    var d = new Date(Date.UTC(year, 11, 31));
    var day = d.getUTCDay() || 7;
    if (day < 4) d.setUTCDate(d.getUTCDate() - day);
    else d.setUTCDate(d.getUTCDate() + (4 - day));
    return isoWeek(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).week;
  }
  function isConsecutiveWeek(prev, cur) {
    if (!prev || !cur) return false;
    if (cur.year === prev.year && cur.week === prev.week + 1) return true;
    if (cur.year === prev.year + 1 && cur.week === 1 && prev.week === isoWeeksInYear(prev.year)) return true;
    return false;
  }

  var challengeSolutionShown = false;
  function renderChallenge() {
    var wrap = byId('twChallenge');
    if (!wrap) return;
    var pick = pickChallenge();
    if (!pick) { wrap.innerHTML = '<p class="tw-empty">' + esc(tw('challengeEmpty')) + '</p>'; return; }
    var lab = pick.lab;
    var l = getLang();
    var state = readChallengeState();
    var done = !!(state.week === pick.key && state.done);
    var streak = done ? (Number(state.streak) || 1) : (state.done && state.week && isConsecutiveWeek(parseWeekKey(state.week), parseWeekKey(pick.key)) ? (Number(state.streak) || 1) : 0);
    var count = nextMondayCountdown();
    var steps = loc(lab.steps, l);
    var stepsArr = Array.isArray(steps) ? steps : [];
    var stepsHtml = '';
    for (var i = 0; i < stepsArr.length; i++) {
      stepsHtml += '<li>' + esc(stepsArr[i]) + '</li>';
    }
    var solutionText = loc(lab.solution, l) || (lab.command || '');
    var hintText = loc(lab.hint, l);

    wrap.innerHTML = '' +
      '<article class="tw-challenge' + (done ? ' is-done' : '') + '">' +
        '<div class="tw-challenge__head">' +
          '<div class="tw-challenge__meta">' +
            '<span class="tw-pill">' + esc(tw('week')) + ' ' + esc(pick.info.week) + ' · ' + esc(pick.info.year) + '</span>' +
            '<span class="tw-pill tw-pill--amber">' + esc(Number(lab.points) || 0) + ' ' + esc(tw('points')) + '</span>' +
            (streak > 0 ? '<span class="tw-pill tw-pill--green">🔥 ' + esc(streak) + ' ' + esc(tw('streak')) + '</span>' : '') +
          '</div>' +
          '<h3 class="tw-challenge__title">' + esc(loc(lab.title, l)) + '</h3>' +
        '</div>' +
        '<div class="tw-challenge__body">' +
          '<section class="tw-block"><h4>' + esc(tw('scenario')) + '</h4><p>' + esc(loc(lab.scenario, l)) + '</p></section>' +
          (stepsHtml ? '<section class="tw-block"><h4>' + esc(tw('steps')) + '</h4><ol class="tw-steps">' + stepsHtml + '</ol></section>' : '') +
          (hintText ? '<section class="tw-block tw-block--hint"><h4>' + esc(tw('hint')) + '</h4><p>' + esc(hintText) + '</p></section>' : '') +
          '<section class="tw-block tw-block--solution">' +
            '<div class="tw-solution-bar">' +
              '<button type="button" class="btn btn--ghost btn--sm" id="twToggleSolution" aria-expanded="' + (challengeSolutionShown ? 'true' : 'false') + '">' + esc(challengeSolutionShown ? tw('hideSolution') : tw('showSolution')) + '</button>' +
            '</div>' +
            '<div id="twSolutionBox"' + (challengeSolutionShown ? '' : ' hidden') + '>' +
              '<h4>' + esc(tw('solution')) + '</h4>' +
              '<div class="tw-code"><code>' + esc(solutionText) + '</code><button type="button" class="mini-btn tw-copy" data-copy="' + esc(solutionText) + '">' + esc(tw('copy')) + '</button></div>' +
            '</div>' +
          '</section>' +
        '</div>' +
        '<div class="tw-challenge__foot">' +
          '<button type="button" class="btn ' + (done ? 'btn--ghost' : 'btn--red') + '" id="twMarkDone"' + (done ? ' disabled' : '') + '>' + esc(done ? tw('done') : tw('markDone')) + '</button>' +
          '<div class="tw-countdown" aria-live="polite">' +
            '<span class="tw-countdown__label">' + esc(tw('nextIn')) + '</span>' +
            '<span class="tw-countdown__val">' + esc(count.days) + ' ' + esc(tw('days')) + ', ' + esc(count.hours) + ' ' + esc(tw('hours')) + ', ' + esc(count.minutes) + ' ' + esc(tw('minutes')) + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function onChallengeClick(e) {
    var copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) { copyText(copyBtn.getAttribute('data-copy'), copyBtn); return; }
    var solBtn = e.target.closest('#twToggleSolution');
    if (solBtn) {
      challengeSolutionShown = !challengeSolutionShown;
      renderChallenge();
      var box = byId('twSolutionBox');
      if (challengeSolutionShown && box) { try { box.scrollIntoView({ block: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' }); } catch (err) {} }
      return;
    }
    var doneBtn = e.target.closest('#twMarkDone');
    if (doneBtn) {
      var pick = pickChallenge();
      if (!pick) return;
      var prev = readChallengeState();
      if (prev.week === pick.key && prev.done) return;
      var streak = computeStreak(pick.key, prev);
      writeChallengeState({ week: pick.key, done: true, date: new Date().toISOString(), streak: streak, labId: pick.lab.id });
      renderChallenge();
      announce(tw('done'));
    }
  }


  /* ---------- tabs ---------- */
  var TABS = ['tools', 'mistakes', 'challenge'];
  function activeTab() {
    var btn = document.querySelector('.tw-tab[aria-selected="true"]');
    return btn ? btn.getAttribute('data-tab') : 'tools';
  }
  function setTab(name, focusTab) {
    if (TABS.indexOf(name) === -1) name = 'tools';
    TABS.forEach(function (t) {
      var btn = byId('twTab' + cap(t));
      var panel = byId('twPanel' + cap(t));
      var on = t === name;
      if (btn) { btn.setAttribute('aria-selected', on ? 'true' : 'false'); btn.tabIndex = on ? 0 : -1; }
      if (panel) { panel.hidden = !on; }
    });
    if (focusTab) { var b = byId('twTab' + cap(name)); if (b) b.focus(); }
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function onTabsClick(e) {
    var btn = e.target.closest('.tw-tab');
    if (!btn) return;
    setTab(btn.getAttribute('data-tab'), false);
  }
  function onTabsKeydown(e) {
    var key = e.key;
    if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return;
    var cur = activeTab();
    var idx = TABS.indexOf(cur);
    if (idx < 0) idx = 0;
    if (key === 'ArrowRight') idx = (idx + 1) % TABS.length;
    else if (key === 'ArrowLeft') idx = (idx - 1 + TABS.length) % TABS.length;
    else if (key === 'Home') idx = 0;
    else if (key === 'End') idx = TABS.length - 1;
    e.preventDefault();
    setTab(TABS[idx], true);
  }

  /* ---------- init ---------- */
  function renderAll() {
    applyTexts();
    renderTools();
    renderMistakes();
    renderChallenge();
  }

  function init() {
    if (!byId('twTabs')) return;
    renderAll();

    var tabs = byId('twTabs');
    if (tabs) { tabs.addEventListener('click', onTabsClick); tabs.addEventListener('keydown', onTabsKeydown); }

    var tools = byId('twToolsGrid');
    if (tools) tools.addEventListener('click', onToolsClick);

    var challenge = byId('twChallenge');
    if (challenge) challenge.addEventListener('click', onChallengeClick);

    document.addEventListener('langchange', function () {
      renderAll();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
