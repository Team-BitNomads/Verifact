// 🔁 Save selected language and reload the page

// Map language codes to OpenAI language names
const langMap = {
  en: 'English',
  yo: 'Yoruba',
  ig: 'Igbo',
  ha: 'Hausa',
  es: 'Spanish' // fallback example
};

// 🔡 Translate a single text block using OpenAI API
async function translateText(text, targetLang = 'es') {
  const apiKey = OPENAI_API_KEY; 

  const targetLanguageName = langMap[targetLang] || 'English';

  const prompt = `Translate the following English text into ${targetLanguageName}:\n\n"${text}"`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',  // or 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      })
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.statusText);
      return text; // fallback
    }

    const data = await response.json();
    const translatedText = data.choices[0].message.content.trim();
    return translatedText;

  } catch (error) {
    console.error('Fetch error:', error);
    return text; // fallback
  }
}

// 🌐 Translate everything on the page
async function translateAllElements() {
  const lang = localStorage.getItem('language') || 'en';
  if (lang === 'en') return; // Skip if English

  console.log('Starting translation to:', lang);

  // Translate text in basic content elements
  const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a, label');

  for (const el of elements) {
    const originalText = el.textContent.trim();
    if (originalText && originalText.length < 500) {
      try {
        const translated = await translateText(originalText, lang);
        el.textContent = translated;
      } catch (err) {
        console.warn('Failed to translate:', err);
      }
    }
  }

  // Translate placeholders
  const placeholders = document.querySelectorAll('[placeholder]');
  for (const el of placeholders) {
    const text = el.getAttribute('placeholder');
    if (text && text.length < 500) {
      try {
        const translated = await translateText(text, lang);
        el.setAttribute('placeholder', translated);
      } catch (err) {
        console.warn('Failed to translate placeholder:', text);
      }
    }
  }

  // Translate title attributes
  const titles = document.querySelectorAll('[title]');
  for (const el of titles) {
    const text = el.getAttribute('title');
    if (text && text.length < 500) {
      try {
        const translated = await translateText(text, lang);
        el.setAttribute('title', translated);
      } catch (err) {
        console.warn('Failed to translate title:', text);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language-select');
  console.log(languageSelect);

  // Set dropdown to saved language
  const savedLang = localStorage.getItem('language') || 'en';
  languageSelect.value = savedLang;

  // When language is changed
  languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('language', selectedLang);
    location.reload(); // Refresh to apply new language
  });

  // 🔄 Begin translation once DOM is ready
  translateAllElements();
});
