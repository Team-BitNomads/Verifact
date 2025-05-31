document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar')
  const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle')
  const mobileSidebarOverlay = document.getElementById('mobile-sidebar-overlay')
  const userMenuButton = document.getElementById('user-menu-button')
  const userMenuDropdown = document.getElementById('user-menu-dropdown')
  const desktopSidebarToggleButton = document.getElementById(
    'sidebar-toggle-desktop'
  )
  const sidebarCollapseIcon = document.getElementById('sidebar-collapse-icon')
  const sidebarExpandIcon = document.getElementById('sidebar-expand-icon')
  const sidebarTextElements = document.querySelectorAll('.sidebar-text')
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item')
  const sidebarUserProfileArea = document.getElementById(
    'sidebar-user-profile-area'
  )
  const sidebarUserIcon = document.querySelector('.sidebar-user-icon')
  const sidebarUserStatusIndicator = document.querySelector(
    '.sidebar-user-status-indicator'
  )

  let isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true'
  let isMobileSidebarOpen = false
  let isUserMenuOpen = false

  if (mobileSidebarToggle && sidebar && mobileSidebarOverlay) {
    mobileSidebarToggle.addEventListener('click', () => {
      isMobileSidebarOpen = !isMobileSidebarOpen
      sidebar.classList.toggle('-translate-x-full', !isMobileSidebarOpen)
      sidebar.classList.toggle('translate-x-0', isMobileSidebarOpen)
      mobileSidebarOverlay.classList.toggle('hidden', !isMobileSidebarOpen)
      mobileSidebarToggle.setAttribute('aria-expanded', isMobileSidebarOpen)
      mobileSidebarToggle.querySelector('span.sr-only').textContent =
        isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'
      if (isMobileSidebarOpen && isSidebarCollapsed) toggleDesktopSidebar(false)
      else if (
        !isMobileSidebarOpen &&
        localStorage.getItem('sidebarCollapsed') === 'true' &&
        window.innerWidth >= 1024
      )
        toggleDesktopSidebar(true)
    })
    mobileSidebarOverlay.addEventListener('click', () => {
      if (isMobileSidebarOpen) mobileSidebarToggle.click()
    })
  }
  document
    .querySelectorAll(
      '#sidebar .sidebar-nav-item, #sidebar-user-profile-area a'
    )
    .forEach(link => {
      link.addEventListener('click', () => {
        if (isMobileSidebarOpen && window.innerWidth < 1024)
          mobileSidebarToggle.click()
      })
    })

  if (userMenuButton && userMenuDropdown) {
    /* ... (user menu logic from history-detail) ... */
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

  const toggleDesktopSidebar = forceCollapseState => {
    /* ... (sidebar collapse logic from history-detail) ... */
    const shouldBeCollapsed =
      typeof forceCollapseState === 'boolean'
        ? forceCollapseState
        : !isSidebarCollapsed
    if (
      isSidebarCollapsed === shouldBeCollapsed &&
      typeof forceCollapseState !== 'boolean'
    )
      return
    isSidebarCollapsed = shouldBeCollapsed
    sidebar.classList.toggle('w-64', !isSidebarCollapsed)
    sidebar.classList.toggle('w-20', isSidebarCollapsed)
    sidebarCollapseIcon.classList.toggle('hidden', isSidebarCollapsed)
    sidebarExpandIcon.classList.toggle('hidden', !isSidebarCollapsed)
    desktopSidebarToggleButton.setAttribute(
      'aria-expanded',
      !isSidebarCollapsed
    )
    desktopSidebarToggleButton.title = isSidebarCollapsed
      ? 'Expand sidebar'
      : 'Collapse sidebar'
    desktopSidebarToggleButton.querySelector('span.sr-only').textContent =
      isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
    sidebarTextElements.forEach(el => {
      el.classList.toggle('opacity-0', isSidebarCollapsed)
      el.classList.toggle('h-0', isSidebarCollapsed)
      el.classList.toggle('overflow-hidden', isSidebarCollapsed)
      el.classList.toggle('opacity-100', !isSidebarCollapsed)
      el.classList.toggle('h-auto', !isSidebarCollapsed)
      if (el.tagName === 'H3')
        el.setAttribute('aria-hidden', isSidebarCollapsed)
    })
    sidebarNavItems.forEach(item => {
      item.classList.toggle('px-3', isSidebarCollapsed)
      item.classList.toggle('justify-center', isSidebarCollapsed)
      item.classList.toggle('px-4', !isSidebarCollapsed)
      const icon = item.querySelector('svg')
      if (icon) icon.classList.toggle('mr-3', !isSidebarCollapsed)
      const textSpan = item.querySelector('.sidebar-text')
      if (isSidebarCollapsed && textSpan)
        item.title = textSpan.textContent.trim()
      else item.removeAttribute('title')
    })
    sidebarUserProfileArea.classList.toggle('h-[70px]', isSidebarCollapsed)
    sidebarUserProfileArea.classList.toggle('flex', isSidebarCollapsed)
    sidebarUserProfileArea.classList.toggle('items-center', isSidebarCollapsed)
    sidebarUserProfileArea.classList.toggle(
      'justify-center',
      isSidebarCollapsed
    )
    sidebarUserProfileArea.classList.toggle('h-auto', !isSidebarCollapsed)
    const userProfileLink = sidebarUserProfileArea.querySelector('a')
    if (userProfileLink) {
      userProfileLink.classList.toggle('p-2', isSidebarCollapsed)
      userProfileLink.classList.toggle('rounded-lg', isSidebarCollapsed)
      userProfileLink.classList.toggle(
        'hover:bg-emerald-100',
        isSidebarCollapsed
      )
    }
    if (sidebarUserIcon) {
      sidebarUserIcon.classList.toggle('h-7', isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('w-7', isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('text-slate-500', isSidebarCollapsed)
      sidebarUserIcon.classList.toggle(
        'hover:text-emerald-600',
        isSidebarCollapsed
      )
      sidebarUserIcon.classList.toggle('h-10', !isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('w-10', !isSidebarCollapsed)
      sidebarUserIcon.classList.toggle('text-slate-400', !isSidebarCollapsed)
    }
    if (sidebarUserStatusIndicator)
      sidebarUserStatusIndicator.classList.toggle('hidden', isSidebarCollapsed)
    if (typeof forceCollapseState !== 'boolean')
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed)
  }
  if (desktopSidebarToggleButton) {
    desktopSidebarToggleButton.addEventListener('click', () =>
      toggleDesktopSidebar()
    )
    if (window.innerWidth >= 1024 && isSidebarCollapsed)
      toggleDesktopSidebar(true)
    else if (window.innerWidth >= 1024 && !isSidebarCollapsed)
      toggleDesktopSidebar(false)
  }

  // --- History List Logic ---
  const historyListContainer = document.getElementById('history-list-container')
  const searchInput = document.getElementById('history-search-input')
  const noResultsMessage = document.getElementById('no-results-message')

  const mockHistoryItemsData = [
    {
      id: '1',
      claimText:
        'Scientists discover a new species of glowing mushrooms in the Amazon rainforest that could revolutionize bioluminescent technology.',
      verificationDate: new Date(2025, 10, 15, 9, 30).toISOString(),
      status: 'pending',
      summary:
        'Initial checks indicate this is a recent claim circulating on social media. Further verification is in progress to confirm sources and scientific backing.'
    },
    {
      id: '2',
      claimText:
        'A new study shows that drinking coffee can increase your lifespan by an average of 5 years.',
      verificationDate: new Date(2025, 9, 22, 14, 0).toISOString(),
      status: 'verified',
      summary:
        'Multiple peer-reviewed studies correlate regular coffee consumption with reduced mortality risk. The "5 years" claim is an oversimplification, but the general health benefit is supported.'
    },
    {
      id: '4',
      claimText:
        'Viral video claims tap water in New York City is unsafe due to microplastic contamination making it glow blue under UV light.',
      verificationDate: new Date(2025, 8, 5, 11, 15).toISOString(),
      status: 'debunked',
      summary:
        'NYC official water reports and independent tests show tap water meets safety standards. The "glowing water" effect in the video is likely due to added substances or lighting tricks, not inherent contamination.'
    },
    {
      id: '4',
      claimText:
        'Is it true that cats always land on their feet? A myth-busting investigation.',
      verificationDate: new Date(2025, 7, 1, 16, 45).toISOString(),
      status: 'verified',
      summary:
        "Cats have a 'righting reflex' that allows them to orient themselves mid-air. While highly effective, it's not foolproof, especially from short falls or if the cat is unwell."
    },
    {
      id: '5',
      claimText:
        'Reports suggest a new AI can predict stock market movements with 99% accuracy, leading to concerns about market stability.',
      verificationDate: new Date(2024, 11, 1, 10, 0).toISOString(),
      status: 'pending',
      summary:
        'This claim is under review. Predicting markets with such high accuracy is historically improbable. We are investigating the source and methodology.'
    }
  ]

  const getStatusBadgeHTML = (status, large = false) => {
    // Same as history-detail
    let bgColor = 'bg-slate-100'
    let textColor = 'text-slate-700'
    let IconId = 'status-inconclusive-icon-solid'
    switch (status) {
      case 'verified':
        bgColor = 'bg-green-100'
        textColor = 'text-green-700'
        IconId = 'status-verified-icon-solid'
        break
      case 'debunked':
        bgColor = 'bg-red-100'
        textColor = 'text-red-700'
        IconId = 'status-debunked-icon-solid'
        break
      case 'pending':
        bgColor = 'bg-sky-100'
        textColor = 'text-sky-700'
        IconId = 'status-pending-icon-solid'
        break
    }
    const sizeClass = large ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs'
    const iconSizeClass = large ? 'w-5 h-5' : 'w-4 h-4'
    return `<span class="inline-flex items-center rounded-full font-medium ${bgColor} ${textColor} ${sizeClass}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-1.5 ${iconSizeClass}"><use href="#${IconId}" /></svg>${
      status.charAt(0).toUpperCase() + status.slice(1)
    }</span>`
  }

  const renderHistoryItems = itemsToRender => {
    historyListContainer.innerHTML = '' // Clear previous items
    if (itemsToRender.length === 0) {
      noResultsMessage.classList.remove('hidden')
      return
    }
    noResultsMessage.classList.add('hidden')

    itemsToRender.forEach((item, index) => {
      const formattedDate = new Date(item.verificationDate).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }
      )
      const itemElement = document.createElement('a')
      itemElement.href = `history.html?id=${item.id}` // Link to detail page
      // Add a delay for staggered animation
      itemElement.style.animationDelay = `${index * 50}ms`
      itemElement.className =
        'history-item-appear block bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden group'
      itemElement.innerHTML = `
                    <div class="p-5 sm:p-6">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            ${getStatusBadgeHTML(item.status)}
                            <p class="text-xs text-slate-500 mt-2 sm:mt-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-3.5 h-3.5 mr-1 text-slate-400"><use href="#status-pending-icon-solid" /></svg> <!-- Using pending icon as generic clock -->
                                ${formattedDate}
                            </p>
                        </div>
                        <h3 class="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors duration-200 mb-2 leading-snug">
                            ${
                              item.claimText.length > 150
                                ? item.claimText.substring(0, 150) + '...'
                                : item.claimText
                            }
                        </h3>
                        <p class="text-sm text-slate-600 leading-relaxed line-clamp-2">
                            ${item.summary}
                        </p>
                    </div>
                    <div class="bg-slate-50 group-hover:bg-sky-50 px-5 py-3 text-right transition-colors duration-200">
                        <span class="text-xs font-medium text-sky-600 group-hover:text-sky-700">
                            View Details →
                        </span>
                    </div>
                `
      historyListContainer.appendChild(itemElement)
    })
  }

  const filterHistoryItems = () => {
    const searchTerm = searchInput.value.toLowerCase()
    const filteredItems = mockHistoryItemsData.filter(
      item =>
        item.claimText.toLowerCase().includes(searchTerm) ||
        item.summary.toLowerCase().includes(searchTerm)
    )
    renderHistoryItems(filteredItems)
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterHistoryItems)
  }

  // Initial render
  renderHistoryItems(mockHistoryItemsData)
})
