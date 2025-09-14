const IGNORED_EXTENSIONS = [
  // --- Imagens ---
  ".jpg", // Formato de imagem comum para fotografias
  ".jpeg", // Variação da extensão .jpg
  ".png", // Formato de imagem com suporte a transparência
  ".gif", // Formato de imagem para animações simples
  ".bmp", // Formato de imagem bitmap do Windows
  ".tiff", // Formato de imagem de alta qualidade, comum em impressão
  ".ico", // Arquivo de ícone, usado para favicons e ícones de aplicativos
  ".svg", // Imagem de vetor escalável (embora seja XML, é tratado como mídia)
  ".webp", // Formato de imagem moderno do Google para web
  ".psd", // Arquivo de projeto do Adobe Photoshop
  ".ai", // Arquivo de projeto do Adobe Illustrator
  ".eps", // Encapsulated PostScript, formato de imagem vetorial
  ".heic", // Formato de imagem de alta eficiência, usado em dispositivos Apple
  ".raw", // Formato de imagem "crua", sem processamento, de câmeras digitais

  // --- Vídeos ---
  ".mp4", // Formato de vídeo digital comum
  ".avi", // Formato de contêiner de áudio/vídeo da Microsoft
  ".mov", // Formato de vídeo QuickTime da Apple
  ".wmv", // Windows Media Video
  ".flv", // Flash Video (legado)
  ".webm", // Formato de vídeo para web, patrocinado pelo Google
  ".mkv", // Matroska, formato de contêiner de vídeo flexível
  ".mpg", // Formato de vídeo do grupo MPEG
  ".mpeg", // Variação da extensão .mpg

  // --- Áudios ---
  ".mp3", // Formato de áudio comprimido popular
  ".wav", // Formato de áudio não comprimido
  ".flac", // Formato de áudio comprimido sem perdas (Lossless)
  ".aac", // Formato de codificação de áudio avançado
  ".ogg", // Formato de contêiner de áudio livre e aberto
  ".m4a", // Formato de áudio usado pela Apple (iTunes)
  ".wma", // Windows Media Audio

  // --- Documentos e E-books ---
  ".pdf", // Portable Document Format da Adobe
  ".doc", // Documento do Microsoft Word (legado)
  ".docx", // Documento do Microsoft Word (baseado em XML)
  ".xls", // Planilha do Microsoft Excel (legado)
  ".xlsx", // Planilha do Microsoft Excel (baseado em XML)
  ".ppt", // Apresentação do Microsoft PowerPoint (legado)
  ".pptx", // Apresentação do Microsoft PowerPoint (baseado em XML)
  ".odt", // Documento de texto do OpenOffice/LibreOffice
  ".ods", // Planilha do OpenOffice/LibreOffice
  ".odp", // Apresentação do OpenOffice/LibreOffice
  ".epub", // Formato padrão para e-books
  ".mobi", // Formato de e-book do Kindle

  // --- Arquivos Compactados ---
  ".zip", // Formato de compressão popular
  ".rar", // Formato de compressão Roshal Archive
  ".7z", // Formato de compressão 7-Zip
  ".tar", // Arquivo de pacote (não comprime, apenas agrupa)
  ".gz", // Arquivo comprimido com gzip
  ".bz2", // Arquivo comprimido com bzip2
  ".iso", // Imagem de disco óptico (CD/DVD)
  ".dmg", // Imagem de disco do macOS

  // --- Fontes ---
  ".ttf", // TrueType Font
  ".otf", // OpenType Font
  ".woff", // Web Open Font Format
  ".woff2", // Web Open Font Format 2.0
  ".eot", // Embedded OpenType Font
  ".flf", // FIGlet Font File

  // --- Executáveis e Bibliotecas ---
  ".exe", // Arquivo executável do Windows
  ".dll", // Biblioteca de vínculo dinâmico do Windows
  ".so", // Objeto compartilhado (biblioteca) em sistemas Linux/Unix
  ".dylib", // Biblioteca de vínculo dinâmico no macOS
  ".app", // Pacote de aplicação do macOS
  ".msi", // Instalador do Windows
  ".jar", // Java Archive (pode ser executável)
  ".pyc", // Código Python compilado (bytecode)
  ".class", // Arquivo de bytecode Java compilado

  // --- Bancos de Dados e Dados Binários ---
  ".bin", // Arquivo binário genérico
  ".dat", // Arquivo de dados genérico
  ".db", // Arquivo de banco de dados genérico
  ".sqlite", // Arquivo de banco de dados SQLite
  ".sqlite3", // Variação da extensão SQLite
  ".mdb", // Banco de dados do Microsoft Access (legado)
  ".accdb", // Banco de dados do Microsoft Access
  ".dbf", // Arquivo de banco de dados (dBase)
  ".bak", // Arquivo de backup, geralmente binário

  // --- Modelos 3D e Design ---
  ".obj", // Formato de arquivo de geometria 3D
  ".fbx", // Formato de arquivo 3D da Autodesk
  ".blend", // Arquivo de projeto do Blender
  ".stl", // Formato para impressão 3D (estereolitografia)
  ".dae", // Formato de intercâmbio de modelos 3D (Collada)
  ".skp", // Arquivo de projeto do SketchUp

  // --- Outros ---
  ".swf", // Shockwave Flash (legado)
  ".lockb", // Arquivo de lock binário (ex: do Terraform)
  ".wasm", // WebAssembly, formato binário para a web
];

export default IGNORED_EXTENSIONS;
