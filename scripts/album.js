var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

    var $row =  $(template);
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
 };

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $playPauseButton.html(playerBarPauseButton);

    var previousSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $previousSongNumberCell = getSongNumberCell(previousSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $previousSongNumberCell.html(previousSongNumber);

};

var previousSong = function() {
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $playPauseButton.html(playerBarPauseButton);

    var previousSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(previousSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(previousSongNumber);

};

var setSong = function(songNumber){
  if (currentSoundFile) {
<<<<<<< HEAD
         currentSoundFile.stop();
    }
=======
    currentSoundFile.stop();
  }
>>>>>>> assignment-20-buzz-library
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         formats: [ 'mp3' ],
         preload: true
     });
     setVolume(currentVolume);
};

var setVolume = function(volume) {
  if (currentSoundFile) {
   currentSoundFile.setVolume(volume);
 }
};

var getSongNumberCell = function(number){
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var updatePlayerBarSong = function(){
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentAlbum.artist + " : " + currentSongFromAlbum.title);
    $playPauseButton.html(playerBarPauseButton);
};

var clickHandler = function() {
<<<<<<< HEAD
	var songNumber = parseInt($(this).attr('data-song-number'));

	if (currentlyPlayingSongNumber !== null) {
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
	   $(this).html(pauseButtonTemplate);
	    setSong(songNumber);
      currentSoundFile.play();
      updatePlayerBarSong();
	} else if (currentlyPlayingSongNumber === songNumber) {
    if (currentSoundFile.isPaused()) {
      $(this).html(pauseButtonTemplate);
<<<<<<< HEAD
      $('.main-controls .play-pause').html(playerBarPauseButton);
      currentSoundFile.play();
    } else {
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      currentSoundFile.pause();
    }
  }
=======
      $playPauseButton.html(playerBarPauseButton);
      currentSoundFile.play();
    } else {
      $(this).html(playButtonTemplate);
      $playPauseButton.html(playerBarPlayButton);
      currentSoundFile.pause();
    }
  }
};

var togglePlayFromPlayBar = function(){
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);

  if(currentSoundFile.isPaused()){
    $(this).html(playPauseButton);
    $nextSongNumberCell.html(pauseButtonTemplate);
    currentSoundFile.play();
  } else {
    $(this).html(playPauseButton);
    $nextSongNumberCell.html(playButtonTemplate);
    currentSoundFile.pause();
  }
>>>>>>> assignment-20-buzz-library
=======

    var songNumber = parseInt($(this).attr('data-song-number'));

    if (currentlyPlayingSongNumber !== null) {
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }

     if (currentlyPlayingSongNumber !== songNumber) {
       setSong(songNumber);
       currentSoundFile.play();
       $(this).html(pauseButtonTemplate);
       currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
       updatePlayerBarSong();
     } else if (currentlyPlayingSongNumber === songNumber) {
       if (currentSoundFile.isPaused()) {
         $(this).html(pauseButtonTemplate);
         $('.main-controls .play-pause').html(playerBarPauseButton);
         currentSoundFile.play();
       } else {
         $(this).html(playButtonTemplate);
         $('.main-controls .play-pause').html(playerBarPlayButton);
         currentSoundFile.pause();
       }
     }
   };

var togglePlayFromPlayerbar = function() {
   var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
   if (currentSoundFile.isPaused()) {
       $currentlyPlayingCell.html(pauseButtonTemplate);
       $(this).html(playerBarPauseButton);
       currentSoundFile.play();
   } else if (currentSoundFile) {
       $currentlyPlayingCell.html(playButtonTemplate);
       $(this).html(playerBarPlayButton);
       currentSoundFile.pause();
   }
>>>>>>> assignment-20-buzz-library
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
<<<<<<< HEAD
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');
=======
>>>>>>> assignment-20-buzz-library
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
<<<<<<< HEAD
=======

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');
>>>>>>> assignment-20-buzz-library

$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
<<<<<<< HEAD
     $playPauseButton.click(togglePlayFromPlayBar);
=======
     $playPauseButton.click(togglePlayFromPlayerbar);
>>>>>>> assignment-20-buzz-library
 });
