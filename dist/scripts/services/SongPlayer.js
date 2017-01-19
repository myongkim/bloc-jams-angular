(function() {
     function SongPlayer($rootScope, Fixtures) {

        var SongPlayer = {};

         /**
         * @desc object holds the current song
         * @type {object}
         */

         var currentAlbum = Fixtures.getAlbum();
         /**
         * @desc album that songs are currently being played from
         * @type {object}
         */

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         var stopSong = function(){
           currentBuzzObject.stop();
           SongPlayer.currentSong.playing = null;
         }

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
            stopSong();
     }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
         formats: ['mp3'],
         preload: true
     });
        currentBuzzObject.bind('timeupdate', function() {
           $rootScope.$apply(function() {
               SongPlayer.currentTime = currentBuzzObject.getTime();
           });
     });

        SongPlayer.currentSong = song;
    };


    /**
    * @function playSong
    * @desc plays song using the buzz library play method
    * @param {object} song
    */

    var playSong = function(song){
        currentBuzzObject.play();
        song.playing = true;
    }

    /**
    * @function getSongIndex
    * @desc returns the index of the song passed to it
    *@param {Object} song
    */

    var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
    };


    SongPlayer.currentSong = null;



    /**
    * @desc Current playback volume
    * @type {number}
    */
    SongPlayer.volume = 80;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;


    /**
    * @function Songplayer.play
    * @desc public method of SongPlyaer that checks if there is a current song playing
    * @param {object} song
    */
    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
            setSong(song);
            currentBuzzObject.play();
            song.playing = true;
        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject != null && currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        }
    };

       /**
       * @function SongPlayer.pause
       * @desc public method of SongPlayer that pauses a song
       * @param {object} song
       */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
      };



      /**
      * @function Songplayer.previous
      * @desc plays the song before the currently playing song
      * @param {}
      */

      SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          stopSong();

        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
      };

      /**
      * @function SongPlayer.next
      * @desc plays the next song, stops when it hits the last song
      * @param {}
      */
      SongPlayer.next = function(){
        var currentSongIndex = getSongIndex(SongPlayer.currentSong)
        currentSongIndex ++;

        if (currentSongIndex >= currentAlbum.songs){
          stopSong();

        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }

      };

      /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */
      SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
          }
      };

      /**
      * @function setVolume
      * @desc Set Volume of currently playing song
      * @ param{Number} Volume
      */
      SongPlayer.setVolume = function(volume){
          if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
          }
      };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
