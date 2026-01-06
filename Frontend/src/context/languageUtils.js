import React, { createContext, useContext } from 'react';

// Language context
export const LanguageContext = createContext();

// Translations object
export const translations = {
  en: {
    // Home page
    taskManager: 'Task Manager',
    welcome: 'Welcome to',
    organize: 'Organize your tasks in an ordered way',
    getStarted: 'Get Started',
    pleaseLogin: 'Please log in to get started.',
    
    // Navigation
    logout: 'Logout',
    settings: 'Settings',
    profile: 'Profile',
    
    // Login page
    loginTitle: 'Login',
    email: 'Email',
    password: 'Password',
    loginButton: 'Login',
    noAccount: "Don't have an account?",
    registerHere: 'Register here',
    loginSuccess: 'Login successful!',
    loginError: 'Login failed. Please check your credentials.',
    
    // Register page
    registerTitle: 'Register',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    registerButton: 'Register',
    haveAccount: 'Already have an account?',
    loginHere: 'Login here',
    registerSuccess: 'Registration successful!',
    registerError: 'Registration failed. Please try again.',
    
    // List page
    tasks: 'Tasks',
    addTask: 'Add Task',
    noTasks: 'No tasks found',
    deleteTask: 'Delete Task',
    editTask: 'Edit Task',
    done: 'Done',
    pending: 'Pending',
    
    // Task Modal
    taskName: 'Task Name',
    addNewTask: 'Add New Task',
    updateTask: 'Update Task',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    
    // Data page (Transactions)
    transactions: 'Transactions',
    addTransaction: 'Add Transaction',
    description: 'Description',
    amount: 'Amount',
    date: 'Date',
    time: 'Time',
    credit: 'Credit',
    debit: 'Debit',
    type: 'Type',
    noTransactions: 'No transactions found',
    editTransaction: 'Edit Transaction',
    deleteTransaction: 'Delete Transaction',
    
    // Graph page
    graph: 'Graph',
    viewGraph: 'View Graph',
    transactionGraph: 'Transaction Graph',
    creditVsDebit: 'Credit vs Debit',
    
    // PDF
    downloadPDF: 'Download PDF',
    
    // Error messages
    errorFetching: 'Error fetching data',
    errorUpdating: 'Error updating',
    errorDeleting: 'Error deleting',
    confirmDelete: 'Are you sure you want to delete this?',
    success: 'Success!',
    error: 'Error!',
    
    // Language selector
    language: 'Language',
    selectLanguage: 'Select Language',
    english: 'English',
    spanish: 'Español',
    french: 'Français',
    german: 'Deutsch',
    arabic: 'العربية',
    hindi: 'हिन्दी',
  },
  es: {
    // Home page
    taskManager: 'Gestor de Tareas',
    welcome: 'Bienvenido a',
    organize: 'Organiza tus tareas de manera ordenada',
    getStarted: 'Comenzar',
    pleaseLogin: 'Por favor, inicia sesión para comenzar.',
    
    // Navigation
    logout: 'Cerrar sesión',
    settings: 'Configuración',
    profile: 'Perfil',
    
    // Login page
    loginTitle: 'Iniciar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    loginButton: 'Iniciar Sesión',
    noAccount: '¿No tienes una cuenta?',
    registerHere: 'Regístrate aquí',
    loginSuccess: '¡Inicio de sesión exitoso!',
    loginError: 'Inicio de sesión fallido. Verifica tus credenciales.',
    
    // Register page
    registerTitle: 'Registrarse',
    fullName: 'Nombre Completo',
    confirmPassword: 'Confirmar Contraseña',
    registerButton: 'Registrarse',
    haveAccount: '¿Ya tienes una cuenta?',
    loginHere: 'Inicia sesión aquí',
    registerSuccess: '¡Registro exitoso!',
    registerError: 'El registro falló. Inténtalo de nuevo.',
    
    // List page
    tasks: 'Tareas',
    addTask: 'Agregar Tarea',
    noTasks: 'No se encontraron tareas',
    deleteTask: 'Eliminar Tarea',
    editTask: 'Editar Tarea',
    done: 'Hecho',
    pending: 'Pendiente',
    
    // Task Modal
    taskName: 'Nombre de la Tarea',
    addNewTask: 'Agregar Nueva Tarea',
    updateTask: 'Actualizar Tarea',
    close: 'Cerrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    
    // Data page (Transactions)
    transactions: 'Transacciones',
    addTransaction: 'Agregar Transacción',
    description: 'Descripción',
    amount: 'Cantidad',
    date: 'Fecha',
    time: 'Hora',
    credit: 'Crédito',
    debit: 'Débito',
    type: 'Tipo',
    noTransactions: 'No se encontraron transacciones',
    editTransaction: 'Editar Transacción',
    deleteTransaction: 'Eliminar Transacción',
    
    // Graph page
    graph: 'Gráfico',
    viewGraph: 'Ver Gráfico',
    transactionGraph: 'Gráfico de Transacciones',
    creditVsDebit: 'Crédito vs Débito',
    
    // PDF
    downloadPDF: 'Descargar PDF',
    
    // Error messages
    errorFetching: 'Error al obtener datos',
    errorUpdating: 'Error al actualizar',
    errorDeleting: 'Error al eliminar',
    confirmDelete: '¿Estás seguro de que deseas eliminar esto?',
    success: '¡Éxito!',
    error: '¡Error!',
    
    // Language selector
    language: 'Idioma',
    selectLanguage: 'Seleccionar Idioma',
    english: 'English',
    spanish: 'Español',
    french: 'Français',
    german: 'Deutsch',
    arabic: 'العربية',
    hindi: 'हिन्दी',
  },
  fr: {
    // Home page
    taskManager: 'Gestionnaire de Tâches',
    welcome: 'Bienvenue sur',
    organize: 'Organisez vos tâches de manière ordonnée',
    getStarted: 'Commencer',
    pleaseLogin: 'Veuillez vous connecter pour commencer.',
    
    // Navigation
    logout: 'Déconnexion',
    settings: 'Paramètres',
    profile: 'Profil',
    
    // Login page
    loginTitle: 'Connexion',
    email: 'Email',
    password: 'Mot de passe',
    loginButton: 'Se Connecter',
    noAccount: "Pas encore de compte?",
    registerHere: 'Inscrivez-vous ici',
    loginSuccess: 'Connexion réussie!',
    loginError: 'Connexion échouée. Vérifiez vos identifiants.',
    
    // Register page
    registerTitle: 'Inscription',
    fullName: 'Nom Complet',
    confirmPassword: 'Confirmer le Mot de Passe',
    registerButton: "S'inscrire",
    haveAccount: 'Déjà inscrit?',
    loginHere: 'Connectez-vous ici',
    registerSuccess: 'Inscription réussie!',
    registerError: "L'inscription a échoué. Réessayez.",
    
    // List page
    tasks: 'Tâches',
    addTask: 'Ajouter une Tâche',
    noTasks: 'Aucune tâche trouvée',
    deleteTask: 'Supprimer la Tâche',
    editTask: 'Modifier la Tâche',
    done: 'Terminé',
    pending: 'En attente',
    
    // Task Modal
    taskName: 'Nom de la Tâche',
    addNewTask: 'Ajouter une Nouvelle Tâche',
    updateTask: 'Mettre à Jour la Tâche',
    close: 'Fermer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    
    // Data page (Transactions)
    transactions: 'Transactions',
    addTransaction: 'Ajouter une Transaction',
    description: 'Description',
    amount: 'Montant',
    date: 'Date',
    time: 'Heure',
    credit: 'Crédit',
    debit: 'Débit',
    type: 'Type',
    noTransactions: 'Aucune transaction trouvée',
    editTransaction: 'Modifier la Transaction',
    deleteTransaction: 'Supprimer la Transaction',
    
    // Graph page
    graph: 'Graphique',
    viewGraph: 'Voir le Graphique',
    transactionGraph: 'Graphique des Transactions',
    creditVsDebit: 'Crédit vs Débit',
    
    // PDF
    downloadPDF: 'Télécharger PDF',
    
    // Error messages
    errorFetching: 'Erreur lors de la récupération des données',
    errorUpdating: 'Erreur lors de la mise à jour',
    errorDeleting: 'Erreur lors de la suppression',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ceci?',
    success: 'Succès!',
    error: 'Erreur!',
    
    // Language selector
    language: 'Langue',
    selectLanguage: 'Sélectionner la Langue',
    english: 'English',
    spanish: 'Español',
    french: 'Français',
    german: 'Deutsch',
    arabic: 'العربية',
    hindi: 'हिन्दी',
  },
  de: {
    // Home page
    taskManager: 'Task Manager',
    welcome: 'Willkommen bei',
    organize: 'Organisiere deine Aufgaben auf strukturierte Weise',
    getStarted: 'Erste Schritte',
    pleaseLogin: 'Bitte melde dich an, um zu beginnen.',
    
    // Navigation
    logout: 'Abmelden',
    settings: 'Einstellungen',
    profile: 'Profil',
    
    // Login page
    loginTitle: 'Anmelden',
    email: 'E-Mail',
    password: 'Passwort',
    loginButton: 'Anmelden',
    noAccount: 'Noch kein Konto?',
    registerHere: 'Hier registrieren',
    loginSuccess: 'Anmeldung erfolgreich!',
    loginError: 'Anmeldung fehlgeschlagen. Überprüfen Sie Ihre Anmeldedaten.',
    
    // Register page
    registerTitle: 'Registrieren',
    fullName: 'Vollständiger Name',
    confirmPassword: 'Passwort Bestätigen',
    registerButton: 'Registrieren',
    haveAccount: 'Bereits registriert?',
    loginHere: 'Hier anmelden',
    registerSuccess: 'Registrierung erfolgreich!',
    registerError: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    
    // List page
    tasks: 'Aufgaben',
    addTask: 'Aufgabe Hinzufügen',
    noTasks: 'Keine Aufgaben gefunden',
    deleteTask: 'Aufgabe Löschen',
    editTask: 'Aufgabe Bearbeiten',
    done: 'Erledigt',
    pending: 'Ausstehend',
    
    // Task Modal
    taskName: 'Aufgabenname',
    addNewTask: 'Neue Aufgabe Hinzufügen',
    updateTask: 'Aufgabe Aktualisieren',
    close: 'Schließen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    
    // Data page (Transactions)
    transactions: 'Transaktionen',
    addTransaction: 'Transaktion Hinzufügen',
    description: 'Beschreibung',
    amount: 'Betrag',
    date: 'Datum',
    time: 'Zeit',
    credit: 'Gutschrift',
    debit: 'Belastung',
    type: 'Typ',
    noTransactions: 'Keine Transaktionen gefunden',
    editTransaction: 'Transaktion Bearbeiten',
    deleteTransaction: 'Transaktion Löschen',
    
    // Graph page
    graph: 'Diagramm',
    viewGraph: 'Diagramm Anzeigen',
    transactionGraph: 'Transaktionsdiagramm',
    creditVsDebit: 'Gutschrift vs Belastung',
    
    // PDF
    downloadPDF: 'PDF Herunterladen',
    
    // Error messages
    errorFetching: 'Fehler beim Abrufen von Daten',
    errorUpdating: 'Fehler beim Aktualisieren',
    errorDeleting: 'Fehler beim Löschen',
    confirmDelete: 'Sind Sie sicher, dass Sie dies löschen möchten?',
    success: 'Erfolg!',
    error: 'Fehler!',
    
    // Language selector
    language: 'Sprache',
    selectLanguage: 'Sprache Wählen',
    english: 'English',
    spanish: 'Español',
    french: 'Français',
    german: 'Deutsch',
    arabic: 'العربية',
    hindi: 'हिन्दी',
  },
  ar: {
    // Home page
    taskManager: 'إدارة المهام',
    welcome: 'مرحبا بك في',
    organize: 'نظم مهامك بطريقة منظمة',
    getStarted: 'البدء',
    pleaseLogin: 'يرجى تسجيل الدخول للبدء.',
    
    // Navigation
    logout: 'تسجيل الخروج',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    
    // Login page
    loginTitle: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    loginButton: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    registerHere: 'سجل هنا',
    loginSuccess: 'تم تسجيل الدخول بنجاح!',
    loginError: 'فشل تسجيل الدخول. تحقق من بيانات اعتمادك.',
    
    // Register page
    registerTitle: 'التسجيل',
    fullName: 'الاسم الكامل',
    confirmPassword: 'تأكيد كلمة المرور',
    registerButton: 'التسجيل',
    haveAccount: 'هل لديك حساب بالفعل؟',
    loginHere: 'سجل الدخول هنا',
    registerSuccess: 'تم التسجيل بنجاح!',
    registerError: 'فشل التسجيل. حاول مرة أخرى.',
    
    // List page
    tasks: 'المهام',
    addTask: 'إضافة مهمة',
    noTasks: 'لم يتم العثور على مهام',
    deleteTask: 'حذف المهمة',
    editTask: 'تحرير المهمة',
    done: 'تم',
    pending: 'قيد الانتظار',
    
    // Task Modal
    taskName: 'اسم المهمة',
    addNewTask: 'إضافة مهمة جديدة',
    updateTask: 'تحديث المهمة',
    close: 'إغلاق',
    save: 'حفظ',
    cancel: 'إلغاء',
    
    // Data page (Transactions)
    transactions: 'المعاملات',
    addTransaction: 'إضافة معاملة',
    description: 'الوصف',
    amount: 'المبلغ',
    date: 'التاريخ',
    time: 'الوقت',
    credit: 'رصيد',
    debit: 'خصم',
    type: 'النوع',
    noTransactions: 'لم يتم العثور على معاملات',
    editTransaction: 'تحرير المعاملة',
    deleteTransaction: 'حذف المعاملة',
    
    // Graph page
    graph: 'رسم بياني',
    viewGraph: 'عرض الرسم البياني',
    transactionGraph: 'رسم بياني للمعاملات',
    creditVsDebit: 'الرصيد مقابل الخصم',
    
    // PDF
    downloadPDF: 'تحميل PDF',
    
    // Error messages
    errorFetching: 'خطأ في جلب البيانات',
    errorUpdating: 'خطأ في التحديث',
    errorDeleting: 'خطأ في الحذف',
    confirmDelete: 'هل أنت متأكد أنك تريد حذف هذا؟',
    success: 'نجاح!',
    error: 'خطأ!',
    
    // Language selector
    language: 'اللغة',
    selectLanguage: 'اختر اللغة',
    english: 'English',
    spanish: 'Español',
    french: 'Français',
    german: 'Deutsch',
    arabic: 'العربية',
    hindi: 'हिन्दी',
  },
  hi: {
    // Home page
    taskManager: 'कार्य प्रबंधक',
    welcome: 'में आपका स्वागत है',
    organize: 'अपने कार्यों को व्यवस्थित तरीके से व्यवस्थित करें',
    getStarted: 'शुरू करें',
    pleaseLogin: 'शुरू करने के लिए कृपया लॉगिन करें।',
    
    // Navigation
    logout: 'लॉगआउट',
    settings: 'सेटिंग्स',
    profile: 'प्रोफ़ाइल',
    
    // Login page
    loginTitle: 'लॉगिन',
    email: 'ईमेल',
    password: 'पासवर्ड',
    loginButton: 'लॉगिन',
    noAccount: 'खाता नहीं है?',
    registerHere: 'यहाँ पंजीकृत करें',
    loginSuccess: 'लॉगिन सफल!',
    loginError: 'लॉगिन विफल। अपने क्रेडेंशियल की जांच करें।',
    
    // Register page
    registerTitle: 'पंजीकृत करें',
    fullName: 'पूरा नाम',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    registerButton: 'पंजीकृत करें',
    haveAccount: 'पहले से खाता है?',
    loginHere: 'यहाँ लॉगिन करें',
    registerSuccess: 'पंजीकरण सफल!',
    registerError: 'पंजीकरण विफल। फिर से प्रयास करें।',
    
    // List page
    tasks: 'कार्य',
    addTask: 'कार्य जोड़ें',
    noTasks: 'कोई कार्य नहीं मिला',
    deleteTask: 'कार्य हटाएं',
    editTask: 'कार्य संपादित करें',
    done: 'पूर्ण',
    pending: 'लंबित',
    
    // Task Modal
    taskName: 'कार्य का नाम',
    addNewTask: 'नया कार्य जोड़ें',
    updateTask: 'कार्य अपडेट करें',
    close: 'बंद करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    
    // Data page (Transactions)
    transactions: 'लेनदेन',
    addTransaction: 'लेनदेन जोड़ें',
    description: 'विवरण',
    amount: 'राशि',
    date: 'तारीख',
    time: 'समय',
    credit: 'क्रेडिट',
    debit: 'डेबिट',
    type: 'प्रकार',
    noTransactions: 'कोई लेनदेन नहीं मिला',
    editTransaction: 'लेनदेन संपादित करें',
    deleteTransaction: 'लेनदेन हटाएं',
    
    // Graph page
    graph: 'ग्राफ़',
    viewGraph: 'ग्राफ़ देखें',
    transactionGraph: 'लेनदेन ग्राफ़',
    creditVsDebit: 'क्रेडिट बनाम डेबिट',
    
    // PDF
    downloadPDF: 'PDF डाउनलोड करें',
    
    // Error messages
    errorFetching: 'डेटा प्राप्त करने में त्रुटि',
    errorUpdating: 'अपडेट करने में त्रुटि',
    errorDeleting: 'हटाने में त्रुटि',
    confirmDelete: 'क्या आप इसे हटाना चाहते हैं?',
    success: 'सफलता!',
    error: 'त्रुटि!',
    
    // Language selector
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    english: 'English',
    spanish: 'Español',
    french: 'Français',
    german: 'Deutsch',
    arabic: 'العربية',
    hindi: 'हिन्दी',
  },
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  // Add a translation function to the context
  const t = (key) => {
    return translations[context.language]?.[key] || translations.en[key] || key;
  };
  
  return {
    ...context,
    t,
  };
};
