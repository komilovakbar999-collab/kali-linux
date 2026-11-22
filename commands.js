/* LinuxLugat ma'lumotlari — content/*.json dan generatsiya qilingan.
 * Tahrir: cms.html (Decap CMS) yoki content/*.json, keyin node scripts/build-data.js
 */

window.CATEGORIES = [
  {
    "id": "all",
    "uz": "Barchasi",
    "ru": "Все",
    "en": "All",
    "icon": "✦"
  },
  {
    "id": "files",
    "uz": "Fayllar",
    "ru": "Файлы",
    "en": "Files",
    "icon": "📄"
  },
  {
    "id": "dirs",
    "uz": "Papkalar",
    "ru": "Каталоги",
    "en": "Directories",
    "icon": "📁"
  },
  {
    "id": "text",
    "uz": "Matn",
    "ru": "Текст",
    "en": "Text",
    "icon": "✍️"
  },
  {
    "id": "perms",
    "uz": "Ruxsatlar",
    "ru": "Права",
    "en": "Permissions",
    "icon": "🔐"
  },
  {
    "id": "users",
    "uz": "Foydalanuvchilar",
    "ru": "Пользователи",
    "en": "Users",
    "icon": "👤"
  },
  {
    "id": "processes",
    "uz": "Jarayonlar",
    "ru": "Процессы",
    "en": "Processes",
    "icon": "⚙️"
  },
  {
    "id": "system",
    "uz": "Tizim",
    "ru": "Система",
    "en": "System",
    "icon": "🖥️"
  },
  {
    "id": "network",
    "uz": "Tarmoq",
    "ru": "Сеть",
    "en": "Network",
    "icon": "🌐"
  },
  {
    "id": "disk",
    "uz": "Disk",
    "ru": "Диск",
    "en": "Disk",
    "icon": "💽"
  },
  {
    "id": "archive",
    "uz": "Arxiv",
    "ru": "Архивы",
    "en": "Archives",
    "icon": "📦"
  },
  {
    "id": "packages",
    "uz": "Paketlar",
    "ru": "Пакеты",
    "en": "Packages",
    "icon": "🧩"
  },
  {
    "id": "git",
    "uz": "Git",
    "ru": "Git",
    "en": "Git",
    "icon": "🌿"
  },
  {
    "id": "tools",
    "uz": "Vositalar",
    "ru": "Инструменты",
    "en": "Tools",
    "icon": "🛠️"
  },
  {
    "id": "kali",
    "uz": "Kali vositalari",
    "ru": "Инструменты Kali",
    "en": "Kali tools",
    "icon": "🎯"
  }
];

