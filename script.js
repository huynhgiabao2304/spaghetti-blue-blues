$(document).ready(function () {
  let audio = new Audio();
  let currentButton = null;

  // ================= MUSIC PLAYER =================

  $('.music-play').click(function () {
    let button = $(this);
    let song = button.data('song');
    let file = button.data('file');

    // Nếu bấm lại đúng bài đang phát
    if (currentButton === button[0]) {
      if (audio.paused) {
        audio.play();

        button.find('i').removeClass('bi-play-fill').addClass('bi-pause-fill');
      } else {
        audio.pause();

        button.find('i').removeClass('bi-pause-fill').addClass('bi-play-fill');
      }

      return;
    }

    // Dừng bài cũ
    audio.pause();

    // Đổi tất cả nút về Play
    $('.music-play i').removeClass('bi-pause-fill').addClass('bi-play-fill');

    // Tạo audio mới
    audio = new Audio(file);

    currentButton = button[0];

    // Phát nhạc
    audio.play();

    // Đổi nút thành Pause
    button.find('i').removeClass('bi-play-fill').addClass('bi-pause-fill');

    // Hiển thị tên bài hát
    $('#currentSong').html(song);

    $('#musicMessage').text('Now playing: ' + song);

    // Thanh tiến trình
    audio.addEventListener('timeupdate', function () {
      if (audio.duration) {
        let progress = (audio.currentTime / audio.duration) * 100;

        button
          .closest('.song-card')
          .find('.song-line span')
          .css('width', progress + '%');
      }
    });

    // Khi bài hát kết thúc
    audio.addEventListener('ended', function () {
      button.find('i').removeClass('bi-pause-fill').addClass('bi-play-fill');

      button.closest('.song-card').find('.song-line span').css('width', '0%');

      $('#musicMessage').text('Song finished.');
    });
  });

  // ================= NAVBAR SCROLL =================

  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $('.navbar').css('padding', '10px 0');
    } else {
      $('.navbar').css('padding', '18px 0');
    }
  });
});
