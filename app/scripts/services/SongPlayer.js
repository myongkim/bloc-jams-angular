(function() {
    function SongPlayer() {

            var SongPlayer = {};

         /**
         * @desc object holds the current song
         * @type {object}
         */


            var currentSong = null;

         /**
         * @desc object audio file
         * @type {object}

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
         currentSong.playing = null;
     }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
         formats: ['mp3'],
         preload: true
     });

        currentSong = song;
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
    * @function Songplayer.play
    * @desc public method of SongPlyaer that checks if there is a current song playing
    * @param {object} song
    */

         SongPlayer.play = function(song) {
           if (currentSong !== song) {

        setSong(song);
        currentBuzzObject.play();
        song.playing = true;

       } else if (currentSong === song) {
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
          currentBuzzObject.pause();
          song.playing = false;
      };
         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
