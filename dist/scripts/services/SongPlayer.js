(function() {
    function SongPlayer(Fixtures) {

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

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
         formats: ['mp3'],
         preload: true
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
          if (currentBuzzObject.isPaused()) {

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
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;

        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
      };


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
