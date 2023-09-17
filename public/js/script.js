// Mengatur tampilan tahap berikutnya
function nextStage() {
    document.getElementById('stage1').style.display = 'none';
    document.getElementById('stage2').style.display = 'block';
  }
  
  // Menambahkan field mata kuliah dan dosen baru
  document.getElementById('addBtn').addEventListener('click', function () {
    const mataKuliahContainer = document.createElement('div');
    const dosenContainer = document.createElement('div');
    const removeBtn = document.createElement('button');
  
    mataKuliahContainer.innerHTML = `
      <label for="mataKuliah">Mata Kuliah:</label>
      <input type="text" name="mataKuliah[]" class="mataKuliah">
    `;
  
    dosenContainer.innerHTML = `
      <label for="dosen">Dosen:</label>
      <input type="text" name="dosen[]" class="dosen">
    `;
  
    removeBtn.textContent = 'Hapus';
    removeBtn.classList.add('removeBtn');
    removeBtn.addEventListener('click', function () {
      mataKuliahContainer.remove();
      dosenContainer.remove();
      removeBtn.remove();
    });
  
    const stage2 = document.getElementById('stage2');
    stage2.insertBefore(mataKuliahContainer, document.getElementById('addBtn'));
    stage2.insertBefore(dosenContainer, document.getElementById('addBtn'));
    stage2.insertBefore(removeBtn, document.getElementById('addBtn'));
  });
  
  // Menghapus field mata kuliah dan dosen
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('removeBtn')) {
      const mataKuliahInput = event.target.previousElementSibling.previousElementSibling;
      const dosenInput = event.target.previousElementSibling;
  
      mataKuliahInput.remove();
      dosenInput.remove();
      event.target.remove();
    }
  });
  