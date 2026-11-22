/* Amaliy laboratoriya vazifalari.
 * Faqat lokal, xavfsiz va sinab ko'rish mumkin bo'lgan misollar: 127.0.0.1, /tmp, lokal fayllar.
 * Har bir matn uch tilda: uz / ru / en.
 */
window.KALI_LABS = [
  {
    id: "port-scan",
    category: "network",
    difficulty: "beginner",
    tags: ["nmap", "scan", "localhost"],
    title: { uz: "Lokal portlarni skanerlash", ru: "Сканирование локальных портов", en: "Scan Local Ports" },
    scenario: {
      uz: "O'zingizning kompyuteringizda qaysi portlar ochiqligini va qanday xizmatlar ishlab turganini bilmoqchisiz. Skaner faqat 127.0.0.1 manziliga qaratilgan.",
      ru: "На своём компьютере нужно узнать, какие порты открыты и какие службы запущены. Сканер направлен только на адрес 127.0.0.1.",
      en: "You want to see which ports are open on your own machine and which services are listening. The scan targets only 127.0.0.1."
    },
    steps: {
      uz: ["Terminalni oching.", "nmap -sV 127.0.0.1 buyrug'ini yozing.", "Natijadagi port raqamlari va xizmat nomlarini o'qing."],
      ru: ["Откройте терминал.", "Введите команду nmap -sV 127.0.0.1.", "Прочитайте номера портов и названия служб в результате."],
      en: ["Open a terminal.", "Type the command nmap -sV 127.0.0.1.", "Read the port numbers and service names in the output."]
    },
    hint: { uz: "127.0.0.1 — bu sizning mashinangiz. -sV parametri xizmat versiyasini aniqlaydi.", ru: "127.0.0.1 — это ваша машина. Флаг -sV определяет версию службы.", en: "127.0.0.1 is your own machine. The -sV flag detects service versions." },
    solution: { uz: "Bajarish: nmap -sV 127.0.0.1", ru: "Выполните: nmap -sV 127.0.0.1", en: "Run: nmap -sV 127.0.0.1" },
    why: {
      uz: "Loopback manziliga skanerlash tarmoqdagi boshqa kompyuterlarga ta'sir qilmaydi. -sV esa xizmat versiyasini ko'rsatadi.",
      ru: "Сканирование loopback-адреса не затрагивает другие компьютеры сети. Флаг -sV показывает версию службы.",
      en: "Scanning the loopback address does not affect other machines. The -sV flag reveals the service version."
    },
    safety: { uz: "Faqat o'zingizga tegishli yoki ruxsat olingan tizimlarni skanerlang.", ru: "Сканируйте только свои системы или системы с разрешением.", en: "Only scan systems you own or have permission to test." },
    command: "nmap -sV 127.0.0.1",
    expected: ["nmap", "-sV", "127.0.0.1"],
    points: 10
  },
  {
    id: "listening-ports",
    category: "network",
    difficulty: "beginner",
    tags: ["ss", "ports", "listen"],
    title: { uz: "Tinglayotgan portlar ro'yxati", ru: "Список прослушиваемых портов", en: "List Listening Ports" },
    scenario: {
      uz: "Tarmoqqa chiqmasdan, faqat o'z tizimingizda qaysi portlar tinglanayotganini tekshiring.",
      ru: "Проверьте, какие порты прослушиваются в вашей системе, не обращаясь к сети.",
      en: "Check which ports are listening on your own system without contacting the network."
    },
    steps: {
      uz: ["Terminalni oching.", "ss -tuln buyrug'ini bajaring.", "TCP va UDP ustunlaridagi portlarni solishtiring."],
      ru: ["Откройте терминал.", "Выполните команду ss -tuln.", "Сравните порты в колонках TCP и UDP."],
      en: ["Open a terminal.", "Run ss -tuln.", "Compare the ports in the TCP and UDP columns."]
    },
    hint: { uz: "-t TCP, -u UDP, -l tinglash, -n esa raqamlarni ko'rsatadi.", ru: "-t — TCP, -u — UDP, -l — прослушивание, -n — числовой вывод.", en: "-t is TCP, -u is UDP, -l means listening, -n shows numeric addresses." },
    solution: { uz: "Bajarish: ss -tuln", ru: "Выполните: ss -tuln", en: "Run: ss -tuln" },
    why: {
      uz: "Bu buyruq faqat lokal jadvalni o'qiydi, hech qanday ulanish o'rnatmaydi.",
      ru: "Команда читает только локальную таблицу и не устанавливает соединений.",
      en: "This command only reads the local table and opens no connections."
    },
    safety: { uz: "Tizim ma'lumotlarini faqat o'z hisobingizdan tekshiring.", ru: "Проверяйте данные системы только под своей учётной записью.", en: "Inspect system data only from your own account." },
    command: "ss -tuln",
    expected: ["ss", "-tuln"],
    points: 10
  },
  {
    id: "ping-local",
    category: "network",
    difficulty: "beginner",
    tags: ["ping", "icmp", "localhost"],
    title: { uz: "Lokal ulanishni tekshirish", ru: "Проверка локального соединения", en: "Check Local Connectivity" },
    scenario: {
      uz: "Tarmoq kartasi ishlayotganini tekshirish uchun o'z loopback manzilingizga to'rt marta ping yuboring.",
      ru: "Отправьте четыре ping-запроса на свой loopback-адрес, чтобы проверить сетевой стек.",
      en: "Send four ping requests to your loopback address to verify the network stack."
    },
    steps: {
      uz: ["Terminalni oching.", "ping -c 4 127.0.0.1 buyrug'ini yozing.", "Yo'qotishlar foizini va javob vaqtini o'qing."],
      ru: ["Откройте терминал.", "Введите ping -c 4 127.0.0.1.", "Прочитайте процент потерь и время ответа."],
      en: ["Open a terminal.", "Type ping -c 4 127.0.0.1.", "Read the packet loss percentage and response time."]
    },
    hint: { uz: "-c parametriga yuboriladigan paketlar soni yoziladi.", ru: "Параметр -c задаёт количество отправляемых пакетов.", en: "The -c flag sets the number of packets to send." },
    solution: { uz: "Bajarish: ping -c 4 127.0.0.1", ru: "Выполните: ping -c 4 127.0.0.1", en: "Run: ping -c 4 127.0.0.1" },
    why: {
      uz: "Loopback tarmoq qurilmasining ishlashini tekshiradi va tashqi tarmoqqa chiqmaydi.",
      ru: "Loopback проверяет работу сетевого стека и не выходит во внешнюю сеть.",
      en: "Loopback verifies the local network stack and never leaves the machine."
    },
    safety: { uz: "Boshqa manzillarga ping yuborishdan oldin ruxsat oling.", ru: "Получайте разрешение перед отправкой ping на другие адреса.", en: "Get permission before pinging addresses you do not own." },
    command: "ping -c 4 127.0.0.1",
    expected: ["ping", "-c", "4", "127.0.0.1"],
    points: 8
  },
  {
    id: "list-tmp",
    category: "files",
    difficulty: "beginner",
    tags: ["ls", "tmp", "files"],
    title: { uz: "Vaqtinchalik papkani ko'rish", ru: "Просмотр временной папки", en: "Inspect the Temp Folder" },
    scenario: {
      uz: "/tmp papkasidagi barcha fayllarni, jumladan yashirinlarini ham, inson o'qiy oladigan hajm bilan chiqaring.",
      ru: "Выведите все файлы в папке /tmp, включая скрытые, с читаемым размером.",
      en: "List all files in /tmp, including hidden ones, with human-readable sizes."
    },
    steps: {
      uz: ["Terminalni oching.", "ls -lah /tmp buyrug'ini bajaring.", "Ruxsatlar, egasi va hajm ustunlarini o'qing."],
      ru: ["Откройте терминал.", "Выполните ls -lah /tmp.", "Прочитайте столбцы прав, владельца и размера."],
      en: ["Open a terminal.", "Run ls -lah /tmp.", "Read the permission, owner and size columns."]
    },
    hint: { uz: "-a yashirin fayllarni, -h esa qisqartirilgan hajmni ko'rsatadi.", ru: "-a показывает скрытые файлы, -h — читаемый размер.", en: "-a shows hidden files, -h shows human-readable sizes." },
    solution: { uz: "Bajarish: ls -lah /tmp", ru: "Выполните: ls -lah /tmp", en: "Run: ls -lah /tmp" },
    why: {
      uz: "Uzun format fayl ruxsatlarini ko'rishga yordam beradi, /tmp esa vaqtinchalik fayllar uchun mo'ljallangan.",
      ru: "Длинный формат помогает увидеть права, а /tmp предназначен для временных файлов.",
      en: "The long format shows permissions, and /tmp is meant for temporary files."
    },
    safety: { uz: "/tmp dagi boshqa foydalanuvchi fayllarini o'chirmang.", ru: "Не удаляйте чужие файлы в /tmp.", en: "Do not delete other users' files in /tmp." },
    command: "ls -lah /tmp",
    expected: ["ls", "-lah", "/tmp"],
    points: 8
  },
  {
    id: "find-logs",
    category: "files",
    difficulty: "intermediate",
    tags: ["find", "logs", "tmp"],
    title: { uz: "Log fayllarini topish", ru: "Поиск лог-файлов", en: "Find Log Files" },
    scenario: {
      uz: "/tmp ichida faqat .log bilan tugaydigan fayllarni topishingiz kerak.",
      ru: "Найдите в /tmp только файлы с расширением .log.",
      en: "Find only files ending with .log inside /tmp."
    },
    steps: {
      uz: ["Terminalni oching.", "find /tmp -name \"*.log\" buyrug'ini yozing.", "Topilgan yo'llarni tekshiring."],
      ru: ["Откройте терминал.", "Введите find /tmp -name \"*.log\".", "Проверьте найденные пути."],
      en: ["Open a terminal.", "Type find /tmp -name \"*.log\".", "Check the paths that were found."]
    },
    hint: { uz: "Yulduzcha o'rniga ixtiyoriy nom mos keladi; namuna vergul yoki qo'shtirnoq bilan yoziladi.", ru: "Звёздочка заменяет любое имя; шаблон берётся в кавычки.", en: "The asterisk matches any name; quote the pattern." },
    solution: { uz: "Bajarish: find /tmp -name \"*.log\"", ru: "Выполните: find /tmp -name \"*.log\"", en: "Run: find /tmp -name \"*.log\"" },
    why: {
      uz: "find nom bo'yicha qidiradi va yo'lni to'liq ko'rsatadi, bu loglarni tez topishga yordam beradi.",
      ru: "find ищет по имени и показывает полный путь, что помогает быстро найти логи.",
      en: "find searches by name and prints the full path, which helps locate logs quickly."
    },
    safety: { uz: "Qidiruvni o'z papkangiz bilan cheklang va natijalarni o'chirmang.", ru: "Ограничьте поиск своей папкой и не удаляйте результаты.", en: "Limit the search to your own folder and do not delete the results." },
    command: 'find /tmp -name "*.log"',
    expected: ["find", "/tmp", ".log"],
    points: 12
  },
  {
    id: "copy-backup",
    category: "files",
    difficulty: "beginner",
    tags: ["cp", "backup", "tmp"],
    title: { uz: "Lokal fayl nusxasini yaratish", ru: "Создание локальной копии файла", en: "Create a Local File Copy" },
    scenario: {
      uz: "/tmp/lab-note.txt faylining nusxasini /tmp/lab-note.bak nomi bilan yaratib, asl faylni saqlab qoling.",
      ru: "Создайте копию файла /tmp/lab-note.txt с именем /tmp/lab-note.bak, сохранив оригинал.",
      en: "Copy /tmp/lab-note.txt to /tmp/lab-note.bak while keeping the original file."
    },
    steps: {
      uz: ["Agar fayl yo'q bo'lsa, uni touch /tmp/lab-note.txt bilan yaratib oling.", "cp /tmp/lab-note.txt /tmp/lab-note.bak buyrug'ini bajaring.", "Ikkala fayl borligini ls bilan tekshiring."],
      ru: ["Если файла нет, создайте его: touch /tmp/lab-note.txt.", "Выполните cp /tmp/lab-note.txt /tmp/lab-note.bak.", "Проверьте оба файла командой ls."],
      en: ["If the file is missing, create it with touch /tmp/lab-note.txt.", "Run cp /tmp/lab-note.txt /tmp/lab-note.bak.", "Verify both files with ls."]
    },
    hint: { uz: "cp dan keyin avval manba, keyin maqsad yo'li yoziladi.", ru: "После cp сначала указывается источник, затем назначение.", en: "After cp, give the source first and the destination second." },
    solution: { uz: "Bajarish: cp /tmp/lab-note.txt /tmp/lab-note.bak", ru: "Выполните: cp /tmp/lab-note.txt /tmp/lab-note.bak", en: "Run: cp /tmp/lab-note.txt /tmp/lab-note.bak" },
    why: {
      uz: "Nusxa olish ma'lumotni yo'qotishdan saqlaydi; -i parametri ustiga yozishdan oldin so'raydi.",
      ru: "Копирование защищает от потери данных; флаг -i спрашивает перед перезаписью.",
      en: "Copying protects against data loss; the -i flag asks before overwriting."
    },
    safety: { uz: "Muhim fayllar ustiga yozishdan oldin -i parametridan foydalaning.", ru: "Используйте флаг -i перед перезаписью важных файлов.", en: "Use the -i flag before overwriting important files." },
    command: "cp /tmp/lab-note.txt /tmp/lab-note.bak",
    expected: ["cp", "/tmp/lab-note.txt", "/tmp/lab-note.bak"],
    points: 8
  },
  {
    id: "make-dir",
    category: "dirs",
    difficulty: "beginner",
    tags: ["mkdir", "dirs", "tmp"],
    title: { uz: "Lokal papka tuzilmasi yaratish", ru: "Создание локальной структуры папок", en: "Create a Local Folder Structure" },
    scenario: {
      uz: "/tmp/kali-lab ichida demo papkasini, agar ota-papka yo'q bo'lsa ham, bir buyruq bilan yaratish kerak.",
      ru: "Создайте папку demo внутри /tmp/kali-lab одной командой, даже если родительская папка отсутствует.",
      en: "Create a demo folder inside /tmp/kali-lab with one command, even if the parent does not exist."
    },
    steps: {
      uz: ["Terminalni oching.", "mkdir -p /tmp/kali-lab/demo buyrug'ini bajaring.", "tree yoki ls -R bilan tuzilmani ko'ring."],
      ru: ["Откройте терминал.", "Выполните mkdir -p /tmp/kali-lab/demo.", "Посмотрите структуру через tree или ls -R."],
      en: ["Open a terminal.", "Run mkdir -p /tmp/kali-lab/demo.", "View the structure with tree or ls -R."]
    },
    hint: { uz: "-p parametri yo'q ota-papkalarni ham yaratadi va mavjud bo'lsa xato bermaydi.", ru: "Флаг -p создаёт недостающие родители и не ругается на существующие.", en: "The -p flag creates missing parents and does not error if they exist." },
    solution: { uz: "Bajarish: mkdir -p /tmp/kali-lab/demo", ru: "Выполните: mkdir -p /tmp/kali-lab/demo", en: "Run: mkdir -p /tmp/kali-lab/demo" },
    why: {
      uz: "-p papkalarni yaratishni takrorlanuvchan qiladi, skriptlarda xavfsiz ishlatiladi.",
      ru: "-p делает создание папок идемпотентным и безопасным в скриптах.",
      en: "-p makes folder creation repeatable and safe in scripts."
    },
    safety: { uz: "Faqat o'z vaqtinchalik papkangizda tuzilma yarating.", ru: "Создавайте структуру только в своей временной папке.", en: "Create structures only inside your own temporary folder." },
    command: "mkdir -p /tmp/kali-lab/demo",
    expected: ["mkdir", "-p", "/tmp/kali-lab"],
    points: 8
  },
  {
    id: "disk-free",
    category: "disk",
    difficulty: "beginner",
    tags: ["df", "disk", "tmp"],
    title: { uz: "Bo'sh disk maydonini tekshirish", ru: "Проверка свободного места на диске", en: "Check Free Disk Space" },
    scenario: {
      uz: "/tmp joylashgan bo'limda qancha bo'sh joy borligini inson o'qiy oladigan shaklda ko'ring.",
      ru: "Узнайте, сколько свободного места осталось в разделе с /tmp, в читаемом формате.",
      en: "See how much free space is left on the partition containing /tmp in a readable format."
    },
    steps: {
      uz: ["Terminalni oching.", "df -h /tmp buyrug'ini bajaring.", "Size, Used va Avail ustunlarini o'qing."],
      ru: ["Откройте терминал.", "Выполните df -h /tmp.", "Прочитайте колонки Size, Used и Avail."],
      en: ["Open a terminal.", "Run df -h /tmp.", "Read the Size, Used and Avail columns."]
    },
    hint: { uz: "-h hajmni K, M, G ko'rinishida chiqaradi.", ru: "-h выводит размеры в K, M, G.", en: "The -h flag prints sizes as K, M, G." },
    solution: { uz: "Bajarish: df -h /tmp", ru: "Выполните: df -h /tmp", en: "Run: df -h /tmp" },
    why: {
      uz: "df bo'lim darajasidagi foydalanishni ko'rsatadi, bu loglar ko'payib ketganda muhim.",
      ru: "df показывает использование раздела — важно при росте логов.",
      en: "df shows partition usage, which matters when logs grow quickly."
    },
    safety: { uz: "Diskni tozalashdan oldin qaysi fayllar o'chirilishini tekshiring.", ru: "Перед очисткой диска проверьте, какие файлы будут удалены.", en: "Check which files will be removed before cleaning a disk." },
    command: "df -h /tmp",
    expected: ["df", "-h", "/tmp"],
    points: 8
  },
  {
    id: "folder-size",
    category: "disk",
    difficulty: "intermediate",
    tags: ["du", "disk", "tmp"],
    title: { uz: "Papka hajmini o'lchash", ru: "Измерение размера папки", en: "Measure a Folder Size" },
    scenario: {
      uz: "/tmp papkasining umumiy hajmini qisqa shaklda, ya'ni yig'indi ko'rinishida oling.",
      ru: "Получите общий размер папки /tmp в краткой форме — только итог.",
      en: "Get the total size of the /tmp folder in a short summary form."
    },
    steps: {
      uz: ["Terminalni oching.", "du -sh /tmp buyrug'ini yozing.", "Chiqishdagi hajm va yo'lni o'qing."],
      ru: ["Откройте терминал.", "Введите du -sh /tmp.", "Прочитайте размер и путь в выводе."],
      en: ["Open a terminal.", "Type du -sh /tmp.", "Read the size and path in the output."]
    },
    hint: { uz: "-s faqat yig'indini, -h esa o'qiladigan birliklarni beradi.", ru: "-s даёт только итог, -h — читаемые единицы.", en: "-s gives a summary and -h uses readable units." },
    solution: { uz: "Bajarish: du -sh /tmp", ru: "Выполните: du -sh /tmp", en: "Run: du -sh /tmp" },
    why: {
      uz: "df bo'lim bo'yicha, du esa papka bo'yicha hajm ko'rsatadi — ikkalasi bir-birini to'ldiradi.",
      ru: "df показывает размер раздела, а du — папки; они дополняют друг друга.",
      en: "df reports partition usage while du reports folder usage; they complement each other."
    },
    safety: { uz: "Faqat o'zingizga tegishli papkalar hajmini o'lchang.", ru: "Измеряйте размер только своих папок.", en: "Measure only folders you own." },
    command: "du -sh /tmp",
    expected: ["du", "-sh", "/tmp"],
    points: 10
  },
  {
    id: "file-perms",
    category: "perms",
    difficulty: "intermediate",
    tags: ["chmod", "permissions", "tmp"],
    title: { uz: "Fayl ruxsatlarini cheklash", ru: "Ограничение прав доступа к файлу", en: "Restrict File Permissions" },
    scenario: {
      uz: "/tmp/lab-secret.txt fayliga faqat egasi o'qish va yozish huquqiga ega bo'lishi kerak. Ruxsatni 600 ga o'rnating.",
      ru: "Файл /tmp/lab-secret.txt должен быть доступен только владельцу для чтения и записи. Установите права 600.",
      en: "The file /tmp/lab-secret.txt should be readable and writable only by its owner. Set permissions to 600."
    },
    steps: {
      uz: ["Fayl bo'lmasa: touch /tmp/lab-secret.txt.", "chmod 600 /tmp/lab-secret.txt buyrug'ini bajaring.", "ls -l bilan natijani tekshiring."],
      ru: ["Если файла нет: touch /tmp/lab-secret.txt.", "Выполните chmod 600 /tmp/lab-secret.txt.", "Проверьте результат через ls -l."],
      en: ["If needed, create it with touch /tmp/lab-secret.txt.", "Run chmod 600 /tmp/lab-secret.txt.", "Verify with ls -l."]
    },
    hint: { uz: "6 = o'qish (4) + yozish (2), guruh va boshqalar uchun 0.", ru: "6 = чтение (4) + запись (2), для группы и других — 0.", en: "6 equals read (4) plus write (2); group and others get 0." },
    solution: { uz: "Bajarish: chmod 600 /tmp/lab-secret.txt", ru: "Выполните: chmod 600 /tmp/lab-secret.txt", en: "Run: chmod 600 /tmp/lab-secret.txt" },
    why: {
      uz: "Raqamli ruxsat egasi, guruh va boshqalar uchun alohida belgilanadi. 600 faqat egasiga ruxsat beradi.",
      ru: "Числовые права задаются отдельно для владельца, группы и остальных. 600 даёт доступ только владельцу.",
      en: "Numeric modes set permissions for owner, group and others. 600 allows access only for the owner."
    },
    safety: { uz: "Boshqa foydalanuvchilarning fayllari ruxsatini o'zgartirmang.", ru: "Не меняйте права на файлы других пользователей.", en: "Do not change permissions on files belonging to other users." },
    command: "chmod 600 /tmp/lab-secret.txt",
    expected: ["chmod", "600", "/tmp/lab-secret.txt"],
    points: 12
  },
  {
    id: "who-am-i",
    category: "users",
    difficulty: "beginner",
    tags: ["id", "whoami", "users"],
    title: { uz: "Joriy foydalanuvchini aniqlash", ru: "Определение текущего пользователя", en: "Identify the Current User" },
    scenario: {
      uz: "Terminalda qaysi foydalanuvchi nomi bilan ishlayotganingizni va uning guruhlari hamda UID raqamini ko'ring.",
      ru: "Узнайте имя текущего пользователя терминала, его группы и UID.",
      en: "Find out which user account you are using, along with its groups and UID."
    },
    steps: {
      uz: ["Terminalni oching.", "id && whoami buyrug'ini bajaring.", "UID, GID va foydalanuvchi nomini o'qing."],
      ru: ["Откройте терминал.", "Выполните id && whoami.", "Прочитайте UID, GID и имя пользователя."],
      en: ["Open a terminal.", "Run id && whoami.", "Read the UID, GID and username."]
    },
    hint: { uz: "id guruhlarni chiqaradi, whoami esa faqat nomni.", ru: "id показывает группы, whoami — только имя.", en: "id lists groups, while whoami prints just the name." },
    solution: { uz: "Bajarish: id && whoami", ru: "Выполните: id && whoami", en: "Run: id && whoami" },
    why: {
      uz: "O'z hisobingizni bilish ruxsatlar va jarayonlarni to'g'ri talqin qilish uchun zarur.",
      ru: "Знание своей учётной записи нужно для правильного понимания прав и процессов.",
      en: "Knowing your account is essential for interpreting permissions and processes correctly."
    },
    safety: { uz: "sudo bilan bajaradigan harakatlaringizni har doim tekshiring.", ru: "Всегда проверяйте действия, выполняемые через sudo.", en: "Always double-check actions performed with sudo." },
    command: "id && whoami",
    expected: ["id", "whoami"],
    points: 8
  },
  {
    id: "process-watch",
    category: "processes",
    difficulty: "intermediate",
    tags: ["ps", "grep", "processes"],
    title: { uz: "Jarayonlar ichida qidirish", ru: "Поиск среди процессов", en: "Search Running Processes" },
    scenario: {
      uz: "Ishlayotgan jarayonlar ro'yxatidan systemd nomli jarayonlarni ajratib ko'rsating.",
      ru: "Выделите процессы с именем systemd из списка запущенных процессов.",
      en: "Filter running processes to show only those matching systemd."
    },
    steps: {
      uz: ["Terminalni oching.", "ps aux | grep systemd buyrug'ini yozing.", "PID va komanda ustunlarini o'qing."],
      ru: ["Откройте терминал.", "Введите ps aux | grep systemd.", "Прочитайте колонки PID и COMMAND."],
      en: ["Open a terminal.", "Type ps aux | grep systemd.", "Read the PID and COMMAND columns."]
    },
    hint: { uz: "Quvur | chap buyruq natijasini o'ng buyruqqa uzatadi.", ru: "Конвейер | передаёт вывод левой команды правой.", en: "The pipe | passes the output of the left command to the right one." },
    solution: { uz: "Bajarish: ps aux | grep systemd", ru: "Выполните: ps aux | grep systemd", en: "Run: ps aux | grep systemd" },
    why: {
      uz: "ps jarayonlar jadvalini beradi, grep esa kerakli satrlarni tanlaydi — bu katta ro'yxatni qisqartiradi.",
      ru: "ps выдаёт таблицу процессов, а grep выбирает нужные строки — это сокращает вывод.",
      en: "ps lists processes and grep selects matching lines, making large output readable."
    },
    safety: { uz: "Jarayonlarni o'ldirishdan oldin ularning nomi va PID raqamini ikki marta tekshiring.", ru: "Перед завершением процессов дважды проверьте имя и PID.", en: "Verify the name and PID twice before killing any process." },
    command: "ps aux | grep systemd",
    expected: ["ps", "grep", "systemd"],
    points: 12
  },
  {
    id: "uptime-check",
    category: "system",
    difficulty: "beginner",
    tags: ["uptime", "system"],
    title: { uz: "Tizim ish vaqtini tekshirish", ru: "Проверка времени работы системы", en: "Check System Uptime" },
    scenario: {
      uz: "Kompyuter qancha vaqt davomida ishlayotganini va o'rtacha yuklanmani bitta buyruq bilan ko'ring.",
      ru: "Одной командой узнайте, как долго работает компьютер и какова средняя нагрузка.",
      en: "Use one command to see how long the machine has been running and its average load."
    },
    steps: {
      uz: ["Terminalni oching.", "uptime buyrug'ini bajaring.", "Ish vaqti va load average qiymatlarini o'qing."],
      ru: ["Откройте терминал.", "Выполните uptime.", "Прочитайте время работы и load average."],
      en: ["Open a terminal.", "Run uptime.", "Read the uptime and load average values."]
    },
    hint: { uz: "Buyruq argument talab qilmaydi — shunchaki uptime yozing.", ru: "Команда не требует аргументов — просто введите uptime.", en: "The command takes no arguments — just type uptime." },
    solution: { uz: "Bajarish: uptime", ru: "Выполните: uptime", en: "Run: uptime" },
    why: {
      uz: "Uptime va yuklanma tizim holatining tezkor ko'rsatkichi bo'lib, tashxis uchun ishlatiladi.",
      ru: "Uptime и средняя нагрузка — быстрые показатели состояния системы для диагностики.",
      en: "Uptime and load average are quick health indicators used for diagnostics."
    },
    safety: { uz: "Bu buyruq faqat ma'lumot o'qiydi, tizimga o'zgartirish kiritmaydi.", ru: "Команда только читает данные и не меняет систему.", en: "This command only reads data and does not change the system." },
    command: "uptime",
    expected: ["uptime"],
    points: 6
  },
  {
    id: "grep-errors",
    category: "text",
    difficulty: "intermediate",
    tags: ["grep", "log", "text"],
    title: { uz: "Log ichidan xatolarni topish", ru: "Поиск ошибок в логе", en: "Find Errors in a Log" },
    scenario: {
      uz: "/tmp/app.log faylidan error so'zini registrga chidamli ravishda topib chiqish kerak.",
      ru: "Найдите слово error в файле /tmp/app.log без учёта регистра.",
      en: "Find the word error in /tmp/app.log, ignoring case."
    },
    steps: {
      uz: ["Fayl bo'lmasa, unga bir necha misor satr yozib oling.", "grep -i \"error\" /tmp/app.log buyrug'ini bajaring.", "Mos kelgan satrlarni o'qing."],
      ru: ["Если файла нет, добавьте в него несколько строк.", "Выполните grep -i \"error\" /tmp/app.log.", "Прочитайте совпавшие строки."],
      en: ["If needed, write a few sample lines into the file.", "Run grep -i \"error\" /tmp/app.log.", "Read the matching lines."]
    },
    hint: { uz: "-i parametri katta-kichik harflarni farqlamaydi.", ru: "Флаг -i отключает учёт регистра.", en: "The -i flag makes the search case-insensitive." },
    solution: { uz: "Bajarish: grep -i \"error\" /tmp/app.log", ru: "Выполните: grep -i \"error\" /tmp/app.log", en: "Run: grep -i \"error\" /tmp/app.log" },
    why: {
      uz: "grep satr bo'yicha qidiradi, -i esa ERROR, Error va error kabi barcha ko'rinishlarni topadi.",
      ru: "grep ищет по строкам, а -i находит ERROR, Error и error одинаково.",
      en: "grep searches line by line, and -i matches ERROR, Error and error alike."
    },
    safety: { uz: "Loglarda shaxsiy ma'lumotlar bo'lishi mumkin — ularni ommaga ko'rsatmang.", ru: "В логах могут быть личные данные — не публикуйте их.", en: "Logs may contain personal data — do not publish them." },
    command: 'grep -i "error" /tmp/app.log',
    expected: ["grep", "error", "/tmp/app.log"],
    points: 12
  },
  {
    id: "count-lines",
    category: "text",
    difficulty: "beginner",
    tags: ["wc", "text", "log"],
    title: { uz: "Fayldagi satrlar sonini hisoblash", ru: "Подсчёт строк в файле", en: "Count Lines in a File" },
    scenario: {
      uz: "/tmp/app.log faylida necha satr borligini faqat satrlar soni ko'rinishida oling.",
      ru: "Узнайте количество строк в файле /tmp/app.log — только число строк.",
      en: "Get the number of lines in /tmp/app.log — just the line count."
    },
    steps: {
      uz: ["Terminalni oching.", "wc -l /tmp/app.log buyrug'ini yozing.", "Chiqishdagi son va fayl nomini o'qing."],
      ru: ["Откройте терминал.", "Введите wc -l /tmp/app.log.", "Прочитайте число и имя файла в выводе."],
      en: ["Open a terminal.", "Type wc -l /tmp/app.log.", "Read the number and the file name in the output."]
    },
    hint: { uz: "-l parametriga faqat satrlar hisoblanadi.", ru: "Флаг -l считает только строки.", en: "The -l flag counts lines only." },
    solution: { uz: "Bajarish: wc -l /tmp/app.log", ru: "Выполните: wc -l /tmp/app.log", en: "Run: wc -l /tmp/app.log" },
    why: {
      uz: "wc satr, so'z va bayt sonini hisoblaydi; -l faqat kerakli qiymatni qoldiradi.",
      ru: "wc считает строки, слова и байты; -l оставляет только нужное значение.",
      en: "wc counts lines, words and bytes; -l keeps only the value you need."
    },
    safety: { uz: "Fayl mavjud bo'lmasa, avval uni yaratib oling va tizim fayllariga yozmang.", ru: "Если файла нет, создайте его и не пишите в системные файлы.", en: "Create the file first if missing, and never write to system files." },
    command: "wc -l /tmp/app.log",
    expected: ["wc", "-l", "/tmp/app.log"],
    points: 8
  },
  {
    id: "hash-file",
    category: "system",
    difficulty: "advanced",
    tags: ["sha256sum", "hash", "integrity"],
    title: { uz: "Faylning SHA-256 xeshini olish", ru: "Получение SHA-256 хэша файла", en: "Compute a File SHA-256 Hash" },
    scenario: {
      uz: "/tmp/lab-note.txt fayli o'zgarmaganligini tasdiqlash uchun uning SHA-256 xeshini hisoblang.",
      ru: "Вычислите SHA-256 хэш файла /tmp/lab-note.txt, чтобы подтвердить его неизменность.",
      en: "Compute the SHA-256 hash of /tmp/lab-note.txt to verify that it has not changed."
    },
    steps: {
      uz: ["Fayl bo'lmasa: echo lab > /tmp/lab-note.txt.", "sha256sum /tmp/lab-note.txt buyrug'ini bajaring.", "Xesh qiymatini keyingi tekshirish uchun saqlab qo'ying."],
      ru: ["Если файла нет: echo lab > /tmp/lab-note.txt.", "Выполните sha256sum /tmp/lab-note.txt.", "Сохраните хэш для последующей проверки."],
      en: ["If needed, run echo lab > /tmp/lab-note.txt.", "Run sha256sum /tmp/lab-note.txt.", "Save the hash for a later comparison."]
    },
    hint: { uz: "Buyruq nomida 256 raqami bor va u fayl yo'lini argument sifatida oladi.", ru: "В имени команды есть число 256, а аргументом служит путь к файлу.", en: "The command name contains 256 and takes the file path as an argument." },
    solution: { uz: "Bajarish: sha256sum /tmp/lab-note.txt", ru: "Выполните: sha256sum /tmp/lab-note.txt", en: "Run: sha256sum /tmp/lab-note.txt" },
    why: {
      uz: "Xesh — faylning raqamli izi. Fayl o'zgarsa, xesh ham o'zgaradi, shuning uchun butunlik tekshiriladi.",
      ru: "Хэш — цифровой отпечаток файла. При изменении файла меняется и хэш, что позволяет проверить целостность.",
      en: "A hash is a digital fingerprint. If the file changes, the hash changes too, so integrity can be checked."
    },
    safety: { uz: "Xesh faqat butunlikni tasdiqlaydi; u faylning «yaxshi» ekanligini isbotlamaydi.", ru: "Хэш подтверждает только целостность, а не безопасность файла.", en: "A hash proves integrity only; it does not prove a file is safe." },
    command: "sha256sum /tmp/lab-note.txt",
    expected: ["sha256sum", "/tmp/lab-note.txt"],
    points: 15
  },
  {
    id: "archive-tmp",
    category: "archive",
    difficulty: "intermediate",
    tags: ["tar", "archive", "backup"],
    title: { uz: "Lokal papkani arxivlash", ru: "Архивация локальной папки", en: "Archive a Local Folder" },
    scenario: {
      uz: "/tmp/kali-lab papkasini /tmp/kali-lab.tar.gz nomli gzip arxiviga yig'ish kerak.",
      ru: "Упакуйте папку /tmp/kali-lab в gzip-архив /tmp/kali-lab.tar.gz.",
      en: "Pack the folder /tmp/kali-lab into a gzip archive named /tmp/kali-lab.tar.gz."
    },
    steps: {
      uz: ["Papka borligiga ishonch hosil qiling: mkdir -p /tmp/kali-lab.", "tar -czf /tmp/kali-lab.tar.gz /tmp/kali-lab buyrug'ini bajaring.", "Arxivni tar -tzf bilan ko'rib chiqing."],
      ru: ["Убедитесь, что папка есть: mkdir -p /tmp/kali-lab.", "Выполните tar -czf /tmp/kali-lab.tar.gz /tmp/kali-lab.", "Просмотрите архив через tar -tzf."],
      en: ["Make sure the folder exists: mkdir -p /tmp/kali-lab.", "Run tar -czf /tmp/kali-lab.tar.gz /tmp/kali-lab.", "List the archive with tar -tzf."]
    },
    hint: { uz: "c — yaratish, z — gzip, f — fayl nomi.", ru: "c — создать, z — gzip, f — имя файла.", en: "c means create, z means gzip, f sets the archive file name." },
    solution: { uz: "Bajarish: tar -czf /tmp/kali-lab.tar.gz /tmp/kali-lab", ru: "Выполните: tar -czf /tmp/kali-lab.tar.gz /tmp/kali-lab", en: "Run: tar -czf /tmp/kali-lab.tar.gz /tmp/kali-lab" },
    why: {
      uz: "tar fayllarni bitta arxivga birlashtiradi, gzip esa uni siqadi — zaxira va uzatish uchun qulay.",
      ru: "tar объединяет файлы в один архив, а gzip сжимает его — удобно для копий и передачи.",
      en: "tar bundles files into one archive and gzip compresses it, which is handy for backups."
    },
    safety: { uz: "Arxivga shaxsiy yoki maxfiy fayllarni qo'shmang.", ru: "Не добавляйте в архив личные или конфиденциальные файлы.", en: "Do not include personal or confidential files in the archive." },
    command: "tar -czf /tmp/kali-lab.tar.gz /tmp/kali-lab",
    expected: ["tar", "-czf", "/tmp/kali-lab.tar.gz"],
    points: 12
  },
  {
    id: "git-status",
    category: "git",
    difficulty: "beginner",
    tags: ["git", "status", "repo"],
    title: { uz: "Git repozitoriy holatini tekshirish", ru: "Проверка состояния Git-репозитория", en: "Check Git Repository Status" },
    scenario: {
      uz: "Lokal git repozitoriyida qaysi fayllar o'zgartirilgan va qaysilari kuzatilmayotganini tekshiring.",
      ru: "Проверьте в локальном Git-репозитории, какие файлы изменены и какие не отслеживаются.",
      en: "Check a local Git repository for modified and untracked files."
    },
    steps: {
      uz: ["Kerak bo'lsa, papkada git init bajaring.", "git status buyrug'ini yozing.", "O'zgartirilgan va kuzatilmagan fayllar bo'limlarini o'qing."],
      ru: ["При необходимости выполните git init в папке.", "Введите git status.", "Прочитайте разделы изменённых и неотслеживаемых файлов."],
      en: ["If needed, run git init in a folder.", "Type git status.", "Read the modified and untracked file sections."]
    },
    hint: { uz: "Buyruq faqat holatni ko'rsatadi, hech qanday o'zgarish saqlamaydi.", ru: "Команда только показывает состояние и ничего не сохраняет.", en: "The command only shows state and saves nothing." },
    solution: { uz: "Bajarish: git status", ru: "Выполните: git status", en: "Run: git status" },
    why: {
      uz: "Status — commit qilishdan oldin ish holatini tekshirishning eng xavfsiz usuli.",
      ru: "Status — самый безопасный способ проверить рабочее состояние перед коммитом.",
      en: "Status is the safest way to inspect your working tree before committing."
    },
    safety: { uz: "Commit qilishdan oldin maxfiy ma'lumotlar yo'qligini tekshiring.", ru: "Перед коммитом убедитесь, что нет секретных данных.", en: "Check for secrets before committing anything." },
    command: "git status",
    expected: ["git", "status"],
    points: 8
  },
  {
    id: "local-capture",
    category: "tools",
    difficulty: "advanced",
    tags: ["tcpdump", "lo", "capture"],
    title: { uz: "Lokal interfeysda paketlarni kuzatish", ru: "Наблюдение за пакетами на локальном интерфейсе", en: "Capture Packets on Loopback" },
    scenario: {
      uz: "Faqat lo (loopback) interfeysida besh paketni ushlab, tarmoqdagi boshqa qurilmalarga aralashmasdan ko'ring.",
      ru: "Перехватите пять пакетов только на интерфейсе lo, не вмешиваясь в трафик других устройств.",
      en: "Capture five packets only on the lo interface without touching other devices' traffic."
    },
    steps: {
      uz: ["Terminalni oching.", "tcpdump -i lo -c 5 buyrug'ini bajaring.", "Chiqishdagi manzil va portlarni o'qing; to'xtatish uchun Ctrl+C."],
      ru: ["Откройте терминал.", "Выполните tcpdump -i lo -c 5.", "Прочитайте адреса и порты; для остановки нажмите Ctrl+C."],
      en: ["Open a terminal.", "Run tcpdump -i lo -c 5.", "Read the addresses and ports; press Ctrl+C to stop."]
    },
    hint: { uz: "-i interfeys nomini, -c ushlanadigan paketlar sonini belgilaydi.", ru: "-i задаёт интерфейс, -c — количество пакетов.", en: "-i selects the interface and -c sets the packet count." },
    solution: { uz: "Bajarish: tcpdump -i lo -c 5", ru: "Выполните: tcpdump -i lo -c 5", en: "Run: tcpdump -i lo -c 5" },
    why: {
      uz: "Loopback orqali faqat o'z mashinangizdagi ichki trafik ko'rinadi; -c esa jarayonni o'z-o'zidan to'xtatadi.",
      ru: "Через loopback виден только внутренний трафик вашей машины, а -c останавливает перехват автоматически.",
      en: "Loopback shows only your machine's internal traffic, and -c stops the capture automatically."
    },
    safety: { uz: "Boshqa odamlarning trafikini ushlash uchun qonuniy ruxsat kerak.", ru: "Для перехвата чужого трафика требуется законное разрешение.", en: "Legal permission is required before capturing anyone else's traffic." },
    command: "tcpdump -i lo -c 5",
    expected: ["tcpdump", "-i", "lo", "-c", "5"],
    points: 15
  },
  {
    id: "nikto-local",
    category: "kali",
    difficulty: "advanced",
    tags: ["nikto", "web", "localhost"],
    title: { uz: "Lokal veb-serverni tekshirish", ru: "Проверка локального веб-сервера", en: "Check a Local Web Server" },
    scenario: {
      uz: "O'zingiz ishga tushirgan lokal veb-server (127.0.0.1) konfiguratsiyasini tekshirish uchun nikto ishga tushiring.",
      ru: "Запустите nikto для проверки конфигурации собственного локального веб-сервера (127.0.0.1).",
      en: "Run nikto against your own local web server (127.0.0.1) to review its configuration."
    },
    steps: {
      uz: ["Lokal serverni ishga tushiring, masalan: python3 -m http.server 8000.", "nikto -h 127.0.0.1 buyrug'ini bajaring.", "Topilgan ogohlantirishlarni o'qing."],
      ru: ["Запустите локальный сервер, например: python3 -m http.server 8000.", "Выполните nikto -h 127.0.0.1.", "Прочитайте найденные предупреждения."],
      en: ["Start a local server, for example python3 -m http.server 8000.", "Run nikto -h 127.0.0.1.", "Read the reported warnings."]
    },
    hint: { uz: "-h parametridan keyin tekshiriladigan host manzili yoziladi.", ru: "После параметра -h указывается адрес проверяемого хоста.", en: "The -h flag is followed by the host address to check." },
    solution: { uz: "Bajarish: nikto -h 127.0.0.1", ru: "Выполните: nikto -h 127.0.0.1", en: "Run: nikto -h 127.0.0.1" },
    why: {
      uz: "Nikto veb-serverning eskirgan komponentlari va noto'g'ri sozlamalarini ko'rsatadi; natijani tahlil qilish muhim.",
      ru: "Nikto показывает устаревшие компоненты и ошибки конфигурации сервера; важно проанализировать результат.",
      en: "Nikto reports outdated components and misconfigurations; interpreting the results matters."
    },
    safety: { uz: "Faqat o'zingiz boshqaradigan serverni tekshiring; begona saytlarga never yubormang.", ru: "Проверяйте только свой сервер; не отправляйте запросы на чужие сайты.", en: "Test only your own server; never send requests to sites you do not control." },
    command: "nikto -h 127.0.0.1",
    expected: ["nikto", "127.0.0.1"],
    points: 15
  },
  {
    id: "mount-overview",
    category: "disk",
    difficulty: "beginner",
    tags: ["findmnt", "mount", "filesystem"],
    title: { uz: "O'rnatilgan fayl tizimlarini ko'rish", ru: "Просмотр смонтированных файловых систем", en: "View Mounted Filesystems" },
    scenario: {
      uz: "Tizimingizda qaysi fayl tizimlari va qayerga o'rnatilganini tez ko'rib chiqmoqchisiz.",
      ru: "Нужно быстро увидеть, какие файловые системы смонтированы и куда.",
      en: "You want to quickly see which filesystems are mounted and where."
    },
    steps: {
      uz: ["Terminalni oching.", "findmnt buyrug'ini bajaring.", "TARGET va SOURCE ustunlarini solishtiring."],
      ru: ["Откройте терминал.", "Выполните команду findmnt.", "Сравните столбцы TARGET и SOURCE."],
      en: ["Open a terminal.", "Run the findmnt command.", "Compare the TARGET and SOURCE columns."]
    },
    hint: { uz: "findmnt argumentlarsiz ham daraxt ko'rinishida chiqaradi.", ru: "findmnt без аргументов выводит дерево.", en: "findmnt with no arguments prints a tree view." },
    solution: { uz: "Bajarish: findmnt", ru: "Выполните: findmnt", en: "Run: findmnt" },
    why: { uz: "Bu buyruq faqat o'rnatish ma'lumotlarini o'qiydi va tizimga o'zgartirish kiritmaydi.", ru: "Команда только читает данные о монтировании и ничего не меняет.", en: "The command only reads mount information and makes no changes." },
    safety: { uz: "Faqat ko'rish buyrug'i; o'zgartirish kiritmaydi.", ru: "Только просмотр; ничего не изменяет.", en: "Read-only; it does not modify anything." },
    command: "findmnt",
    expected: ["findmnt"],
    points: 10
  },
  {
    id: "disk-partitions",
    category: "disk",
    difficulty: "intermediate",
    tags: ["lsblk", "fdisk", "partitions"],
    title: { uz: "Disk bo'limlarini ro'yxatlash", ru: "Список разделов диска", en: "List Disk Partitions" },
    scenario: {
      uz: "Disklar va ularning bo'limlarini tuzilma ko'rinishida ko'rib chiqmoqchisiz.",
      ru: "Нужно увидеть диски и их разделы в виде структуры.",
      en: "You want to view disks and their partitions as a structured tree."
    },
    steps: {
      uz: ["Terminalni oching.", "lsblk -f buyrug'ini bajaring.", "Fayl tizimi turi va o'rnatish nuqtalariga e'tibor bering."],
      ru: ["Откройте терминал.", "Выполните lsblk -f.", "Обратите внимание на тип ФС и точки монтирования."],
      en: ["Open a terminal.", "Run lsblk -f.", "Note the filesystem types and mount points."]
    },
    hint: { uz: "-f bayrog'i fayl tizimi turi va UUID ni ham ko'rsatadi.", ru: "Флаг -f показывает тип ФС и UUID.", en: "The -f flag also shows filesystem type and UUID." },
    solution: { uz: "Bajarish: lsblk -f", ru: "Выполните: lsblk -f", en: "Run: lsblk -f" },
    why: { uz: "lsblk blok qurilmalarini xavfsiz tarzda faqat o'qish rejimida ko'rsatadi.", ru: "lsblk безопасно показывает блочные устройства только для чтения.", en: "lsblk safely shows block devices in read-only mode." },
    safety: { uz: "Faqat o'qish; diskga yozmaydi.", ru: "Только чтение; на диск не пишет.", en: "Read-only; it does not write to disks." },
    command: "lsblk -f",
    expected: ["lsblk", "-f"],
    points: 10
  },
  {
    id: "file-metadata",
    category: "files",
    difficulty: "beginner",
    tags: ["stat", "metadata", "inode"],
    title: { uz: "Fayl metama'lumotlarini tekshirish", ru: "Проверка метаданных файла", en: "Inspect File Metadata" },
    scenario: {
      uz: "/tmp ichida sinov fayli yaratib, uning hajmi, ruxsatlari va vaqt tamg'alarini ko'rmoqchisiz.",
      ru: "Вы создаёте тестовый файл в /tmp и хотите увидеть его размер, права и временные метки.",
      en: "You create a test file in /tmp and want to see its size, permissions and timestamps."
    },
    steps: {
      uz: ["echo demo > /tmp/lab-meta.txt buyrug'ini bajaring.", "stat /tmp/lab-meta.txt ni ishga tushiring.", "Access, Modify, Change vaqtlarini solishtiring."],
      ru: ["Выполните echo demo > /tmp/lab-meta.txt.", "Запустите stat /tmp/lab-meta.txt.", "Сравните времена Access, Modify, Change."],
      en: ["Run echo demo > /tmp/lab-meta.txt.", "Run stat /tmp/lab-meta.txt.", "Compare the Access, Modify and Change times."]
    },
    hint: { uz: "stat fayl haqida ls dan ko'ra ko'proq ma'lumot beradi.", ru: "stat показывает о файле больше, чем ls.", en: "stat shows more about a file than ls does." },
    solution: { uz: "Bajarish: stat /tmp/lab-meta.txt", ru: "Выполните: stat /tmp/lab-meta.txt", en: "Run: stat /tmp/lab-meta.txt" },
    why: { uz: "Metama'lumotlar faylning qachon o'zgarganini va kim egaligini aniqlashga yordam beradi.", ru: "Метаданные помогают понять, когда файл менялся и кому принадлежит.", en: "Metadata helps you understand when a file changed and who owns it." },
    safety: { uz: "Faqat /tmp ichidagi sinov fayli bilan ishlang.", ru: "Работайте только с тестовым файлом в /tmp.", en: "Work only with a test file in /tmp." },
    command: "stat /tmp/lab-meta.txt",
    expected: ["stat", "/tmp/lab-meta.txt"],
    points: 10
  },
  {
    id: "sha256-verify",
    category: "files",
    difficulty: "beginner",
    tags: ["sha256sum", "hash", "integrity"],
    title: { uz: "Fayl xeshini hisoblash", ru: "Вычисление хэша файла", en: "Compute a File Hash" },
    scenario: {
      uz: "Sinov faylining yaxlitligini tekshirish uchun SHA-256 xeshini olmoqchisiz.",
      ru: "Нужно получить SHA-256 хэш тестового файла для проверки целостности.",
      en: "You want to compute a SHA-256 hash of a test file to check its integrity."
    },
    steps: {
      uz: ["echo 'lab data' > /tmp/lab-hash.txt yarating.", "sha256sum /tmp/lab-hash.txt buyrug'ini bajaring.", "Xuddi shu buyruqni qayta bajarib, natija bir xil ekanini ko'ring."],
      ru: ["Создайте echo 'lab data' > /tmp/lab-hash.txt.", "Выполните sha256sum /tmp/lab-hash.txt.", "Повторите команду и убедитесь, что результат тот же."],
      en: ["Create it with echo 'lab data' > /tmp/lab-hash.txt.", "Run sha256sum /tmp/lab-hash.txt.", "Run it again and confirm the result is the same."]
    },
    hint: { uz: "Bir xil mazmun bir xil SHA-256 xeshini beradi.", ru: "Одинаковое содержимое даёт одинаковый SHA-256.", en: "Identical content produces the same SHA-256 hash." },
    solution: { uz: "Bajarish: sha256sum /tmp/lab-hash.txt", ru: "Выполните: sha256sum /tmp/lab-hash.txt", en: "Run: sha256sum /tmp/lab-hash.txt" },
    why: { uz: "Xeshlar fayl o'zgarmaganini tekshirishda ishlatiladi.", ru: "Хэши используются для проверки, не изменился ли файл.", en: "Hashes are used to verify that a file has not changed." },
    safety: { uz: "Faqat o'z fayllaringizda sinab ko'ring.", ru: "Пробуйте только на своих файлах.", en: "Try it only on your own files." },
    command: "sha256sum /tmp/lab-hash.txt",
    expected: ["sha256sum", "/tmp/lab-hash.txt"],
    points: 10
  },
  {
    id: "base64-roundtrip",
    category: "text",
    difficulty: "beginner",
    tags: ["base64", "encode", "decode"],
    title: { uz: "Base64 kodlash va dekodlash", ru: "Кодирование и декодирование Base64", en: "Base64 Encode and Decode" },
    scenario: {
      uz: "Oddiy matnni Base64 ga aylantirib, keyin asl holatiga qaytarishni mashq qilasiz.",
      ru: "Вы тренируетесь кодировать текст в Base64 и возвращать обратно.",
      en: "You practice encoding text to Base64 and decoding it back."
    },
    steps: {
      uz: ["echo demo | base64 buyrug'ini bajaring.", "Chiqqan satrni oling.", "echo ZGVtbwo= | base64 -d bilan qayta dekodlang."],
      ru: ["Выполните echo demo | base64.", "Возьмите полученную строку.", "Декодируйте обратно через echo ZGVtbwo= | base64 -d."],
      en: ["Run echo demo | base64.", "Take the output string.", "Decode it back with echo ZGVtbwo= | base64 -d."]
    },
    hint: { uz: "-d bayrog'i dekodlash uchun ishlatiladi.", ru: "Флаг -d используется для декодирования.", en: "The -d flag is used for decoding." },
    solution: { uz: "Bajarish: echo demo | base64", ru: "Выполните: echo demo | base64", en: "Run: echo demo | base64" },
    why: { uz: "Base64 binar ma'lumotni matn ko'rinishida uzatish uchun qulay.", ru: "Base64 удобен для передачи бинарных данных в текстовом виде.", en: "Base64 is convenient for carrying binary data as text." },
    safety: { uz: "Bu faqat kodlash; shifrlash emas, maxfiylik bermaydi.", ru: "Это кодирование, а не шифрование; секретности не даёт.", en: "This is encoding, not encryption; it provides no secrecy." },
    command: "echo demo | base64",
    expected: ["base64"],
    points: 10
  },
  {
    id: "strings-binary",
    category: "text",
    difficulty: "intermediate",
    tags: ["strings", "binary", "analysis"],
    title: { uz: "Binor fayldan matn ajratish", ru: "Извлечение текста из бинарного файла", en: "Extract Text from a Binary File" },
    scenario: {
      uz: "/bin/ls kabi binor fayl ichidagi o'qiladigan satrlarni ko'rib chiqmoqchisiz.",
      ru: "Хотите посмотреть читаемые строки внутри бинарного файла, например /bin/ls.",
      en: "You want to inspect printable strings inside a binary file such as /bin/ls."
    },
    steps: {
      uz: ["Terminalni oching.", "strings /bin/ls | head -20 buyrug'ini bajaring.", "Chiqqan satrlarni ko'zdan kechiring."],
      ru: ["Откройте терминал.", "Выполните strings /bin/ls | head -20.", "Просмотрите полученные строки."],
      en: ["Open a terminal.", "Run strings /bin/ls | head -20.", "Review the printed strings."]
    },
    hint: { uz: "strings faqat o'qiladigan belgilar ketma-ketligini chiqaradi.", ru: "strings выводит только читаемые последовательности символов.", en: "strings prints only readable character sequences." },
    solution: { uz: "Bajarish: strings /bin/ls | head -20", ru: "Выполните: strings /bin/ls | head -20", en: "Run: strings /bin/ls | head -20" },
    why: { uz: "Bu usul binor fayllarni tahlil qilishning xavfsiz va oddiy bosqichidir.", ru: "Это безопасный и простой шаг анализа бинарных файлов.", en: "This is a safe and simple step in binary file analysis." },
    safety: { uz: "Faqat o'qish; faylni o'zgartirmaydi.", ru: "Только чтение; файл не изменяется.", en: "Read-only; it does not modify the file." },
    command: "strings /bin/ls | head -20",
    expected: ["strings", "/bin/ls"],
    points: 10
  },
  {
    id: "cut-columns",
    category: "text",
    difficulty: "beginner",
    tags: ["cut", "columns", "passwd"],
    title: { uz: "Matndan ustun ajratish", ru: "Извлечение столбца из текста", en: "Extract a Column from Text" },
    scenario: {
      uz: "/etc/passwd faylidan faqat foydalanuvchi nomlarini ajratib olmoqchisiz.",
      ru: "Нужно извлечь только имена пользователей из /etc/passwd.",
      en: "You want to extract only usernames from /etc/passwd."
    },
    steps: {
      uz: ["Terminalni oching.", "cut -d: -f1 /etc/passwd buyrug'ini bajaring.", "Birinchi bir nechta natijani tekshiring."],
      ru: ["Откройте терминал.", "Выполните cut -d: -f1 /etc/passwd.", "Проверьте первые результаты."],
      en: ["Open a terminal.", "Run cut -d: -f1 /etc/passwd.", "Check the first few results."]
    },
    hint: { uz: "-d ajratgichni, -f esa maydon raqamini belgilaydi.", ru: "-d задаёт разделитель, а -f — номер поля.", en: "-d sets the delimiter and -f selects the field number." },
    solution: { uz: "Bajarish: cut -d: -f1 /etc/passwd", ru: "Выполните: cut -d: -f1 /etc/passwd", en: "Run: cut -d: -f1 /etc/passwd" },
    why: { uz: "cut tuzilgan matn fayllaridan kerakli ustunni tez ajratadi.", ru: "cut быстро извлекает нужный столбец из структурированного текста.", en: "cut quickly extracts the needed column from structured text." },
    safety: { uz: "Faqat o'qish buyrug'i.", ru: "Команда только для чтения.", en: "Read-only command." },
    command: "cut -d: -f1 /etc/passwd",
    expected: ["cut", "-d:", "-f1", "/etc/passwd"],
    points: 10
  },
  {
    id: "jobs-bg",
    category: "processes",
    difficulty: "beginner",
    tags: ["jobs", "background", "shell"],
    title: { uz: "Fon vazifalarini ko'rish", ru: "Просмотр фоновых задач", en: "View Background Jobs" },
    scenario: {
      uz: "Qisqa fon vazifasi ishga tushirib, uni joriy shell ichida ko'rmoqchisiz.",
      ru: "Вы запускаете короткую фоновую задачу и хотите увидеть её в текущей оболочке.",
      en: "You start a short background job and want to see it in the current shell."
    },
    steps: {
      uz: ["sleep 30 & buyrug'ini bajaring.", "jobs buyrug'ini yozing.", "Ro'yxatda sleep vazifasi borligini tekshiring."],
      ru: ["Выполните sleep 30 &.", "Введите команду jobs.", "Убедитесь, что задача sleep есть в списке."],
      en: ["Run sleep 30 &.", "Type jobs.", "Confirm the sleep job appears in the list."]
    },
    hint: { uz: "& belgisi buyruqni fon rejimida ishga tushiradi.", ru: "Символ & запускает команду в фоне.", en: "The & symbol runs a command in the background." },
    solution: { uz: "Bajarish: jobs", ru: "Выполните: jobs", en: "Run: jobs" },
    why: { uz: "jobs shell ichidagi vazifalarni boshqarishni tushunishga yordam beradi.", ru: "jobs помогает понять управление задачами внутри оболочки.", en: "jobs helps you understand job control inside the shell." },
    safety: { uz: "sleep zararsiz; tugagach o'zi yopiladi.", ru: "sleep безвреден и завершится сам.", en: "sleep is harmless and exits on its own." },
    command: "jobs",
    expected: ["jobs"],
    points: 10
  },
  {
    id: "find-process",
    category: "processes",
    difficulty: "intermediate",
    tags: ["pgrep", "pid", "process"],
    title: { uz: "Jarayon PID ini topish", ru: "Поиск PID процесса", en: "Find a Process PID" },
    scenario: {
      uz: "Tizimda ishlayotgan ma'lum nomdagi jarayonning PID raqamini topmoqchisiz.",
      ru: "Нужно найти PID процесса с известным именем.",
      en: "You want to find the PID of a process with a known name."
    },
    steps: {
      uz: ["Terminalni oching.", "pgrep -a bash buyrug'ini bajaring.", "Chiqqan PID va buyruq satrlarini ko'ring."],
      ru: ["Откройте терминал.", "Выполните pgrep -a bash.", "Посмотрите PID и строки команд."],
      en: ["Open a terminal.", "Run pgrep -a bash.", "Review the PIDs and command lines."]
    },
    hint: { uz: "-a bayrog'i PID bilan birga buyruqni ham ko'rsatadi.", ru: "Флаг -a показывает команду вместе с PID.", en: "The -a flag shows the command along with the PID." },
    solution: { uz: "Bajarish: pgrep -a bash", ru: "Выполните: pgrep -a bash", en: "Run: pgrep -a bash" },
    why: { uz: "pgrep jarayon nomidan PID olishning tez va xavfsiz usuli.", ru: "pgrep — быстрый и безопасный способ получить PID по имени.", en: "pgrep is a fast and safe way to get a PID by name." },
    safety: { uz: "Faqat qidirish; jarayonni to'xtatmaydi.", ru: "Только поиск; процессы не останавливает.", en: "Search only; it does not stop processes." },
    command: "pgrep -a bash",
    expected: ["pgrep", "-a", "bash"],
    points: 10
  },
  {
    id: "journal-recent",
    category: "system",
    difficulty: "intermediate",
    tags: ["journalctl", "logs", "systemd"],
    title: { uz: "So'nggi tizim loglarini ko'rish", ru: "Просмотр последних системных логов", en: "View Recent System Logs" },
    scenario: {
      uz: "Tizimda yaqinda nima bo'lganini ko'rish uchun oxirgi jurnal yozuvlarini tekshirasiz.",
      ru: "Вы проверяете последние записи журнала, чтобы понять, что недавно происходило в системе.",
      en: "You check recent journal entries to see what happened on the system lately."
    },
    steps: {
      uz: ["Terminalni oching.", "journalctl -n 20 buyrug'ini bajaring.", "Vaqt va xizmat nomlariga e'tibor bering."],
      ru: ["Откройте терминал.", "Выполните journalctl -n 20.", "Обратите внимание на время и имена служб."],
      en: ["Open a terminal.", "Run journalctl -n 20.", "Pay attention to timestamps and service names."]
    },
    hint: { uz: "-n oxirgi N ta qatorni cheklaydi.", ru: "-n ограничивает вывод последними N строками.", en: "-n limits output to the last N lines." },
    solution: { uz: "Bajarish: journalctl -n 20", ru: "Выполните: journalctl -n 20", en: "Run: journalctl -n 20" },
    why: { uz: "Jurnal loglari muammo sababini topishda birinchi manba bo'ladi.", ru: "Журнал часто является первым источником при поиске причин проблем.", en: "Journal logs are often the first place to look when troubleshooting." },
    safety: { uz: "Faqat o'qish buyrug'i; tizimni o'zgartirmaydi.", ru: "Только чтение; систему не изменяет.", en: "Read-only; it does not modify the system." },
    command: "journalctl -n 20",
    expected: ["journalctl", "-n", "20"],
    points: 10
  },
  {
    id: "cpu-info",
    category: "system",
    difficulty: "beginner",
    tags: ["lscpu", "cpu", "hardware"],
    title: { uz: "Protsessor ma'lumotlarini ko'rish", ru: "Просмотр информации о процессоре", en: "View CPU Information" },
    scenario: {
      uz: "Tizimingizdagi protsessor modeli, yadrolar soni va arxitekturasini bilmoqchisiz.",
      ru: "Хотите узнать модель процессора, число ядер и архитектуру системы.",
      en: "You want to learn your CPU model, core count and architecture."
    },
    steps: {
      uz: ["Terminalni oching.", "lscpu buyrug'ini bajaring.", "Architecture va CPU(s) qatorlarini toping."],
      ru: ["Откройте терминал.", "Выполните lscpu.", "Найдите строки Architecture и CPU(s)."],
      en: ["Open a terminal.", "Run lscpu.", "Find the Architecture and CPU(s) lines."]
    },
    hint: { uz: "lscpu /proc/cpuinfo ma'lumotlarini qulay ko'rinishda beradi.", ru: "lscpu показывает данные /proc/cpuinfo в удобном виде.", en: "lscpu presents /proc/cpuinfo data in a readable form." },
    solution: { uz: "Bajarish: lscpu", ru: "Выполните: lscpu", en: "Run: lscpu" },
    why: { uz: "Uskuna ma'lumotini bilish dastur va paket mosligini tekshirishda foydali.", ru: "Знание характеристик железа помогает проверять совместимость.", en: "Knowing hardware details helps when checking software compatibility." },
    safety: { uz: "Faqat o'qish buyrug'i.", ru: "Только чтение.", en: "Read-only command." },
    command: "lscpu",
    expected: ["lscpu"],
    points: 10
  },
  {
    id: "dns-lookup-ns",
    category: "network",
    difficulty: "intermediate",
    tags: ["nslookup", "dns", "lookup"],
    title: { uz: "DNS yozuvini so'rash", ru: "Запрос DNS-записи", en: "Query a DNS Record" },
    scenario: {
      uz: "Domen nomi qaysi IP manzilga mos kelishini DNS orqali tekshirmoqchisiz.",
      ru: "Хотите проверить через DNS, какому IP соответствует доменное имя.",
      en: "You want to check via DNS which IP a domain name resolves to."
    },
    steps: {
      uz: ["Terminalni oching.", "nslookup example.com buyrug'ini bajaring.", "Javobdagi Address maydonini o'qing."],
      ru: ["Откройте терминал.", "Выполните nslookup example.com.", "Прочитайте поле Address в ответе."],
      en: ["Open a terminal.", "Run nslookup example.com.", "Read the Address field in the response."]
    },
    hint: { uz: "nslookup oddiy DNS tekshiruvlari uchun qulay vosita.", ru: "nslookup удобен для простых DNS-проверок.", en: "nslookup is convenient for simple DNS checks." },
    solution: { uz: "Bajarish: nslookup example.com", ru: "Выполните: nslookup example.com", en: "Run: nslookup example.com" },
    why: { uz: "DNS muammolarini aniqlashda nom yechilishini tekshirish muhim.", ru: "При проблемах с DNS важно проверять разрешение имён.", en: "Checking name resolution is key when troubleshooting DNS issues." },
    safety: { uz: "Faqat ommaviy domenlarga oddiy so'rov yuboring.", ru: "Делайте только обычные запросы к публичным доменам.", en: "Make only normal queries to public domains." },
    command: "nslookup example.com",
    expected: ["nslookup", "example.com"],
    points: 10
  },
  {
    id: "download-page",
    category: "network",
    difficulty: "beginner",
    tags: ["wget", "download", "http"],
    title: { uz: "Sahifani faylga yuklab olish", ru: "Скачать страницу в файл", en: "Download a Page to a File" },
    scenario: {
      uz: "Ommaviy namunaviy sahifani lokal fayl sifatida saqlab olmoqchisiz.",
      ru: "Нужно сохранить публичную примерную страницу как локальный файл.",
      en: "You want to save a public example page as a local file."
    },
    steps: {
      uz: ["Terminalni oching.", "wget -O /tmp/example.html https://example.com buyrug'ini bajaring.", "ls -lh /tmp/example.html bilan fayl yaratilganini tekshiring."],
      ru: ["Откройте терминал.", "Выполните wget -O /tmp/example.html https://example.com.", "Проверьте файл командой ls -lh /tmp/example.html."],
      en: ["Open a terminal.", "Run wget -O /tmp/example.html https://example.com.", "Check the file with ls -lh /tmp/example.html."]
    },
    hint: { uz: "-O chiqish fayl nomini belgilaydi.", ru: "-O задаёт имя выходного файла.", en: "-O sets the output file name." },
    solution: { uz: "Bajarish: wget -O /tmp/example.html https://example.com", ru: "Выполните: wget -O /tmp/example.html https://example.com", en: "Run: wget -O /tmp/example.html https://example.com" },
    why: { uz: "wget skriptlar va avtomatlashtirishda fayl yuklab olish uchun qulay.", ru: "wget удобен для загрузки файлов в скриптах и автоматизации.", en: "wget is handy for downloading files in scripts and automation." },
    safety: { uz: "Faqat ishonchli va ommaviy manbalardan yuklang.", ru: "Скачивайте только из доверенных публичных источников.", en: "Download only from trusted public sources." },
    command: "wget -O /tmp/example.html https://example.com",
    expected: ["wget", "-O", "/tmp/example.html", "https://example.com"],
    points: 10
  },
  {
    id: "open-files-port",
    category: "processes",
    difficulty: "advanced",
    tags: ["lsof", "port", "socket"],
    title: { uz: "Portni qaysi jarayon ishlatayotganini topish", ru: "Какой процесс использует порт", en: "Find Which Process Uses a Port" },
    scenario: {
      uz: "Lokal tizimda ma'lum port band bo'lsa, uni qaysi jarayon ochganini aniqlamoqchisiz.",
      ru: "Если локальный порт занят, нужно определить, какой процесс его открыл.",
      en: "If a local port is busy, you want to identify which process opened it."
    },
    steps: {
      uz: ["Terminalni oching.", "sudo lsof -i :22 buyrug'ini sinab ko'ring (yoki boshqa lokal port).", "COMMAND va PID ustunlarini o'qing."],
      ru: ["Откройте терминал.", "Попробуйте sudo lsof -i :22 (или другой локальный порт).", "Прочитайте столбцы COMMAND и PID."],
      en: ["Open a terminal.", "Try sudo lsof -i :22 (or another local port).", "Read the COMMAND and PID columns."]
    },
    hint: { uz: "-i tarmoq soketlarini ko'rsatadi; :22 port raqamini bildiradi.", ru: "-i показывает сетевые сокеты; :22 означает номер порта.", en: "-i shows network sockets; :22 specifies the port number." },
    solution: { uz: "Bajarish: sudo lsof -i :22", ru: "Выполните: sudo lsof -i :22", en: "Run: sudo lsof -i :22" },
    why: { uz: "Port bandligi muammolarini topishda lsof juda foydali.", ru: "lsof очень полезен при диагностике занятых портов.", en: "lsof is very useful when diagnosing busy ports." },
    safety: { uz: "Faqat o'z tizimingizdagi portlarni tekshiring; begona jarayonlarni to'xtatmang.", ru: "Проверяйте порты только на своей системе; чужие процессы не останавливайте.", en: "Check ports only on your own system; do not stop чужие processes." },
    command: "sudo lsof -i :22",
    expected: ["lsof", "-i", ":22"],
    points: 15
  },
  {
    id: "compare-configs",
    category: "text",
    difficulty: "intermediate",
    tags: ["diff", "compare", "config"],
    title: { uz: "Ikki fayl farqini topish", ru: "Найти различия между двумя файлами", en: "Find Differences Between Two Files" },
    scenario: {
      uz: "Ikki konfiguratsiya faylining nimasi bilan farq qilishini ko'rmoqchisiz.",
      ru: "Нужно увидеть, чем отличаются два конфигурационных файла.",
      en: "You want to see how two configuration files differ."
    },
    steps: {
      uz: ["printf 'a=1\nb=2\n' > /tmp/a.conf yarating.", "printf 'a=1\nb=3\n' > /tmp/b.conf yarating.", "diff -u /tmp/a.conf /tmp/b.conf buyrug'ini bajaring."],
      ru: ["Создайте printf 'a=1\nb=2\n' > /tmp/a.conf.", "Создайте printf 'a=1\nb=3\n' > /tmp/b.conf.", "Выполните diff -u /tmp/a.conf /tmp/b.conf."],
      en: ["Create printf 'a=1\nb=2\n' > /tmp/a.conf.", "Create printf 'a=1\nb=3\n' > /tmp/b.conf.", "Run diff -u /tmp/a.conf /tmp/b.conf."]
    },
    hint: { uz: "-u unified format beradi, o'qish osonroq.", ru: "-u даёт unified-формат, его легче читать.", en: "-u gives unified format, which is easier to read." },
    solution: { uz: "Bajarish: diff -u /tmp/a.conf /tmp/b.conf", ru: "Выполните: diff -u /tmp/a.conf /tmp/b.conf", en: "Run: diff -u /tmp/a.conf /tmp/b.conf" },
    why: { uz: "diff konfiguratsiya o'zgarishlarini tekshirishda asosiy vositadir.", ru: "diff — основной инструмент для проверки изменений конфигурации.", en: "diff is a core tool for reviewing configuration changes." },
    safety: { uz: "Faqat /tmp dagi sinov fayllarida mashq qiling.", ru: "Практикуйтесь только на тестовых файлах в /tmp.", en: "Practice only on test files in /tmp." },
    command: "diff -u /tmp/a.conf /tmp/b.conf",
    expected: ["diff", "-u", "/tmp/a.conf", "/tmp/b.conf"],
    points: 10
  }

];
