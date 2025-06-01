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


  // Collapse/Expand ---
  const toggleDesktopSidebar = () => {
    isSidebarCollapsed = !isSidebarCollapsed
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
      if (el.tagName === 'H3') {
        el.setAttribute('aria-hidden', isSidebarCollapsed)
      }
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
  const historyListContainer = document.getElementById('history-list-container');
  const searchInput = document.getElementById('history-search-input');
  const noResultsMessage = document.getElementById('no-results-message');
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'text-center py-8';
  loadingIndicator.innerHTML = '<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>';

  // Status conversion map
  const VERDICT_TO_STATUS = {
    'True': 'verified',
    'False': 'debunked',
    'Inconclusive': 'inconclusive'
  };

  let allHistoryItems = []; // Store fetched items for search filtering

  // Fetch history items from API
  const fetchHistoryItems = async () => {
    try {
      historyListContainer.innerHTML = '';
      historyListContainer.appendChild(loadingIndicator);
      
      const response = await fetch('https://verifact-backend.onrender.com/api/history');
      if (!response.ok) throw new Error('Failed to load history');
      
      const apiData = await response.json();
      
      if (historyListContainer.contains(loadingIndicator)) {
        historyListContainer.removeChild(loadingIndicator);
      }

      // Transform API data
      allHistoryItems = apiData.map(item => ({
        id: item._id,
        claimText: item.inputText,
        status: VERDICT_TO_STATUS[item.verdict] || 'pending',
        verificationDate: item.lastVerified ? new Date(item.lastVerified).toISOString() : new Date().toISOString(),
        summary: item.summary || '',
        detailedExplanation: item.detailedAnalysis || '',
        evidenceLinks: (item.sourcesUsed || []).map(src => ({
          title: src.relevance || 'Source reference',
          url: src.url || '#'
        }))
      }));

      renderHistoryItems(allHistoryItems);
    } catch (error) {
      console.error('Fetch error:', error);
      if (historyListContainer.contains(loadingIndicator)) {
        historyListContainer.removeChild(loadingIndicator);
      }
      noResultsMessage.textContent = 'Failed to load history. Please try again later.';
      noResultsMessage.classList.remove('hidden');
    }
  };

  // Status badge generator
  const getStatusBadgeHTML = (status, large = false) => {
    let bgColor = 'bg-slate-100';
    let textColor = 'text-slate-700';
    let IconId = 'status-inconclusive-icon-solid';
    
    switch (status) {
      case 'verified':
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
        IconId = 'status-verified-icon-solid';
        break;
      case 'debunked':
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
        IconId = 'status-debunked-icon-solid';
        break;
      case 'pending':
        bgColor = 'bg-sky-100';
        textColor = 'text-sky-700';
        IconId = 'status-pending-icon-solid';
        break;
      case 'inconclusive':
        bgColor = 'bg-amber-50';
        textColor = 'text-amber-700';
        IconId = 'status-inconclusive-icon-solid';
        break;
    }
    
    const sizeClass = large ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs';
    const iconSizeClass = large ? 'w-5 h-5' : 'w-4 h-4';
    return `<span class="inline-flex items-center rounded-full font-medium ${bgColor} ${textColor} ${sizeClass}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-1.5 ${iconSizeClass}">
        <use href="#${IconId}" />
      </svg>
      ${status.charAt(0).toUpperCase() + status.slice(1)}
    </span>`;
  };

  // Render function
  const renderHistoryItems = itemsToRender => {
    historyListContainer.innerHTML = '';
    
    if (!itemsToRender || itemsToRender.length === 0) {
      noResultsMessage.classList.remove('hidden');
      return;
    }
    
    noResultsMessage.classList.add('hidden');
    itemsToRender.forEach((item, index) => {
      const formattedDate = new Date(item.verificationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const itemElement = document.createElement('a');
    itemElement.href = `history.html?id=${encodeURIComponent(item.id)}`;
      itemElement.style.animationDelay = `${index * 50}ms`;
      itemElement.className = 'history-item-appear block bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden group';
      
      itemElement.innerHTML = `
        <div class="p-5 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            ${getStatusBadgeHTML(item.status)}
            <p class="text-xs text-slate-500 mt-2 sm:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-3.5 h-3.5 mr-1 text-slate-400">
                <use href="#status-pending-icon-solid" />
              </svg>
              ${formattedDate}
            </p>
          </div>
          <h3 class="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors duration-200 mb-2 leading-snug">
            ${item.claimText.length > 150 ? item.claimText.substring(0, 150) + '...' : item.claimText}
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
      `;
      
      historyListContainer.appendChild(itemElement);
    });
  };

  // Search/filter functionality
  const filterHistoryItems = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = allHistoryItems.filter(item =>
      item.claimText.toLowerCase().includes(searchTerm) ||
      item.summary.toLowerCase().includes(searchTerm)
    );
    renderHistoryItems(filteredItems);
  };

  // Initialize
  fetchHistoryItems();
  
  if (searchInput) {
    searchInput.addEventListener('input', filterHistoryItems);
  }
})
