document.addEventListener('DOMContentLoaded', () => {
  // --- Main Dashboard Sidebar and Header JS (Consistent) ---
  const mainSidebar = document.getElementById('sidebar')
  const mobileMainSidebarToggle = document.getElementById(
    'mobile-sidebar-toggle'
  )
  const mobileMainSidebarOverlay = document.getElementById(
    'mobile-sidebar-overlay'
  )
  const userMenuButton = document.getElementById('user-menu-button')
  const userMenuDropdown = document.getElementById('user-menu-dropdown')
  const desktopMainSidebarToggleButton = document.getElementById(
    'sidebar-toggle-desktop'
  )
  const mainSidebarCollapseIcon = document.getElementById(
    'sidebar-collapse-icon'
  )
  const mainSidebarExpandIcon = document.getElementById('sidebar-expand-icon')
  const mainSidebarTextElements = document.querySelectorAll(
    '#sidebar .sidebar-text'
  ) // Scoped to main sidebar
  const mainSidebarNavItems = document.querySelectorAll(
    '#sidebar .sidebar-nav-item'
  )
  const mainSidebarUserProfileArea = document.getElementById(
    'sidebar-user-profile-area'
  )
  const mainSidebarUserIcon = document.querySelector(
    '#sidebar .sidebar-user-icon'
  )
  const mainSidebarUserStatusIndicator = document.querySelector(
    '#sidebar .sidebar-user-status-indicator'
  )
  const sidebarUsernameEl = document.getElementById('sidebar-username')

  let isMainSidebarCollapsed =
    localStorage.getItem('sidebarCollapsed') === 'true'
  let isMobileMainSidebarOpen = false
  let isUserMenuOpen = false
  let wasDesktopMainSidebarCollapsedBeforeMobileOpen = isMainSidebarCollapsed

  const applyDesktopMainSidebarCollapseStyles = collapse => {
    mainSidebar.classList.toggle('w-64', !collapse)
    mainSidebar.classList.toggle('w-20', collapse)
    if (mainSidebarCollapseIcon)
      mainSidebarCollapseIcon.classList.toggle('hidden', collapse)
    if (mainSidebarExpandIcon)
      mainSidebarExpandIcon.classList.toggle('hidden', !collapse)
    mainSidebarTextElements.forEach(el => {
      el.classList.toggle('opacity-0', collapse)
      el.classList.toggle('h-0', collapse)
      el.classList.toggle('overflow-hidden', collapse)
      el.classList.toggle('opacity-100', !collapse)
      el.classList.toggle('h-auto', !collapse)
      if (el.tagName === 'H3') el.setAttribute('aria-hidden', collapse)
    })
    mainSidebarNavItems.forEach(item => {
      item.classList.toggle('px-3', collapse)
      item.classList.toggle('justify-center', collapse)
      item.classList.toggle('px-4', !collapse)
      const icon = item.querySelector('svg')
      if (icon) icon.classList.toggle('mr-3', !collapse)
      const textSpan = item.querySelector('.sidebar-text')
      if (collapse && textSpan) item.title = textSpan.textContent.trim()
      else item.removeAttribute('title')
    })
    if (mainSidebarUserProfileArea) {
      mainSidebarUserProfileArea.classList.toggle('h-[70px]', collapse)
      mainSidebarUserProfileArea.classList.toggle('flex', collapse)
      mainSidebarUserProfileArea.classList.toggle('items-center', collapse)
      mainSidebarUserProfileArea.classList.toggle('justify-center', collapse)
      mainSidebarUserProfileArea.classList.toggle('h-auto', !collapse)
      const userProfileLink = mainSidebarUserProfileArea.querySelector('a')
      if (userProfileLink) {
        userProfileLink.classList.toggle('p-2', collapse)
        userProfileLink.classList.toggle('rounded-lg', collapse)
        userProfileLink.classList.toggle('hover:bg-emerald-100', collapse)
        userProfileLink.classList.toggle(
          'dark:hover:bg-emerald-900/30',
          collapse
        )
      }
    }
    if (mainSidebarUserIcon) {
      mainSidebarUserIcon.classList.toggle('h-7', collapse)
      mainSidebarUserIcon.classList.toggle('w-7', collapse)
      mainSidebarUserIcon.classList.toggle('text-slate-500', collapse)
      mainSidebarUserIcon.classList.toggle('dark:text-slate-400', collapse)
      mainSidebarUserIcon.classList.toggle('hover:text-emerald-600', collapse)
      mainSidebarUserIcon.classList.toggle(
        'dark:hover:text-emerald-400',
        collapse
      )
      mainSidebarUserIcon.classList.toggle('h-10', !collapse)
      mainSidebarUserIcon.classList.toggle('w-10', !collapse)
      mainSidebarUserIcon.classList.toggle('text-slate-400', !collapse)
      mainSidebarUserIcon.classList.toggle('dark:text-slate-500', !collapse)
    }
    if (mainSidebarUserStatusIndicator)
      mainSidebarUserStatusIndicator.classList.toggle('hidden', collapse)
  }
  const toggleDesktopMainSidebar = () => {
    isMainSidebarCollapsed = !isMainSidebarCollapsed
    if (desktopMainSidebarToggleButton) {
      desktopMainSidebarToggleButton.setAttribute(
        'aria-expanded',
        !isMainSidebarCollapsed
      )
      desktopMainSidebarToggleButton.title = isMainSidebarCollapsed
        ? 'Expand sidebar'
        : 'Collapse sidebar'
      desktopMainSidebarToggleButton.querySelector('span.sr-only').textContent =
        isMainSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
    }
    applyDesktopMainSidebarCollapseStyles(isMainSidebarCollapsed)
    localStorage.setItem('sidebarCollapsed', isMainSidebarCollapsed)
  }
  if (mobileMainSidebarToggle && mainSidebar && mobileMainSidebarOverlay) {
    mobileMainSidebarToggle.addEventListener('click', () => {
      isMobileMainSidebarOpen = !isMobileMainSidebarOpen
      mainSidebar.classList.toggle(
        '-translate-x-full',
        !isMobileMainSidebarOpen
      )
      mainSidebar.classList.toggle('translate-x-0', isMobileMainSidebarOpen)
      mobileMainSidebarOverlay.classList.toggle(
        'hidden',
        !isMobileMainSidebarOpen
      )
      mobileMainSidebarToggle.setAttribute(
        'aria-expanded',
        isMobileMainSidebarOpen
      )
      mobileMainSidebarToggle.querySelector('span.sr-only').textContent =
        isMobileMainSidebarOpen ? 'Close sidebar' : 'Open sidebar'
      if (isMobileMainSidebarOpen) {
        wasDesktopMainSidebarCollapsedBeforeMobileOpen = isMainSidebarCollapsed
        applyDesktopMainSidebarCollapseStyles(false)
      } else {
        if (window.innerWidth >= 1024)
          applyDesktopMainSidebarCollapseStyles(
            wasDesktopMainSidebarCollapsedBeforeMobileOpen
          )
      }
    })
    mobileMainSidebarOverlay.addEventListener('click', () => {
      if (isMobileMainSidebarOpen) mobileMainSidebarToggle.click()
    })
  }
  document
    .querySelectorAll(
      '#main-sidebar-nav .sidebar-nav-item, #sidebar-user-profile-area a'
    )
    .forEach(link => {
      link.addEventListener('click', () => {
        if (isMobileMainSidebarOpen && window.innerWidth < 1024)
          mobileMainSidebarToggle.click()
      })
    })
  if (userMenuButton && userMenuDropdown) {
    userMenuButton.addEventListener('click', event => {
      event.stopPropagation()
      isUserMenuOpen = !isUserMenuOpen
      userMenuDropdown.classList.toggle('hidden', !isUserMenuOpen)
      userMenuButton.setAttribute('aria-expanded', isUserMenuOpen)
    })
    document.addEventListener('click', event => {
      if (
        isUserMenuOpen &&
        !userMenuDropdown.contains(event.target) &&
        !userMenuButton.contains(event.target)
      ) {
        isUserMenuOpen = false
        userMenuDropdown.classList.add('hidden')
        userMenuButton.setAttribute('aria-expanded', false)
      }
    })
    userMenuDropdown.querySelectorAll('.user-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        isUserMenuOpen = false
        userMenuDropdown.classList.add('hidden')
        userMenuButton.setAttribute('aria-expanded', false)
      })
    })
  }
  if (desktopMainSidebarToggleButton) {
    desktopMainSidebarToggleButton.addEventListener(
      'click',
      toggleDesktopMainSidebar
    )
    if (window.innerWidth >= 1024) {
      applyDesktopMainSidebarCollapseStyles(isMainSidebarCollapsed)
      if (desktopMainSidebarToggleButton) {
        desktopMainSidebarToggleButton.setAttribute(
          'aria-expanded',
          !isMainSidebarCollapsed
        )
        desktopMainSidebarToggleButton.title = isMainSidebarCollapsed
          ? 'Expand sidebar'
          : 'Collapse sidebar'
        desktopMainSidebarToggleButton.querySelector(
          'span.sr-only'
        ).textContent = isMainSidebarCollapsed
          ? 'Expand sidebar'
          : 'Collapse sidebar'
      }
    } else {
      applyDesktopMainSidebarCollapseStyles(false)
    }
  }
  // --- End Main Dashboard Sidebar and Header JS ---

  // --- Settings Page Specific Logic ---
  const settingsSubNavContainer = document.getElementById(
    'settings-sub-navigation'
  )
  const settingsContentArea = document.getElementById('settings-content-area')
  const settingsSaveButtonContainer = document.getElementById(
    'settings-save-button-container'
  )
  const settingsSaveButton = document.getElementById('settings-save-button')

  // Initial Form Data (could also be loaded from localStorage or an API)
  const initialFormData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    bio: 'Fact-checking enthusiast and researcher',
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    securityAlerts: true,
    profileVisibility: 'public',
    dataSharing: false,
    analyticsTracking: true,
    theme: localStorage.getItem('verifactTheme') || 'system',
    language: 'en',
    compactMode: false,
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30'
  }
  let currentFormData =
    JSON.parse(localStorage.getItem('verifactSettingsData')) ||
    JSON.parse(JSON.stringify(initialFormData))

  let currentPasswords = { current: '', new: '', confirm: '' }
  let showPasswordFields = false
  let activeSettingsSectionId = 'profile'

  const settingsSidebarItemsConfig = [
    { id: 'profile', label: 'Profile', icon: 'user-icon-outline-path' },
    { id: 'notifications', label: 'Notifications', icon: 'bell-icon-path' },
    {
      id: 'privacy',
      label: 'Privacy & Safety',
      icon: 'shield-check-icon-path'
    },
    { id: 'appearance', label: 'Appearance', icon: 'paint-brush-icon-path' },
    { id: 'security', label: 'Security', icon: 'key-icon-path' },
    { id: 'data', label: 'Data & Storage', icon: 'document-text-icon-path' },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'question-mark-circle-icon-path'
    }
  ]

  // Functions from previous settings page (renderProfileSectionHTML, renderNotificationsSectionHTML, etc.)
  // will be called by renderActiveSettingsSection. They are mostly the same, ensure dark mode classes are there.
  // ... (Paste the HTML rendering functions for each section here, adapted for dark mode if needed) ...
  // For brevity, I'll assume these functions exist as they were in the previous `SettingsPage.tsx` to HTML conversion.
  // I'll just show the structure for `renderProfileSectionHTML` as an example.

  function renderProfileSectionHTML () {
    /* ... (content from previous settings page's JS) ... */
    return `<div class="space-y-6"><div><h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Profile Settings</h2><p class="text-slate-600 dark:text-slate-400">Manage your personal information and profile visibility.</p></div><div class="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50"><div class="flex items-center mb-6"><div class="relative"><div class="w-20 h-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-white"><use href="#user-circle-icon-path" /></svg></div><button class="absolute -bottom-2 -right-2 bg-white dark:bg-slate-700 rounded-full p-2 shadow-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors" title="Change profile picture" aria-label="Change profile picture"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-600 dark:text-slate-300"><use href="#paint-brush-icon-path" /></svg></button></div><div class="ml-6"><h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">${currentFormData.fullName}</h3><p class="text-slate-600 dark:text-slate-400">@${currentFormData.username}</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label><input type="text" value="${currentFormData.fullName}" data-key="fullName" class="form-input w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors dark:text-slate-100" placeholder="Enter your full name" title="Full Name" /></div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Username</label><input type="text" value="${currentFormData.username}" data-key="username" class="form-input w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors dark:text-slate-100" placeholder="Enter your username" /></div><div class="md:col-span-2"><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label><input type="email" value="${currentFormData.email}" data-key="email" class="form-input w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors dark:text-slate-100" /></div><div class="md:col-span-2"><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label><textarea data-key="bio" rows="3" class="form-input w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors resize-none dark:text-slate-100" placeholder="Tell us about yourself" title="Bio">${currentFormData.bio}</textarea></div></div></div></div>`
  }
  function renderNotificationsSectionHTML () {
    /* ... (as before) ... */
    const items = [
      {
        key: 'emailNotifications',
        label: 'Email Notifications',
        desc: 'Receive email updates about your account activity'
      },
      {
        key: 'pushNotifications',
        label: 'Push Notifications',
        desc: 'Get instant notifications on your device'
      },
      {
        key: 'weeklyDigest',
        label: 'Weekly Digest',
        desc: 'Receive a weekly summary of your fact-checking activities'
      },
      {
        key: 'securityAlerts',
        label: 'Security Alerts',
        desc: 'Get notified about important security events'
      }
    ]
    return `<div class="space-y-6"><div><h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Notification Settings</h2><p class="text-slate-600 dark:text-slate-400">Choose how you want to be notified about updates and activities.</p></div><div class="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50"><div class="space-y-6">${items
      .map(
        item =>
          `<div class="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl"><div><h4 class="font-medium text-slate-800 dark:text-slate-100">${
            item.label
          }</h4><p class="text-sm text-slate-600 dark:text-slate-400">${
            item.desc
          }</p></div><button data-key="${
            item.key
          }" class="toggle-button relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
            currentFormData[item.key]
              ? 'bg-sky-600'
              : 'bg-slate-300 dark:bg-slate-600'
          }"><span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            currentFormData[item.key] ? 'translate-x-6' : 'translate-x-1'
          }"></span></button></div>`
      )
      .join('')}</div></div></div>`
  }
  function renderSecuritySectionHTML () {
    /* ... (as before) ... */
    return `<div class="space-y-6"><div><h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Security Settings</h2><p class="text-slate-600 dark:text-slate-400">Manage your account security and authentication preferences.</p></div><div class="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50"><h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Change Password</h3><div class="space-y-4"><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label><div class="relative"><input type="${
      showPasswordFields ? 'text' : 'password'
    }" value="${
      currentPasswords.current
    }" data-key="current" class="password-input w-full px-4 py-3 pr-12 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors dark:text-slate-100" placeholder="Enter your current password" /><button type="button" class="password-toggle-button absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">${
      showPasswordFields
        ? '<use href="#eye-slash-icon-path"/>'
        : '<use href="#eye-icon-path"/>'
    }</svg></button></div></div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label><input type="${
      showPasswordFields ? 'text' : 'password'
    }" value="${
      currentPasswords.new
    }" data-key="new" class="password-input w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors dark:text-slate-100" placeholder="Enter your new password" /></div><div><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label><input type="${
      showPasswordFields ? 'text' : 'password'
    }" value="${
      currentPasswords.confirm
    }" data-key="confirm" class="password-input w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors dark:text-slate-100" placeholder="Confirm your new password" title="Confirm New Password" /></div><button id="update-password-button" class="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-200 font-medium">Update Password</button></div></div><div class="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50"><h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Two-Factor Authentication</h3><div class="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl"><div><h4 class="font-medium text-slate-800 dark:text-slate-100">Enable 2FA</h4><p class="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security to your account</p></div><button data-key="twoFactorAuth" class="toggle-button relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
      currentFormData.twoFactorAuth
        ? 'bg-sky-600'
        : 'bg-slate-300 dark:bg-slate-600'
    }"><span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      currentFormData.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
    }"></span></button></div></div></div>`
  }
  function renderAppearanceSectionHTML () {
    /* ... (as before) ... */
    const themes = [
      { key: 'light', label: 'Light', icon: 'sun-icon-path' },
      { key: 'dark', label: 'Dark', icon: 'moon-icon-path' },
      { key: 'system', label: 'System', icon: 'computer-desktop-icon-path' }
    ]
    return `<div class="space-y-6"><div><h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Appearance Settings</h2><p class="text-slate-600 dark:text-slate-400">Customize how Verifact looks and feels.</p></div><div class="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50"><div class="space-y-6"><div><h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Theme</h3><div class="grid grid-cols-3 gap-4">${themes
      .map(
        theme =>
          `<button data-key="theme" data-value="${
            theme.key
          }" class="theme-button p-4 rounded-xl border-2 transition-all duration-200 ${
            currentFormData.theme === theme.key
              ? 'border-sky-500 bg-sky-50 dark:bg-sky-700/30 dark:border-sky-600'
              : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600'
          }"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mx-auto mb-2 text-slate-700 dark:text-slate-300"><use href="#${
            theme.icon
          }" /></svg><p class="text-sm font-medium text-slate-800 dark:text-slate-100">${
            theme.label
          }</p></button>`
      )
      .join(
        ''
      )}</div></div><div><h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Language</h3><select data-key="language" class="form-input w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-400 dark:focus:border-sky-500 transition-colors dark:text-slate-100" aria-label="Language"><option value="en" ${
      currentFormData.language === 'en' ? 'selected' : ''
    }>English</option><option value="es" ${
      currentFormData.language === 'es' ? 'selected' : ''
    }>Spanish</option><option value="fr" ${
      currentFormData.language === 'fr' ? 'selected' : ''
    }>French</option><option value="de" ${
      currentFormData.language === 'de' ? 'selected' : ''
    }>German</option></select></div><div class="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl"><div><h4 class="font-medium text-slate-800 dark:text-slate-100">Compact Mode</h4><p class="text-sm text-slate-600 dark:text-slate-400">Use a more compact layout to fit more content</p></div><button data-key="compactMode" class="toggle-button relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
      currentFormData.compactMode
        ? 'bg-sky-600'
        : 'bg-slate-300 dark:bg-slate-600'
    }"><span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      currentFormData.compactMode ? 'translate-x-6' : 'translate-x-1'
    }"></span></button></div></div></div></div>`
  }
  function renderDefaultSectionHTML () {
    /* ... (as before) ... */
    return `<div class="flex items-center justify-center h-64"><div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4"><use href="#cog-icon-path" /></svg><h3 class="text-lg font-medium text-slate-600 dark:text-slate-300">Coming Soon</h3><p class="text-slate-500 dark:text-slate-400">This section is under development.</p></div></div>`
  }

  const renderSettingsSubNavigation = () => {
    settingsSubNavContainer.innerHTML = '' // Clear previous
    settingsSidebarItemsConfig.forEach(item => {
      const button = document.createElement('button')
      button.className = `w-full flex items-center px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-all duration-150 ${
        activeSettingsSectionId === item.id
          ? 'bg-sky-100 dark:bg-sky-700/40 text-sky-700 dark:text-sky-300'
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
      }`
      button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3 flex-shrink-0"><use href="#${
                      item.icon
                    }" /></svg>
                    <span>${item.label}</span>
                    ${
                      activeSettingsSectionId === item.id
                        ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-auto text-sky-600 dark:text-sky-400"><use href="#chevron-right-icon-path" /></svg>'
                        : ''
                    }
                `
      button.addEventListener('click', () => {
        activeSettingsSectionId = item.id
        renderActiveSettingsSection()
        renderSettingsSubNavigation() // Re-render sub-nav for active state
      })
      settingsSubNavContainer.appendChild(button)
    })
  }

  const renderActiveSettingsSection = () => {
    // ... (same logic as before, using the HTML render functions) ...
    let htmlContent = ''
    switch (activeSettingsSectionId) {
      case 'profile':
        htmlContent = renderProfileSectionHTML()
        break
      case 'notifications':
        htmlContent = renderNotificationsSectionHTML()
        break
      case 'security':
        htmlContent = renderSecuritySectionHTML()
        break
      case 'appearance':
        htmlContent = renderAppearanceSectionHTML()
        break
      default:
        htmlContent = renderDefaultSectionHTML()
    }
    settingsContentArea.innerHTML = htmlContent
    attachEventListenersToSettingsSection()
    const sectionsWithSave = ['profile', 'notifications', 'appearance']
    settingsSaveButtonContainer.classList.toggle(
      'hidden',
      !sectionsWithSave.includes(activeSettingsSectionId)
    )
  }

  const attachEventListenersToSettingsSection = () => {
    /* ... (same as before) ... */
    settingsContentArea.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', e =>
        handleInputChange(
          e.target.dataset.key,
          e.target.type === 'checkbox' ? e.target.checked : e.target.value
        )
      )
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', e =>
          handleInputChange(e.target.dataset.key, e.target.value)
        )
      }
    })
    settingsContentArea.querySelectorAll('.toggle-button').forEach(button => {
      button.addEventListener('click', e => {
        const key = e.currentTarget.dataset.key
        const newValue = !currentFormData[key]
        handleInputChange(key, newValue)
        e.currentTarget.classList.toggle('bg-sky-600', newValue)
        e.currentTarget.classList.toggle('bg-slate-300', !newValue)
        e.currentTarget.classList.toggle(
          'dark:bg-slate-600',
          !newValue && document.documentElement.classList.contains('dark')
        )
        e.currentTarget
          .querySelector('span')
          .classList.toggle('translate-x-6', newValue)
        e.currentTarget
          .querySelector('span')
          .classList.toggle('translate-x-1', !newValue)
      })
    })
    settingsContentArea.querySelectorAll('.theme-button').forEach(button => {
      button.addEventListener('click', e => {
        const themeValue = e.currentTarget.dataset.value
        handleInputChange('theme', themeValue)
        settingsContentArea.querySelectorAll('.theme-button').forEach(btn => {
          btn.classList.toggle(
            'border-sky-500',
            btn.dataset.value === themeValue
          )
          btn.classList.toggle(
            'bg-sky-50',
            btn.dataset.value === themeValue &&
              !document.documentElement.classList.contains('dark')
          )
          btn.classList.toggle(
            'dark:bg-sky-700/30',
            btn.dataset.value === themeValue &&
              document.documentElement.classList.contains('dark')
          )
          btn.classList.toggle(
            'dark:border-sky-600',
            btn.dataset.value === themeValue &&
              document.documentElement.classList.contains('dark')
          )
          btn.classList.toggle(
            'border-slate-200',
            btn.dataset.value !== themeValue
          )
          btn.classList.toggle(
            'dark:border-slate-700',
            btn.dataset.value !== themeValue &&
              document.documentElement.classList.contains('dark')
          )
          btn.classList.toggle(
            'bg-white/50',
            btn.dataset.value !== themeValue &&
              !document.documentElement.classList.contains('dark')
          )
          btn.classList.toggle(
            'dark:bg-slate-700/50',
            btn.dataset.value !== themeValue &&
              document.documentElement.classList.contains('dark')
          )
        })
      })
    })
    if (activeSettingsSectionId === 'security') {
      settingsContentArea.querySelectorAll('.password-input').forEach(input => {
        input.addEventListener('input', e =>
          handlePasswordInputChange(e.target.dataset.key, e.target.value)
        )
      })
      settingsContentArea
        .querySelectorAll('.password-toggle-button')
        .forEach(button => {
          button.addEventListener('click', () => {
            showPasswordFields = !showPasswordFields
            renderActiveSettingsSection()
          })
        })
      const updatePasswordBtn = document.getElementById(
        'update-password-button'
      )
      if (updatePasswordBtn)
        updatePasswordBtn.addEventListener('click', () => {
          console.log('Updating password with:', currentPasswords)
          alert('Password update logic here.')
        })
    }
  }

  function handleInputChange (field, value) {
    /* ... (same as before) ... */ currentFormData = {
      ...currentFormData,
      [field]: value
    }
    if (field === 'theme') applyTheme(value)
  }
  function handlePasswordInputChange (field, value) {
    /* ... (same as before) ... */ currentPasswords = {
      ...currentPasswords,
      [field]: value
    }
  }
  function applyTheme (themeValue) {
    /* ... (same as before) ... */ document.documentElement.classList.remove(
      'light',
      'dark'
    )
    if (themeValue === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (themeValue === 'light') {
      document.documentElement.classList.add('light')
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.add('light')
      }
    }
    localStorage.setItem('verifactTheme', themeValue)
  }

  if (settingsSaveButton) {
    settingsSaveButton.addEventListener('click', () => {
      console.log('Settings saved:', currentFormData)
      localStorage.setItem(
        'verifactSettingsData',
        JSON.stringify(currentFormData)
      )
      alert('Settings saved successfully!') // Replace with a non-blocking notification
      if (activeSettingsSectionId === 'profile') {
        const profileHeaderName = settingsContentArea.querySelector('.ml-6 h3')
        if (profileHeaderName)
          profileHeaderName.textContent = currentFormData.fullName
        const profileHeaderUsername =
          settingsContentArea.querySelector('.ml-6 p')
        if (profileHeaderUsername)
          profileHeaderUsername.textContent = `@${currentFormData.username}`
        if (sidebarUsernameEl)
          sidebarUsernameEl.textContent = currentFormData.fullName
      }
    })
  }

  if (sidebarUsernameEl)
    sidebarUsernameEl.textContent = currentFormData.fullName
  applyTheme(currentFormData.theme)
  renderSettingsSubNavigation()
  renderActiveSettingsSection()
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (currentFormData.theme === 'system') applyTheme('system')
    })
})
