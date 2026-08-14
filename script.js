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
