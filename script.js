const copyNote = document.querySelector('.copy-note');

document.querySelectorAll('[data-copy-target]').forEach((button) => {
  button.addEventListener('click', async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.innerText);
      if (copyNote) {
        copyNote.classList.add('show');
        window.setTimeout(() => copyNote.classList.remove('show'), 1800);
      }
    } catch (_) {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});

document.querySelectorAll('[data-gallery-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const galleryName = button.dataset.galleryTab;
    const targetId = button.dataset.target;
    const gallery = document.querySelector(`[data-gallery="${galleryName}"]`);
    if (!gallery || !targetId) return;

    document.querySelectorAll(`[data-gallery-tab="${galleryName}"]`).forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    });

    gallery.querySelectorAll('figure').forEach((panel) => {
      panel.hidden = panel.id !== targetId;
    });
  });
});