window.LINUX_COMMANDS = [
  {
    "id": "ls",
    "name": "ls",
    "syntax": "ls [OPTION]... [FILE]...",
    "category": "files",
    "tags": [
      "list",
      "ro'yxat",
      "список",
      "fayl"
    ],
    "desc": {
      "uz": "Katalogdagi fayl va papkalar ro'yxatini chiqaradi.",
      "ru": "Выводит список файлов и каталогов в текущей папке.",
      "en": "Lists files and directories in a folder."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Uzun format: ruxsat, egasi, hajm, sana",
        "ru": "Длинный формат: права, владелец, размер, дата",
        "en": "Long format: permissions, owner, size, date"
      },
      {
        "flag": "-a",
        "uz": "Yashirin fayllarni ham ko'rsatadi",
        "ru": "Показывать скрытые файлы",
        "en": "Show hidden files too"
      },
      {
        "flag": "-h",
        "uz": "Hajmni o'qiladigan shaklda (1K, 2M)",
        "ru": "Размер в читаемом виде (1K, 2M)",
        "en": "Human-readable sizes (1K, 2M)"
      },
      {
        "flag": "-t",
        "uz": "O'zgartirilgan vaqti bo'yicha saralaydi",
        "ru": "Сортировать по времени изменения",
        "en": "Sort by modification time"
      }
    ],
    "examples": [
      {
        "cmd": "ls -lah",
        "uz": "Barcha fayllar, jumladan yashirinlari, inson o'qiy oladigan hajm bilan",
        "ru": "Все файлы, включая скрытые, с читаемым размером",
        "en": "All files, including hidden ones, with human-readable sizes"
      },
      {
        "cmd": "ls -lt /var/log",
        "uz": "Log papkasidagi fayllarni yangidan eskiga qarab chiqarish",
        "ru": "Файлы папки логов от новых к старым",
        "en": "List log files from newest to oldest"
      }
    ]
  },
  {
    "id": "cp",
    "name": "cp",
    "syntax": "cp [OPTION] SOURCE DEST",
    "category": "files",
    "tags": [
      "copy",
      "nusxa",
      "копировать"
    ],
    "desc": {
      "uz": "Fayl yoki papkani nusxalaydi.",
      "ru": "Копирует файлы и каталоги.",
      "en": "Copies files or directories."
    },
    "options": [
      {
        "flag": "-r, -R",
        "uz": "Papkalarni ham nusxalaydi (rekursiv)",
        "ru": "Рекурсивно копировать каталоги",
        "en": "Copy directories recursively"
      },
      {
        "flag": "-i",
        "uz": "Ustiga yozishdan oldin so'raydi",
        "ru": "Спрашивать перед перезаписью",
        "en": "Prompt before overwriting"
      },
      {
        "flag": "-v",
        "uz": "Har bir nusxalangan faylni chiqaradi",
        "ru": "Выводить каждый скопированный файл",
        "en": "Print each copied file"
      },
      {
        "flag": "-p",
        "uz": "Ruxsat va vaqt belgilarini saqlaydi",
        "ru": "Сохранять права и время",
        "en": "Preserve permissions and timestamps"
      }
    ],
    "examples": [
      {
        "cmd": "cp report.txt report_backup.txt",
        "uz": "Fayl nusxasini yaratish",
        "ru": "Создать копию файла",
        "en": "Create a copy of a file"
      },
      {
        "cmd": "cp -r ~/Pictures /mnt/backup/",
        "uz": "Butun papkani zaxira diskka nusxalash",
        "ru": "Скопировать всю папку на резервный диск",
        "en": "Copy a whole folder to a backup disk"
      }
    ]
  },
  {
    "id": "mv",
    "name": "mv",
    "syntax": "mv [OPTION] SOURCE DEST",
    "category": "files",
    "tags": [
      "move",
      "rename",
      "ko'chirish",
      "переместить",
      "переименовать"
    ],
    "desc": {
      "uz": "Faylni ko'chiradi yoki nomini o'zgartiradi.",
      "ru": "Перемещает файл или переименовывает его.",
      "en": "Moves a file or renames it."
    },
    "options": [
      {
        "flag": "-i",
        "uz": "Ustiga yozishdan oldin so'raydi",
        "ru": "Спрашивать перед перезаписью",
        "en": "Prompt before overwriting"
      },
      {
        "flag": "-n",
        "uz": "Mavjud fayl ustiga yozmaydi",
        "ru": "Не перезаписывать существующие файлы",
        "en": "Do not overwrite existing files"
      },
      {
        "flag": "-v",
        "uz": "Bajarilgan harakatlarni chiqaradi",
        "ru": "Выводить выполняемые действия",
        "en": "Print actions performed"
      }
    ],
    "examples": [
      {
        "cmd": "mv old_name.txt new_name.txt",
        "uz": "Fayl nomini o'zgartirish",
        "ru": "Переименовать файл",
        "en": "Rename a file"
      },
      {
        "cmd": "mv *.log /var/log/archive/",
        "uz": "Barcha log fayllarini arxiv papkaga ko'chirish",
        "ru": "Переместить все логи в папку архива",
        "en": "Move all log files to an archive folder"
      }
    ]
  },
  {
    "id": "rm",
    "name": "rm",
    "syntax": "rm [OPTION] FILE...",
    "category": "files",
    "tags": [
      "remove",
      "delete",
      "o'chirish",
      "удалить"
    ],
    "desc": {
      "uz": "Fayl va papkalarni o'chiradi. Ehtiyot bo'ling — qayta tiklab bo'lmaydi.",
      "ru": "Удаляет файлы и каталоги. Внимание: восстановление невозможно.",
      "en": "Deletes files and directories. Caution: deletion is permanent."
    },
    "options": [
      {
        "flag": "-r",
        "uz": "Papka ichidagilari bilan o'chiradi",
        "ru": "Удалять каталог со содержимым",
        "en": "Remove a directory with its contents"
      },
      {
        "flag": "-f",
        "uz": "So'rovsiz va xatosiz majburiy o'chiradi",
        "ru": "Принудительно удалять без запросов",
        "en": "Force removal without prompts or errors"
      },
      {
        "flag": "-i",
        "uz": "Har bir faylni o'chirishdan oldin so'raydi",
        "ru": "Спрашивать перед удалением каждого файла",
        "en": "Prompt before deleting each file"
      },
      {
        "flag": "-v",
        "uz": "O'chirilgan fayllarni chiqaradi",
        "ru": "Выводить удалённые файлы",
        "en": "Print deleted files"
      }
    ],
    "examples": [
      {
        "cmd": "rm -i report.txt",
        "uz": "Tasdiqlash bilan faylni o'chirish",
        "ru": "Удалить файл с подтверждением",
        "en": "Delete a file with confirmation"
      },
      {
        "cmd": "rm -rf /tmp/old_build",
        "uz": "Papkani butunlay o'chirish (diqqatli bo'ling!)",
        "ru": "Полностью удалить папку (осторожно!)",
        "en": "Delete a folder completely (be careful!)"
      }
    ]
  },
  {
    "id": "touch",
    "name": "touch",
    "syntax": "touch [OPTION] FILE...",
    "category": "files",
    "tags": [
      "create",
      "yaratish",
      "создать",
      "время"
    ],
    "desc": {
      "uz": "Bo'sh fayl yaratadi yoki mavjud faylning vaqt belgisini yangilaydi.",
      "ru": "Создаёт пустой файл или обновляет время изменения существующего.",
      "en": "Creates an empty file or updates an existing file's timestamp."
    },
    "options": [
      {
        "flag": "-a",
        "uz": "Faqat kirish vaqtini yangilaydi",
        "ru": "Обновить только время доступа",
        "en": "Update only the access time"
      },
      {
        "flag": "-m",
        "uz": "Faqat o'zgartirish vaqtini yangilaydi",
        "ru": "Обновить только время изменения",
        "en": "Update only the modification time"
      },
      {
        "flag": "-c",
        "uz": "Fayl yo'q bo'lsa, yaratmaydi",
        "ru": "Не создавать файл, если его нет",
        "en": "Do not create the file if it does not exist"
      }
    ],
    "examples": [
      {
        "cmd": "touch notes.txt",
        "uz": "Yangi bo'sh fayl yaratish",
        "ru": "Создать новый пустой файл",
        "en": "Create a new empty file"
      },
      {
        "cmd": "touch -t 202601011200 file.txt",
        "uz": "Fayl vaqtini aniq sanaga o'rnatish",
        "ru": "Установить точное время файла",
        "en": "Set a file's timestamp to a specific date"
      }
    ]
  },
  {
    "id": "cat",
    "name": "cat",
    "syntax": "cat [OPTION] FILE...",
    "category": "files",
    "tags": [
      "read",
      "ko'rsatish",
      "показать",
      "читать"
    ],
    "desc": {
      "uz": "Fayl tarkibini ekranga chiqaradi va fayllarni birlashtiradi.",
      "ru": "Выводит содержимое файлов на экран и объединяет их.",
      "en": "Prints file contents and concatenates files."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Har bir qatorni raqamlaydi",
        "ru": "Нумеровать все строки",
        "en": "Number all lines"
      },
      {
        "flag": "-b",
        "uz": "Faqat bo'sh bo'lmagan qatorlarni raqamlaydi",
        "ru": "Нумеровать только непустые строки",
        "en": "Number only non-empty lines"
      },
      {
        "flag": "-A",
        "uz": "Qator oxiri va boshqa belgilarni ko'rsatadi",
        "ru": "Показывать переводы строк и др. символы",
        "en": "Show line endings and other characters"
      }
    ],
    "examples": [
      {
        "cmd": "cat /etc/os-release",
        "uz": "Operatsion tizim haqidagi ma'lumotni o'qish",
        "ru": "Прочитать информацию об ОС",
        "en": "Read operating system information"
      },
      {
        "cmd": "cat a.txt b.txt > merged.txt",
        "uz": "Ikki faylni birlashtirib yangi fayl yaratish",
        "ru": "Объединить два файла в новый",
        "en": "Combine two files into a new one"
      }
    ]
  },
  {
    "id": "file",
    "name": "file",
    "syntax": "file [OPTION] FILE...",
    "category": "files",
    "tags": [
      "type",
      "tur",
      "тип",
      "формат"
    ],
    "desc": {
      "uz": "Fayl turini uning tarkibiga qarab aniqlaydi.",
      "ru": "Определяет тип файла по его содержимому.",
      "en": "Determines a file's type from its contents."
    },
    "options": [
      {
        "flag": "-i",
        "uz": "MIME turini chiqaradi",
        "ru": "Вывести MIME-тип",
        "en": "Print the MIME type"
      },
      {
        "flag": "-b",
        "uz": "Fayl nomisiz natija chiqaradi",
        "ru": "Короткий вывод без имени файла",
        "en": "Short output without the filename"
      }
    ],
    "examples": [
      {
        "cmd": "file image.png",
        "uz": "Fayl haqiqatan ham PNG ekanligini tekshirish",
        "ru": "Проверить, что файл действительно PNG",
        "en": "Check that a file is really PNG"
      },
      {
        "cmd": "file -i *",
        "uz": "Joriy papkadagi barcha fayllarning MIME turlari",
        "ru": "MIME-типы всех файлов в папке",
        "en": "MIME types of all files in the folder"
      }
    ]
  },
  {
    "id": "find",
    "name": "find",
    "syntax": "find [PATH] [EXPRESSION]",
    "category": "files",
    "tags": [
      "search",
      "qidirish",
      "поиск",
      "файл"
    ],
    "desc": {
      "uz": "Kataloglar daraxti bo'ylab fayllarni turli mezonlar bilan qidiradi.",
      "ru": "Ищет файлы по каталогам с помощью различных условий.",
      "en": "Searches for files in a directory tree using various criteria."
    },
    "options": [
      {
        "flag": "-name \"*.log\"",
        "uz": "Nom bo'yicha qidiradi (shabloni bilan)",
        "ru": "Искать по имени (с шаблоном)",
        "en": "Search by name (with a pattern)"
      },
      {
        "flag": "-type f",
        "uz": "Faqat fayllar (d — papkalar)",
        "ru": "Только файлы (d — каталоги)",
        "en": "Files only (d — directories)"
      },
      {
        "flag": "-mtime -7",
        "uz": "Oxirgi 7 kunda o'zgartirilganlar",
        "ru": "Изменённые за последние 7 дней",
        "en": "Modified in the last 7 days"
      },
      {
        "flag": "-size +100M",
        "uz": "100 MB dan kattalar",
        "ru": "Больше 100 МБ",
        "en": "Larger than 100 MB"
      },
      {
        "flag": "-exec CMD {} \\;",
        "uz": "Topilgan har bir fayl uchun buyruq bajaradi",
        "ru": "Выполнить команду для каждого найденного файла",
        "en": "Run a command for each file found"
      }
    ],
    "examples": [
      {
        "cmd": "find /var/log -name \"*.log\" -mtime -7",
        "uz": "Oxirgi haftadagi log fayllarini topish",
        "ru": "Найти логи за последнюю неделю",
        "en": "Find logs from the last week"
      },
      {
        "cmd": "find . -type f -size +100M",
        "uz": "Joriy papkadagi yirik fayllarni topish",
        "ru": "Найти большие файлы в текущей папке",
        "en": "Find large files in the current folder"
      }
    ]
  },
  {
    "id": "ln",
    "name": "ln",
    "syntax": "ln [OPTION] TARGET [LINK_NAME]",
    "category": "files",
    "tags": [
      "link",
      "havola",
      "ссылка",
      "symlink"
    ],
    "desc": {
      "uz": "Faylga qattiq (hard) yoki ramziy (symbolic) havola yaratadi.",
      "ru": "Создаёт жёсткую (hard) или символическую (symlink) ссылку.",
      "en": "Creates a hard or symbolic link to a file."
    },
    "options": [
      {
        "flag": "-s",
        "uz": "Ramziy havola yaratadi",
        "ru": "Создать символическую ссылку",
        "en": "Create a symbolic link"
      },
      {
        "flag": "-f",
        "uz": "Mavjud havolani olib tashlaydi",
        "ru": "Удалить существующую ссылку",
        "en": "Remove an existing link"
      },
      {
        "flag": "-v",
        "uz": "Yaratilgan havolalarni chiqaradi",
        "ru": "Выводить созданные ссылки",
        "en": "Print created links"
      }
    ],
    "examples": [
      {
        "cmd": "ln -s /opt/app/config.yaml ~/config.yaml",
        "uz": "Konfiguratsiyaga qisqa yo'l havola yaratish",
        "ru": "Создать короткую ссылку на конфиг",
        "en": "Create a shortcut to a config file"
      },
      {
        "cmd": "ln -s /usr/bin/python3 /usr/local/bin/python",
        "uz": "Python uchun umumiy havola yaratish",
        "ru": "Создать общую ссылку на Python",
        "en": "Create a common link for Python"
      }
    ]
  },
  {
    "id": "pwd",
    "name": "pwd",
    "syntax": "pwd",
    "category": "dirs",
    "tags": [
      "print working directory",
      "yo'l",
      "путь",
      "где я"
    ],
    "desc": {
      "uz": "Joriy ish papkasining to'liq yo'lini chiqaradi.",
      "ru": "Выводит полный путь текущего рабочего каталога.",
      "en": "Prints the full path of the current working directory."
    },
    "options": [
      {
        "flag": "-P",
        "uz": "Ramziy havolalarni hal qilib, haqiqiy yo'lni chiqaradi",
        "ru": "Показать физический путь без символических ссылок",
        "en": "Resolve symlinks and print the physical path"
      },
      {
        "flag": "-L",
        "uz": "Ramziy havola yo'lini saqlaydi (standart)",
        "ru": "Сохранить путь со ссылками (по умолчанию)",
        "en": "Keep the symlink path (default)"
      }
    ],
    "examples": [
      {
        "cmd": "pwd",
        "uz": "Hozir qayerda ekanligingizni bilish",
        "ru": "Узнать, где вы находитесь",
        "en": "Find out where you are"
      }
    ]
  },
  {
    "id": "cd",
    "name": "cd",
    "syntax": "cd [DIR]",
    "category": "dirs",
    "tags": [
      "change directory",
      "o'tish",
      "перейти",
      "каталог"
    ],
    "desc": {
      "uz": "Joriy papkani o'zgartiradi.",
      "ru": "Меняет текущий рабочий каталог.",
      "en": "Changes the current working directory."
    },
    "options": [
      {
        "flag": "cd ~",
        "uz": "Uy papkangizga o'tadi",
        "ru": "Перейти в домашнюю папку",
        "en": "Go to your home directory"
      },
      {
        "flag": "cd -",
        "uz": "Oldingi papkaga qaytadi",
        "ru": "Вернуться в предыдущую папку",
        "en": "Return to the previous directory"
      },
      {
        "flag": "cd ..",
        "uz": "Bir daraja yuqoriga chiqadi",
        "ru": "Подняться на уровень выше",
        "en": "Go one level up"
      }
    ],
    "examples": [
      {
        "cmd": "cd /etc/nginx",
        "uz": "Nginx sozlama papkasiga o'tish",
        "ru": "Перейти в папку настроек Nginx",
        "en": "Go to the Nginx config folder"
      },
      {
        "cmd": "cd -",
        "uz": "Oldingi joyga tez qaytish",
        "ru": "Быстро вернуться назад",
        "en": "Quickly return to the previous location"
      }
    ]
  },
  {
    "id": "mkdir",
    "name": "mkdir",
    "syntax": "mkdir [OPTION] DIRECTORY...",
    "category": "dirs",
    "tags": [
      "make directory",
      "papka",
      "создать",
      "каталог"
    ],
    "desc": {
      "uz": "Yangi papka (katalog) yaratadi.",
      "ru": "Создаёт новые каталоги.",
      "en": "Creates new directories."
    },
    "options": [
      {
        "flag": "-p",
        "uz": "Kerak bo'lsa, oraliq papkalarni ham yaratadi",
        "ru": "Создавать промежуточные каталоги",
        "en": "Create intermediate directories as needed"
      },
      {
        "flag": "-m MODE",
        "uz": "Ruxsatlarni darhol o'rnatadi (mas. 755)",
        "ru": "Сразу установить права (напр. 755)",
        "en": "Set permissions immediately (e.g. 755)"
      },
      {
        "flag": "-v",
        "uz": "Har bir yaratilgan papkani chiqaradi",
        "ru": "Выводить каждый созданный каталог",
        "en": "Print each created directory"
      }
    ],
    "examples": [
      {
        "cmd": "mkdir projects",
        "uz": "Oddiy papka yaratish",
        "ru": "Создать обычную папку",
        "en": "Create a simple directory"
      },
      {
        "cmd": "mkdir -p ~/projects/linux/docs",
        "uz": "Butun yo'l bo'ylab papkalar yaratish",
        "ru": "Создать всю цепочку папок сразу",
        "en": "Create the whole chain of directories"
      }
    ]
  },
  {
    "id": "tree",
    "name": "tree",
    "syntax": "tree [OPTION] [DIR]",
    "category": "dirs",
    "tags": [
      "daraxt",
      "структура",
      "structure",
      " papkalar"
    ],
    "desc": {
      "uz": "Papkalar tuzilmasini daraxt ko'rinishida chiqaradi.",
      "ru": "Выводит структуру каталогов в виде дерева.",
      "en": "Prints the directory structure as a tree."
    },
    "options": [
      {
        "flag": "-L N",
        "uz": "Faqat N darajagacha chiqaradi",
        "ru": "Вывести только N уровней вглубь",
        "en": "Show only N levels deep"
      },
      {
        "flag": "-a",
        "uz": "Yashirin fayllarni ham ko'rsatadi",
        "ru": "Показывать скрытые файлы",
        "en": "Show hidden files too"
      },
      {
        "flag": "-d",
        "uz": "Faqat papkalarni chiqaradi",
        "ru": "Только каталоги",
        "en": "List directories only"
      },
      {
        "flag": "-h",
        "uz": "Fayl hajmlarini ham chiqaradi",
        "ru": "Показывать размеры файлов",
        "en": "Also show file sizes"
      }
    ],
    "examples": [
      {
        "cmd": "tree -L 2",
        "uz": "Ikki daraja chuqurlikdagi tuzilmani ko'rish",
        "ru": "Посмотреть структуру на два уровня вглубь",
        "en": "View the structure two levels deep"
      },
      {
        "cmd": "tree -d /etc",
        "uz": "Faqat konfiguratsiya papkalari ro'yxati",
        "ru": "Список только каталогов в /etc",
        "en": "List only configuration directories"
      }
    ]
  },
  {
    "id": "grep",
    "name": "grep",
    "syntax": "grep [OPTION] PATTERN [FILE]...",
    "category": "text",
    "tags": [
      "search",
      "qidirish",
      "поиск",
      "matn",
      "regex"
    ],
    "desc": {
      "uz": "Fayllar ichida matn yoki regex bo'yicha qidiradi.",
      "ru": "Ищет текст или регулярное выражение в файлах.",
      "en": "Searches for text or regex patterns in files."
    },
    "options": [
      {
        "flag": "-i",
        "uz": "Katta/kichik harflarni farqlamaydi",
        "ru": "Игнорировать регистр",
        "en": "Ignore case"
      },
      {
        "flag": "-r",
        "uz": "Barcha papkalar bo'ylab rekursiv qidiradi",
        "ru": "Рекурсивный поиск по каталогам",
        "en": "Search recursively across all directories"
      },
      {
        "flag": "-n",
        "uz": "Qator raqamini chiqaradi",
        "ru": "Выводить номер строки",
        "en": "Print line numbers"
      },
      {
        "flag": "-v",
        "uz": "Mos kelmaydigan qatorlarni chiqaradi",
        "ru": "Выводить строки, не соответствующие шаблону",
        "en": "Print non-matching lines"
      },
      {
        "flag": "-E",
        "uz": "Kengaytirilgan regex ishlatadi",
        "ru": "Расширенные регулярные выражения",
        "en": "Use extended regular expressions"
      }
    ],
    "examples": [
      {
        "cmd": "grep -rn \"error\" /var/log/",
        "uz": "Barcha loglarda xatolarni qator raqami bilan topish",
        "ru": "Найти ошибки во всех логах с номерами строк",
        "en": "Find errors in all logs with line numbers"
      },
      {
        "cmd": "ps aux | grep nginx",
        "uz": "Ishlayotgan nginx jarayonlarini filtrlash",
        "ru": "Отфильтровать запущенные процессы nginx",
        "en": "Filter running nginx processes"
      }
    ]
  },
  {
    "id": "sed",
    "name": "sed",
    "syntax": "sed [OPTION] 'SCRIPT' [FILE]",
    "category": "text",
    "tags": [
      "stream editor",
      "almashtirish",
      "замена",
      "редактор"
    ],
    "desc": {
      "uz": "Matn oqimini qatorma-qator tahrirlaydi: almashtiradi, o'chiradi, qo'shadi.",
      "ru": "Построчно редактирует поток текста: заменяет, удаляет, добавляет.",
      "en": "Edits a text stream line by line: replaces, deletes, adds."
    },
    "options": [
      {
        "flag": "s/old/new/",
        "uz": "Birinchi mos kelganga almashtiradi",
        "ru": "Заменить первое совпадение",
        "en": "Replace the first match"
      },
      {
        "flag": "s/old/new/g",
        "uz": "Barcha mosliklarni almashtiradi",
        "ru": "Заменить все совпадения",
        "en": "Replace all matches"
      },
      {
        "flag": "-i",
        "uz": "Natijani faylga bevosita yozadi",
        "ru": "Записать результат прямо в файл",
        "en": "Write the result directly to a file"
      },
      {
        "flag": "-n",
        "uz": "Faqat aniq ko'rsatilgan qatorlarni chiqaradi",
        "ru": "Выводить только указанные строки",
        "en": "Print only the specified lines"
      }
    ],
    "examples": [
      {
        "cmd": "sed 's/localhost/127.0.0.1/g' config.txt",
        "uz": "Fayldagi barcha localhostlarni IP bilan almashtirish",
        "ru": "Заменить все localhost на IP в файле",
        "en": "Replace all localhost entries in a file with an IP"
      },
      {
        "cmd": "sed -i.bak 's/DEBUG/INFO/g' app.conf",
        "uz": "Zaxira nusxa bilan almashtirish",
        "ru": "Замена с созданием резервной копии",
        "en": "Replace with a backup copy"
      }
    ]
  },
  {
    "id": "awk",
    "name": "awk",
    "syntax": "awk 'PATTERN { ACTION }' FILE",
    "category": "text",
    "tags": [
      "pattern",
      "ustun",
      "колонка",
      "анализ"
    ],
    "desc": {
      "uz": "Matnni ustunlar bo'yicha qayta ishlash uchun kuchli til.",
      "ru": "Мощный язык обработки текста по столбцам.",
      "en": "A powerful language for column-based text processing."
    },
    "options": [
      {
        "flag": "$1",
        "uz": "Birinchi ustun",
        "ru": "Первое поле (столбец)",
        "en": "First field (column)"
      },
      {
        "flag": "$NF",
        "uz": "Oxirgi ustun",
        "ru": "Последнее поле",
        "en": "Last field"
      },
      {
        "flag": "-F\",\"",
        "uz": "Ajratgichni vergulga o'zgartiradi",
        "ru": "Изменить разделитель на запятую",
        "en": "Set the separator to a comma"
      },
      {
        "flag": "NR",
        "uz": "Joriy qator raqami",
        "ru": "Номер текущей строки",
        "en": "Current line number"
      }
    ],
    "examples": [
      {
        "cmd": "awk '{ print $1 }' access.log",
        "uz": "Faqat birinchi ustunni chiqarish",
        "ru": "Вывести только первое поле",
        "en": "Print only the first field"
      },
      {
        "cmd": "df -h | awk 'NR>1 { print $5, $6 }'",
        "uz": "Disk foydalanish foizi va yo'lini ko'rsatish",
        "ru": "Процент заполнения и путь для дисков",
        "en": "Show disk usage percentage and path"
      }
    ]
  },
  {
    "id": "head",
    "name": "head",
    "syntax": "head [OPTION] FILE",
    "category": "text",
    "tags": [
      "bosh",
      "начала",
      "first",
      "qator"
    ],
    "desc": {
      "uz": "Faylning birinchi qatorlarini chiqaradi.",
      "ru": "Выводит первые строки файла.",
      "en": "Prints the first lines of a file."
    },
    "options": [
      {
        "flag": "-n N",
        "uz": "Daraxtacha N qator chiqaradi",
        "ru": "Вывести N строк",
        "en": "Print the first N lines"
      },
      {
        "flag": "-c N",
        "uz": "Daraxtacha N bayt chiqaradi",
        "ru": "Вывести N байт",
        "en": "Print the first N bytes"
      },
      {
        "flag": "-q",
        "uz": "Bir necha faylda sarlavhalarni yashiradi",
        "ru": "Не показывать заголовки для нескольких файлов",
        "en": "Hide headers for multiple files"
      }
    ],
    "examples": [
      {
        "cmd": "head -n 20 access.log",
        "uz": "Log faylining dastlabki 20 qatori",
        "ru": "Первые 20 строк лога",
        "en": "First 20 lines of a log file"
      }
    ]
  },
  {
    "id": "tail",
    "name": "tail",
    "syntax": "tail [OPTION] FILE",
    "category": "text",
    "tags": [
      "oxir",
      "конец",
      "last",
      "log"
    ],
    "desc": {
      "uz": "Faylning oxirgi qatorlarini chiqaradi. Loglarni kuzatish uchun juda qulay.",
      "ru": "Выводит последние строки файла. Идеально для просмотра логов.",
      "en": "Prints the last lines of a file. Ideal for following logs."
    },
    "options": [
      {
        "flag": "-n N",
        "uz": "Oxirgi N qatorni chiqaradi",
        "ru": "Вывести последние N строк",
        "en": "Print the last N lines"
      },
      {
        "flag": "-f",
        "uz": "Faylga yangi qator qo'shilganda uni ko'rsatib turadi",
        "ru": "Следить за появлением новых строк",
        "en": "Show new lines as they are appended"
      },
      {
        "flag": "-F",
        "uz": "Fayl almashtirilsa ham kuzatishni davom etadi",
        "ru": "Продолжить следить даже при ротации файла",
        "en": "Keep following even if the file is rotated"
      }
    ],
    "examples": [
      {
        "cmd": "tail -f /var/log/syslog",
        "uz": "Tizim loglarini real vaqtda kuzatish",
        "ru": "Следить за системными логами в реальном времени",
        "en": "Follow system logs in real time"
      },
      {
        "cmd": "tail -n 100 nginx_error.log",
        "uz": "Oxirgi 100 qatorni o'qish",
        "ru": "Прочитать последние 100 строк",
        "en": "Read the last 100 lines"
      }
    ]
  },
  {
    "id": "wc",
    "name": "wc",
    "syntax": "wc [OPTION] FILE",
    "category": "text",
    "tags": [
      "word count",
      "hisoblash",
      "подсчёт",
      "строки"
    ],
    "desc": {
      "uz": "Qatorlar, so'zlar va belgilar sonini hisoblaydi.",
      "ru": "Подсчитывает строки, слова и символы.",
      "en": "Counts lines, words, and characters."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Faqat qatorlar soni",
        "ru": "Только количество строк",
        "en": "Only the line count"
      },
      {
        "flag": "-w",
        "uz": "Faqat so'zlar soni",
        "ru": "Только количество слов",
        "en": "Only the word count"
      },
      {
        "flag": "-c",
        "uz": "Faqat baytlar soni",
        "ru": "Только количество байт",
        "en": "Only the byte count"
      }
    ],
    "examples": [
      {
        "cmd": "wc -l access.log",
        "uz": "Log faylidagi so'rovlar sonini bilish",
        "ru": "Узнать количество запросов в логе",
        "en": "Count requests in a log file"
      },
      {
        "cmd": "ls | wc -l",
        "uz": "Joriy papkadagi elementlar soni",
        "ru": "Количество элементов в папке",
        "en": "Number of items in the current folder"
      }
    ]
  },
  {
    "id": "sort",
    "name": "sort",
    "syntax": "sort [OPTION] FILE",
    "category": "text",
    "tags": [
      "saralash",
      "сортировка",
      "tartib"
    ],
    "desc": {
      "uz": "Qatorlarni alifbo yoki son tartibi bo'yicha saralaydi.",
      "ru": "Сортирует строки по алфавиту или численно.",
      "en": "Sorts lines alphabetically or numerically."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Son qiymat bo'yicha saralaydi",
        "ru": "Числовая сортировка",
        "en": "Sort numerically"
      },
      {
        "flag": "-r",
        "uz": "Teskari tartib",
        "ru": "Обратный порядок",
        "en": "Reverse order"
      },
      {
        "flag": "-u",
        "uz": "Takrorlangan qatorlarni olib tashlaydi",
        "ru": "Удалить дубликаты",
        "en": "Remove duplicate lines"
      },
      {
        "flag": "-k N",
        "uz": "N-ustun bo'yicha saralaydi",
        "ru": "Сортировать по N-му полю",
        "en": "Sort by the N-th field"
      }
    ],
    "examples": [
      {
        "cmd": "sort -nr numbers.txt",
        "uz": "Sonlarni kattadan kichikka saralash",
        "ru": "Отсортировать числа по убыванию",
        "en": "Sort numbers in descending order"
      },
      {
        "cmd": "cat /etc/passwd | sort",
        "uz": "Foydalanuvchilar ro'yxatini alifbo bo'yicha",
        "ru": "Список пользователей по алфавиту",
        "en": "Sort the user list alphabetically"
      }
    ]
  },
  {
    "id": "uniq",
    "name": "uniq",
    "syntax": "uniq [OPTION] FILE",
    "category": "text",
    "tags": [
      "takror",
      "дубликаты",
      "unique"
    ],
    "desc": {
      "uz": "Qo'shni takroriy qatorlarni olib tashlaydi (ko'pincha sort bilan ishlatiladi).",
      "ru": "Удаляет соседние дублирующиеся строки (обычно вместе с sort).",
      "en": "Removes adjacent duplicate lines (usually used with sort)."
    },
    "options": [
      {
        "flag": "-c",
        "uz": "Har bir qator necha marta takrorlanganini chiqaradi",
        "ru": "Вывести число повторов каждой строки",
        "en": "Print how many times each line occurs"
      },
      {
        "flag": "-d",
        "uz": "Faqat takrorlangan qatorlarni chiqaradi",
        "ru": "Только дублирующиеся строки",
        "en": "Print only duplicate lines"
      },
      {
        "flag": "-u",
        "uz": "Faqat takrorlanmaganlarni chiqaradi",
        "ru": "Только уникальные строки",
        "en": "Print only unique lines"
      }
    ],
    "examples": [
      {
        "cmd": "sort ips.txt | uniq -c | sort -nr",
        "uz": "Eng ko'p takrorlangan IP larni topish",
        "ru": "Найти чаще всего встречающиеся IP",
        "en": "Find the most frequent IPs"
      }
    ]
  },
  {
    "id": "echo",
    "name": "echo",
    "syntax": "echo [OPTION] [TEXT]",
    "category": "text",
    "tags": [
      "print",
      "chiqarish",
      "вывод",
      "matn"
    ],
    "desc": {
      "uz": "Matn yoki o'zgaruvchi qiymatini ekranga chiqaradi.",
      "ru": "Выводит текст или значение переменной на экран.",
      "en": "Prints text or a variable value to the screen."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Qator oxiridagi yangi qator belgisini qo'shmaydi",
        "ru": "Не добавлять перевод строки",
        "en": "Do not add a trailing newline"
      },
      {
        "flag": "-e",
        "uz": "Maxsus belgilarni (\\n, \\t) talqin qiladi",
        "ru": "Интерпретировать escape-последовательности",
        "en": "Interpret escape sequences (\\n, \\t)"
      },
      {
        "flag": "$VAR",
        "uz": "O'zgaruvchi qiymatini chiqaradi",
        "ru": "Вывести значение переменной",
        "en": "Print a variable's value"
      }
    ],
    "examples": [
      {
        "cmd": "echo \"Assalomu alaykum, $USER!\"",
        "uz": "Foydalanuvchi nomi bilan salomlashish",
        "ru": "Приветствие с именем пользователя",
        "en": "Greet a user by name"
      },
      {
        "cmd": "echo -e \"Line 1\\nLine 2\"",
        "uz": "Bir necha qator chiqarish",
        "ru": "Вывести несколько строк",
        "en": "Print several lines"
      }
    ]
  },
  {
    "id": "nano",
    "name": "nano",
    "syntax": "nano [OPTION] FILE",
    "category": "text",
    "tags": [
      "editor",
      "tahrirchi",
      "редактор",
      "matn"
    ],
    "desc": {
      "uz": "Terminalda ishlaydigan sodda matn muharriri.",
      "ru": "Простой текстовый редактор для терминала.",
      "en": "A simple text editor for the terminal."
    },
    "options": [
      {
        "flag": "-B",
        "uz": "Zaxira nusxani avtomatik yaratadi",
        "ru": "Автоматически создавать резервную копию",
        "en": "Automatically create a backup"
      },
      {
        "flag": "+N",
        "uz": "Faylni N-qatoridan ochadi",
        "ru": "Открыть файл с N-й строки",
        "en": "Open a file starting at line N"
      },
      {
        "flag": "-m",
        "uz": "Sichqoncha bilan ishlashni yoqadi",
        "ru": "Включить поддержку мыши",
        "en": "Enable mouse support"
      }
    ],
    "examples": [
      {
        "cmd": "nano /etc/hosts",
        "uz": "Hosts faylini tahrirlash",
        "ru": "Редактировать файл hosts",
        "en": "Edit the hosts file"
      },
      {
        "cmd": "Ctrl+O, Ctrl+X",
        "uz": "Saqlash va chiqish (nano ichida)",
        "ru": "Сохранить и выйти (внутри nano)",
        "en": "Save and exit (inside nano)"
      }
    ]
  },
  {
    "id": "chmod",
    "name": "chmod",
    "syntax": "chmod [OPTION] MODE FILE",
    "category": "perms",
    "tags": [
      "permissions",
      "ruxsat",
      "права",
      "доступ"
    ],
    "desc": {
      "uz": "Fayl va papkalarga o'qish, yozish, bajarish ruxsatlarini beradi.",
      "ru": "Устанавливает права чтения, записи и выполнения.",
      "en": "Sets read, write, and execute permissions on files and directories."
    },
    "options": [
      {
        "flag": "r=4, w=2, x=1",
        "uz": "Ruxsat raqamlari: 7 = rwx, 6 = rw-, 5 = r-x",
        "ru": "Значения: 7 = rwx, 6 = rw-, 5 = r-x",
        "en": "Permission values: 7 = rwx, 6 = rw-, 5 = r-x"
      },
      {
        "flag": "-R",
        "uz": "Butun papka ichiga rekursiv qo'llanadi",
        "ru": "Рекурсивно применить к папке",
        "en": "Apply recursively to a whole directory"
      },
      {
        "flag": "u+x",
        "uz": "Egasi uchun bajarish ruxsatini qo'shadi",
        "ru": "Добавить владельцу право выполнения",
        "en": "Add execute permission for the owner"
      },
      {
        "flag": "-v",
        "uz": "O'zgargan fayllarni chiqaradi",
        "ru": "Выводить изменённые файлы",
        "en": "Print changed files"
      }
    ],
    "examples": [
      {
        "cmd": "chmod 755 script.sh",
        "uz": "Egasi yozadi, qolganlar o'qiydi va bajaradi",
        "ru": "Владелец пишет, остальные читают и выполняют",
        "en": "Owner writes; others read and execute"
      },
      {
        "cmd": "chmod -R 644 ~/site",
        "uz": "Butun sayt papkasiga standart ruxsat berish",
        "ru": "Стандартные права для всей папки сайта",
        "en": "Set standard permissions on the whole site folder"
      }
    ]
  },
  {
    "id": "chown",
    "name": "chown",
    "syntax": "chown [OPTION] OWNER[:GROUP] FILE",
    "category": "perms",
    "tags": [
      "owner",
      "egasi",
      "владелец",
      "группа"
    ],
    "desc": {
      "uz": "Fayl egasi va guruhini o'zgartiradi.",
      "ru": "Изменяет владельца и группу файла.",
      "en": "Changes the owner and group of a file."
    },
    "options": [
      {
        "flag": "user:group",
        "uz": "Egasi va guruhni birgalikda o'rnatadi",
        "ru": "Установить владельца и группу",
        "en": "Set owner and group together"
      },
      {
        "flag": "-R",
        "uz": "Papka ichidagilarga ham qo'llanadi",
        "ru": "Применить рекурсивно",
        "en": "Apply recursively to the contents"
      },
      {
        "flag": "-c",
        "uz": "Faqat o'zgargan fayllarni chiqaradi",
        "ru": "Выводить только изменённые файлы",
        "en": "Print only changed files"
      }
    ],
    "examples": [
      {
        "cmd": "sudo chown -R www-data:www-data /var/www/html",
        "uz": "Veb-serverga sayt fayllarini berish",
        "ru": "Отдать файлы сайта веб-серверу",
        "en": "Give site files to the web server"
      },
      {
        "cmd": "chown alice file.txt",
        "uz": "Fayl egasini alice qilish",
        "ru": "Сделать владельцем alice",
        "en": "Make alice the file owner"
      }
    ]
  },
  {
    "id": "sudo",
    "name": "sudo",
    "syntax": "sudo [OPTION] COMMAND",
    "category": "perms",
    "tags": [
      "root",
      "admin",
      "administrator",
      " Su"
    ],
    "desc": {
      "uz": "Buyruqni superuser (root) huquqlari bilan bajaradi.",
      "ru": "Выполняет команду с правами суперпользователя (root).",
      "en": "Runs a command with superuser (root) privileges."
    },
    "options": [
      {
        "flag": "-u USER",
        "uz": "Boshqa foydalanuvchi nomidan bajaradi",
        "ru": "Выполнить от имени другого пользователя",
        "en": "Run as another user"
      },
      {
        "flag": "-i",
        "uz": "Root muhitiga o'tadi",
        "ru": "войти в окружение root",
        "en": "Enter the root environment"
      },
      {
        "flag": "-l",
        "uz": "Sizga ruxsat etilgan buyruqlar ro'yxati",
        "ru": "Список разрешённых вам команд",
        "en": "List commands you are allowed to run"
      },
      {
        "flag": "-S",
        "uz": "Parolni standart kiritishdan oladi",
        "ru": "Читать пароль из стандартного ввода",
        "en": "Read the password from standard input"
      }
    ],
    "examples": [
      {
        "cmd": "sudo apt update",
        "uz": "Paketlar ro'yxatini yangilash",
        "ru": "Обновить список пакетов",
        "en": "Update the package list"
      },
      {
        "cmd": "sudo -u postgres psql",
        "uz": "PostgreSQL foydalanuvchisi sifatida ishga tushish",
        "ru": "Запустить от имени пользователя postgres",
        "en": "Run as the postgres user"
      }
    ]
  },
  {
    "id": "whoami",
    "name": "whoami",
    "syntax": "whoami",
    "category": "users",
    "tags": [
      "who am i",
      "men kimman",
      "кто я",
      "пользователь"
    ],
    "desc": {
      "uz": "Hozirgi foydalanuvchi nomini chiqaradi.",
      "ru": "Выводит имя текущего пользователя.",
      "en": "Prints the current username."
    },
    "options": [
      {
        "flag": "--help",
        "uz": "Yordam chiqaradi",
        "ru": "Вывести справку",
        "en": "Show help"
      }
    ],
    "examples": [
      {
        "cmd": "whoami",
        "uz": "Tizimga kim sifatida kirganingizni bilish",
        "ru": "Узнать, под кем вы вошли",
        "en": "See which user you are logged in as"
      }
    ]
  },
  {
    "id": "id",
    "name": "id",
    "syntax": "id [OPTION] [USER]",
    "category": "users",
    "tags": [
      "uid",
      "gid",
      "groups",
      "guruh"
    ],
    "desc": {
      "uz": "Foydalanuvchi UID/GID raqamlari va guruhlari haqida ma'lumot beradi.",
      "ru": "Показывает UID/GID пользователя и его группы.",
      "en": "Shows a user's UID/GID numbers and groups."
    },
    "options": [
      {
        "flag": "-u",
        "uz": "Faqat UID",
        "ru": "Только UID",
        "en": "UID only"
      },
      {
        "flag": "-g",
        "uz": "Faqat asosiy GID",
        "ru": "Только основной GID",
        "en": "Primary GID only"
      },
      {
        "flag": "-G",
        "uz": "Barcha guruhlar ID si",
        "ru": "ID всех групп",
        "en": "IDs of all groups"
      },
      {
        "flag": "-un",
        "uz": "UID o'rniga nom",
        "ru": "Имя вместо UID",
        "en": "Name instead of UID"
      }
    ],
    "examples": [
      {
        "cmd": "id",
        "uz": "O'z foydalanuvchingiz haqida to'liq ma'lumot",
        "ru": "Полная информация о вашем пользователе",
        "en": "Full information about your own user"
      },
      {
        "cmd": "id -Gn nginx",
        "uz": "Nginx foydalanuvchisining guruhlari",
        "ru": "Группы пользователя nginx",
        "en": "Groups of the nginx user"
      }
    ]
  },
  {
    "id": "useradd",
    "name": "useradd",
    "syntax": "useradd [OPTION] USER",
    "category": "users",
    "tags": [
      "add user",
      "foydalanuvchi qo'shish",
      "создать пользователя"
    ],
    "desc": {
      "uz": "Tizimga yangi foydalanuvchi qo'shadi.",
      "ru": "Создаёт нового пользователя в системе.",
      "en": "Adds a new user to the system."
    },
    "options": [
      {
        "flag": "-m",
        "uz": "Uy papkasini ham yaratadi",
        "ru": "Создать домашнюю папку",
        "en": "Also create the home directory"
      },
      {
        "flag": "-s /bin/bash",
        "uz": "Standart shell ni belgilaydi",
        "ru": "Указать командную оболочку",
        "en": "Set the default shell"
      },
      {
        "flag": "-G sudo",
        "uz": "Qo'shimcha guruhga kiritadi",
        "ru": "Добавить в дополнительную группу",
        "en": "Add to a supplementary group"
      },
      {
        "flag": "-c \"NAME\"",
        "uz": "Foydalanuvchi haqida izoh",
        "ru": "Комментарий о пользователе",
        "en": "Comment about the user"
      }
    ],
    "examples": [
      {
        "cmd": "sudo useradd -m -s /bin/bash alice",
        "uz": "Oddiy foydalanuvchi yaratish",
        "ru": "Создать обычного пользователя",
        "en": "Create a regular user"
      },
      {
        "cmd": "sudo useradd -m -G sudo admin2",
        "uz": "Admin huquqli foydalanuvchi yaratish",
        "ru": "Создать пользователя с правами администратора",
        "en": "Create a user with admin privileges"
      }
    ]
  },
  {
    "id": "passwd",
    "name": "passwd",
    "syntax": "passwd [USER]",
    "category": "users",
    "tags": [
      "password",
      "parol",
      "пароль"
    ],
    "desc": {
      "uz": "Foydalanuvchi parolini o'zgartiradi.",
      "ru": "Изменяет пароль пользователя.",
      "en": "Changes a user's password."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Parolni qulflaydi (lock)",
        "ru": "Заблокировать пароль",
        "en": "Lock the password"
      },
      {
        "flag": "-u",
        "uz": "Qulfni ochadi",
        "ru": "Разблокировать",
        "en": "Unlock it"
      },
      {
        "flag": "-d",
        "uz": "Parolni o'chiradi (bo'sh qiladi)",
        "ru": "Удалить пароль",
        "en": "Delete the password (make it empty)"
      },
      {
        "flag": "-S",
        "uz": "Parol holatini chiqaradi",
        "ru": "Вывести состояние пароля",
        "en": "Show password status"
      }
    ],
    "examples": [
      {
        "cmd": "passwd",
        "uz": "O'z parolingizni o'zgartirish",
        "ru": "Изменить свой пароль",
        "en": "Change your own password"
      },
      {
        "cmd": "sudo passwd alice",
        "uz": "Boshqa foydalanuvchi parolini o'rnatish",
        "ru": "Установить пароль другому пользователю",
        "en": "Set another user's password"
      }
    ]
  },
  {
    "id": "ps",
    "name": "ps",
    "syntax": "ps [OPTION]",
    "category": "processes",
    "tags": [
      "process",
      "jarayon",
      "процесс",
      "список"
    ],
    "desc": {
      "uz": "Hozir ishlab turgan jarayonlar ro'yxatini chiqaradi.",
      "ru": "Выводит список запущенных процессов.",
      "en": "Lists currently running processes."
    },
    "options": [
      {
        "flag": "aux",
        "uz": "Barcha foydalanuvchilar va tizim jarayonlari",
        "ru": "Все процессы пользователей и системы",
        "en": "All users' and system processes"
      },
      {
        "flag": "-ef",
        "uz": "To'liq formatdagi ro'yxat",
        "ru": "Полный формат списка",
        "en": "Full-format listing"
      },
      {
        "flag": "-u USER",
        "uz": "Faqat bitta foydalanuvchi jarayonlari",
        "ru": "Процессы одного пользователя",
        "en": "Only one user's processes"
      }
    ],
    "examples": [
      {
        "cmd": "ps aux | grep python",
        "uz": "Python jarayonlarini topish",
        "ru": "Найти процессы Python",
        "en": "Find Python processes"
      },
      {
        "cmd": "ps -ef --forest",
        "uz": "Jarayonlar ota-bola munosabatini ko'rish",
        "ru": "Дерево процессов",
        "en": "View the process tree"
      }
    ]
  },
  {
    "id": "top",
    "name": "top",
    "syntax": "top [OPTION]",
    "category": "processes",
    "tags": [
      "monitor",
      "kuzatish",
      "мониторинг",
      "cpu",
      "ram"
    ],
    "desc": {
      "uz": "CPU, xotira va jarayonlarni real vaqtda kuzatadi. (htop — qulayroq alternativa)",
      "ru": "Следит за CPU, памятью и процессами в реальном времени. (htop — удобная альтернатива)",
      "en": "Monitors CPU, memory, and processes in real time. (htop is a nicer alternative)"
    },
    "options": [
      {
        "flag": "-u USER",
        "uz": "Faqat bitta foydalanuvchi jarayonlari",
        "ru": "Только процессы пользователя",
        "en": "Only one user's processes"
      },
      {
        "flag": "-p PID",
        "uz": "Faqat berilgan PID ni kuzatadi",
        "ru": "Следить только за указанным PID",
        "en": "Monitor only the given PID"
      },
      {
        "flag": "-d N",
        "uz": "Yangilash oraliğini N soniyaga o'rnatadi",
        "ru": "Интервал обновления N секунд",
        "en": "Set the refresh interval to N seconds"
      }
    ],
    "examples": [
      {
        "cmd": "top",
        "uz": "Tizim yuklanishini kuzatish; chiqish uchun q",
        "ru": "Следить за нагрузкой; выход — q",
        "en": "Watch system load; press q to quit"
      },
      {
        "cmd": "htop",
        "uz": "Rangli va interaktiv ko'rinish (o'rnatilgan bo'lsa)",
        "ru": "Цветной интерактивный вид (если установлен)",
        "en": "Colorful interactive view (if installed)"
      }
    ]
  },
  {
    "id": "kill",
    "name": "kill",
    "syntax": "kill [SIGNAL] PID",
    "category": "processes",
    "tags": [
      "signal",
      "to'xtatish",
      "остановить",
      "завершить"
    ],
    "desc": {
      "uz": "Jarayonga signal yuboradi. Standart bo'yicha to'g'ri to'xtash (SIGTERM) so'raydi.",
      "ru": "Отправляет процессу сигнал. По умолчанию — корректное завершение (SIGTERM).",
      "en": "Sends a signal to a process. By default, requests a graceful stop (SIGTERM)."
    },
    "options": [
      {
        "flag": "SIGTERM (15)",
        "uz": "To'g'ri to'xtash (standart)",
        "ru": "Корректное завершение (по умолчанию)",
        "en": "Graceful stop (default)"
      },
      {
        "flag": "SIGKILL (9)",
        "uz": "Majburiy o'chirish — oxirgi chora",
        "ru": "Принудительное убийство — крайняя мера",
        "en": "Force kill — last resort"
      },
      {
        "flag": "SIGHUP (1)",
        "uz": "Sozlamalarni qayta o'qishga majbur qiladi",
        "ru": "Перечитать конфигурацию",
        "en": "Force a configuration reload"
      },
      {
        "flag": "-l",
        "uz": "Barcha signallar ro'yxati",
        "ru": "Список всех сигналов",
        "en": "List all signals"
      }
    ],
    "examples": [
      {
        "cmd": "kill 4242",
        "uz": "PID 4242 bo'lgan jarayonni to'xtatish",
        "ru": "Завершить процесс с PID 4242",
        "en": "Stop the process with PID 4242"
      },
      {
        "cmd": "kill -9 4242",
        "uz": "Javob bermayotgan jarayonni majburiy o'chirish",
        "ru": "Принудительно завершить зависший процесс",
        "en": "Force-kill an unresponsive process"
      }
    ]
  },
  {
    "id": "pkill",
    "name": "pkill",
    "syntax": "pkill [OPTION] PATTERN",
    "category": "processes",
    "tags": [
      "kill by name",
      "nom bo'yicha",
      "по имени"
    ],
    "desc": {
      "uz": "Jarayonlarni PID emas, nomi bo'yicha tugatadi.",
      "ru": "Завершает процессы по имени, а не по PID.",
      "en": "Kills processes by name instead of PID."
    },
    "options": [
      {
        "flag": "-f",
        "uz": "Buyruq satrining to'liq matnida qidiradi",
        "ru": "Искать по полной командной строке",
        "en": "Search the full command line"
      },
      {
        "flag": "-u USER",
        "uz": "Faqat ma'lum foydalanuvchi jarayonlari",
        "ru": "Только процессы пользователя",
        "en": "Only a given user's processes"
      },
      {
        "flag": "-9",
        "uz": "Majburiy o'chirish",
        "ru": "Принудительное завершение",
        "en": "Force kill"
      }
    ],
    "examples": [
      {
        "cmd": "pkill -f \"python app.py\"",
        "uz": "Ma'lum skriptni ishga tushirgan barcha jarayonlarni tugatish",
        "ru": "Завершить все процессы с этим скриптом",
        "en": "Kill all processes running a given script"
      }
    ]
  },
  {
    "id": "systemctl",
    "name": "systemctl",
    "syntax": "systemctl COMMAND SERVICE",
    "category": "processes",
    "tags": [
      "service",
      "xizmat",
      "сервис",
      "systemd"
    ],
    "desc": {
      "uz": "systemd xizmatlarini boshqaradi: ishga tushirish, to'xtatish, holatni ko'rish.",
      "ru": "Управляет службами systemd: запуск, остановка, проверка состояния.",
      "en": "Manages systemd services: start, stop, and check status."
    },
    "options": [
      {
        "flag": "status NAME",
        "uz": "Xizmat holatini chiqaradi",
        "ru": "Показать состояние службы",
        "en": "Show service status"
      },
      {
        "flag": "restart NAME",
        "uz": "Qayta ishga tushiradi",
        "ru": "Перезапустить службу",
        "en": "Restart a service"
      },
      {
        "flag": "enable NAME",
        "uz": "Tizim bilan birga avtomatik ishga tushishini yoqadi",
        "ru": "Включить автозапуск",
        "en": "Enable autostart at boot"
      },
      {
        "flag": "disable NAME",
        "uz": "Avtomatik ishga tushirishni o'chiradi",
        "ru": "Отключить автозапуск",
        "en": "Disable autostart"
      }
    ],
    "examples": [
      {
        "cmd": "sudo systemctl restart nginx",
        "uz": "Veb-serverni qayta ishga tushirish",
        "ru": "Перезапустить веб-сервер",
        "en": "Restart the web server"
      },
      {
        "cmd": "systemctl status ssh",
        "uz": "SSH xizmati holatini tekshirish",
        "ru": "Проверить состояние SSH",
        "en": "Check SSH service status"
      }
    ]
  },
  {
    "id": "uname",
    "name": "uname",
    "syntax": "uname [OPTION]",
    "category": "system",
    "tags": [
      "kernel",
      "yadro",
      "ядро",
      "versiya"
    ],
    "desc": {
      "uz": "Tizim va yadro (kernel) haqida asosiy ma'lumotni chiqaradi.",
      "ru": "Выводит основную информацию о системе и ядре.",
      "en": "Prints basic information about the system and kernel."
    },
    "options": [
      {
        "flag": "-a",
        "uz": "Barcha ma'lumot (all)",
        "ru": "Вся информация",
        "en": "All information"
      },
      {
        "flag": "-r",
        "uz": "Yadro versiyasi",
        "ru": "Версия ядра",
        "en": "Kernel version"
      },
      {
        "flag": "-m",
        "uz": "Protsessor arxitekturasi",
        "ru": "Архитектура процессора",
        "en": "CPU architecture"
      },
      {
        "flag": "-s",
        "uz": "Tizim nomi",
        "ru": "Название системы",
        "en": "System name"
      }
    ],
    "examples": [
      {
        "cmd": "uname -a",
        "uz": "Tizim haqida to'liq ma'lumot",
        "ru": "Полная информация о системе",
        "en": "Full system information"
      },
      {
        "cmd": "uname -m",
        "uz": "64 bit yoki 32 bit ekanligini bilish",
        "ru": "Узнать разрядность системы",
        "en": "Check whether the system is 64-bit or 32-bit"
      }
    ]
  },
  {
    "id": "uptime",
    "name": "uptime",
    "syntax": "uptime",
    "category": "system",
    "tags": [
      "working time",
      "ish vaqti",
      "время работы",
      "нагрузка"
    ],
    "desc": {
      "uz": "Tizim qancha vaqtdan beri ishlab turgani va o'rtacha yuklanmani ko'rsatadi.",
      "ru": "Показывает время безотказной работы и среднюю нагрузку системы.",
      "en": "Shows uptime and average system load."
    },
    "options": [
      {
        "flag": "-p",
        "uz": "Faqat ish vaqtini qisqa shaklda",
        "ru": "Только время работы в коротком виде",
        "en": "Uptime only, short format"
      },
      {
        "flag": "-s",
        "uz": "Tizim ishga tushgan sana va vaqt",
        "ru": "Дата и время загрузки системы",
        "en": "System boot date and time"
      }
    ],
    "examples": [
      {
        "cmd": "uptime",
        "uz": "Server qancha ishlayotganini tekshirish",
        "ru": "Проверить, как долго работает сервер",
        "en": "Check how long the server has been running"
      }
    ]
  },
  {
    "id": "free",
    "name": "free",
    "syntax": "free [OPTION]",
    "category": "system",
    "tags": [
      "memory",
      "xotira",
      "память",
      "ram"
    ],
    "desc": {
      "uz": "Jismoniy xotira (RAM) va swap foydalanishini ko'rsatadi.",
      "ru": "Показывает использование оперативной памяти и swap.",
      "en": "Shows physical memory (RAM) and swap usage."
    },
    "options": [
      {
        "flag": "-h",
        "uz": "Inson o'qiy oladigan birliklarda",
        "ru": "В читаемых единицах",
        "en": "In human-readable units"
      },
      {
        "flag": "-m",
        "uz": "Megabaytlarda",
        "ru": "В мегабайтах",
        "en": "In megabytes"
      },
      {
        "flag": "-s N",
        "uz": "Har N soniyada yangilaydi",
        "ru": "Обновлять каждые N секунд",
        "en": "Refresh every N seconds"
      }
    ],
    "examples": [
      {
        "cmd": "free -h",
        "uz": "Qancha xotira bo'sh ekanligini bilish",
        "ru": "Узнать количествo свободной памяти",
        "en": "Find out how much memory is free"
      }
    ]
  },
  {
    "id": "date",
    "name": "date",
    "syntax": "date [OPTION] [+FORMAT]",
    "category": "system",
    "tags": [
      "time",
      "vaqt",
      "время",
      "дата"
    ],
    "desc": {
      "uz": "Sana va vaqtni ko'rsatadi yoki o'rnatadi.",
      "ru": "Показывает или устанавливает дату и время.",
      "en": "Displays or sets the date and time."
    },
    "options": [
      {
        "flag": "+%Y-%m-%d",
        "uz": "Faqat sana",
        "ru": "Только дата",
        "en": "Date only"
      },
      {
        "flag": "+%H:%M:%S",
        "uz": "Faqat vaqt",
        "ru": "Только время",
        "en": "Time only"
      },
      {
        "flag": "-u",
        "uz": "UTC bo'yicha vaqt",
        "ru": "Время по UTC",
        "en": "Time in UTC"
      },
      {
        "flag": "-s \"STRING\"",
        "uz": "Vaqtni o'rnatadi (root huquqi kerak)",
        "ru": "Установить время (нужны права root)",
        "en": "Set the time (requires root privileges)"
      }
    ],
    "examples": [
      {
        "cmd": "date +%Y-%m-%d_%H-%M",
        "uz": "Zaxira fayl nomi uchun vaqt belgisi",
        "ru": "Метка времени для имени backup-файла",
        "en": "Timestamp for a backup filename"
      }
    ]
  },
  {
    "id": "history",
    "name": "history",
    "syntax": "history [OPTION]",
    "category": "system",
    "tags": [
      "commands",
      "tarix",
      "история",
      "команды"
    ],
    "desc": {
      "uz": "Ilgari kiritgan buyruqlaringiz tarixini chiqaradi.",
      "ru": "Выводит историю ранее введённых команд.",
      "en": "Shows the history of previously entered commands."
    },
    "options": [
      {
        "flag": "!!",
        "uz": "Oxirgi buyruqni takrorlaydi",
        "ru": "Повторить последнюю команду",
        "en": "Repeat the last command"
      },
      {
        "flag": "!N",
        "uz": "Tarixdagi N-buyruqni takrorlaydi",
        "ru": "Повторить команду номер N",
        "en": "Repeat command number N from history"
      },
      {
        "flag": "-c",
        "uz": "Tarixni tozalaydi",
        "ru": "Очистить историю",
        "en": "Clear the history"
      }
    ],
    "examples": [
      {
        "cmd": "history | grep ssh",
        "uz": "Ilgari ishlatgan SSH buyruqlarini topish",
        "ru": "Найти использованные команды SSH",
        "en": "Find previously used SSH commands"
      }
    ]
  },
  {
    "id": "env",
    "name": "env",
    "syntax": "env [OPTION] [NAME=VALUE] COMMAND",
    "category": "system",
    "tags": [
      "environment",
      "muhit",
      "окружение",
      "переменные"
    ],
    "desc": {
      "uz": "Muhit o'zgaruvchilarini ko'rsatadi yoki buyruq uchun vaqtinchalik o'zgaruvchi beradi.",
      "ru": "Показывает переменные окружения или задаёт их для команды.",
      "en": "Shows environment variables or sets one temporarily for a command."
    },
    "options": [
      {
        "flag": "env",
        "uz": "Barcha o'zgaruvchilar ro'yxati",
        "ru": "Список всех переменных",
        "en": "List all variables"
      },
      {
        "flag": "NAME=VALUE",
        "uz": "Vaqtinchalik o'zgaruvchi qo'shadi",
        "ru": "Добавить временную переменную",
        "en": "Add a temporary variable"
      },
      {
        "flag": "-i",
        "uz": "Muhitni butunlay tozalaydi",
        "ru": "Очистить окружение",
        "en": "Clear the environment completely"
      }
    ],
    "examples": [
      {
        "cmd": "env | grep PATH",
        "uz": "PATH o'zgaruvchisi qiymatini ko'rish",
        "ru": "Посмотреть значение PATH",
        "en": "View the PATH variable"
      },
      {
        "cmd": "LANG=C sort file.txt",
        "uz": "Buyruq uchun tilni vaqtinchalik o'zgartirish",
        "ru": "Временно изменить язык для команды",
        "en": "Temporarily change the language for a command"
      }
    ]
  },
  {
    "id": "ping",
    "name": "ping",
    "syntax": "ping [OPTION] HOST",
    "category": "network",
    "tags": [
      "network",
      "tarmoq",
      "сеть",
      "проверка"
    ],
    "desc": {
      "uz": "Serverga ICMP paketlar yuborib, ulanish va kechikishni tekshiradi.",
      "ru": "Отправляет ICMP-пакеты для проверки доступности и задержки.",
      "en": "Sends ICMP packets to check reachability and latency."
    },
    "options": [
      {
        "flag": "-c N",
        "uz": "Faqat N ta paket yuboradi",
        "ru": "Отправить N пакетов",
        "en": "Send only N packets"
      },
      {
        "flag": "-i N",
        "uz": "Paketlar orasidagi oraliq (soniya)",
        "ru": "Интервал между пакетами (секунды)",
        "en": "Interval between packets (seconds)"
      },
      {
        "flag": "-s N",
        "uz": "Paket hajmini o'zgartiradi",
        "ru": "Изменить размер пакета",
        "en": "Change packet size"
      }
    ],
    "examples": [
      {
        "cmd": "ping -c 4 google.com",
        "uz": "4 ta paket bilan internetni tekshirish",
        "ru": "Проверить интернет 4 пакетами",
        "en": "Check internet connectivity with 4 packets"
      }
    ]
  },
  {
    "id": "curl",
    "name": "curl",
    "syntax": "curl [OPTION] URL",
    "category": "network",
    "tags": [
      "http",
      "request",
      "so'rov",
      "запрос",
      "api"
    ],
    "desc": {
      "uz": "URL ga so'rov yuboradi va javobni chiqaradi. API va fayl yuklab olishda ishlatiladi.",
      "ru": "Отправляет запрос по URL и выводит ответ. Используется для API и загрузки файлов.",
      "en": "Sends a request to a URL and prints the response. Used for APIs and downloads."
    },
    "options": [
      {
        "flag": "-I",
        "uz": "Faqat javob sarlavhalari (HEAD)",
        "ru": "Только заголовки ответа (HEAD)",
        "en": "Response headers only (HEAD)"
      },
      {
        "flag": "-o FILE",
        "uz": "Natijani faylga saqlaydi",
        "ru": "Сохранить результат в файл",
        "en": "Save the result to a file"
      },
      {
        "flag": "-L",
        "uz": "Yo'naltirishlarga ergashadi",
        "ru": "Следовать перенаправлениям",
        "en": "Follow redirects"
      },
      {
        "flag": "-X POST -d \"data\"",
        "uz": "POST so'rovi yuboradi",
        "ru": "Отправить POST-запрос",
        "en": "Send a POST request"
      },
      {
        "flag": "-H \"Header: val\"",
        "uz": "Qo'shimcha sarlavha qo'shadi",
        "ru": "Добавить заголовок",
        "en": "Add a header"
      }
    ],
    "examples": [
      {
        "cmd": "curl -I https://example.com",
        "uz": "Sayt javob kodini tekshirish",
        "ru": "Проверить код ответа сайта",
        "en": "Check a site's response code"
      },
      {
        "cmd": "curl -L -o file.zip https://site/file.zip",
        "uz": "Faylni yuklab olish",
        "ru": "Скачать файл",
        "en": "Download a file"
      }
    ]
  },
  {
    "id": "ip",
    "name": "ip",
    "syntax": "ip [OBJECT] [COMMAND]",
    "category": "network",
    "tags": [
      "interface",
      "ip address",
      "manzil",
      "интерфейс"
    ],
    "desc": {
      "uz": "Tarmoq interfeyslari, IP manzillar va marshrutlarni boshqaradi (ifconfig o'rniga).",
      "ru": "Управляет сетевыми интерфейсами, IP-адресами и маршрутами (вместо ifconfig).",
      "en": "Manages network interfaces, IP addresses, and routes (replaces ifconfig)."
    },
    "options": [
      {
        "flag": "ip a",
        "uz": "Barcha interfeyslar va IP manzillar",
        "ru": "Все интерфейсы и IP-адреса",
        "en": "All interfaces and IP addresses"
      },
      {
        "flag": "ip r",
        "uz": "Marshrutlar jadvali",
        "ru": "Таблица маршрутизации",
        "en": "Routing table"
      },
      {
        "flag": "ip link",
        "uz": "Interfeyslar holati (up/down)",
        "ru": "Состояние интерфейсов",
        "en": "Interface status (up/down)"
      },
      {
        "flag": "ip neigh",
        "uz": "ARP jadvali",
        "ru": "ARP-таблица",
        "en": "ARP table"
      }
    ],
    "examples": [
      {
        "cmd": "ip addr show",
        "uz": "Mashinaning IP manzilini bilish",
        "ru": "Узнать IP-адрес машины",
        "en": "Find the machine's IP address"
      },
      {
        "cmd": "ip route",
        "uz": "Standart shlyuz (gateway) ni ko'rish",
        "ru": "Посмотреть шлюз по умолчанию",
        "en": "View the default gateway"
      }
    ]
  },
  {
    "id": "ss",
    "name": "ss",
    "syntax": "ss [OPTION]",
    "category": "network",
    "tags": [
      "socket",
      "port",
      "portlar",
      "netstat"
    ],
    "desc": {
      "uz": "Ochiq portlar va tarmoq ulanishlarini ko'rsatadi (netstat o'rniga).",
      "ru": "Показывает открытые порты и соединения (вместо netstat).",
      "en": "Shows open ports and network connections (replaces netstat)."
    },
    "options": [
      {
        "flag": "-t",
        "uz": "TCP ulanishlari",
        "ru": "TCP-соединения",
        "en": "TCP connections"
      },
      {
        "flag": "-u",
        "uz": "UDP ulanishlari",
        "ru": "UDP-соединения",
        "en": "UDP connections"
      },
      {
        "flag": "-l",
        "uz": "Faqat tinglayotgan (listening) portlar",
        "ru": "Только слушающие порты",
        "en": "Only listening ports"
      },
      {
        "flag": "-n",
        "uz": "Nom o'rniga raqamlar",
        "ru": "Цифры вместо имён",
        "en": "Numbers instead of names"
      },
      {
        "flag": "-p",
        "uz": "Portni ishlatayotgan jarayon",
        "ru": "Процесс, использующий порт",
        "en": "Process using the port"
      }
    ],
    "examples": [
      {
        "cmd": "ss -tulpn",
        "uz": "Qaysi xizmat qaysi portni tinglayotganini ko'rish",
        "ru": "Какая служба слушает какой порт",
        "en": "See which service is listening on which port"
      }
    ]
  },
  {
    "id": "ssh",
    "name": "ssh",
    "syntax": "ssh [OPTION] USER@HOST",
    "category": "network",
    "tags": [
      "remote",
      "masofaviy",
      "удалённый",
      "server"
    ],
    "desc": {
      "uz": "Masofaviy serverga shifrlangan ulanish o'rnatadi.",
      "ru": "Устанавливает зашифрованное соединение с удалённым сервером.",
      "en": "Establishes an encrypted connection to a remote server."
    },
    "options": [
      {
        "flag": "-p PORT",
        "uz": "Standart bo'lmagan portga ulanadi",
        "ru": "Подключиться к нестандартному порту",
        "en": "Connect to a non-standard port"
      },
      {
        "flag": "-i KEY",
        "uz": "Shaxsiy kalit faylini beradi",
        "ru": "Указать файл приватного ключа",
        "en": "Specify a private key file"
      },
      {
        "flag": "-v",
        "uz": "Batafsil ma'lumot (nosozliklarni topish uchun)",
        "ru": "Подробный вывод для отладки",
        "en": "Verbose output for troubleshooting"
      },
      {
        "flag": "-L",
        "uz": "Lokal portni yo'naltiradi (tunnel)",
        "ru": "Пробросить локальный порт (туннель)",
        "en": "Forward a local port (tunnel)"
      }
    ],
    "examples": [
      {
        "cmd": "ssh root@192.168.1.10",
        "uz": "Serverga root sifatida ulanish",
        "ru": "Подключиться к серверу как root",
        "en": "Connect to the server as root"
      },
      {
        "cmd": "ssh -p 2222 -i ~/.ssh/id_rsa user@host",
        "uz": "Kalit va maxsus port bilan ulanish",
        "ru": "Подключение с ключом и нестандартным портом",
        "en": "Connect with a key and a custom port"
      }
    ]
  },
  {
    "id": "scp",
    "name": "scp",
    "syntax": "scp [OPTION] SOURCE DEST",
    "category": "network",
    "tags": [
      "copy",
      "nusxa",
      "копировать",
      "server"
    ],
    "desc": {
      "uz": "Fayllarni SSH orqali mashinalar o'rtasida nusxalaydi.",
      "ru": "Копирует файлы между машинами через SSH.",
      "en": "Copies files between machines over SSH."
    },
    "options": [
      {
        "flag": "-r",
        "uz": "Butun papkani nusxalaydi",
        "ru": "Рекурсивно копировать папку",
        "en": "Copy a whole folder recursively"
      },
      {
        "flag": "-P PORT",
        "uz": "Maxsus port (bosh harf P!)",
        "ru": "Нестандартный порт (заглавная P!)",
        "en": "Custom port (capital P!)"
      },
      {
        "flag": "-C",
        "uz": "Siqish bilan uzatadi",
        "ru": "Передача со сжатием",
        "en": "Transfer with compression"
      }
    ],
    "examples": [
      {
        "cmd": "scp file.txt user@server:/home/user/",
        "uz": "Faylni serverga yuklash",
        "ru": "Загрузить файл на сервер",
        "en": "Upload a file to the server"
      },
      {
        "cmd": "scp -r user@server:/var/log ./logs",
        "uz": "Serverdagi log papkasini o'zga olish",
        "ru": "Скопировать папку логов с сервера",
        "en": "Copy the log folder from the server"
      }
    ]
  },
  {
    "id": "df",
    "name": "df",
    "syntax": "df [OPTION] [FILESYSTEM]",
    "category": "disk",
    "tags": [
      "disk free",
      "bo'sh joy",
      "свободное место",
      "диск"
    ],
    "desc": {
      "uz": "Disk bo'limlarida qancha bo'sh joy borligini ko'rsatadi.",
      "ru": "Показывает количество свободного места на разделах диска.",
      "en": "Shows how much free space is available on disk partitions."
    },
    "options": [
      {
        "flag": "-h",
        "uz": "Inson o'qiy oladigan birliklarda",
        "ru": "В читаемых единицах",
        "en": "In human-readable units"
      },
      {
        "flag": "-T",
        "uz": "Fayl tizimi turini ham chiqaradi",
        "ru": "Вывести тип файловой системы",
        "en": "Also print the filesystem type"
      },
      {
        "flag": "-i",
        "uz": "Inode ishlatilishini ko'rsatadi",
        "ru": "Использование inode",
        "en": "Show inode usage"
      }
    ],
    "examples": [
      {
        "cmd": "df -h",
        "uz": "Barcha disk bo'limlari va bo'sh joy",
        "ru": "Все разделы и свободное место",
        "en": "All disk partitions and free space"
      },
      {
        "cmd": "df -h /",
        "uz": "Faqat asosiy bo'lim",
        "ru": "Только корневой раздел",
        "en": "Root partition only"
      }
    ]
  },
  {
    "id": "du",
    "name": "du",
    "syntax": "du [OPTION] [DIR]",
    "category": "disk",
    "tags": [
      "disk usage",
      "hajm",
      "размер",
      "занято"
    ],
    "desc": {
      "uz": "Fayl va papkalar egallagan joy hajmini hisoblaydi.",
      "ru": "Подсчитывает размер, занятый файлами и папками.",
      "en": "Estimates the space used by files and directories."
    },
    "options": [
      {
        "flag": "-h",
        "uz": "O'qiladigan birliklarda",
        "ru": "В читаемых единицах",
        "en": "In readable units"
      },
      {
        "flag": "-s",
        "uz": "Faqat jami hajm (summary)",
        "ru": "Только итоговый размер",
        "en": "Only the total size (summary)"
      },
      {
        "flag": "--max-depth=N",
        "uz": "Necha darajagacha ko'rsatish",
        "ru": "Глубина вывода",
        "en": "Depth of output"
      },
      {
        "flag": "-a",
        "uz": "Barcha fayllarni ham chiqaradi",
        "ru": "Вывести все файлы",
        "en": "Include all files"
      }
    ],
    "examples": [
      {
        "cmd": "du -sh *",
        "uz": "Joriy papkadagi har bir element hajmi",
        "ru": "Размер каждого элемента в папке",
        "en": "Size of each item in the current folder"
      },
      {
        "cmd": "du -h --max-depth=1 /var",
        "uz": "/var ichidagi eng katta papkalar",
        "ru": "Самые большие папки внутри /var",
        "en": "The largest folders inside /var"
      }
    ]
  },
  {
    "id": "lsblk",
    "name": "lsblk",
    "syntax": "lsblk [OPTION]",
    "category": "disk",
    "tags": [
      "block devices",
      "disklar",
      "блочные устройства"
    ],
    "desc": {
      "uz": "Barcha blokli qurilmalar (disklar va bo'limlar) daraxtini chiqaradi.",
      "ru": "Выводит дерево блочных устройств (дисков и разделов).",
      "en": "Prints a tree of all block devices (disks and partitions)."
    },
    "options": [
      {
        "flag": "-f",
        "uz": "Fayl tizimlari va UUID larni chiqaradi",
        "ru": "Файловые системы и UUID",
        "en": "Show filesystems and UUIDs"
      },
      {
        "flag": "-o SIZE,TYPE,MOUNTPOINT",
        "uz": "Faqat ko'rsatilgan ustunlar",
        "ru": "Только указанные столбцы",
        "en": "Only the specified columns"
      },
      {
        "flag": "-a",
        "uz": "Bo'sh bo'limlarni ham ko'rsatadi",
        "ru": "Показывать пустые разделы",
        "en": "Also show empty partitions"
      }
    ],
    "examples": [
      {
        "cmd": "lsblk -f",
        "uz": "Qaysi disk qayerga o'rnatilganini ko'rish",
        "ru": "Узнать, куда смонтирован диск",
        "en": "See where each disk is mounted"
      }
    ]
  },
  {
    "id": "tar",
    "name": "tar",
    "syntax": "tar [OPTION] ARCHIVE [FILE]...",
    "category": "archive",
    "tags": [
      "archive",
      "arxiv",
      "архив",
      "tarball"
    ],
    "desc": {
      "uz": "Fayllarni arxivga yig'adi va undan chiqaradi (ko'pincha gzip bilan).",
      "ru": "Упаковывает файлы в архив и распаковывает (часто с gzip).",
      "en": "Packs files into an archive and extracts them (often with gzip)."
    },
    "options": [
      {
        "flag": "-c",
        "uz": "Yangi arxiv yaratadi (create)",
        "ru": "Создать архив",
        "en": "Create a new archive"
      },
      {
        "flag": "-x",
        "uz": "Arxivdan chiqaradi (extract)",
        "ru": "Извлечь из архива",
        "en": "Extract from an archive"
      },
      {
        "flag": "-z",
        "uz": "gzip bilan siqadi / ochadi",
        "ru": "Сжать/распаковать через gzip",
        "en": "Compress / decompress with gzip"
      },
      {
        "flag": "-v",
        "uz": "Jarayonni chiqaradi (verbose)",
        "ru": "Подробный вывод",
        "en": "Verbose output"
      },
      {
        "flag": "-f FILE",
        "uz": "Arxiv fayl nomini beradi",
        "ru": "Имя архивного файла",
        "en": "Specify the archive filename"
      }
    ],
    "examples": [
      {
        "cmd": "tar -czf site.tar.gz ./site",
        "uz": "Papkani siqilgan arxivga yig'ish",
        "ru": "Создать сжатый архив папки",
        "en": "Create a compressed archive of a folder"
      },
      {
        "cmd": "tar -xzf site.tar.gz",
        "uz": "Arxivni ochish",
        "ru": "Распаковать архив",
        "en": "Extract an archive"
      }
    ]
  },
  {
    "id": "zip",
    "name": "zip",
    "syntax": "zip [OPTION] ARCHIVE FILE...",
    "category": "archive",
    "tags": [
      "compress",
      "siqish",
      "сжать",
      "архив"
    ],
    "desc": {
      "uz": "Fayllarni .zip arxiviga yig'adi.",
      "ru": "Упаковывает файлы в архив .zip.",
      "en": "Packs files into a .zip archive."
    },
    "options": [
      {
        "flag": "-r",
        "uz": "Papkalarni ham qo'shadi",
        "ru": "Добавить каталоги рекурсивно",
        "en": "Add directories recursively"
      },
      {
        "flag": "-9",
        "uz": "Eng yuqori siqish darajasi",
        "ru": "Максимальная степень сжатия",
        "en": "Maximum compression level"
      },
      {
        "flag": "-u",
        "uz": "Faqat o'zgargan fayllarni yangilaydi",
        "ru": "Обновить только изменённые файлы",
        "en": "Update only changed files"
      }
    ],
    "examples": [
      {
        "cmd": "zip -r project.zip ./project",
        "uz": "Loyiha papkasini zip qilish",
        "ru": "Запаковать папку проекта",
        "en": "Zip a project folder"
      }
    ]
  },
  {
    "id": "unzip",
    "name": "unzip",
    "syntax": "unzip [OPTION] ARCHIVE",
    "category": "archive",
    "tags": [
      "extract",
      "ochish",
      "распаковать"
    ],
    "desc": {
      "uz": ".zip arxivlarini ochadi.",
      "ru": "Распаковывает архивы .zip.",
      "en": "Extracts .zip archives."
    },
    "options": [
      {
        "flag": "-d DIR",
        "uz": "Berilgan papkaga chiqaradi",
        "ru": "Извлечь в указанную папку",
        "en": "Extract to the specified folder"
      },
      {
        "flag": "-l",
        "uz": "Tarkibini chiqarmay ko'rsatadi",
        "ru": "Показать содержимое без распаковки",
        "en": "List contents without extracting"
      },
      {
        "flag": "-o",
        "uz": "Ustiga yozishni tasdiqlamaydi",
        "ru": "Перезаписывать без запроса",
        "en": "Overwrite without prompting"
      }
    ],
    "examples": [
      {
        "cmd": "unzip project.zip -d ./project",
        "uz": "Arxivni alohida papkaga ochish",
        "ru": "Распаковать в отдельную папку",
        "en": "Extract into a separate folder"
      }
    ]
  },
  {
    "id": "apt",
    "name": "apt",
    "syntax": "apt [COMMAND] [PACKAGE]",
    "category": "packages",
    "tags": [
      "ubuntu",
      "debian",
      "paket",
      "пакет",
      "install"
    ],
    "desc": {
      "uz": "Debian/Ubuntu tizimlarida dastur paketlarini boshqaradi.",
      "ru": "Управляет пакетами в системах Debian/Ubuntu.",
      "en": "Manages software packages on Debian/Ubuntu systems."
    },
    "options": [
      {
        "flag": "update",
        "uz": "Paketlar ro'yxatini yangilaydi",
        "ru": "Обновить список пакетов",
        "en": "Update the package list"
      },
      {
        "flag": "upgrade",
        "uz": "O'rnatilgan paketlarni yangilaydi",
        "ru": "Обновить установленные пакеты",
        "en": "Upgrade installed packages"
      },
      {
        "flag": "install NAME",
        "uz": "Paket o'rnatadi",
        "ru": "Установить пакет",
        "en": "Install a package"
      },
      {
        "flag": "remove NAME",
        "uz": "Paketni o'chiradi",
        "ru": "Удалить пакет",
        "en": "Remove a package"
      },
      {
        "flag": "search TEXT",
        "uz": "Paketlarda qidiradi",
        "ru": "Поиск среди пакетов",
        "en": "Search among packages"
      }
    ],
    "examples": [
      {
        "cmd": "sudo apt update && sudo apt upgrade -y",
        "uz": "Tizimni to'liq yangilash",
        "ru": "Полное обновление системы",
        "en": "Full system upgrade"
      },
      {
        "cmd": "sudo apt install htop",
        "uz": "htop vositasini o'rnatish",
        "ru": "Установить htop",
        "en": "Install htop"
      }
    ]
  },
  {
    "id": "dpkg",
    "name": "dpkg",
    "syntax": "dpkg [OPTION] PACKAGE.deb",
    "category": "packages",
    "tags": [
      "debian",
      "deb",
      "paket",
      "пакет"
    ],
    "desc": {
      "uz": ".deb fayllaridan paket o'rnatadi va ular haqida ma'lumot beradi.",
      "ru": "Устанавливает пакеты из .deb-файлов и показывает информацию о них.",
      "en": "Installs packages from .deb files and shows information about them."
    },
    "options": [
      {
        "flag": "-i FILE.deb",
        "uz": "Paketni o'rnatadi",
        "ru": "Установить пакет",
        "en": "Install a package"
      },
      {
        "flag": "-l",
        "uz": "Barcha o'rnatilgan paketlar ro'yxati",
        "ru": "Список всех установленных пакетов",
        "en": "List of all installed packages"
      },
      {
        "flag": "-s NAME",
        "uz": "Paket holati haqida ma'lumot",
        "ru": "Информация о состоянии пакета",
        "en": "Information about package status"
      },
      {
        "flag": "-r NAME",
        "uz": "Paketni o'chiradi",
        "ru": "Удалить пакет",
        "en": "Remove a package"
      }
    ],
    "examples": [
      {
        "cmd": "sudo dpkg -i ./package.deb",
        "uz": "Yuklab olingan .deb faylni o'rnatish",
        "ru": "Установить скачанный .deb-файл",
        "en": "Install a downloaded .deb file"
      }
    ]
  },
  {
    "id": "dnf",
    "name": "dnf",
    "syntax": "dnf [COMMAND] [PACKAGE]",
    "category": "packages",
    "tags": [
      "fedora",
      "rhel",
      "centos",
      "paket",
      "пакет"
    ],
    "desc": {
      "uz": "Fedora, RHEL, CentOS tizimlarida paketlarni boshqaradi (yum o'rniga).",
      "ru": "Управляет пакетами в Fedora, RHEL, CentOS (вместо yum).",
      "en": "Manages packages on Fedora, RHEL, and CentOS (replaces yum)."
    },
    "options": [
      {
        "flag": "install NAME",
        "uz": "Paket o'rnatadi",
        "ru": "Установить пакет",
        "en": "Install a package"
      },
      {
        "flag": "update",
        "uz": "Barcha paketlarni yangilaydi",
        "ru": "Обновить все пакеты",
        "en": "Update all packages"
      },
      {
        "flag": "remove NAME",
        "uz": "Paketni o'chiradi",
        "ru": "Удалить пакет",
        "en": "Remove a package"
      },
      {
        "flag": "search TEXT",
        "uz": "Paket qidiradi",
        "ru": "Найти пакет",
        "en": "Find a package"
      }
    ],
    "examples": [
      {
        "cmd": "sudo dnf install nginx",
        "uz": "Nginx o'rnatish",
        "ru": "Установить nginx",
        "en": "Install nginx"
      },
      {
        "cmd": "sudo dnf update -y",
        "uz": "Tizimni yangilash",
        "ru": "Обновить систему",
        "en": "Update the system"
      }
    ]
  },
  {
    "id": "man",
    "name": "man",
    "syntax": "man [SECTION] COMMAND",
    "category": "tools",
    "tags": [
      "manual",
      "qo'llanma",
      "справка",
      "документация"
    ],
    "desc": {
      "uz": "Buyruqning to'liq qo'llanmasini (manual) ochadi.",
      "ru": "Открывает полное руководство (manual) по команде.",
      "en": "Opens the full manual page for a command."
    },
    "options": [
      {
        "flag": "SPACE / q",
        "uz": "Sahifalash: keyingi sahifa / chiqish",
        "ru": "Листание: следующая страница / выход",
        "en": "Paging: next page / quit"
      },
      {
        "flag": "/TEXT",
        "uz": "Qo'llanma ichida qidiradi",
        "ru": "Поиск внутри руководства",
        "en": "Search inside the manual"
      },
      {
        "flag": "-k TEXT",
        "uz": "Kalit so'z bo'yicha qo'llanmalar qidiradi",
        "ru": "Поиск руководств по ключевому слову",
        "en": "Search manuals by keyword"
      },
      {
        "flag": "1 / 5 / 8",
        "uz": "Bo'limlar: buyruqlar / sozlamalar / administratsiya",
        "ru": "Разделы: команды / конфиги / администрирование",
        "en": "Sections: commands / config / administration"
      }
    ],
    "examples": [
      {
        "cmd": "man grep",
        "uz": "grep buyrugi haqida to'liq ma'lumot",
        "ru": "Полная справка по grep",
        "en": "Full manual for the grep command"
      },
      {
        "cmd": "man 5 passwd",
        "uz": "passwd sozlama fayli haqida ma'lumot",
        "ru": "Справка о конфиге passwd",
        "en": "Manual for the passwd config file"
      }
    ]
  },
  {
    "id": "which",
    "name": "which",
    "syntax": "which COMMAND",
    "category": "tools",
    "tags": [
      "where",
      "qayerda",
      "где",
      "путь"
    ],
    "desc": {
      "uz": "Buyruq bajariladigan faylning yo'lini topadi.",
      "ru": "Находит путь к исполняемому файлу команды.",
      "en": "Finds the path to a command's executable."
    },
    "options": [
      {
        "flag": "-a",
        "uz": "Barcha topilgan yo'llarni chiqaradi",
        "ru": "Вывести все найденные пути",
        "en": "Print all found paths"
      },
      {
        "flag": "--help",
        "uz": "Yordam chiqaradi",
        "ru": "Вывести справку",
        "en": "Show help"
      }
    ],
    "examples": [
      {
        "cmd": "which python3",
        "uz": "Python qayerda o'rnatilganini bilish",
        "ru": "Узнать, где установлен Python",
        "en": "Find out where Python is installed"
      }
    ]
  },
  {
    "id": "xargs",
    "name": "xargs",
    "syntax": "xargs [OPTION] COMMAND",
    "category": "tools",
    "tags": [
      "arguments",
      "argument",
      "аргументы",
      "пайп"
    ],
    "desc": {
      "uz": "Standart kiritishdan kelgan satrlarni buyruq argumentlariga aylantiradi.",
      "ru": "Преобразует строки из стандартного ввода в аргументы команды.",
      "en": "Turns lines from standard input into command arguments."
    },
    "options": [
      {
        "flag": "-n N",
        "uz": "Har safar N ta argument beradi",
        "ru": "Передавать по N аргументов",
        "en": "Pass N arguments at a time"
      },
      {
        "flag": "-I {}",
        "uz": "Har bir satrni {} o'rniga qo'yadi",
        "ru": "Подставлять каждую строку вместо {}",
        "en": "Substitute each line for {}"
      },
      {
        "flag": "-0",
        "uz": "Bo'sh joy o'rniga NUL bilan ajratadi (find bilan)",
        "ru": "Разделять NUL вместо пробелов (с find)",
        "en": "Split on NUL instead of whitespace (with find)"
      },
      {
        "flag": "-p",
        "uz": "Har bir buyruqni tasdiqlatadi",
        "ru": "Запрашивать подтверждение",
        "en": "Prompt for confirmation before each command"
      }
    ],
    "examples": [
      {
        "cmd": "find . -name \"*.log\" | xargs rm",
        "uz": "Topilgan barcha log fayllarini o'chirish",
        "ru": "Удалить все найденные логи",
        "en": "Delete all found log files"
      },
      {
        "cmd": "cat urls.txt | xargs -n 1 curl -I",
        "uz": "Har bir URL uchun alohida so'rov",
        "ru": "Отдельный запрос для каждого URL",
        "en": "One separate request per URL"
      }
    ]
  },
  {
    "id": "tee",
    "name": "tee",
    "syntax": "tee [OPTION] FILE",
    "category": "tools",
    "tags": [
      "pipe",
      "yozish",
      "записать",
      "вывод"
    ],
    "desc": {
      "uz": "Natijani ham ekranga, ham faylga bir vaqtda yozadi.",
      "ru": "Записывает результат одновременно на экран и в файл.",
      "en": "Writes the result to the screen and a file at the same time."
    },
    "options": [
      {
        "flag": "-a",
        "uz": "Fayl ustiga yozmay, oxiriga qo'shadi",
        "ru": "Дописывать в конец файла",
        "en": "Append to a file instead of overwriting"
      },
      {
        "flag": "-i",
        "uz": "SIGINT signalini e'tiborsiz qoldiradi",
        "ru": "Игнорировать SIGINT",
        "en": "Ignore the SIGINT signal"
      }
    ],
    "examples": [
      {
        "cmd": "ls -la | tee files.txt",
        "uz": "Ro'yxatni ko'rib, faylga ham saqlash",
        "ru": "Посмотреть список и сохранить в файл",
        "en": "View a list and also save it to a file"
      },
      {
        "cmd": "echo \"new line\" | tee -a notes.txt",
        "uz": "Fayl oxiriga qator qo'shish",
        "ru": "Добавить строку в конец файла",
        "en": "Append a line to a file"
      }
    ]
  },
  {
    "id": "crontab",
    "name": "crontab",
    "syntax": "crontab [OPTION] [FILE]",
    "category": "tools",
    "tags": [
      "cron",
      "vazifa",
      "задача",
      "расписание",
      "автоматизация"
    ],
    "desc": {
      "uz": "Vaqt jadvali bo'yicha avtomatik bajariladigan vazifalarni boshqaradi.",
      "ru": "Управляет задачами, выполняемыми по расписанию.",
      "en": "Manages tasks that run on a schedule (cron)."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Joriy vazifalar ro'yxati (list)",
        "ru": "Список текущих задач",
        "en": "List of current tasks"
      },
      {
        "flag": "-e",
        "uz": "Vazifalarni tahrirlash (edit)",
        "ru": "Редактировать задачи",
        "en": "Edit tasks"
      },
      {
        "flag": "-r",
        "uz": "Barcha vazifalarni o'chirish (remove)",
        "ru": "Удалить все задачи",
        "en": "Remove all tasks"
      }
    ],
    "examples": [
      {
        "cmd": "crontab -e",
        "uz": "Yangi rejalashtirilgan vazifa qo'shish",
        "ru": "Добавить новую задачу по расписанию",
        "en": "Add a new scheduled task"
      },
      {
        "cmd": "0 2 * * * /backup.sh",
        "uz": "Har kuni soat 02:00 da zaxira olish",
        "ru": "Каждый день в 02:00 делать резервную копию",
        "en": "Back up every day at 02:00"
      }
    ]
  },
  {
    "id": "git-status",
    "name": "git status",
    "syntax": "git status [OPTION]",
    "category": "git",
    "tags": [
      "git",
      "holat",
      "состояние",
      "изменения"
    ],
    "desc": {
      "uz": "Loyihadagi o'zgarishlar va qaysi fayllar kuzatilayotganini ko'rsatadi.",
      "ru": "Показывает изменения в проекте и отслеживаемые файлы.",
      "en": "Shows project changes and which files are tracked."
    },
    "options": [
      {
        "flag": "-s",
        "uz": "Qisqa ko'rinish",
        "ru": "Короткий вид",
        "en": "Short format"
      },
      {
        "flag": "-b",
        "uz": "Joriy filial haqida ma'lumot",
        "ru": "Информация о текущей ветке",
        "en": "Information about the current branch"
      }
    ],
    "examples": [
      {
        "cmd": "git status",
        "uz": "Nimalar o'zgarganini tekshirish",
        "ru": "Проверить, что изменилось",
        "en": "Check what has changed"
      },
      {
        "cmd": "git status -sb",
        "uz": "Filial va qisqa o'zgarishlar",
        "ru": "Ветка и краткие изменения",
        "en": "Branch and short changes"
      }
    ]
  },
  {
    "id": "git-clone",
    "name": "git clone",
    "syntax": "git clone [OPTION] URL [DIR]",
    "category": "git",
    "tags": [
      "git",
      "repository",
      "nusxa",
      "репозиторий"
    ],
    "desc": {
      "uz": "Masofaviy omborni (repository) lokalga nusxalaydi.",
      "ru": "Копирует удалённый репозиторий на локальный компьютер.",
      "en": "Clones a remote repository locally."
    },
    "options": [
      {
        "flag": "-b BRANCH",
        "uz": "Muayyan filialni oladi",
        "ru": "Взять определённую ветку",
        "en": "Get a specific branch"
      },
      {
        "flag": "--depth 1",
        "uz": "Faqat oxirgi commit (tezroq)",
        "ru": "Только последний коммит (быстрее)",
        "en": "Only the latest commit (faster)"
      }
    ],
    "examples": [
      {
        "cmd": "git clone https://github.com/user/repo.git",
        "uz": "Omborni yuklab olish",
        "ru": "Скачать репозиторий",
        "en": "Download a repository"
      },
      {
        "cmd": "git clone --depth 1 https://github.com/user/repo.git",
        "uz": "Tarixsiz tez yuklab olish",
        "ru": "Быстрая загрузка без истории",
        "en": "Fast download without history"
      }
    ]
  },
  {
    "id": "git-add",
    "name": "git add",
    "syntax": "git add [OPTION] FILE",
    "category": "git",
    "tags": [
      "git",
      "stage",
      "qo'shish",
      "добавить"
    ],
    "desc": {
      "uz": "O'zgarishlarni keyingi commit uchun tayyorlaydi (staging).",
      "ru": "Подготавливает изменения для следующего коммита (staging).",
      "en": "Stages changes for the next commit."
    },
    "options": [
      {
        "flag": ".",
        "uz": "Barcha o'zgarishlarni qo'shadi",
        "ru": "Добавить все изменения",
        "en": "Add all changes"
      },
      {
        "flag": "-p",
        "uz": "Interaktiv tanlash",
        "ru": "Интерактивный выбор",
        "en": "Interactive selection"
      },
      {
        "flag": "-A",
        "uz": "O'chirilgan fayllarni ham qo'shadi",
        "ru": "Учесть также удалённые файлы",
        "en": "Also stage deleted files"
      }
    ],
    "examples": [
      {
        "cmd": "git add .",
        "uz": "Barcha o'zgarishlarni tayyorlash",
        "ru": "Подготовить все изменения",
        "en": "Stage all changes"
      },
      {
        "cmd": "git add src/main.js",
        "uz": "Faqat bitta faylni qo'shish",
        "ru": "Добавить только один файл",
        "en": "Add only one file"
      }
    ]
  },
  {
    "id": "git-commit",
    "name": "git commit",
    "syntax": "git commit [OPTION]",
    "category": "git",
    "tags": [
      "git",
      "commit",
      "saqlash",
      "сохранить"
    ],
    "desc": {
      "uz": "Tayyorlangan o'zgarishlarni yangi commit sifatida saqlaydi.",
      "ru": "Сохраняет подготовленные изменения как новый коммит.",
      "en": "Saves staged changes as a new commit."
    },
    "options": [
      {
        "flag": "-m \"MSG\"",
        "uz": "Xabar bilan darhol commit qiladi",
        "ru": "Коммит с сообщением",
        "en": "Commit immediately with a message"
      },
      {
        "flag": "-am \"MSG\"",
        "uz": "Kuzatilgan fayllarni qo'shib commit qiladi",
        "ru": "Добавить отслеживаемые файлы и закоммитить",
        "en": "Add tracked files and commit"
      },
      {
        "flag": "--amend",
        "uz": "Oxirgi commitni tuzatadi",
        "ru": "Исправить последний коммит",
        "en": "Amend the last commit"
      }
    ],
    "examples": [
      {
        "cmd": "git commit -m \"Fix login bug\"",
        "uz": "Xabar bilan commit yaratish",
        "ru": "Создать коммит с сообщением",
        "en": "Create a commit with a message"
      }
    ]
  },
  {
    "id": "git-push",
    "name": "git push",
    "syntax": "git push [REMOTE] [BRANCH]",
    "category": "git",
    "tags": [
      "git",
      "yuklash",
      "загрузить",
      "удалённый"
    ],
    "desc": {
      "uz": "Lokal commitlarni masofaviy ombonga yuboradi.",
      "ru": "Отправляет локальные коммиты в удалённый репозиторий.",
      "en": "Pushes local commits to a remote repository."
    },
    "options": [
      {
        "flag": "origin main",
        "uz": "Nomli ombor va filialga yuboradi",
        "ru": "Отправить в указанный репозиторий и ветку",
        "en": "Push to a named remote and branch"
      },
      {
        "flag": "-u origin main",
        "uz": "Filialni kuzatishni o'rnatadi",
        "ru": "Настроить отслеживание ветки",
        "en": "Set up branch tracking"
      },
      {
        "flag": "--force",
        "uz": "Majburiy yuborish (ehtiyotli bo'ling!)",
        "ru": "Принудительная отправка (осторожно!)",
        "en": "Force push (be careful!)"
      }
    ],
    "examples": [
      {
        "cmd": "git push origin main",
        "uz": "O'zgarishlarni GitHub ga yuborish",
        "ru": "Отправить изменения на GitHub",
        "en": "Push changes to GitHub"
      }
    ]
  },
  {
    "id": "git-pull",
    "name": "git pull",
    "syntax": "git pull [REMOTE] [BRANCH]",
    "category": "git",
    "tags": [
      "git",
      "olish",
      "получить",
      "обновить"
    ],
    "desc": {
      "uz": "Masofaviy ombondan o'zgarishlarni oladi va birlashtiradi.",
      "ru": "Получает изменения из удалённого репозитория и объединяет их.",
      "en": "Fetches and merges changes from a remote repository."
    },
    "options": [
      {
        "flag": "--rebase",
        "uz": "Birlashtirish o'rniga rebase qiladi",
        "ru": "Использовать rebase вместо merge",
        "en": "Rebase instead of merging"
      },
      {
        "flag": "--ff-only",
        "uz": "Faqat fast-forward bo'lsa birlashtiradi",
        "ru": "Только fast-forward объединение",
        "en": "Only allow fast-forward merges"
      }
    ],
    "examples": [
      {
        "cmd": "git pull origin main",
        "uz": "Eng so'nggi o'zgarishlarni olish",
        "ru": "Получить последние изменения",
        "en": "Get the latest changes"
      }
    ]
  },
  {
    "id": "nmap",
    "name": "nmap",
    "syntax": "nmap [SCAN TYPE] [OPTION] TARGET",
    "category": "kali",
    "tags": [
      "port scan",
      "tarmoq",
      "сканирование",
      "порты",
      "kali"
    ],
    "desc": {
      "uz": "Tarmoqdagi xostlarni, ochiq portlarni va xizmatlarni aniqlaydi.",
      "ru": "Обнаруживает хосты в сети, открытые порты и запущенные службы.",
      "en": "Discovers hosts, open ports, and services on a network."
    },
    "options": [
      {
        "flag": "-sS",
        "uz": "Yashirin SYN skanerlash",
        "ru": "Скрытое SYN-сканирование",
        "en": "Stealth SYN scan"
      },
      {
        "flag": "-sV",
        "uz": "Xizmat versiyalarini aniqlaydi",
        "ru": "Определяет версии служб",
        "en": "Detect service versions"
      },
      {
        "flag": "-O",
        "uz": "Operatsion tizimni taxmin qiladi",
        "ru": "Определяет ОС",
        "en": "Guess the operating system"
      },
      {
        "flag": "-p 1-1000",
        "uz": "Portlar oralig'ini beradi",
        "ru": "Диапазон портов",
        "en": "Specify a port range"
      },
      {
        "flag": "-A",
        "uz": "Barcha kengaytirilgan tekshiruvlar",
        "ru": "Все расширенные проверки",
        "en": "All advanced checks"
      }
    ],
    "examples": [
      {
        "cmd": "nmap -sV 192.168.1.10",
        "uz": "Labdagi bitta xostning xizmatlarini ko'rish",
        "ru": "Посмотреть службы одного хоста в лаборатории",
        "en": "View the services of one lab host"
      },
      {
        "cmd": "nmap -sn 192.168.1.0/24",
        "uz": "Tarmoqdagi tirik xostlarni topish",
        "ru": "Найти активные хосты в сети",
        "en": "Find live hosts on the network"
      }
    ],
    "notice": {
      "uz": "Faqat o'zingizga tegishli yoki ruxsat etilgan tarmoqlarda skanerlang.",
      "ru": "Сканируйте только свои или авторизованные сети.",
      "en": "Scan only networks you own or are authorized to test."
    }
  },
  {
    "id": "nc",
    "name": "nc (netcat)",
    "syntax": "nc [OPTION] HOST PORT",
    "category": "kali",
    "tags": [
      "netcat",
      "socket",
      "ulanish",
      "соединение",
      "kali"
    ],
    "desc": {
      "uz": "TCP/UDP ulanishlari uchun «tarmoq shveysariya pichog'i».",
      "ru": "«Швейцарский нож» для TCP/UDP-соединений.",
      "en": "The 'network Swiss Army knife' for TCP/UDP connections."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Kiruvchi ulanishni tinglaydi (listen)",
        "ru": "Слушать входящие подключения",
        "en": "Listen for incoming connections"
      },
      {
        "flag": "-v",
        "uz": "Batafsil ma'lumot",
        "ru": "Подробный вывод",
        "en": "Verbose output"
      },
      {
        "flag": "-n",
        "uz": "DNS so'rovi qilmaydi",
        "ru": "Не делать DNS-запросы",
        "en": "Do not make DNS queries"
      },
      {
        "flag": "-u",
        "uz": "UDP rejimi",
        "ru": "UDP-режим",
        "en": "UDP mode"
      }
    ],
    "examples": [
      {
        "cmd": "nc -lvnp 4444",
        "uz": "Sinov portini tinglash",
        "ru": "Слушать тестовый порт",
        "en": "Listen on a test port"
      },
      {
        "cmd": "nc -vz 192.168.1.10 22",
        "uz": "Port ochiqligini tekshirish",
        "ru": "Проверить, открыт ли порт",
        "en": "Check whether a port is open"
      }
    ],
    "notice": {
      "uz": "Faqat sinov muhitida foydalaning.",
      "ru": "Используйте только в тестовой среде.",
      "en": "Use only in a test environment."
    }
  },
  {
    "id": "tcpdump",
    "name": "tcpdump",
    "syntax": "tcpdump [OPTION] [FILTER]",
    "category": "kali",
    "tags": [
      "sniffer",
      "packet",
      "paket",
      "запрос",
      "kali"
    ],
    "desc": {
      "uz": "Tarmoq paketlarini real vaqtda ushlaydi va tahlil qiladi.",
      "ru": "Перехватывает и анализирует сетевые пакеты в реальном времени.",
      "en": "Captures and analyzes network packets in real time."
    },
    "options": [
      {
        "flag": "-i eth0",
        "uz": "Interfeysni tanlaydi",
        "ru": "Выбрать интерфейс",
        "en": "Select an interface"
      },
      {
        "flag": "-w file.pcap",
        "uz": "Paketlarni faylga saqlaydi",
        "ru": "Сохранить пакеты в файл",
        "en": "Save packets to a file"
      },
      {
        "flag": "-c N",
        "uz": "Faqat N ta paket ushlaydi",
        "ru": "Перехватить N пакетов",
        "en": "Capture only N packets"
      },
      {
        "flag": "port 80",
        "uz": "Faqat ko'rsatilgan port trafiki",
        "ru": "Только трафик указанного порта",
        "en": "Only traffic on the specified port"
      }
    ],
    "examples": [
      {
        "cmd": "sudo tcpdump -i eth0 -c 20 port 53",
        "uz": "20 ta DNS paketini ushlash",
        "ru": "Перехватить 20 DNS-пакетов",
        "en": "Capture 20 DNS packets"
      },
      {
        "cmd": "sudo tcpdump -i eth0 -w capture.pcap",
        "uz": "Trafikni keyinchalik tahlil qilish uchun saqlash",
        "ru": "Сохранить трафик для последующего анализа",
        "en": "Save traffic for later analysis"
      }
    ],
    "notice": {
      "uz": "Boshqa odamlarning trafikini faqat ruxsat bilan kuzating.",
      "ru": "Перехватывайте чужой трафик только с разрешения.",
      "en": "Capture other people's traffic only with permission."
    }
  },
  {
    "id": "tshark",
    "name": "tshark",
    "syntax": "tshark [OPTION] [FILTER]",
    "category": "kali",
    "tags": [
      "wireshark",
      "packet",
      "paket",
      "анализ",
      "kali"
    ],
    "desc": {
      "uz": "Wiresharkning terminal versiyasi — .pcap fayllarini tahlil qiladi.",
      "ru": "Терминальная версия Wireshark — анализ файлов .pcap.",
      "en": "Terminal version of Wireshark — analyzes .pcap files."
    },
    "options": [
      {
        "flag": "-r file.pcap",
        "uz": "Saqlangan faylni o'qiydi",
        "ru": "Прочитать сохранённый файл",
        "en": "Read a saved capture file"
      },
      {
        "flag": "-Y \"http\"",
        "uz": "Ko'rsatilgan paketlarni filtrlaydi",
        "ru": "Фильтр пакетов",
        "en": "Filter the specified packets"
      },
      {
        "flag": "-T fields",
        "uz": "Faqat ko'rsatilgan maydonlarni chiqaradi",
        "ru": "Вывести только нужные поля",
        "en": "Print only the specified fields"
      }
    ],
    "examples": [
      {
        "cmd": "tshark -r capture.pcap -Y \"dns\"",
        "uz": "Yozib olingan DNS so'rovlarini ko'rish",
        "ru": "Посмотреть сохранённые DNS-запросы",
        "en": "View captured DNS queries"
      }
    ]
  },
  {
    "id": "msfconsole",
    "name": "msfconsole",
    "syntax": "msfconsole [OPTION]",
    "category": "kali",
    "tags": [
      "metasploit",
      "exploit",
      "framework",
      "kali"
    ],
    "desc": {
      "uz": "Metasploit Frameworkning interaktiv konsoli — xavfsizlik sinovlari uchun platforma.",
      "ru": "Интерактивная консоль Metasploit Framework — платформа для тестов безопасности.",
      "en": "Interactive console of the Metasploit Framework — a platform for security testing."
    },
    "options": [
      {
        "flag": "search NAME",
        "uz": "Modullar bo'yicha qidiradi",
        "ru": "Поиск по модулям",
        "en": "Search modules"
      },
      {
        "flag": "use MODULE",
        "uz": "Modulni tanlaydi",
        "ru": "Выбрать модуль",
        "en": "Select a module"
      },
      {
        "flag": "show options",
        "uz": "Modul parametrlarini chiqaradi",
        "ru": "Показать параметры модуля",
        "en": "Show module options"
      },
      {
        "flag": "exit",
        "uz": "Konsoldan chiqadi",
        "ru": "Выйти из консоли",
        "en": "Exit the console"
      }
    ],
    "examples": [
      {
        "cmd": "msfconsole -q",
        "uz": "Tizimli (quiet) rejimda ishga tushirish",
        "ru": "Запустить в тихом режиме",
        "en": "Start in quiet mode"
      },
      {
        "cmd": "search type:auxiliary ssh",
        "uz": "SSH bilan bog'liq modullarni topish",
        "ru": "Найти модули, связанные с SSH",
        "en": "Find SSH-related modules"
      }
    ],
    "notice": {
      "uz": "Faqat o'z laboratoriyangizda (masalan, Metasploitable) mashq qiling.",
      "ru": "Практикуйтесь только в своей лаборатории (например, Metasploitable).",
      "en": "Practice only in your own lab (for example, Metasploitable)."
    }
  },
  {
    "id": "hydra",
    "name": "hydra",
    "syntax": "hydra [OPTION] TARGET PROTOCOL",
    "category": "kali",
    "tags": [
      "bruteforce",
      "parol",
      "пароль",
      "kali"
    ],
    "desc": {
      "uz": "Turli xizmatlar uchun parolga qarshi sinov vositasi (lug'at bilan).",
      "ru": "Инструмент проверки паролей по словарю для различных сервисов.",
      "en": "A dictionary-based password testing tool for various services."
    },
    "options": [
      {
        "flag": "-l USER",
        "uz": "Bitta foydalanuvchi nomi",
        "ru": "Одно имя пользователя",
        "en": "A single username"
      },
      {
        "flag": "-L FILE",
        "uz": "Foydalanuvchilar lug'ati",
        "ru": "Список пользователей",
        "en": "Username list"
      },
      {
        "flag": "-P FILE",
        "uz": "Parollar lug'ati",
        "ru": "Словарь паролей",
        "en": "Password dictionary"
      },
      {
        "flag": "-t N",
        "uz": "Parallel urinishlar soni",
        "ru": "Число параллельных попыток",
        "en": "Number of parallel attempts"
      }
    ],
    "examples": [
      {
        "cmd": "hydra -l admin -P pass.txt 192.168.1.10 ssh",
        "uz": "O'z lab serverida SSH parol sinovi",
        "ru": "Проверка SSH-пароля на своём тестовом сервере",
        "en": "Test SSH passwords on your own lab server"
      }
    ],
    "notice": {
      "uz": "Faqat o'zingiz boshqaradigan sinov tizimlarida foydalaning.",
      "ru": "Используйте только на собственных тестовых системах.",
      "en": "Use only on test systems you control."
    }
  },
  {
    "id": "john",
    "name": "john",
    "syntax": "john [OPTION] HASH_FILE",
    "category": "kali",
    "tags": [
      "hash",
      "password",
      "пароль",
      "kali"
    ],
    "desc": {
      "uz": "Parol xeshlarini lug'at va qoida asosida tiklash vositasi (John the Ripper).",
      "ru": "Инструмент восстановления паролей по словарю и правилам (John the Ripper).",
      "en": "A dictionary- and rule-based password hash cracker (John the Ripper)."
    },
    "options": [
      {
        "flag": "--wordlist=FILE",
        "uz": "Lug'at faylini beradi",
        "ru": "Указать файл словаря",
        "en": "Specify a wordlist file"
      },
      {
        "flag": "--rules",
        "uz": "Lug'at so'zlariga o'zgartirish qoidalarini qo'llaydi",
        "ru": "Применять правила к словам",
        "en": "Apply word-mangling rules to dictionary words"
      },
      {
        "flag": "--show",
        "uz": "Topilgan parollarni chiqaradi",
        "ru": "Показать найденные пароли",
        "en": "Show recovered passwords"
      }
    ],
    "examples": [
      {
        "cmd": "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
        "uz": "Lug'at bilan xeshlarni tekshirish",
        "ru": "Проверка хэшей по словарю",
        "en": "Crack hashes with a wordlist"
      }
    ],
    "notice": {
      "uz": "Faqat o'zingizga tegishli fayl va hashlar bilan ishlang.",
      "ru": "Работайте только со своими файлами и хэшами.",
      "en": "Work only with files and hashes you own."
    }
  },
  {
    "id": "hashcat",
    "name": "hashcat",
    "syntax": "hashcat [OPTION] HASH WORDLIST",
    "category": "kali",
    "tags": [
      "hash",
      "gpu",
      "password",
      "пароль",
      "kali"
    ],
    "desc": {
      "uz": "GPU tezligidan foydalanadigan kuchli xesh tiklash vositasi.",
      "ru": "Мощный инструмент восстановления хэшей с использованием GPU.",
      "en": "A powerful hash-cracking tool that uses GPU acceleration."
    },
    "options": [
      {
        "flag": "-m TYPE",
        "uz": "Xesh turini belgilaydi (mas. 0 = MD5)",
        "ru": "Тип хэша (напр. 0 = MD5)",
        "en": "Specify the hash type (e.g. 0 = MD5)"
      },
      {
        "flag": "-a MODE",
        "uz": "Hujum rejimi (0 = lug'at, 3 = brute)",
        "ru": "Режим атаки (0 = словарь, 3 = brute)",
        "en": "Attack mode (0 = dictionary, 3 = brute force)"
      },
      {
        "flag": "--show",
        "uz": "Natijalarni chiqaradi",
        "ru": "Вывести результаты",
        "en": "Print results"
      }
    ],
    "examples": [
      {
        "cmd": "hashcat -m 0 -a 0 hashes.txt wordlist.txt",
        "uz": "MD5 xeshlarini lug'at bilan tekshirish",
        "ru": "Проверка MD5-хэшей по словарю",
        "en": "Crack MD5 hashes with a wordlist"
      }
    ],
    "notice": {
      "uz": "Faqat ruxsat etilgan ma'lumotlar bilan foydalaning.",
      "ru": "Используйте только с разрешёнными данными.",
      "en": "Use only with authorized data."
    }
  },
  {
    "id": "aircrack-ng",
    "name": "aircrack-ng",
    "syntax": "aircrack-ng [OPTION] CAPTURE.cap",
    "category": "kali",
    "tags": [
      "wifi",
      "wireless",
      "simsiz",
      "kali"
    ],
    "desc": {
      "uz": "Simsiz tarmoqlar xavfsizligini sinash va WPA/WEP kalitlarini tiklash to'plami.",
      "ru": "Набор для проверки безопасности беспроводных сетей и восстановления ключей WPA/WEP.",
      "en": "A suite for testing wireless network security and recovering WPA/WEP keys."
    },
    "options": [
      {
        "flag": "-w FILE",
        "uz": "Lug'at fayli",
        "ru": "Файл словаря",
        "en": "Wordlist file"
      },
      {
        "flag": "-b BSSID",
        "uz": "Muayyan kirish nuqtasini tanlaydi",
        "ru": "Выбрать точку доступа",
        "en": "Select a specific access point"
      },
      {
        "flag": "airmon-ng",
        "uz": "Kartani monitoring rejimiga o'tkazadi",
        "ru": "Перевести карту в режим мониторинга",
        "en": "Put the card into monitor mode"
      }
    ],
    "examples": [
      {
        "cmd": "aircrack-ng -w wordlist.txt capture.cap",
        "uz": "Yozib olingan qo'l ovlash faylini tekshirish (o'z tarmog'ingiz)",
        "ru": "Проверить перехваченный файл в своей сети",
        "en": "Check a captured handshake file (on your own network)"
      }
    ],
    "notice": {
      "uz": "Faqat o'zingizning Wi-Fi tarmog'ingizda sinang.",
      "ru": "Тестируйте только свою сеть Wi-Fi.",
      "en": "Test only on your own Wi-Fi network."
    }
  },
  {
    "id": "gobuster",
    "name": "gobuster",
    "syntax": "gobuster MODE [OPTION]",
    "category": "kali",
    "tags": [
      "directory",
      "papka",
      "каталог",
      "web",
      "kali"
    ],
    "desc": {
      "uz": "Veb-serverda yashirin papka va fayllarni lug'at bilan topadi.",
      "ru": "Ищет скрытые каталоги и файлы на веб-сервере по словарю.",
      "en": "Finds hidden directories and files on a web server using a wordlist."
    },
    "options": [
      {
        "flag": "dir",
        "uz": "Papkalar rejimi",
        "ru": "Режим поиска каталогов",
        "en": "Directory mode"
      },
      {
        "flag": "-u URL",
        "uz": "Manzil (target)",
        "ru": "Целевой адрес",
        "en": "Target address"
      },
      {
        "flag": "-w FILE",
        "uz": "Lug'at fayli",
        "ru": "Файл словаря",
        "en": "Wordlist file"
      },
      {
        "flag": "-t N",
        "uz": "Parallel so'rovlar soni",
        "ru": "Число параллельных запросов",
        "en": "Number of parallel requests"
      }
    ],
    "examples": [
      {
        "cmd": "gobuster dir -u http://test.local -w wordlist.txt",
        "uz": "O'z test serveridagi papkalarni topish",
        "ru": "Найти каталоги на своём тестовом сервере",
        "en": "Find directories on your own test server"
      }
    ],
    "notice": {
      "uz": "Faqat o'zingizga tegishli veb-saytlarda skanerlang.",
      "ru": "Сканируйте только свои веб-сайты.",
      "en": "Scan only websites you own."
    }
  },
  {
    "id": "nikto",
    "name": "nikto",
    "syntax": "nikto -h HOST [OPTION]",
    "category": "kali",
    "tags": [
      "web scan",
      "veb",
      "уязвимости",
      "kali"
    ],
    "desc": {
      "uz": "Veb-serverdagi ma'lum xavfsizlik muammolari va eskirgan dasturlarni skanerlaydi.",
      "ru": "Сканирует веб-сервер на известные уязвимости и устаревшие версии.",
      "en": "Scans a web server for known vulnerabilities and outdated software."
    },
    "options": [
      {
        "flag": "-h HOST",
        "uz": "Tegishli server (host)",
        "ru": "Целевой хост",
        "en": "Target host"
      },
      {
        "flag": "-p PORT",
        "uz": "Portni belgilaydi",
        "ru": "Указать порт",
        "en": "Specify the port"
      },
      {
        "flag": "-o FILE",
        "uz": "Natijani faylga yozadi",
        "ru": "Записать результат в файл",
        "en": "Write the result to a file"
      },
      {
        "flag": "-Tuning",
        "uz": "Test turlarini tanlaydi",
        "ru": "Выбор типов тестов",
        "en": "Select test types"
      }
    ],
    "examples": [
      {
        "cmd": "nikto -h http://test.local -o scan.txt",
        "uz": "Test serverini skanerlash va natijani saqlash",
        "ru": "Сканировать тестовый сервер и сохранить результат",
        "en": "Scan a test server and save the result"
      }
    ],
    "notice": {
      "uz": "Faqat ruxsat etilgan veb-serverlarni tekshiring.",
      "ru": "Проверяйте только авторизованные веб-серверы.",
      "en": "Check only authorized web servers."
    }
  },
  {
    "id": "sqlmap",
    "name": "sqlmap",
    "syntax": "sqlmap [OPTION] -u URL",
    "category": "kali",
    "tags": [
      "sql injection",
      "database",
      "ma'lumotlar bazasi",
      "kali"
    ],
    "desc": {
      "uz": "SQL in'ektsiya zaifliklarini avtomatik aniqlaydigan va tahlil qiladigan vosita.",
      "ru": "Инструмент автоматического обнаружения и анализа SQL-инъекций.",
      "en": "A tool for automatic detection and analysis of SQL injection vulnerabilities."
    },
    "options": [
      {
        "flag": "-u URL",
        "uz": "Test qilinadigan manzil",
        "ru": "Проверяемый адрес",
        "en": "Target URL to test"
      },
      {
        "flag": "--batch",
        "uz": "Savollarga avtomatik javob beradi",
        "ru": "Автоматически отвечать на вопросы",
        "en": "Answer prompts automatically"
      },
      {
        "flag": "--dbs",
        "uz": "Ma'lumotlar bazalari ro'yxati",
        "ru": "Список баз данных",
        "en": "List of databases"
      },
      {
        "flag": "--level N",
        "uz": "Test chuqurligi (1–5)",
        "ru": "Глубина тестирования (1–5)",
        "en": "Test depth (1–5)"
      }
    ],
    "examples": [
      {
        "cmd": "sqlmap -u \"http://test.local/page?id=1\" --batch --dbs",
        "uz": "O'z laboratoriyasida bazalar ro'yxatini ko'rish",
        "ru": "Посмотреть список баз в своей лаборатории",
        "en": "List databases in your own lab"
      }
    ],
    "notice": {
      "uz": "Faqat o'zingiz yaratgan test ilovasida foydalaning.",
      "ru": "Используйте только на собственном тестовом приложении.",
      "en": "Use only on a test application you created."
    }
  },
  {
    "id": "whois",
    "name": "whois",
    "syntax": "whois [OPTION] DOMAIN",
    "category": "kali",
    "tags": [
      "domain",
      "domen",
      "домен",
      "kali"
    ],
    "desc": {
      "uz": "Domen yoki IP haqida ro'yxatga olingan ma'lumotlarni chiqaradi.",
      "ru": "Выводит регистрационную информацию о домене или IP.",
      "en": "Shows registration information for a domain or IP."
    },
    "options": [
      {
        "flag": "-h HOST",
        "uz": "Muayyan whois serverga so'rov",
        "ru": "Запрос к определённому whois-серверу",
        "en": "Query a specific whois server"
      },
      {
        "flag": "--no-recursion",
        "uz": "Boshqa serverlarga o'tishni to'xtatadi",
        "ru": "Не переходить на другие серверы",
        "en": "Do not follow referrals to other servers"
      }
    ],
    "examples": [
      {
        "cmd": "whois example.com",
        "uz": "Domen egasi va sana ma'lumotlari",
        "ru": "Информация о владельце и датах домена",
        "en": "Domain owner and date information"
      }
    ]
  },
  {
    "id": "dig",
    "name": "dig",
    "syntax": "dig [OPTION] DOMAIN [TYPE]",
    "category": "kali",
    "tags": [
      "dns",
      "domain",
      "домен",
      "kali"
    ],
    "desc": {
      "uz": "DNS so'rovlarini batafsil ko'rsatadi — domen va DNS yozuvlarini tekshirish uchun.",
      "ru": "Подробно показывает DNS-запросы — для проверки домена и записей DNS.",
      "en": "Shows detailed DNS queries — for checking a domain and its DNS records."
    },
    "options": [
      {
        "flag": "ANY",
        "uz": "Barcha yozuvlar",
        "ru": "Все записи",
        "en": "All records"
      },
      {
        "flag": "MX",
        "uz": "Pochta serverlari",
        "ru": "Почтовые серверы",
        "en": "Mail servers"
      },
      {
        "flag": "+short",
        "uz": "Faqat qisqa natija",
        "ru": "Только краткий результат",
        "en": "Short result only"
      },
      {
        "flag": "@8.8.8.8",
        "uz": "Muayyan DNS serverga so'rov",
        "ru": "Запрос к конкретному DNS-серверу",
        "en": "Query a specific DNS server"
      }
    ],
    "examples": [
      {
        "cmd": "dig example.com MX +short",
        "uz": "Domenning pochta serverlarini bilish",
        "ru": "Узнать почтовые серверы домена",
        "en": "Find a domain's mail servers"
      },
      {
        "cmd": "dig @1.1.1.1 example.com",
        "uz": "Cloudflare DNS orqali tekshirish",
        "ru": "Проверить через DNS Cloudflare",
        "en": "Query through Cloudflare DNS"
      }
    ]
  },
  {
    "id": "findmnt",
    "name": "findmnt",
    "syntax": "findmnt [options] [target]",
    "category": "disk",
    "tags": [
      "mount",
      "montaj",
      "монтирование",
      "filesystem"
    ],
    "desc": {
      "uz": "O'rnatilgan fayl tizimlari va ularning o'rnatish nuqtalarini ko'rsatadi.",
      "ru": "Показывает смонтированные файловые системы и точки монтирования.",
      "en": "Shows mounted filesystems and their mount points."
    },
    "options": [
      {
        "flag": "-t",
        "uz": "Fayl tizimi turiga qarab filtrlaydi",
        "ru": "Фильтр по типу файловой системы",
        "en": "Filter by filesystem type"
      },
      {
        "flag": "-o",
        "uz": "Chiqarish ustunlarini tanlaydi",
        "ru": "Выбрать столбцы вывода",
        "en": "Select output columns"
      },
      {
        "flag": "-R",
        "uz": "Ko'rsatilgan papka uchun o'rnatish daraxtini ko'rsatadi",
        "ru": "Показать дерево монтирования для каталога",
        "en": "Show the mount tree for a directory"
      }
    ],
    "examples": [
      {
        "cmd": "findmnt -t ext4",
        "uz": "Faqat ext4 bo'limlarini ko'rsatish",
        "ru": "Показать только разделы ext4",
        "en": "List only ext4 partitions"
      },
      {
        "cmd": "findmnt -o TARGET,SOURCE,FSTYPE",
        "uz": "Nuqta, manba va tur ustunlari",
        "ru": "Столбцы точки, источника и типа",
        "en": "Show target, source and type columns"
      }
    ]
  },
  {
    "id": "fdisk",
    "name": "fdisk",
    "syntax": "fdisk [options] [disk]",
    "category": "disk",
    "tags": [
      "partition",
      "bo'lim",
      "раздел",
      "disk"
    ],
    "desc": {
      "uz": "Disk bo'limlarining jadvalini ko'rish va tahrirlash dasturi.",
      "ru": "Утилита для просмотра и редактирования таблицы разделов диска.",
      "en": "Utility for viewing and editing a disk's partition table."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Barcha disk bo'limlarini ro'yxatlaydi",
        "ru": "Вывести список разделов всех дисков",
        "en": "List partitions on all disks"
      },
      {
        "flag": "-n",
        "uz": "Sarlavhalarsiz chiqaradi",
        "ru": "Вывод без заголовков",
        "en": "Suppress headers in output"
      },
      {
        "flag": "-L",
        "uz": "MBR/GPT yorliqlari bilan ishlaydi",
        "ru": "Работа с метками MBR/GPT",
        "en": "Work with MBR/GPT labels"
      }
    ],
    "examples": [
      {
        "cmd": "fdisk -l",
        "uz": "Barcha disklar va bo'limlar ro'yxati",
        "ru": "Список всех дисков и разделов",
        "en": "List all disks and partitions"
      },
      {
        "cmd": "fdisk -l /dev/sda",
        "uz": "Bitta diskning bo'lim jadvali",
        "ru": "Таблица разделов одного диска",
        "en": "Partition table of a single disk"
      }
    ]
  },
  {
    "id": "mount",
    "name": "mount",
    "syntax": "mount [-t type] [-o options] device directory",
    "category": "disk",
    "tags": [
      "mount",
      "montaj qilish",
      "смонтировать",
      "filesystem"
    ],
    "desc": {
      "uz": "Fayl tizimini papkaga o'rnatadi yoki o'rnatilganlarni ro'yxatlaydi.",
      "ru": "Монтирует файловую систему в каталог или показывает смонтированные.",
      "en": "Attaches a filesystem to a directory or lists mounted ones."
    },
    "options": [
      {
        "flag": "-t",
        "uz": "Fayl tizimi turini ko'rsatadi",
        "ru": "Указать тип файловой системы",
        "en": "Specify the filesystem type"
      },
      {
        "flag": "-o ro",
        "uz": "Faqat o'qish uchun o'rnatadi",
        "ru": "Смонтировать только для чтения",
        "en": "Mount read-only"
      },
      {
        "flag": "-a",
        "uz": "fstab dagi barcha tizimlarni o'rnatadi",
        "ru": "Смонтировать всё из fstab",
        "en": "Mount all filesystems from fstab"
      }
    ],
    "examples": [
      {
        "cmd": "mount",
        "uz": "Hozir o'rnatilgan fayl tizimlari ro'yxati",
        "ru": "Список текущих монтирований",
        "en": "List currently mounted filesystems"
      },
      {
        "cmd": "sudo mount -o ro /dev/sdb1 /mnt/backup",
        "uz": "Disk bo'limini faqat o'qish uchun o'rnatish",
        "ru": "Смонтировать раздел только для чтения",
        "en": "Mount a partition read-only"
      }
    ]
  },
  {
    "id": "umount",
    "name": "umount",
    "syntax": "umount [options] target",
    "category": "disk",
    "tags": [
      "unmount",
      "montajni o'chirish",
      "размонтировать",
      "filesystem"
    ],
    "desc": {
      "uz": "Oldin o'rnatilgan fayl tizimini papkadan ajratadi.",
      "ru": "Отключает ранее смонтированную файловую систему от каталога.",
      "en": "Detaches a previously mounted filesystem from its directory."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Band bo'lsa ham, kechiktirib ajratadi",
        "ru": "Отложенное отключение даже при занятом ресурсе",
        "en": "Lazy unmount even when busy"
      },
      {
        "flag": "-f",
        "uz": "Majburiy ajratish (ehtiyotkorlik bilan)",
        "ru": "Принудительное отключение (осторожно)",
        "en": "Force unmount (use with care)"
      },
      {
        "flag": "-R",
        "uz": "Bog'liq barcha o'rnatishlarni ajratadi",
        "ru": "Отключить все вложенные монтирования",
        "en": "Recursively unmount nested mounts"
      }
    ],
    "examples": [
      {
        "cmd": "sudo umount /mnt/backup",
        "uz": "Backup papkasini ajratish",
        "ru": "Отключить папку backup",
        "en": "Unmount the backup directory"
      },
      {
        "cmd": "umount /dev/sdb1",
        "uz": "Qurilma bo'yicha ajratish",
        "ru": "Отключить по имени устройства",
        "en": "Unmount by device name"
      }
    ]
  },
  {
    "id": "blkid",
    "name": "blkid",
    "syntax": "blkid [options] [device]",
    "category": "disk",
    "tags": [
      "uuid",
      "label",
      "блоки",
      "qurilma"
    ],
    "desc": {
      "uz": "Blok qurilmalarning turi, yorlig'i va UUID identifikatorini ko'rsatadi.",
      "ru": "Показывает тип, метку и UUID блочных устройств.",
      "en": "Displays type, label and UUID of block devices."
    },
    "options": [
      {
        "flag": "-o",
        "uz": "Chiqarish formatini tanlaydi",
        "ru": "Выбрать формат вывода",
        "en": "Choose the output format"
      },
      {
        "flag": "-s",
        "uz": "Faqat ko'rsatilgan atributni chiqaradi",
        "ru": "Вывести только заданный атрибут",
        "en": "Print only the specified attribute"
      },
      {
        "flag": "-p",
        "uz": "Past darajadagi tekshirishni yoqadi",
        "ru": "Включить низкоуровневую проверку",
        "en": "Enable low-level probing"
      }
    ],
    "examples": [
      {
        "cmd": "blkid",
        "uz": "Barcha blok qurilmalar haqida ma'lumot",
        "ru": "Данные обо всех блочных устройствах",
        "en": "Information about all block devices"
      },
      {
        "cmd": "blkid -s UUID /dev/sda1",
        "uz": "Bitta bo'limning UUID raqami",
        "ru": "UUID одного раздела",
        "en": "UUID of a single partition"
      }
    ]
  },
  {
    "id": "stat",
    "name": "stat",
    "syntax": "stat [options] file",
    "category": "files",
    "tags": [
      "metadata",
      "fayl ma'lumoti",
      "метаданные",
      "inode"
    ],
    "desc": {
      "uz": "Fayl yoki papkaning batafsil metama'lumotlarini ko'rsatadi.",
      "ru": "Показывает подробные метаданные файла или каталога.",
      "en": "Shows detailed metadata about a file or directory."
    },
    "options": [
      {
        "flag": "-c",
        "uz": "Faqat tanlangan maydonlarni chiqaradi",
        "ru": "Вывести только выбранные поля",
        "en": "Print only selected fields"
      },
      {
        "flag": "-f",
        "uz": "Fayl emas, joylashgan fayl tizimi haqida ma'lumot",
        "ru": "Данные о файловой системе, а не о файле",
        "en": "Show filesystem data instead of file data"
      },
      {
        "flag": "-L",
        "uz": "Havolani emas, uning nishonini ko'rsatadi",
        "ru": "Показать цель ссылки, а не саму ссылку",
        "en": "Dereference the symbolic link"
      }
    ],
    "examples": [
      {
        "cmd": "stat /tmp/lab-note.txt",
        "uz": "Faylning hajmi, vaqti va ruxsatlari",
        "ru": "Размер, время и права файла",
        "en": "File size, timestamps and permissions"
      },
      {
        "cmd": "stat -c '%n %s bytes' /etc/hosts",
        "uz": "Faqat nom va hajm",
        "ru": "Только имя и размер",
        "en": "Only name and size"
      }
    ]
  },
  {
    "id": "sha256sum",
    "name": "sha256sum",
    "syntax": "sha256sum [options] [file]...",
    "category": "files",
    "tags": [
      "hash",
      "xesh",
      "хэш",
      "checksum",
      "SHA-256"
    ],
    "desc": {
      "uz": "Faylning SHA-256 xesh qiymatini hisoblaydi va tekshiradi.",
      "ru": "Вычисляет и проверяет значение хэша SHA-256 файла.",
      "en": "Computes and verifies the SHA-256 checksum of a file."
    },
    "options": [
      {
        "flag": "-b",
        "uz": "Binor rejimda hisoblaydi",
        "ru": "Режим чтения в бинарном виде",
        "en": "Read files in binary mode"
      },
      {
        "flag": "-c",
        "uz": "Saqlangan xeshlarni fayldan tekshiradi",
        "ru": "Проверить сохранённые хэши из файла",
        "en": "Check stored hashes from a file"
      },
      {
        "flag": "--tag",
        "uz": "GNU uslubidagi teg bilan chiqaradi",
        "ru": "Вывод в формате тегов GNU",
        "en": "Use GNU-style tagged output"
      }
    ],
    "examples": [
      {
        "cmd": "sha256sum /tmp/lab-report.txt",
        "uz": "Fayl xeshini olish",
        "ru": "Получить хэш файла",
        "en": "Get a file's hash"
      },
      {
        "cmd": "sha256sum -c sums.txt",
        "uz": "Saqlangan xeshlarning to'g'riligini tekshirish",
        "ru": "Проверить сохранённые контрольные суммы",
        "en": "Verify stored checksums"
      }
    ]
  },
  {
    "id": "base64",
    "name": "base64",
    "syntax": "base64 [options] [file]",
    "category": "text",
    "tags": [
      "encode",
      "kodlash",
      "кодирование",
      "decode"
    ],
    "desc": {
      "uz": "Ma'lumotlarni Base64 shakliga kodlaydi yoki undan qaytaradi.",
      "ru": "Кодирует данные в Base64 или декодирует обратно.",
      "en": "Encodes data into Base64 or decodes it back."
    },
    "options": [
      {
        "flag": "-d",
        "uz": "Base64 dan oddiy ko'rinishga qaytaradi",
        "ru": "Декодировать из Base64",
        "en": "Decode from Base64"
      },
      {
        "flag": "-i",
        "uz": "Faqat to'g'ri belgilarni qabul qiladi",
        "ru": "Игнорировать некорректные символы",
        "en": "Ignore non-alphabet characters"
      },
      {
        "flag": "-w",
        "uz": "Satrlar uzunligini belgilaydi",
        "ru": "Задать длину строки",
        "en": "Set line wrapping width"
      }
    ],
    "examples": [
      {
        "cmd": "echo demo | base64",
        "uz": "Matnni Base64 ga kodlash",
        "ru": "Закодировать текст в Base64",
        "en": "Encode text as Base64"
      },
      {
        "cmd": "echo ZGVtbw== | base64 -d",
        "uz": "Base64 satrini dekodlash",
        "ru": "Декодировать строку Base64",
        "en": "Decode a Base64 string"
      }
    ]
  },
  {
    "id": "openssl",
    "name": "openssl",
    "syntax": "openssl command [options]",
    "category": "tools",
    "tags": [
      "crypto",
      "sertifikat",
      "сертификат",
      "tls",
      "shifrlash"
    ],
    "desc": {
      "uz": "Shifrlash, sertifikat va TLS kalitlari bilan ishlaydigan kuchli vosita.",
      "ru": "Мощный инструмент для шифрования, сертификатов и ключей TLS.",
      "en": "Powerful toolkit for encryption, certificates and TLS keys."
    },
    "options": [
      {
        "flag": "req",
        "uz": "X.509 sertifikat so'rovi yaratadi",
        "ru": "Создать запрос сертификата X.509",
        "en": "Create an X.509 certificate request"
      },
      {
        "flag": "rand",
        "uz": "Tasodifiy baytlar hosil qiladi",
        "ru": "Генерировать случайные байты",
        "en": "Generate random bytes"
      },
      {
        "flag": "dgst",
        "uz": "Xesh qiymatini hisoblaydi",
        "ru": "Вычислить дайджест",
        "en": "Compute a message digest"
      }
    ],
    "examples": [
      {
        "cmd": "openssl rand -hex 16",
        "uz": "16 bayt tasodifiy kalit (hex)",
        "ru": "16 случайных байт в hex",
        "en": "16 random bytes in hex"
      },
      {
        "cmd": "openssl dgst -sha256 /tmp/lab-report.txt",
        "uz": "Faylning SHA-256 xeshi",
        "ru": "SHA-256 хэш файла",
        "en": "SHA-256 digest of a file"
      }
    ]
  },
  {
    "id": "cut",
    "name": "cut",
    "syntax": "cut [options] [file]",
    "category": "text",
    "tags": [
      "columns",
      "ustun",
      "столбец",
      "fields"
    ],
    "desc": {
      "uz": "Matn satrlarining ko'rsatilgan maydonlari yoki belgilarini ajratib oladi.",
      "ru": "Извлекает указанные поля или символы из строк текста.",
      "en": "Extracts selected fields or characters from lines of text."
    },
    "options": [
      {
        "flag": "-d",
        "uz": "Maydon ajratgich belgini belgilaydi",
        "ru": "Задать разделитель полей",
        "en": "Set the field delimiter"
      },
      {
        "flag": "-f",
        "uz": "Qaysi maydonlarni olishni ko'rsatadi",
        "ru": "Указать номера полей",
        "en": "Select which fields to extract"
      },
      {
        "flag": "-c",
        "uz": "Belgilar oralig'i bo'yicha kesadi",
        "ru": "Вырезать по диапазону символов",
        "en": "Cut by character range"
      }
    ],
    "examples": [
      {
        "cmd": "cut -d: -f1 /etc/passwd",
        "uz": "Foydalanuvchi nomlari ro'yxati",
        "ru": "Список имён пользователей",
        "en": "List of usernames"
      },
      {
        "cmd": "echo 'a b c' | cut -d' ' -f2",
        "uz": "Ikkinchi so'zni olish",
        "ru": "Получить второе слово",
        "en": "Get the second word"
      }
    ]
  },
  {
    "id": "tr",
    "name": "tr",
    "syntax": "tr [options] set1 [set2]",
    "category": "text",
    "tags": [
      "translate",
      "almashtirish",
      "замена",
      "characters"
    ],
    "desc": {
      "uz": "Kirituvdagi belgilarni boshqalariga almashtiradi yoki o'chiradi.",
      "ru": "Заменяет или удаляет символы во входном потоке.",
      "en": "Translates or deletes characters in the input stream."
    },
    "options": [
      {
        "flag": "-d",
        "uz": "Ko'rsatilgan belgilarni o'chiradi",
        "ru": "Удалить указанные символы",
        "en": "Delete the specified characters"
      },
      {
        "flag": "-s",
        "uz": "Takroriy belgilarni bitta bilan almashtiradi",
        "ru": "Сжать повторяющиеся символы",
        "en": "Squeeze repeated characters"
      },
      {
        "flag": "-c",
        "uz": "Belgilar to'plamini to'ldiradi",
        "ru": "Дополнить множество символов",
        "en": "Complement the character set"
      }
    ],
    "examples": [
      {
        "cmd": "echo salom | tr a-z A-Z",
        "uz": "Kichik harflarni kattasiga almashtirish",
        "ru": "Заменить строчные буквы заглавными",
        "en": "Convert lowercase letters to uppercase"
      },
      {
        "cmd": "tr -s ' ' < /tmp/lab-report.txt",
        "uz": "Ko'p bo'shliqlarni bitta bilan almashtirish",
        "ru": "Сжать пробелы до одного",
        "en": "Squeeze repeated spaces into one"
      }
    ]
  },
  {
    "id": "strings",
    "name": "strings",
    "syntax": "strings [options] file",
    "category": "text",
    "tags": [
      "binary",
      "binar",
      "двоичный",
      "text extraction"
    ],
    "desc": {
      "uz": "Binor fayllardan o'qiladigan matn qatorlarini ajratib chiqaradi.",
      "ru": "Извлекает читаемые текстовые строки из бинарных файлов.",
      "en": "Extracts printable text strings from binary files."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Minimal qator uzunligini belgilaydi",
        "ru": "Задать минимальную длину строки",
        "en": "Set the minimum string length"
      },
      {
        "flag": "-a",
        "uz": "Butun faylni skanerlaydi",
        "ru": "Сканировать весь файл",
        "en": "Scan the whole file"
      },
      {
        "flag": "-t",
        "uz": "Har bir qatorning ofsetini qo'shadi",
        "ru": "Добавить смещение каждой строки",
        "en": "Show the offset of each string"
      }
    ],
    "examples": [
      {
        "cmd": "strings /bin/ls | head -20",
        "uz": "Dasturdagi matn qatorlarining bosh qismi",
        "ru": "Первые текстовые строки программы",
        "en": "First printable strings in a program"
      },
      {
        "cmd": "strings -n 8 /tmp/demo.bin",
        "uz": "Faqat 8 belgidan uzun qatorlar",
        "ru": "Только строки длиннее 8 символов",
        "en": "Strings at least 8 characters long"
      }
    ]
  },
  {
    "id": "nl",
    "name": "nl",
    "syntax": "nl [options] [file]",
    "category": "text",
    "tags": [
      "number lines",
      "qator raqami",
      "нумерация",
      "lines"
    ],
    "desc": {
      "uz": "Matn qatorlarini tartib raqamlari bilan chiqaradi.",
      "ru": "Выводит строки текста с нумерацией.",
      "en": "Numbers lines of text in its output."
    },
    "options": [
      {
        "flag": "-b a",
        "uz": "Barcha qatorlarni raqamlaydi",
        "ru": "Нумеровать все строки",
        "en": "Number all lines"
      },
      {
        "flag": "-n rz",
        "uz": "Raqamlarni o'ngga tekislaydi",
        "ru": "Выровнять номера по правому краю",
        "en": "Right-align the numbers"
      },
      {
        "flag": "-w",
        "uz": "Raqam ustunining kengligini belgilaydi",
        "ru": "Задать ширину колонки номеров",
        "en": "Set the number column width"
      }
    ],
    "examples": [
      {
        "cmd": "nl /etc/hosts",
        "uz": "Fayl qatorlarini raqamlash",
        "ru": "Пронумеровать строки файла",
        "en": "Number the lines of a file"
      },
      {
        "cmd": "nl -ba /tmp/lab-report.txt | head",
        "uz": "Barcha qatorlar, jumladan bo'shlari ham raqamlanadi",
        "ru": "Нумеровать и пустые строки",
        "en": "Number all lines, including empty ones"
      }
    ]
  },
  {
    "id": "paste",
    "name": "paste",
    "syntax": "paste [options] file...",
    "category": "text",
    "tags": [
      "merge lines",
      "birlashtirish",
      "объединение",
      "columns"
    ],
    "desc": {
      "uz": "Bir necha faylning mos qatorlarini yonma-yon birlashtiradi.",
      "ru": "Объединяет соответствующие строки нескольких файлов в一列.",
      "en": "Merges corresponding lines of several files side by side."
    },
    "options": [
      {
        "flag": "-d",
        "uz": "Qatorlar orasidagi ajratgichni belgilaydi",
        "ru": "Задать разделитель между столбцами",
        "en": "Set the separator between columns"
      },
      {
        "flag": "-s",
        "uz": "Fayllarni ketma-ket, satr bo'yicha birlashtiradi",
        "ru": "Объединить файлы последовательно",
        "en": "Merge files serially"
      },
      {
        "flag": "-z",
        "uz": "Satr oxiri o'rniga NUL belgisini ishlatadi",
        "ru": "Использовать NUL вместо перевода строки",
        "en": "Use NUL instead of newline"
      }
    ],
    "examples": [
      {
        "cmd": "paste names.txt ids.txt",
        "uz": "Ikki fayl qatorlarini yonma-yon chiqarish",
        "ru": "Вывести строки двух файлов рядом",
        "en": "Print lines of two files side by side"
      },
      {
        "cmd": "paste -d',' /tmp/a.txt /tmp/b.txt",
        "uz": "Verji bilan ajratilgan ustunlar",
        "ru": "Столбцы, разделённые запятой",
        "en": "Columns separated by a comma"
      }
    ]
  },
  {
    "id": "iconv",
    "name": "iconv",
    "syntax": "iconv -f FROM -t TO [file]",
    "category": "text",
    "tags": [
      "encoding",
      "kodirovka",
      "кодировка",
      "convert"
    ],
    "desc": {
      "uz": "Matnni bir belgilash kodirovkasidan ikkinchisiga o'tkazadi.",
      "ru": "Преобразует текст из одной кодировки в другую.",
      "en": "Converts text from one character encoding to another."
    },
    "options": [
      {
        "flag": "-f",
        "uz": "Manba kodirovkani ko'rsatadi",
        "ru": "Указать исходную кодировку",
        "en": "Specify the source encoding"
      },
      {
        "flag": "-t",
        "uz": "Maqsad kodirovkani ko'rsatadi",
        "ru": "Указать целевую кодировку",
        "en": "Specify the target encoding"
      },
      {
        "flag": "-l",
        "uz": "Qo'llab-quvvatlanadigan kodirovkalar ro'yxati",
        "ru": "Список поддерживаемых кодировок",
        "en": "List supported encodings"
      }
    ],
    "examples": [
      {
        "cmd": "iconv -f WINDOWS-1251 -t UTF-8 old.txt > new.txt",
        "uz": "Eski kodirovkani UTF-8 ga o'tkazish",
        "ru": "Перевести старую кодировку в UTF-8",
        "en": "Convert a legacy encoding to UTF-8"
      },
      {
        "cmd": "iconv -l | head",
        "uz": "Mavjud kodirovkalar ro'yxatining bosh qismi",
        "ru": "Первые строки списка кодировок",
        "en": "First entries of the encoding list"
      }
    ]
  },
  {
    "id": "killall",
    "name": "killall",
    "syntax": "killall [options] name",
    "category": "processes",
    "tags": [
      "kill by name",
      "nom bo'yicha",
      "по имени",
      "signal"
    ],
    "desc": {
      "uz": "Berilgan nomdagi barcha jarayonlarga signal yuboradi.",
      "ru": "Отправляет сигнал всем процессам с заданным именем.",
      "en": "Sends a signal to all processes with the given name."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "Mavjud signallar ro'yxatini chiqaradi",
        "ru": "Вывести список сигналов",
        "en": "List available signals"
      },
      {
        "flag": "-u",
        "uz": "Faqat ko'rsatilgan foydalanuvchi jarayonlari",
        "ru": "Только процессы указанного пользователя",
        "en": "Only processes of a given user"
      },
      {
        "flag": "-i",
        "uz": "Har bir jarayon uchun tasdiq so'raydi",
        "ru": "Запрашивать подтверждение для каждого процесса",
        "en": "Ask confirmation for each process"
      }
    ],
    "examples": [
      {
        "cmd": "killall -l",
        "uz": "Signal nomlari ro'yxati (xavfsiz)",
        "ru": "Список имён сигналов (безопасно)",
        "en": "List signal names (safe)"
      },
      {
        "cmd": "killall -u $USER demoapp",
        "uz": "Faqat o'z demo dasturimni to'xtatish",
        "ru": "Остановить только свою демо-программу",
        "en": "Stop only my own demo program"
      }
    ]
  },
  {
    "id": "jobs",
    "name": "jobs",
    "syntax": "jobs [options]",
    "category": "processes",
    "tags": [
      "background",
      "fon jarayoni",
      "фоновые задачи",
      "shell"
    ],
    "desc": {
      "uz": "Joriy shell dagi fon va to'xtatilgan vazifalarni ro'yxatlaydi.",
      "ru": "Показывает фоновые и приостановленные задачи текущей оболочки.",
      "en": "Lists background and stopped jobs of the current shell."
    },
    "options": [
      {
        "flag": "-l",
        "uz": "PID raqamlarini ham chiqaradi",
        "ru": "Добавить номера PID",
        "en": "Include PID numbers"
      },
      {
        "flag": "-n",
        "uz": "Faqat holati o'zgargan vazifalarni ko'rsatadi",
        "ru": "Только задачи, изменившие состояние",
        "en": "Show only jobs whose status changed"
      },
      {
        "flag": "-p",
        "uz": "Faqat jarayon identifikatorlarini chiqaradi",
        "ru": "Вывести только идентификаторы процессов",
        "en": "Print process IDs only"
      }
    ],
    "examples": [
      {
        "cmd": "sleep 100 & jobs",
        "uz": "Fon vazifasini yaratib, ro'yxatni ko'rish",
        "ru": "Создать фоновую задачу и посмотреть список",
        "en": "Start a background job and list it"
      },
      {
        "cmd": "jobs -l",
        "uz": "Vazifalar va ularning PID lari",
        "ru": "Задачи и их PID",
        "en": "Jobs and their PIDs"
      }
    ]
  },
  {
    "id": "nohup",
    "name": "nohup",
    "syntax": "nohup command [args] [&]",
    "category": "processes",
    "tags": [
      "no hangup",
      "uzilmagan",
      "не завершать",
      "background"
    ],
    "desc": {
      "uz": "Buyruqni terminal yopilganda ham ishlashga qaldirmaydi.",
      "ru": "Позволяет команде продолжать работу после закрытия терминала.",
      "en": "Lets a command keep running after the terminal is closed."
    },
    "options": [
      {
        "flag": "&",
        "uz": "Buyruqni fon rejimida ishga tushuradi",
        "ru": "Запустить команду в фоне",
        "en": "Run the command in the background"
      },
      {
        "flag": ">",
        "uz": "Chiqishni faylga yo'naltiradi",
        "ru": "Перенаправить вывод в файл",
        "en": "Redirect output to a file"
      },
      {
        "flag": "-p",
        "uz": "Ba'zi tizimlarda PID ni chiqaradi",
        "ru": "На некоторых системах выводит PID",
        "en": "Prints the PID on some systems"
      }
    ],
    "examples": [
      {
        "cmd": "nohup ./demo.sh > /tmp/demo.log 2>&1 &",
        "uz": "Skriptni fonda ishga tushurib, log yozish",
        "ru": "Запустить скрипт в фоне с записью лога",
        "en": "Run a script in the background with logging"
      },
      {
        "cmd": "tail -f /tmp/demo.log",
        "uz": "Log faylini kuzatish",
        "ru": "Следить за лог-файлом",
        "en": "Follow the log file"
      }
    ]
  },
  {
    "id": "pgrep",
    "name": "pgrep",
    "syntax": "pgrep [options] pattern",
    "category": "processes",
    "tags": [
      "process id",
      "jarayon id",
      "pid поиск",
      "search"
    ],
    "desc": {
      "uz": "Nom yoki naqor bo'yicha jarayonlarning PID raqamlarini topadi.",
      "ru": "Находит PID процессов по имени или шаблону.",
      "en": "Finds process IDs by name or pattern."
    },
    "options": [
      {
        "flag": "-a",
        "uz": "PID bilan birga to'liq buyruqni chiqaradi",
        "ru": "Показать полную команду вместе с PID",
        "en": "Show the full command along with PID"
      },
      {
        "flag": "-u",
        "uz": "Faqat ko'rsatilgan foydalanuvchi jarayonlari",
        "ru": "Только процессы указанного пользователя",
        "en": "Only processes owned by a user"
      },
      {
        "flag": "-f",
        "uz": "Butun buyruq satrida qidiradi",
        "ru": "Искать по всей строке команды",
        "en": "Match against the full command line"
      }
    ],
    "examples": [
      {
        "cmd": "pgrep -a bash",
        "uz": "Bash jarayonlari va ularning buyruqlari",
        "ru": "Процессы bash и их команды",
        "en": "Bash processes and their commands"
      },
      {
        "cmd": "pgrep -u $USER",
        "uz": "Faqat o'z jarayonlarimning PID lari",
        "ru": "PID только моих процессов",
        "en": "PIDs of my own processes only"
      }
    ]
  },
  {
    "id": "htop",
    "name": "htop",
    "syntax": "htop [options]",
    "category": "processes",
    "tags": [
      "task manager",
      "jarayon monitori",
      "монитор процессов",
      "interactive"
    ],
    "desc": {
      "uz": "Jarayonlar, CPU va xotira iste'moli kuzatiladigan interaktiv vosita.",
      "ru": "Интерактивная утилита для наблюдения за процессами, CPU и памятью.",
      "en": "Interactive viewer for processes, CPU and memory usage."
    },
    "options": [
      {
        "flag": "-u",
        "uz": "Faqat bitta foydalanuvchi jarayonlarini ko'rsatadi",
        "ru": "Показать процесс только одного пользователя",
        "en": "Show only one user's processes"
      },
      {
        "flag": "-p",
        "uz": "Ko'rsatilgan PID larni kuzatadi",
        "ru": "Следить за указанными PID",
        "en": "Monitor the given PIDs"
      },
      {
        "flag": "-d",
        "uz": "Yangilanish chastotasini belgilaydi",
        "ru": "Задать частоту обновления",
        "en": "Set the update delay"
      }
    ],
    "examples": [
      {
        "cmd": "htop",
        "uz": "Interaktiv jarayon monitorini ochish",
        "ru": "Открыть интерактивный монитор",
        "en": "Open the interactive process monitor"
      },
      {
        "cmd": "htop -u $USER",
        "uz": "Faqat o'z jarayonlarimni ko'rish",
        "ru": "Просмотр только своих процессов",
        "en": "View only my own processes"
      }
    ]
  },
  {
    "id": "nice",
    "name": "nice",
    "syntax": "nice [-n priority] command",
    "category": "processes",
    "tags": [
      "priority",
      "ustuvorlik",
      "приоритет",
      "cpu"
    ],
    "desc": {
      "uz": "Buyruqni belgilangan ustuvorlik bilan ishga tushuradi.",
      "ru": "Запускает команду с заданным приоритетом.",
      "en": "Starts a command with a specified scheduling priority."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Ustuvorlik qiymatini (-20..19) belgilaydi",
        "ru": "Задать значение приоритета (-20..19)",
        "en": "Set the priority value (-20..19)"
      },
      {
        "flag": "--help",
        "uz": "Qisqa yordam chiqaradi",
        "ru": "Краткая справка",
        "en": "Show short help"
      },
      {
        "flag": "renice",
        "uz": "Ishlayotgan jarayon ustuvorligini o'zgartiradi",
        "ru": "Изменить приоритет уже работающего процесса",
        "en": "Change the priority of a running process"
      }
    ],
    "examples": [
      {
        "cmd": "nice -n 10 ./demo.sh",
        "uz": "Past ustuvorlik bilan ishga tushurish",
        "ru": "Запустить с низким приоритетом",
        "en": "Run with a lower priority"
      },
      {
        "cmd": "nice -n 19 sha256sum /tmp/bigfile.iso",
        "uz": "Katta faylni xeshlashda boshqa dasturlarga xalaqit bermaslik",
        "ru": "Хэшировать большой файл, не мешая другим",
        "en": "Hash a large file without disturbing other apps"
      }
    ]
  },
  {
    "id": "journalctl",
    "name": "journalctl",
    "syntax": "journalctl [options]",
    "category": "system",
    "tags": [
      "logs",
      "loglar",
      "журнал",
      "systemd"
    ],
    "desc": {
      "uz": "systemd jurnalidagi tizim loglarini ko'rish va filtrlash imkonini beradi.",
      "ru": "Позволяет просматривать и фильтровать системные логи журнала systemd.",
      "en": "Views and filters system logs from the systemd journal."
    },
    "options": [
      {
        "flag": "-u",
        "uz": "Faqat ma'lum xizmat loglarini ko'rsatadi",
        "ru": "Логи только указанной службы",
        "en": "Show logs for a specific service"
      },
      {
        "flag": "-b",
        "uz": "Joriy yuklanishdan boshlab loglarni chiqaradi",
        "ru": "Логи начиная с текущей загрузки",
        "en": "Logs from the current boot"
      },
      {
        "flag": "-n",
        "uz": "Oxirgi N ta qatorni ko'rsatadi",
        "ru": "Показать последние N строк",
        "en": "Show the last N lines"
      }
    ],
    "examples": [
      {
        "cmd": "journalctl -b -n 20",
        "uz": "Oxirgi yuklanishdan 20 ta log qatori",
        "ru": "20 последних строк текущей загрузки",
        "en": "Last 20 lines from the current boot"
      },
      {
        "cmd": "journalctl -u ssh -n 20",
        "uz": "SSH xizmatining so'nggi loglari",
        "ru": "Последние логи службы SSH",
        "en": "Last 20 log lines for the SSH service"
      }
    ]
  },
  {
    "id": "lsb-release",
    "name": "lsb_release",
    "syntax": "lsb_release [options]",
    "category": "system",
    "tags": [
      "distro",
      "distributiv",
      "дистрибутив",
      "version"
    ],
    "desc": {
      "uz": "Linux distributivining nomi va versiyasi haqida ma'lumot chiqaradi.",
      "ru": "Выводит информацию о названии и версии дистрибутива Linux.",
      "en": "Prints information about the Linux distribution name and version."
    },
    "options": [
      {
        "flag": "-a",
        "uz": "Barcha mavjud ma'lumotlarni ko'rsatadi",
        "ru": "Показать всю доступную информацию",
        "en": "Show all available information"
      },
      {
        "flag": "-d",
        "uz": "Distributiv tavsifini chiqaradi",
        "ru": "Вывести описание дистрибутива",
        "en": "Print the distribution description"
      },
      {
        "flag": "-c",
        "uz": "Kod nomini ko'rsatadi",
        "ru": "Показать кодовое имя",
        "en": "Show the codename"
      }
    ],
    "examples": [
      {
        "cmd": "lsb_release -a",
        "uz": "Distributiv haqida to'liq ma'lumot",
        "ru": "Полная информация о дистрибутиве",
        "en": "Full distribution information"
      },
      {
        "cmd": "lsb_release -d",
        "uz": "Faqat nom va versiya",
        "ru": "Только название и версия",
        "en": "Only the description line"
      }
    ]
  },
  {
    "id": "hostnamectl",
    "name": "hostnamectl",
    "syntax": "hostnamectl [command]",
    "category": "system",
    "tags": [
      "hostname",
      "host nomi",
      "имя хоста",
      "system"
    ],
    "desc": {
      "uz": "Tizim host nomi va ba'zi tizim ma'lumotlarini ko'rsatadi yoki o'zgartiradi.",
      "ru": "Показывает или изменяет имя хоста и сведения о системе.",
      "en": "Shows or changes the hostname and related system information."
    },
    "options": [
      {
        "flag": "status",
        "uz": "Joriy host va tizim holatini ko'rsatadi",
        "ru": "Показать текущее состояние хоста",
        "en": "Show current host status"
      },
      {
        "flag": "set-hostname",
        "uz": "Yangi host nomini belgilaydi",
        "ru": "Установить новое имя хоста",
        "en": "Set a new hostname"
      },
      {
        "flag": "--static",
        "uz": "Statik host nomini ko'rsatadi",
        "ru": "Показать статическое имя хоста",
        "en": "Show the static hostname"
      }
    ],
    "examples": [
      {
        "cmd": "hostnamectl status",
        "uz": "Tizim host ma'lumotlari",
        "ru": "Сведения о хосте",
        "en": "Host system information"
      },
      {
        "cmd": "hostnamectl --static",
        "uz": "Statik host nomini ko'rsatish",
        "ru": "Показать статическое имя",
        "en": "Show the static hostname"
      }
    ]
  },
  {
    "id": "timedatectl",
    "name": "timedatectl",
    "syntax": "timedatectl [command]",
    "category": "system",
    "tags": [
      "time",
      "vaqt",
      "время",
      "timezone"
    ],
    "desc": {
      "uz": "Tizim vaqti, sana va vaqt zonasi sozlamalarini ko'rsatadi.",
      "ru": "Показывает настройки системного времени, даты и часового пояса.",
      "en": "Shows system time, date and timezone settings."
    },
    "options": [
      {
        "flag": "status",
        "uz": "Joriy vaqt holatini ko'rsatadi",
        "ru": "Показать текущее состояние времени",
        "en": "Show current time status"
      },
      {
        "flag": "list-timezones",
        "uz": "Mavjud vaqt zonalarini ro'yxatlaydi",
        "ru": "Список доступных часовых поясов",
        "en": "List available timezones"
      },
      {
        "flag": "set-timezone",
        "uz": "Vaqt zonasini o'zgartiradi",
        "ru": "Изменить часовой пояс",
        "en": "Set the timezone"
      }
    ],
    "examples": [
      {
        "cmd": "timedatectl status",
        "uz": "Joriy vaqt va zona holati",
        "ru": "Текущее время и часовой пояс",
        "en": "Current time and timezone status"
      },
      {
        "cmd": "timedatectl list-timezones | grep Tashkent",
        "uz": "Toshkent vaqt zonasini topish",
        "ru": "Найти часовой пояс Ташкента",
        "en": "Find the Tashkent timezone"
      }
    ]
  },
  {
    "id": "lscpu",
    "name": "lscpu",
    "syntax": "lscpu [options]",
    "category": "system",
    "tags": [
      "cpu",
      "protsessor",
      "процессор",
      "hardware"
    ],
    "desc": {
      "uz": "Protsessor arxitekturasi va uning xususiyatlari haqida ma'lumot beradi.",
      "ru": "Выводит сведения об архитектуре процессора и его характеристиках.",
      "en": "Displays information about CPU architecture and its features."
    },
    "options": [
      {
        "flag": "-e",
        "uz": "Kengaytirilgan jadval ko'rinishida chiqaradi",
        "ru": "Расширенный табличный вывод",
        "en": "Extended table output"
      },
      {
        "flag": "-p",
        "uz": "Qayta ishlashga qulay formatda chiqaradi",
        "ru": "Формат, удобный для разбора",
        "en": "Parse-friendly output format"
      },
      {
        "flag": "-J",
        "uz": "JSON formatida chiqaradi",
        "ru": "Вывод в формате JSON",
        "en": "Output in JSON format"
      }
    ],
    "examples": [
      {
        "cmd": "lscpu",
        "uz": "Protsessor haqida umumiy ma'lumot",
        "ru": "Общая информация о процессоре",
        "en": "General CPU information"
      },
      {
        "cmd": "lscpu -e=CPU,CORE,ONLINE",
        "uz": "Yadrolar holatini jadval ko'rinishida ko'rish",
        "ru": "Таблица состояния ядер",
        "en": "Table view of core states"
      }
    ]
  },
  {
    "id": "lsmod",
    "name": "lsmod",
    "syntax": "lsmod",
    "category": "system",
    "tags": [
      "kernel modules",
      "modullar",
      "модули ядра",
      "drivers"
    ],
    "desc": {
      "uz": "Hozirda yadroga yuklangan modullar ro'yxatini ko'rsatadi.",
      "ru": "Показывает список модулей, загруженных в ядро.",
      "en": "Shows the list of modules currently loaded in the kernel."
    },
    "options": [
      {
        "flag": "| grep",
        "uz": "Muayyan modulni qidirish uchun quvur bilan ishlatiladi",
        "ru": "Используется с pipe для поиска модуля",
        "en": "Use with a pipe to search for a module"
      },
      {
        "flag": "modinfo",
        "uz": "Modul haqida batafsil ma'lumot beradi",
        "ru": "Подробная информация о модуле",
        "en": "Detailed information about a module"
      },
      {
        "flag": "modprobe",
        "uz": "Modulni yuklash yoki olib tashlash",
        "ru": "Загрузить или выгрузить модуль",
        "en": "Load or unload a module"
      }
    ],
    "examples": [
      {
        "cmd": "lsmod | head -15",
        "uz": "Yuklangan modullarning birinchi 15 tasi",
        "ru": "Первые 15 загруженных модулей",
        "en": "First 15 loaded modules"
      },
      {
        "cmd": "lsmod | grep snd",
        "uz": "Ovoz bilan bog'liq modullarni topish",
        "ru": "Найти модули, связанные со звуком",
        "en": "Find sound-related modules"
      }
    ]
  },
  {
    "id": "dmesg",
    "name": "dmesg",
    "syntax": "dmesg [options]",
    "category": "system",
    "tags": [
      "kernel log",
      "yadro logi",
      "логи ядра",
      "boot"
    ],
    "desc": {
      "uz": "Yadro xabarlari va qurilmalar haqida tizim loglarini ko'rsatadi.",
      "ru": "Показывает сообщения ядра и системные логи об устройствах.",
      "en": "Displays kernel messages and device-related system logs."
    },
    "options": [
      {
        "flag": "-H",
        "uz": "Inson o'qiy oladigan formatda chiqaradi",
        "ru": "Человекочитаемый формат",
        "en": "Human-readable output"
      },
      {
        "flag": "-l",
        "uz": "Log darajasiga qarab filtrlash",
        "ru": "Фильтр по уровню сообщений",
        "en": "Filter by log level"
      },
      {
        "flag": "-T",
        "uz": "Vaqt tamg'alarini oddiy formatda ko'rsatadi",
        "ru": "Показать метки времени в обычном формате",
        "en": "Show human-readable timestamps"
      }
    ],
    "examples": [
      {
        "cmd": "dmesg -T | tail -20",
        "uz": "Oxirgi 20 ta yadro xabari",
        "ru": "Последние 20 сообщений ядра",
        "en": "Last 20 kernel messages"
      },
      {
        "cmd": "dmesg -l err,warn | tail",
        "uz": "Faqat xato va ogohlantirishlar",
        "ru": "Только ошибки и предупреждения",
        "en": "Only errors and warnings"
      }
    ]
  },
  {
    "id": "traceroute",
    "name": "traceroute",
    "syntax": "traceroute [options] host",
    "category": "network",
    "tags": [
      "route",
      "yo'l",
      "маршрут",
      "hops"
    ],
    "desc": {
      "uz": "Paketning manzilga yetib borish yo'lidagi oraliq tugunlarni ko'rsatadi.",
      "ru": "Показывает промежуточные узлы на пути пакета до адресата.",
      "en": "Shows the intermediate hops a packet takes to reach a host."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Nomlarni yechmay, raqamli manzillarni ko'rsatadi",
        "ru": "Показывать числовые адреса без DNS",
        "en": "Show numeric addresses without DNS lookup"
      },
      {
        "flag": "-m",
        "uz": "Maksimal hop sonini belgilaydi",
        "ru": "Задать максимальное число прыжков",
        "en": "Set the maximum number of hops"
      },
      {
        "flag": "-w",
        "uz": "Javob kutish vaqtini belgilaydi",
        "ru": "Задать время ожидания ответа",
        "en": "Set the wait timeout"
      }
    ],
    "examples": [
      {
        "cmd": "traceroute -n 127.0.0.1",
        "uz": "Lokal manzilga yo'l (xavfsiz sinov)",
        "ru": "Маршрут до локального адреса (безопасный тест)",
        "en": "Route to localhost (safe test)"
      },
      {
        "cmd": "traceroute -m 10 example.com",
        "uz": "Ko'pi bilan 10 hopgacha kuzatish",
        "ru": "Отследить не более 10 прыжков",
        "en": "Trace with at most 10 hops"
      }
    ]
  },
  {
    "id": "nslookup",
    "name": "nslookup",
    "syntax": "nslookup [options] host [server]",
    "category": "network",
    "tags": [
      "dns",
      "dns so'rov",
      "dns запрос",
      "lookup"
    ],
    "desc": {
      "uz": "DNS orqali domen nomi yoki IP manzil haqida ma'lumot so'raydi.",
      "ru": "Запрашивает информацию о домене или IP через DNS.",
      "en": "Queries DNS for information about a domain name or IP address."
    },
    "options": [
      {
        "flag": "-type=",
        "uz": "So'rov turini belgilaydi (A, MX, NS)",
        "ru": "Задать тип запроса (A, MX, NS)",
        "en": "Set the query type (A, MX, NS)"
      },
      {
        "flag": "server",
        "uz": "Muayyan DNS serverdan so'rash",
        "ru": "Запросить у конкретного DNS-сервера",
        "en": "Query a specific DNS server"
      },
      {
        "flag": "-debug",
        "uz": "Batafsil javobni ko'rsatadi",
        "ru": "Показать подробный ответ",
        "en": "Show a detailed response"
      }
    ],
    "examples": [
      {
        "cmd": "nslookup example.com",
        "uz": "Domenning IP manzilini topish",
        "ru": "Узнать IP-адрес домена",
        "en": "Find the IP address of a domain"
      },
      {
        "cmd": "nslookup -type=MX example.com",
        "uz": "Domenning pochta serverlarini ko'rish",
        "ru": "Посмотреть почтовые серверы домена",
        "en": "View the domain's mail servers"
      }
    ]
  },
  {
    "id": "wget",
    "name": "wget",
    "syntax": "wget [options] [url]",
    "category": "network",
    "tags": [
      "download",
      "yuklab olish",
      "скачать",
      "http"
    ],
    "desc": {
      "uz": "HTTP, HTTPS yoki FTP orqali fayllarni yuklab oladi.",
      "ru": "Скачивает файлы по HTTP, HTTPS или FTP.",
      "en": "Downloads files over HTTP, HTTPS or FTP."
    },
    "options": [
      {
        "flag": "-O",
        "uz": "Chiqish fayl nomini belgilaydi",
        "ru": "Задать имя выходного файла",
        "en": "Set the output file name"
      },
      {
        "flag": "-q",
        "uz": "Jim rejimda ishlaydi",
        "ru": "Тихий режим",
        "en": "Run in quiet mode"
      },
      {
        "flag": "-c",
        "uz": "Uzilgan yuklab olishni davom ettiradi",
        "ru": "Продолжить прерванную загрузку",
        "en": "Continue a partial download"
      }
    ],
    "examples": [
      {
        "cmd": "wget -O /tmp/page.html https://example.com",
        "uz": "Sahifani faylga saqlash",
        "ru": "Сохранить страницу в файл",
        "en": "Save a page to a file"
      },
      {
        "cmd": "wget -q https://example.com -O - | head -5",
        "uz": "Sahifaning birinchi 5 qatorini ko'rish",
        "ru": "Показать первые 5 строк страницы",
        "en": "Show the first 5 lines of a page"
      }
    ]
  },
  {
    "id": "route",
    "name": "route",
    "syntax": "route [options]",
    "category": "network",
    "tags": [
      "routing table",
      "marshrut",
      "маршрут",
      "gateway"
    ],
    "desc": {
      "uz": "Tizimning IP marshrutlash jadvalini ko'rsatadi yoki o'zgartiradi.",
      "ru": "Показывает или изменяет таблицу IP-маршрутизации системы.",
      "en": "Displays or modifies the system's IP routing table."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Nomlarni yechmasdan raqamli ko'rsatadi",
        "ru": "Числовой вывод без DNS",
        "en": "Numeric output without DNS resolution"
      },
      {
        "flag": "add",
        "uz": "Yangi marshrut qo'shadi",
        "ru": "Добавить маршрут",
        "en": "Add a new route"
      },
      {
        "flag": "del",
        "uz": "Marshrutni o'chiradi",
        "ru": "Удалить маршрут",
        "en": "Delete a route"
      }
    ],
    "examples": [
      {
        "cmd": "route -n",
        "uz": "Marshrut jadvalini raqamli ko'rinishda ko'rish",
        "ru": "Таблица маршрутов в числовом виде",
        "en": "Show the routing table in numeric form"
      },
      {
        "cmd": "ip route",
        "uz": "Zamonaviy muqobil buyruq",
        "ru": "Современная альтернатива",
        "en": "Modern alternative command"
      }
    ]
  },
  {
    "id": "netstat",
    "name": "netstat",
    "syntax": "netstat [options]",
    "category": "network",
    "tags": [
      "ports",
      "portlar",
      "порты",
      "connections",
      "legacy"
    ],
    "desc": {
      "uz": "Tarmoq ulanishlari, marshrutlar va portlar holatini ko'rsatadi.",
      "ru": "Показывает сетевые соединения, маршруты и состояние портов.",
      "en": "Displays network connections, routing tables and port states."
    },
    "options": [
      {
        "flag": "-tuln",
        "uz": "Tinglayotgan TCP/UDP portlarni raqamli ko'rsatadi",
        "ru": "Прослушиваемые TCP/UDP порты в числовом виде",
        "en": "Listening TCP/UDP ports in numeric form"
      },
      {
        "flag": "-r",
        "uz": "Marshrut jadvalini chiqaradi",
        "ru": "Показать таблицу маршрутизации",
        "en": "Display the routing table"
      },
      {
        "flag": "-p",
        "uz": "Portdan foydalanayotgan jarayonni ko'rsatadi",
        "ru": "Показать процесс, использующий порт",
        "en": "Show the process using the port"
      }
    ],
    "examples": [
      {
        "cmd": "netstat -tuln",
        "uz": "Ochiq portlar ro'yxati",
        "ru": "Список открытых портов",
        "en": "List of open ports"
      },
      {
        "cmd": "netstat -r",
        "uz": "Tarmoq marshrutlari",
        "ru": "Сетевые маршруты",
        "en": "Network routes"
      }
    ]
  },
  {
    "id": "lsof",
    "name": "lsof",
    "syntax": "lsof [options]",
    "category": "processes",
    "tags": [
      "open files",
      "ochiq fayllar",
      "открытые файлы",
      "ports"
    ],
    "desc": {
      "uz": "Jarayonlar tomonidan ochilgan fayllar va soketlarni ro'yxatlaydi.",
      "ru": "Перечисляет файлы и сокеты, открытые процессами.",
      "en": "Lists files and sockets opened by processes."
    },
    "options": [
      {
        "flag": "-i",
        "uz": "Tarmoq ulanishlari va portlarni ko'rsatadi",
        "ru": "Показать сетевые соединения и порты",
        "en": "Show network connections and ports"
      },
      {
        "flag": "-p",
        "uz": "Muayyan PID ga tegishli fayllarni ko'rsatadi",
        "ru": "Файлы, открытые указанным PID",
        "en": "Files opened by a specific PID"
      },
      {
        "flag": "-n",
        "uz": "Host nomlarini yechmasdan tezroq chiqaradi",
        "ru": "Быстрее, без разрешения имён хостов",
        "en": "Faster output without resolving hostnames"
      }
    ],
    "examples": [
      {
        "cmd": "lsof -i :22",
        "uz": "22-portni kim ishlatayotganini ko'rish",
        "ru": "Кто использует порт 22",
        "en": "See who is using port 22"
      },
      {
        "cmd": "lsof -u $USER | head -10",
        "uz": "Foydalanuvchi ochgan fayllarning boshlanishi",
        "ru": "Первые файлы, открытые пользователем",
        "en": "First files opened by the user"
      }
    ]
  },
  {
    "id": "diff",
    "name": "diff",
    "syntax": "diff [options] file1 file2",
    "category": "text",
    "tags": [
      "compare",
      "taqqoslash",
      "сравнение",
      "changes"
    ],
    "desc": {
      "uz": "Ikki fayl yoki papka tarkibini qatorma-qator taqqoslaydi.",
      "ru": "Построчно сравнивает содержимое двух файлов или каталогов.",
      "en": "Compares two files or directories line by line."
    },
    "options": [
      {
        "flag": "-u",
        "uz": "Unified formatda farqlarni ko'rsatadi",
        "ru": "Показать различия в unified-формате",
        "en": "Show differences in unified format"
      },
      {
        "flag": "-r",
        "uz": "Papkalarni rekursiv taqqoslaydi",
        "ru": "Рекурсивное сравнение каталогов",
        "en": "Compare directories recursively"
      },
      {
        "flag": "-q",
        "uz": "Faqat farq bor-yo'qligini xabar qiladi",
        "ru": "Сообщить только о наличии различий",
        "en": "Report only whether files differ"
      }
    ],
    "examples": [
      {
        "cmd": "diff -u old.txt new.txt",
        "uz": "Ikki fayl farqlarini ko'rish",
        "ru": "Посмотреть различия двух файлов",
        "en": "View differences between two files"
      },
      {
        "cmd": "diff -q /tmp/a.txt /tmp/b.txt",
        "uz": "Fayllar farq qiladimi, tekshirish",
        "ru": "Проверить, отличаются ли файлы",
        "en": "Check whether files differ"
      }
    ]
  },
  {
    "id": "hostname",
    "name": "hostname",
    "syntax": "hostname [options]",
    "category": "system",
    "tags": [
      "host name",
      "host nomi",
      "имя хоста",
      "machine"
    ],
    "desc": {
      "uz": "Joriy tizimning host nomini ko'rsatadi yoki vaqtincha o'zgartiradi.",
      "ru": "Показывает или временно изменяет имя хоста текущей системы.",
      "en": "Shows or temporarily changes the current system's hostname."
    },
    "options": [
      {
        "flag": "-I",
        "uz": "Tizimning IP manzillarini ko'rsatadi",
        "ru": "Показать IP-адреса системы",
        "en": "Show the system's IP addresses"
      },
      {
        "flag": "-f",
        "uz": "To'liq domen nomini (FQDN) chiqaradi",
        "ru": "Вывести полное доменное имя (FQDN)",
        "en": "Print the fully qualified domain name"
      },
      {
        "flag": "-s",
        "uz": "Qisqa host nomini chiqaradi",
        "ru": "Вывести короткое имя хоста",
        "en": "Print the short hostname"
      }
    ],
    "examples": [
      {
        "cmd": "hostname",
        "uz": "Joriy host nomini",
        "ru": "Текущее имя хоста",
        "en": "Current hostname"
      },
      {
        "cmd": "hostname -I",
        "uz": "Tizim IP manzillari",
        "ru": "IP-адреса системы",
        "en": "System IP addresses"
      }
    ]
  },
  {
    "id": "realpath",
    "name": "realpath",
    "syntax": "realpath [options] file",
    "category": "files",
    "tags": [
      "absolute path",
      "to'liq yo'l",
      "абсолютный путь",
      "resolve"
    ],
    "desc": {
      "uz": "Fayl yoki papkaning to'liq absolyut yo'lini ko'rsatadi.",
      "ru": "Показывает полный абсолютный путь к файлу или каталогу.",
      "en": "Prints the absolute path of a file or directory."
    },
    "options": [
      {
        "flag": "-e",
        "uz": "Fayl mavjud bo'lishini talab qiladi",
        "ru": "Требовать существование файла",
        "en": "Require the path to exist"
      },
      {
        "flag": "-m",
        "uz": "Mavjud bo'lmagan yo'llarni ham yechadi",
        "ru": "Разрешать несуществующие пути",
        "en": "Resolve non-existent paths too"
      },
      {
        "flag": "--relative-to",
        "uz": "Boshqa yo'lga nisbatan chiqaradi",
        "ru": "Вывести относительно другого пути",
        "en": "Print path relative to another"
      }
    ],
    "examples": [
      {
        "cmd": "realpath ../docs/readme.md",
        "uz": "Nisbiy yo'lni absolyutga aylantirish",
        "ru": "Преобразовать относительный путь в абсолютный",
        "en": "Convert a relative path to absolute"
      },
      {
        "cmd": "realpath --relative-to=/tmp /tmp/lab/a.txt",
        "uz": "/tmp ga nisbatan yo'l",
        "ru": "Путь относительно /tmp",
        "en": "Path relative to /tmp"
      }
    ]
  },
  {
    "id": "locate",
    "name": "locate",
    "syntax": "locate [options] pattern",
    "category": "tools",
    "tags": [
      "search",
      "qidirish",
      "поиск",
      "database"
    ],
    "desc": {
      "uz": "Oldindan indekslangan bazadan fayl nomlarini tez qidiradi.",
      "ru": "Быстро ищет имена файлов в заранее индексированной базе.",
      "en": "Quickly finds file names in a prebuilt index database."
    },
    "options": [
      {
        "flag": "-i",
        "uz": "Katta-kichik harfni farqlamaydi",
        "ru": "Игнорировать регистр",
        "en": "Case-insensitive search"
      },
      {
        "flag": "-c",
        "uz": "Faqat mos kelganlar sonini chiqaradi",
        "ru": "Вывести только количество совпадений",
        "en": "Print only the count of matches"
      },
      {
        "flag": "-l",
        "uz": "Natijalar sonini cheklaydi",
        "ru": "Ограничить число результатов",
        "en": "Limit the number of results"
      }
    ],
    "examples": [
      {
        "cmd": "locate -i hosts",
        "uz": "Nomida hosts bo'lgan fayllarni topish",
        "ru": "Найти файлы с hosts в имени",
        "en": "Find files with hosts in the name"
      },
      {
        "cmd": "locate -c '*.conf'",
        "uz": "Nechta conf fayl borligini sanash",
        "ru": "Посчитать количество conf-файлов",
        "en": "Count how many conf files exist"
      }
    ]
  },
  {
    "id": "watch",
    "name": "watch",
    "syntax": "watch [options] command",
    "category": "tools",
    "tags": [
      "repeat",
      "takrorlash",
      "повторять",
      "monitor"
    ],
    "desc": {
      "uz": "Buyruqni ma'lum vaqt oralig'ida takrorlab, natijani ko'rsatadi.",
      "ru": "Периодически выполняет команду и показывает результат.",
      "en": "Runs a command repeatedly at intervals and shows its output."
    },
    "options": [
      {
        "flag": "-n",
        "uz": "Yangilanish oralig'ini soniyalarda belgilaydi",
        "ru": "Задать интервал обновления в секундах",
        "en": "Set the refresh interval in seconds"
      },
      {
        "flag": "-d",
        "uz": "O'zgarishlarni ajratib ko'rsatadi",
        "ru": "Подсвечивать изменения",
        "en": "Highlight differences"
      },
      {
        "flag": "-t",
        "uz": "Sarlavhani yashiradi",
        "ru": "Скрыть заголовок",
        "en": "Hide the header"
      }
    ],
    "examples": [
      {
        "cmd": "watch -n 2 df -h /tmp",
        "uz": "Har 2 soniyada disk holatini ko'rsatish",
        "ru": "Показывать состояние диска каждые 2 секунды",
        "en": "Show disk status every 2 seconds"
      },
      {
        "cmd": "watch -d ls -l /tmp",
        "uz": "/tmp dagi o'zgarishlarni kuzatish",
        "ru": "Следить за изменениями в /tmp",
        "en": "Watch for changes in /tmp"
      }
    ]
  },
  {
    "id": "cal",
    "name": "cal",
    "syntax": "cal [options] [[month] year]",
    "category": "tools",
    "tags": [
      "calendar",
      "kalendar",
      "календарь",
      "date"
    ],
    "desc": {
      "uz": "Terminalda kalendarni ko'rsatadi.",
      "ru": "Показывает календарь в терминале.",
      "en": "Displays a calendar in the terminal."
    },
    "options": [
      {
        "flag": "-3",
        "uz": "Oldingi, joriy va keyingi oyni ko'rsatadi",
        "ru": "Показать предыдущий, текущий и следующий месяц",
        "en": "Show previous, current and next month"
      },
      {
        "flag": "-y",
        "uz": "Butun yil kalendarini chiqaradi",
        "ru": "Показать календарь на весь год",
        "en": "Show the whole year calendar"
      },
      {
        "flag": "-m",
        "uz": "Oy raqami bo'yicha ko'rsatadi",
        "ru": "Показать указанный месяц",
        "en": "Display a specific month"
      }
    ],
    "examples": [
      {
        "cmd": "cal",
        "uz": "Joriy oy kalendari",
        "ru": "Календарь текущего месяца",
        "en": "Current month calendar"
      },
      {
        "cmd": "cal -3",
        "uz": "Uch oylik kalendar",
        "ru": "Календарь на три месяца",
        "en": "Three-month calendar"
      }
    ]
  },
  {
    "id": "seq",
    "name": "seq",
    "syntax": "seq [options] [first] [increment] last",
    "category": "tools",
    "tags": [
      "sequence",
      "ketma-ketlik",
      "последовательность",
      "numbers"
    ],
    "desc": {
      "uz": "Ketma-ket sonlar qatorini hosil qiladi.",
      "ru": "Генерирует последовательность чисел.",
      "en": "Generates a sequence of numbers."
    },
    "options": [
      {
        "flag": "-s",
        "uz": "Ajratgich belgini belgilaydi",
        "ru": "Задать разделитель",
        "en": "Set the separator string"
      },
      {
        "flag": "-w",
        "uz": "Raqamlarni bir xil kenglikda chiqaradi",
        "ru": "Выровнять числа по ширине",
        "en": "Equalize width with leading zeros"
      },
      {
        "flag": "-f",
        "uz": "Format satrini ishlatadi",
        "ru": "Использовать строку формата",
        "en": "Use a format string"
      }
    ],
    "examples": [
      {
        "cmd": "seq 1 5",
        "uz": "1 dan 5 gacha sonlar",
        "ru": "Числа от 1 до 5",
        "en": "Numbers from 1 to 5"
      },
      {
        "cmd": "seq -s, 1 3 10",
        "uz": "1 dan 10 gacha, 3 qadam bilan, vergul bilan",
        "ru": "От 1 до 10 с шагом 3 через запятую",
        "en": "1 to 10 by 3, comma-separated"
      }
    ]
  }
];
