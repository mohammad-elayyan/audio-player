!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define("Amplitude", [], t)
    : "object" == typeof exports
    ? (exports.Amplitude = t())
    : (e.Amplitude = t());
})(this, function () {
  return (function (e) {
    function t(l) {
      if (a[l]) return a[l].exports;
      var u = (a[l] = { i: l, l: !1, exports: {} });
      return e[l].call(u.exports, u, u.exports, t), (u.l = !0), u.exports;
    }
    var a = {};
    return (
      (t.m = e),
      (t.c = a),
      (t.i = function (e) {
        return e;
      }),
      (t.d = function (e, a, l) {
        t.o(e, a) ||
          Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: l,
          });
      }),
      (t.n = function (e) {
        var a =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(a, "a", a), a;
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ""),
      t((t.s = 47))
    );
  })([
    function (e, t, a) {
      "use strict";
      var l = a(59);
      e.exports = {
        version: l.version,
        audio: new Audio(),
        active_metadata: {},
        active_album: "",
        active_index: 0,
        active_playlist: null,
        playback_speed: 1,
        callbacks: {},
        songs: [],
        playlists: {},
        start_song: "",
        starting_playlist: "",
        starting_playlist_song: "",
        repeat: !1,
        repeat_song: !1,
        shuffle_list: {},
        shuffle_on: !1,
        default_album_art: "",
        default_playlist_art: "",
        debug: !1,
        volume: 0.5,
        pre_mute_volume: 0.5,
        volume_increment: 5,
        volume_decrement: 5,
        soundcloud_client: "",
        soundcloud_use_art: !1,
        soundcloud_song_count: 0,
        soundcloud_songs_ready: 0,
        is_touch_moving: !1,
        buffered: 0,
        bindings: {},
        continue_next: !0,
        delay: 0,
        player_state: "stopped",
        web_audio_api_available: !1,
        context: null,
        source: null,
        analyser: null,
        visualizations: { available: [], active: [], backup: "" },
        waveforms: { sample_rate: 100, built: [] },
      };
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(5),
        d = (l(i), a(3)),
        s = (l(d), a(2)),
        o = (l(s), a(7)),
        f = (l(o), a(9)),
        r = l(f),
        c = a(4),
        p = l(c),
        v = a(16),
        y = l(v),
        g = a(6),
        m = l(g),
        _ = (function () {
          function e() {
            y.default.stop(),
              y.default.run(),
              n.default.active_metadata.live && s(),
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              ) &&
                !n.default.paused &&
                s();
            var e = n.default.audio.play();
            void 0 !== e && e.then(function (e) {}).catch(function (e) {}),
              n.default.audio.play(),
              (n.default.audio.playbackRate = n.default.playback_speed),
              m.default.setPlayerState();
          }
          function t() {
            y.default.stop(),
              n.default.audio.pause(),
              (n.default.paused = !0),
              n.default.active_metadata.live && d(),
              m.default.setPlayerState();
          }
          function a() {
            y.default.stop(),
              0 != n.default.audio.currentTime &&
                (n.default.audio.currentTime = 0),
              n.default.audio.pause(),
              n.default.active_metadata.live && d(),
              m.default.setPlayerState(),
              r.default.run("stop");
          }
          function l(e) {
            (n.default.audio.muted = 0 == e),
              (n.default.volume = e),
              (n.default.audio.volume = e / 100);
          }
          function u(e) {
            n.default.active_metadata.live ||
              (n.default.audio.currentTime =
                n.default.audio.duration * (e / 100));
          }
          function i(e) {
            n.default.audio.addEventListener(
              "canplaythrough",
              function () {
                n.default.audio.duration >= e && e > 0
                  ? (n.default.audio.currentTime = e)
                  : p.default.writeMessage(
                      "Amplitude can't skip to a location greater than the duration of the audio or less than 0"
                    );
              },
              { once: !0 }
            );
          }
          function d() {
            (n.default.audio.src = ""), n.default.audio.load();
          }
          function s() {
            (n.default.audio.src = n.default.active_metadata.url),
              n.default.audio.load();
          }
          function o(e) {
            (n.default.playback_speed = e),
              (n.default.audio.playbackRate = n.default.playback_speed);
          }
          return {
            play: e,
            pause: t,
            stop: a,
            setVolume: l,
            setSongLocation: u,
            skipToLocation: i,
            disconnectStream: d,
            reconnectStream: s,
            setPlaybackSpeed: o,
          };
        })();
      (t.default = _), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            t(), a(), l(), n();
          }
          function t() {
            for (
              var e = u.default.audio.paused ? "paused" : "playing",
                t = document.querySelectorAll(".amplitude-play-pause"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                n = t[a].getAttribute("data-amplitude-song-index");
              if (null == l && null == n)
                switch (e) {
                  case "playing":
                    d(t[a]);
                    break;
                  case "paused":
                    s(t[a]);
                }
            }
          }
          function a() {
            for (
              var e = u.default.audio.paused ? "paused" : "playing",
                t = document.querySelectorAll(
                  '.amplitude-play-pause[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              if (null == t[a].getAttribute("data-amplitude-song-index"))
                switch (e) {
                  case "playing":
                    d(t[a]);
                    break;
                  case "paused":
                    s(t[a]);
                }
            }
          }
          function l() {
            for (
              var e = u.default.audio.paused ? "paused" : "playing",
                t = document.querySelectorAll(
                  '.amplitude-play-pause[data-amplitude-song-index="' +
                    u.default.active_index +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              if (null == t[a].getAttribute("data-amplitude-playlist"))
                switch (e) {
                  case "playing":
                    d(t[a]);
                    break;
                  case "paused":
                    s(t[a]);
                }
            }
          }
          function n() {
            for (
              var e = u.default.audio.paused ? "paused" : "playing",
                t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-play-pause[data-amplitude-song-index="' +
                    t +
                    '"][data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              switch (e) {
                case "playing":
                  d(a[l]);
                  break;
                case "paused":
                  s(a[l]);
              }
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-play-pause"), t = 0;
              t < e.length;
              t++
            )
              s(e[t]);
          }
          function d(e) {
            e.classList.add("amplitude-playing"),
              e.classList.remove("amplitude-paused");
          }
          function s(e) {
            e.classList.remove("amplitude-playing"),
              e.classList.add("amplitude-paused");
          }
          return {
            sync: e,
            syncGlobal: t,
            syncPlaylist: a,
            syncSong: l,
            syncSongInPlaylist: n,
            syncToPause: i,
          };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = l(i),
        s = a(9),
        o = l(s),
        f = a(5),
        r = l(f),
        c = a(2),
        p = l(c),
        v = a(14),
        y = l(v),
        g = a(20),
        m = l(g),
        _ = a(15),
        h = l(_),
        b = a(7),
        A = l(b),
        x = a(49),
        M = l(x),
        P = (function () {
          function e() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              t = null,
              a = {},
              l = !1;
            n.default.repeat_song
              ? n.default.shuffle_on
                ? ((t = n.default.shuffle_list[n.default.active_index].index),
                  (a = n.default.shuffle_list[t]))
                : ((t = n.default.active_index), (a = n.default.songs[t]))
              : n.default.shuffle_on
              ? (parseInt(n.default.active_index) + 1 <
                n.default.shuffle_list.length
                  ? (t = parseInt(n.default.active_index) + 1)
                  : ((t = 0), (l = !0)),
                (a = n.default.shuffle_list[t]))
              : (parseInt(n.default.active_index) + 1 < n.default.songs.length
                  ? (t = parseInt(n.default.active_index) + 1)
                  : ((t = 0), (l = !0)),
                (a = n.default.songs[t])),
              u(a, t),
              (l && !n.default.repeat) ||
                (e && !n.default.repeat && l) ||
                d.default.play(),
              p.default.sync(),
              o.default.run("next"),
              n.default.repeat_song && o.default.run("song_repeated");
          }
          function t(e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              a = null,
              l = {},
              u = !1;
            n.default.repeat_song
              ? n.default.playlists[e].shuffle
                ? ((a = n.default.playlists[e].active_index),
                  (l = n.default.playlists[e].shuffle_list[a]))
                : ((a = n.default.playlists[e].active_index),
                  (l = n.default.playlists[e].songs[a]))
              : n.default.playlists[e].shuffle
              ? (parseInt(n.default.playlists[e].active_index) + 1 <
                n.default.playlists[e].shuffle_list.length
                  ? (a = n.default.playlists[e].active_index + 1)
                  : ((a = 0), (u = !0)),
                (l = n.default.playlists[e].shuffle_list[a]))
              : (parseInt(n.default.playlists[e].active_index) + 1 <
                n.default.playlists[e].songs.length
                  ? (a = parseInt(n.default.playlists[e].active_index) + 1)
                  : ((a = 0), (u = !0)),
                (l = n.default.playlists[e].songs[a])),
              c(e),
              i(e, l, a),
              (u && !n.default.repeat) ||
                (t && !n.default.repeat && u) ||
                d.default.play(),
              p.default.sync(),
              o.default.run("next"),
              n.default.repeat_song && o.default.run("song_repeated");
          }
          function a() {
            var e = null,
              t = {};
            n.default.repeat_song
              ? n.default.shuffle_on
                ? ((e = n.default.active_index),
                  (t = n.default.shuffle_list[e]))
                : ((e = n.default.active_index), (t = n.default.songs[e]))
              : ((e =
                  parseInt(n.default.active_index) - 1 >= 0
                    ? parseInt(n.default.active_index - 1)
                    : parseInt(n.default.songs.length - 1)),
                (t = n.default.shuffle_on
                  ? n.default.shuffle_list[e]
                  : n.default.songs[e])),
              u(t, e),
              d.default.play(),
              p.default.sync(),
              o.default.run("prev"),
              n.default.repeat_song && o.default.run("song_repeated");
          }
          function l(e) {
            var t = null,
              a = {};
            n.default.repeat_song
              ? n.default.playlists[e].shuffle
                ? ((t = n.default.playlists[e].active_index),
                  (a = n.default.playlists[e].shuffle_list[t]))
                : ((t = n.default.playlists[e].active_index),
                  (a = n.default.playlists[e].songs[t]))
              : ((t =
                  parseInt(n.default.playlists[e].active_index) - 1 >= 0
                    ? parseInt(n.default.playlists[e].active_index - 1)
                    : parseInt(n.default.playlists[e].songs.length - 1)),
                (a = n.default.playlists[e].shuffle
                  ? n.default.playlists[e].shuffle_list[t]
                  : n.default.playlists[e].songs[t])),
              c(e),
              i(e, a, t),
              d.default.play(),
              p.default.sync(),
              o.default.run("prev"),
              n.default.repeat_song && o.default.run("song_repeated");
          }
          function u(e, t) {
            var a =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            s(e),
              (n.default.audio.src = e.url),
              (n.default.active_metadata = e),
              (n.default.active_album = e.album),
              (n.default.active_index = parseInt(t)),
              f(a);
          }
          function i(e, t, a) {
            var l =
              arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            s(t),
              (n.default.audio.src = t.url),
              (n.default.active_metadata = t),
              (n.default.active_album = t.album),
              (n.default.active_index = null),
              (n.default.playlists[e].active_index = parseInt(a)),
              f(l);
          }
          function s(e) {
            d.default.stop(),
              p.default.syncToPause(),
              y.default.resetElements(),
              m.default.resetElements(),
              h.default.resetCurrentTimes(),
              r.default.newAlbum(e) && o.default.run("album_change");
          }
          function f(e) {
            A.default.displayMetaData(),
              M.default.setActive(e),
              h.default.resetDurationTimes(),
              o.default.run("song_change");
          }
          function c(e) {
            n.default.active_playlist != e &&
              (o.default.run("playlist_changed"),
              (n.default.active_playlist = e),
              null != e && (n.default.playlists[e].active_index = 0));
          }
          return {
            setNext: e,
            setNextPlaylist: t,
            setPrevious: a,
            setPreviousPlaylist: l,
            changeSong: u,
            changeSongPlaylist: i,
            setActivePlaylist: c,
          };
        })();
      (t.default = P), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            u.default.debug && console.log(e);
          }
          return { writeMessage: e };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e, t) {
            return (
              u.default.active_playlist != e ||
              (null == u.default.active_playlist && null == e
                ? u.default.active_index != t
                : u.default.active_playlist == e &&
                  u.default.playlists[e].active_index != t)
            );
          }
          function t(e) {
            return u.default.active_album != e;
          }
          function a(e) {
            return u.default.active_playlist != e;
          }
          function l(e) {
            return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
              e
            );
          }
          function n(e) {
            return (
              !isNaN(e) && parseInt(Number(e)) == e && !isNaN(parseInt(e, 10))
            );
          }
          return {
            newSong: e,
            newAlbum: t,
            newPlaylist: a,
            isURL: l,
            isInt: n,
          };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            (u.default.audio = new Audio()),
              (u.default.active_metadata = {}),
              (u.default.active_album = ""),
              (u.default.active_index = 0),
              (u.default.active_playlist = null),
              (u.default.playback_speed = 1),
              (u.default.callbacks = {}),
              (u.default.songs = []),
              (u.default.playlists = {}),
              (u.default.start_song = ""),
              (u.default.starting_playlist = ""),
              (u.default.starting_playlist_song = ""),
              (u.default.repeat = !1),
              (u.default.shuffle_list = {}),
              (u.default.shuffle_on = !1),
              (u.default.default_album_art = ""),
              (u.default.default_playlist_art = ""),
              (u.default.debug = !1),
              (u.default.volume = 0.5),
              (u.default.pre_mute_volume = 0.5),
              (u.default.volume_increment = 5),
              (u.default.volume_decrement = 5),
              (u.default.soundcloud_client = ""),
              (u.default.soundcloud_use_art = !1),
              (u.default.soundcloud_song_count = 0),
              (u.default.soundcloud_songs_ready = 0),
              (u.default.continue_next = !0);
          }
          function t() {
            u.default.audio.paused &&
              0 == u.default.audio.currentTime &&
              (u.default.player_state = "stopped"),
              u.default.audio.paused &&
                u.default.audio.currentTime > 0 &&
                (u.default.player_state = "paused"),
              u.default.audio.paused || (u.default.player_state = "playing");
          }
          return { resetConfig: e, setPlayerState: t };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            for (
              var e = [
                  "cover_art_url",
                  "station_art_url",
                  "podcast_episode_cover_art_url",
                ],
                t = document.querySelectorAll("[data-amplitude-song-info]"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-song-info"),
                n = t[a].getAttribute("data-amplitude-playlist"),
                i = t[a].getAttribute("data-amplitude-song-index");
              if (
                null == i &&
                (u.default.active_playlist == n || (null == n && null == i))
              ) {
                var d =
                  void 0 != u.default.active_metadata[l]
                    ? u.default.active_metadata[l]
                    : null;
                e.indexOf(l) >= 0
                  ? ((d = d || u.default.default_album_art),
                    t[a].setAttribute("src", d))
                  : ((d = d || ""), (t[a].innerHTML = d));
              }
            }
          }
          function t() {
            for (
              var e = ["image_url"],
                t = document.querySelectorAll("[data-amplitude-playlist-info]"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist-info"),
                n = t[a].getAttribute("data-amplitude-playlist");
              void 0 != u.default.playlists[n][l]
                ? e.indexOf(l) >= 0
                  ? t[a].setAttribute("src", u.default.playlists[n][l])
                  : (t[a].innerHTML = u.default.playlists[n][l])
                : e.indexOf(l) >= 0
                ? "" != u.default.default_playlist_art
                  ? t[a].setAttribute("src", u.default.default_playlist_art)
                  : t[a].setAttribute("src", "")
                : (t[a].innerHTML = "");
            }
          }
          function a(e, t) {
            for (
              var a = [
                  "cover_art_url",
                  "station_art_url",
                  "podcast_episode_cover_art_url",
                ],
                l = document.querySelectorAll(
                  '[data-amplitude-song-info][data-amplitude-playlist="' +
                    t +
                    '"]'
                ),
                u = 0;
              u < l.length;
              u++
            ) {
              var n = l[u].getAttribute("data-amplitude-song-info");
              l[u].getAttribute("data-amplitude-playlist") == t &&
                (void 0 != e[n]
                  ? a.indexOf(n) >= 0
                    ? l[u].setAttribute("src", e[n])
                    : (l[u].innerHTML = e[n])
                  : a.indexOf(n) >= 0
                  ? "" != e.default_album_art
                    ? l[u].setAttribute("src", e.default_album_art)
                    : l[u].setAttribute("src", "")
                  : (l[u].innerHTML = ""));
            }
          }
          function l() {
            for (
              var e = [
                  "cover_art_url",
                  "station_art_url",
                  "podcast_episode_cover_art_url",
                ],
                a = document.querySelectorAll("[data-amplitude-song-info]"),
                l = 0;
              l < a.length;
              l++
            ) {
              var n = a[l].getAttribute("data-amplitude-song-index"),
                i = a[l].getAttribute("data-amplitude-playlist");
              if (null != n && null == i) {
                var d = a[l].getAttribute("data-amplitude-song-info"),
                  s =
                    void 0 != u.default.songs[n][d]
                      ? u.default.songs[n][d]
                      : null;
                e.indexOf(d) >= 0
                  ? ((s = s || u.default.default_album_art),
                    a[l].setAttribute("src", s))
                  : (a[l].innerHTML = s);
              }
              if (null != n && null != i) {
                var o = a[l].getAttribute("data-amplitude-song-info");
                void 0 != u.default.playlists[i].songs[n][o] &&
                  (e.indexOf(o) >= 0
                    ? a[l].setAttribute(
                        "src",
                        u.default.playlists[i].songs[n][o]
                      )
                    : (a[l].innerHTML = u.default.playlists[i].songs[n][o]));
              }
            }
            t();
          }
          return {
            displayMetaData: e,
            setFirstSongInPlaylist: a,
            syncMetaData: l,
            displayPlaylistMetaData: t,
          };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            for (
              var e = document.getElementsByClassName("amplitude-repeat"),
                t = 0;
              t < e.length;
              t++
            )
              u.default.repeat
                ? (e[t].classList.add("amplitude-repeat-on"),
                  e[t].classList.remove("amplitude-repeat-off"))
                : (e[t].classList.remove("amplitude-repeat-on"),
                  e[t].classList.add("amplitude-repeat-off"));
          }
          function t(e) {
            for (
              var t = document.getElementsByClassName("amplitude-repeat"),
                a = 0;
              a < t.length;
              a++
            )
              t[a].getAttribute("data-amplitude-playlist") == e &&
                (u.default.playlists[e].repeat
                  ? (t[a].classList.add("amplitude-repeat-on"),
                    t[a].classList.remove("amplitude-repeat-off"))
                  : (t[a].classList.add("amplitude-repeat-off"),
                    t[a].classList.remove("amplitude-repeat-on")));
          }
          function a() {
            for (
              var e = document.getElementsByClassName("amplitude-repeat-song"),
                t = 0;
              t < e.length;
              t++
            )
              u.default.repeat_song
                ? (e[t].classList.add("amplitude-repeat-song-on"),
                  e[t].classList.remove("amplitude-repeat-song-off"))
                : (e[t].classList.remove("amplitude-repeat-song-on"),
                  e[t].classList.add("amplitude-repeat-song-off"));
          }
          return { syncRepeat: e, syncRepeatPlaylist: t, syncRepeatSong: a };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(4),
        d = l(i),
        s = (function () {
          function e() {
            n.default.audio.addEventListener("abort", function () {
              t("abort");
            }),
              n.default.audio.addEventListener("error", function () {
                t("error");
              }),
              n.default.audio.addEventListener("loadeddata", function () {
                t("loadeddata");
              }),
              n.default.audio.addEventListener("loadedmetadata", function () {
                t("loadedmetadata");
              }),
              n.default.audio.addEventListener("loadstart", function () {
                t("loadstart");
              }),
              n.default.audio.addEventListener("pause", function () {
                t("pause");
              }),
              n.default.audio.addEventListener("playing", function () {
                t("playing");
              }),
              n.default.audio.addEventListener("play", function () {
                t("play");
              }),
              n.default.audio.addEventListener("progress", function () {
                t("progress");
              }),
              n.default.audio.addEventListener("ratechange", function () {
                t("ratechange");
              }),
              n.default.audio.addEventListener("seeked", function () {
                t("seeked");
              }),
              n.default.audio.addEventListener("seeking", function () {
                t("seeking");
              }),
              n.default.audio.addEventListener("stalled", function () {
                t("stalled");
              }),
              n.default.audio.addEventListener("suspend", function () {
                t("suspend");
              }),
              n.default.audio.addEventListener("timeupdate", function () {
                t("timeupdate");
              }),
              n.default.audio.addEventListener("volumechange", function () {
                t("volumechange");
              }),
              n.default.audio.addEventListener("waiting", function () {
                t("waiting");
              }),
              n.default.audio.addEventListener("canplay", function () {
                t("canplay");
              }),
              n.default.audio.addEventListener("canplaythrough", function () {
                t("canplaythrough");
              }),
              n.default.audio.addEventListener("durationchange", function () {
                t("durationchange");
              }),
              n.default.audio.addEventListener("ended", function () {
                t("ended");
              });
          }
          function t(e) {
            if (n.default.callbacks[e]) {
              var t = n.default.callbacks[e];
              d.default.writeMessage("Running Callback: " + e);
              try {
                t();
              } catch (e) {
                if ("CANCEL EVENT" == e.message) throw e;
                d.default.writeMessage("Callback error: " + e.message);
              }
            }
          }
          return { initialize: e, run: t };
        })();
      (t.default = s), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = (function () {
        function e(e) {
          for (
            var t = document.getElementsByClassName("amplitude-mute"), a = 0;
            a < t.length;
            a++
          )
            e
              ? (t[a].classList.remove("amplitude-not-muted"),
                t[a].classList.add("amplitude-muted"))
              : (t[a].classList.add("amplitude-not-muted"),
                t[a].classList.remove("amplitude-muted"));
        }
        return { setMuted: e };
      })();
      (t.default = l), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            for (
              var e = document.getElementsByClassName(
                  "amplitude-volume-slider"
                ),
                t = 0;
              t < e.length;
              t++
            )
              e[t].value = 100 * u.default.audio.volume;
          }
          return { sync: e };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            u.default.repeat = e;
          }
          function t(e, t) {
            u.default.playlists[t].repeat = e;
          }
          function a(e) {
            u.default.repeat_song = e;
          }
          return { setRepeat: e, setRepeatPlaylist: t, setRepeatSong: a };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            (u.default.shuffle_on = e), e ? n() : (u.default.shuffle_list = []);
          }
          function t() {
            u.default.shuffle_on
              ? ((u.default.shuffle_on = !1), (u.default.shuffle_list = []))
              : ((u.default.shuffle_on = !0), n());
          }
          function a(e, t) {
            (u.default.playlists[e].shuffle = t),
              u.default.playlists[e].shuffle
                ? i(e)
                : (u.default.playlists[e].shuffle_list = []);
          }
          function l(e) {
            u.default.playlists[e].shuffle
              ? ((u.default.playlists[e].shuffle = !1),
                (u.default.playlists[e].shuffle_list = []))
              : ((u.default.playlists[e].shuffle = !0), i(e));
          }
          function n() {
            for (
              var e = new Array(u.default.songs.length), t = 0;
              t < u.default.songs.length;
              t++
            )
              e[t] = u.default.songs[t];
            for (var a = u.default.songs.length - 1; a > 0; a--) {
              d(
                e,
                a,
                Math.floor(Math.random() * u.default.songs.length + 1) - 1
              );
            }
            u.default.shuffle_list = e;
          }
          function i(e) {
            for (
              var t = new Array(u.default.playlists[e].songs.length), a = 0;
              a < u.default.playlists[e].songs.length;
              a++
            )
              t[a] = u.default.playlists[e].songs[a];
            for (var l = u.default.playlists[e].songs.length - 1; l > 0; l--) {
              d(
                t,
                l,
                Math.floor(
                  Math.random() * u.default.playlists[e].songs.length + 1
                ) - 1
              );
            }
            u.default.playlists[e].shuffle_list = t;
          }
          function d(e, t, a) {
            var l = e[t];
            (e[t] = e[a]), (e[a] = l);
          }
          return {
            setShuffle: e,
            toggleShuffle: t,
            setShufflePlaylist: a,
            toggleShufflePlaylist: l,
            shuffleSongs: n,
            shufflePlaylistSongs: i,
          };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e, u, i) {
            t(e), a(e, u), l(e, i), n(e, u);
          }
          function t(e) {
            e = isNaN(e) ? 0 : e;
            for (
              var t = document.querySelectorAll(".amplitude-song-slider"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].value = e);
            }
          }
          function a(e, t) {
            e = isNaN(e) ? 0 : e;
            for (
              var a = document.querySelectorAll(
                  '.amplitude-song-slider[data-amplitude-playlist="' + t + '"]'
                ),
                l = 0;
              l < a.length;
              l++
            ) {
              var u = a[l].getAttribute("data-amplitude-playlist"),
                n = a[l].getAttribute("data-amplitude-song-index");
              u == t && null == n && (a[l].value = e);
            }
          }
          function l(e, t) {
            if (null == u.default.active_playlist) {
              e = isNaN(e) ? 0 : e;
              for (
                var a = document.querySelectorAll(
                    '.amplitude-song-slider[data-amplitude-song-index="' +
                      t +
                      '"]'
                  ),
                  l = 0;
                l < a.length;
                l++
              ) {
                var n = a[l].getAttribute("data-amplitude-playlist"),
                  i = a[l].getAttribute("data-amplitude-song-index");
                null == n && i == t && (a[l].value = e);
              }
            }
          }
          function n(e, t) {
            e = isNaN(e) ? 0 : e;
            for (
              var a =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                l = document.querySelectorAll(
                  '.amplitude-song-slider[data-amplitude-playlist="' +
                    t +
                    '"][data-amplitude-song-index="' +
                    a +
                    '"]'
                ),
                n = 0;
              n < l.length;
              n++
            )
              l[n].value = e;
          }
          function i() {
            for (
              var e = document.getElementsByClassName("amplitude-song-slider"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].value = 0;
          }
          return {
            sync: e,
            syncMain: t,
            syncPlaylist: a,
            syncSong: l,
            syncSongInPlaylist: n,
            resetElements: i,
          };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(53),
        n = l(u),
        i = a(50),
        d = l(i),
        s = a(51),
        o = l(s),
        f = a(52),
        r = l(f),
        c = a(54),
        p = l(c),
        v = a(55),
        y = l(v),
        g = a(56),
        m = l(g),
        _ = a(57),
        h = l(_),
        b = a(58),
        A = l(b),
        x = (function () {
          function e() {
            n.default.resetTimes(),
              d.default.resetTimes(),
              o.default.resetTimes(),
              r.default.resetTimes();
          }
          function t(e) {
            n.default.sync(e),
              d.default.sync(e.hours),
              o.default.sync(e.minutes),
              r.default.sync(e.seconds);
          }
          function a() {
            p.default.resetTimes(),
              y.default.resetTimes(),
              m.default.resetTimes(),
              h.default.resetTimes(),
              A.default.resetTimes();
          }
          function l(e, t) {
            p.default.sync(e, t),
              A.default.sync(t),
              y.default.sync(t.hours),
              m.default.sync(t.minutes),
              h.default.sync(t.seconds);
          }
          return {
            resetCurrentTimes: e,
            syncCurrentTimes: t,
            resetDurationTimes: a,
            syncDurationTimes: l,
          };
        })();
      (t.default = x), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(4),
        d =
          (l(i),
          (function () {
            function e() {
              var e = document.querySelectorAll(".amplitude-visualization");
              if (n.default.web_audio_api_available) {
                if (
                  Object.keys(n.default.visualizations.available).length > 0 &&
                  e.length > 0
                )
                  for (var i = 0; i < e.length; i++) {
                    var d = e[i].getAttribute("data-amplitude-playlist"),
                      s = e[i].getAttribute("data-amplitude-song-index");
                    null == d && null == s && t(e[i]),
                      null != d && null == s && a(e[i], d),
                      null == d && null != s && l(e[i], s),
                      null != d && null != s && u(e[i], d, s);
                  }
              } else o();
            }
            function t(e) {
              var t = n.default.visualization,
                a =
                  null != n.default.active_index
                    ? n.default.songs[n.default.active_index].visualization
                    : n.default.playlists[n.default.active_playlist].songs[
                        n.default.playlists[n.default.active_playlist]
                          .active_index
                      ].visualization;
              if (
                void 0 != a &&
                void 0 != n.default.visualizations.available[a]
              )
                i(a, e);
              else if (
                void 0 != t &&
                void 0 != n.default.visualizations.available[t]
              )
                i(t, e);
              else {
                var l =
                  Object.keys(n.default.visualizations.available).length > 0
                    ? Object.keys(n.default.visualizations.available)[0]
                    : null;
                null != l && i(l, e);
              }
            }
            function a(e, t) {
              if (t == n.default.active_playlist) {
                var a =
                    n.default.playlists[n.default.active_playlist].songs[
                      n.default.playlists[n.default.active_playlist]
                        .active_index
                    ].visualization,
                  l =
                    n.default.playlists[n.default.active_playlist]
                      .visualization,
                  u = n.default.visualization;
                if (
                  void 0 != a &&
                  void 0 != n.default.visualizations.available[a]
                )
                  i(a, e);
                else if (
                  void 0 != l &&
                  void 0 != n.default.visualizations.available[l]
                )
                  i(l, e);
                else if (
                  void 0 != u &&
                  void 0 != n.default.visualizations.available[u]
                )
                  i(u, e);
                else {
                  var d =
                    Object.keys(n.default.visualizations.available).length > 0
                      ? Object.keys(n.default.visualizations.available)[0]
                      : null;
                  null != d && i(d, e);
                }
              }
            }
            function l(e, t) {
              if (t == n.default.active_index) {
                var a = n.default.songs[n.default.active_index].visualization,
                  l = n.default.visualization;
                if (
                  void 0 != a &&
                  void 0 != n.default.visualizations.available[a]
                )
                  i(a, e);
                else if (
                  void 0 != l &&
                  void 0 != n.default.visualizations.available[l]
                )
                  i(l, e);
                else {
                  var u =
                    Object.keys(n.default.visualizations.available).length > 0
                      ? Object.keys(n.default.visualizations.available)[0]
                      : null;
                  null != u && i(u, e);
                }
              }
            }
            function u(e, t, a) {
              if (
                t == n.default.active_playlist &&
                n.default.playlists[t].active_index == a
              ) {
                var l =
                    n.default.playlists[n.default.active_playlist].songs[
                      n.default.playlists[n.default.active_playlist]
                        .active_index
                    ].visualization,
                  u =
                    n.default.playlists[n.default.active_playlist]
                      .visualization,
                  d = n.default.visualization;
                if (
                  void 0 != l &&
                  void 0 != n.default.visualizations.available[l]
                )
                  i(l, e);
                else if (
                  void 0 != u &&
                  void 0 != n.default.visualizations.available[u]
                )
                  i(u, e);
                else if (
                  void 0 != d &&
                  void 0 != n.default.visualizations.available[d]
                )
                  i(d, e);
                else {
                  var s =
                    Object.keys(n.default.visualizations.available).length > 0
                      ? Object.keys(n.default.visualizations.available)[0]
                      : null;
                  null != s && i(s, e);
                }
              }
            }
            function i(e, t) {
              var a = new n.default.visualizations.available[e].object();
              a.setPreferences(
                n.default.visualizations.available[e].preferences
              ),
                a.startVisualization(t),
                n.default.visualizations.active.push(a);
            }
            function d() {
              for (var e = 0; e < n.default.visualizations.active.length; e++)
                n.default.visualizations.active[e].stopVisualization();
              n.default.visualizations.active = [];
            }
            function s(e, t) {
              var a = new e();
              (n.default.visualizations.available[a.getID()] = new Array()),
                (n.default.visualizations.available[a.getID()].object = e),
                (n.default.visualizations.available[a.getID()].preferences = t);
            }
            function o() {
              var e = document.querySelectorAll(".amplitude-visualization");
              if (e.length > 0)
                for (var t = 0; t < e.length; t++) {
                  var a = e[t].getAttribute("data-amplitude-playlist"),
                    l = e[t].getAttribute("data-amplitude-song-index");
                  null == a && null == l && f(e[t]),
                    null != a && null == l && r(e[t], a),
                    null == a && null != l && c(e[t], l),
                    null != a && null != l && p(e[t], a, l);
                }
            }
            function f(e) {
              e.style.backgroundImage =
                "url(" + n.default.active_metadata.cover_art_url + ")";
            }
            function r(e, t) {
              n.default.active_playlist == t &&
                (e.style.backgroundImage =
                  "url(" + n.default.active_metadata.cover_art_url + ")");
            }
            function c(e, t) {
              n.default.active_index == t &&
                (e.style.backgroundImage =
                  "url(" + n.default.active_metadata.cover_art_url + ")");
            }
            function p(e, t, a) {
              n.default.active_playlist == t &&
                n.default.playlists[active_playlist].active_index == a &&
                (e.style.backgroundImage =
                  "url(" + n.default.active_metadata.cover_art_url + ")");
            }
            return { run: e, stop: d, register: s };
          })());
      (t.default = d), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(21),
        d = l(i),
        s = (function () {
          function e(e) {
            s = e;
            var a = document.getElementsByTagName("head")[0],
              l = document.createElement("script");
            (l.type = "text/javascript"),
              (l.src = "https://connect.soundcloud.com/sdk.js"),
              (l.onreadystatechange = t),
              (l.onload = t),
              a.appendChild(l);
          }
          function t() {
            SC.initialize({ client_id: n.default.soundcloud_client }), a();
          }
          function a() {
            for (
              var e = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/, t = 0;
              t < n.default.songs.length;
              t++
            )
              n.default.songs[t].url.match(e) &&
                (n.default.soundcloud_song_count++,
                u(n.default.songs[t].url, t));
          }
          function l(e, t, a) {
            var l =
              arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            SC.get("/resolve/?url=" + e, function (e) {
              e.streamable
                ? null != t
                  ? ((n.default.playlists[t].songs[a].url =
                      e.stream_url +
                      "?client_id=" +
                      n.default.soundcloud_client),
                    l &&
                      (n.default.playlists[t].shuffle_list[a].url =
                        e.stream_url +
                        "?client_id=" +
                        n.default.soundcloud_client),
                    n.default.soundcloud_use_art &&
                      ((n.default.playlists[t].songs[a].cover_art_url =
                        e.artwork_url),
                      l &&
                        (n.default.playlists[t].shuffle_list[a].cover_art_url =
                          e.artwork_url)),
                    (n.default.playlists[t].songs[a].soundcloud_data = e),
                    l &&
                      (n.default.playlists[t].shuffle_list[a].soundcloud_data =
                        e))
                  : ((n.default.songs[a].url =
                      e.stream_url +
                      "?client_id=" +
                      n.default.soundcloud_client),
                    l &&
                      (n.default.shuffle_list[a].stream_url,
                      n.default.soundcloud_client),
                    n.default.soundcloud_use_art &&
                      ((n.default.songs[a].cover_art_url = e.artwork_url),
                      l &&
                        (n.default.shuffle_list[a].cover_art_url =
                          e.artwork_url)),
                    (n.default.songs[a].soundcloud_data = e),
                    l && (n.default.shuffle_list[a].soundcloud_data = e))
                : null != t
                ? AmplitudeHelpers.writeDebugMessage(
                    n.default.playlists[t].songs[a].name +
                      " by " +
                      n.default.playlists[t].songs[a].artist +
                      " is not streamable by the Soundcloud API"
                  )
                : AmplitudeHelpers.writeDebugMessage(
                    n.default.songs[a].name +
                      " by " +
                      n.default.songs[a].artist +
                      " is not streamable by the Soundcloud API"
                  );
            });
          }
          function u(e, t) {
            SC.get("/resolve/?url=" + e, function (e) {
              e.streamable
                ? ((n.default.songs[t].url =
                    e.stream_url + "?client_id=" + n.default.soundcloud_client),
                  n.default.soundcloud_use_art &&
                    (n.default.songs[t].cover_art_url = e.artwork_url),
                  (n.default.songs[t].soundcloud_data = e))
                : AmplitudeHelpers.writeDebugMessage(
                    n.default.songs[t].name +
                      " by " +
                      n.default.songs[t].artist +
                      " is not streamable by the Soundcloud API"
                  ),
                ++n.default.soundcloud_songs_ready ==
                  n.default.soundcloud_song_count && d.default.setConfig(s);
            });
          }
          function i(e) {
            var t = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;
            return e.match(t);
          }
          var s = {};
          return {
            loadSoundCloud: e,
            resolveIndividualStreamableURL: l,
            isSoundCloudURL: i,
          };
        })();
      (t.default = s), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            for (
              var e = document.getElementsByClassName(
                  "amplitude-playback-speed"
                ),
                t = 0;
              t < e.length;
              t++
            )
              switch (
                (e[t].classList.remove("amplitude-playback-speed-10"),
                e[t].classList.remove("amplitude-playback-speed-15"),
                e[t].classList.remove("amplitude-playback-speed-20"),
                u.default.playback_speed)
              ) {
                case 1:
                  e[t].classList.add("amplitude-playback-speed-10");
                  break;
                case 1.5:
                  e[t].classList.add("amplitude-playback-speed-15");
                  break;
                case 2:
                  e[t].classList.add("amplitude-playback-speed-20");
              }
          }
          return { sync: e };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            for (
              var e = document.getElementsByClassName("amplitude-shuffle"),
                t = 0;
              t < e.length;
              t++
            )
              null == e[t].getAttribute("data-amplitude-playlist") &&
                (u.default.shuffle_on
                  ? (e[t].classList.add("amplitude-shuffle-on"),
                    e[t].classList.remove("amplitude-shuffle-off"))
                  : (e[t].classList.add("amplitude-shuffle-off"),
                    e[t].classList.remove("amplitude-shuffle-on")));
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-shuffle[data-amplitude-playlist="' + e + '"]'
                ),
                a = 0;
              a < t.length;
              a++
            )
              u.default.playlists[e].shuffle
                ? (t[a].classList.add("amplitude-shuffle-on"),
                  t[a].classList.remove("amplitude-shuffle-off"))
                : (t[a].classList.add("amplitude-shuffle-off"),
                  t[a].classList.remove("amplitude-shuffle-on"));
          }
          return { syncMain: e, syncPlaylist: t };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            if (!isNaN(e))
              for (
                var t = document.querySelectorAll(
                    ".amplitude-song-played-progress"
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist"),
                  u = t[a].getAttribute("data-amplitude-song-index");
                if (null == l && null == u) {
                  var n = t[a].max;
                  t[a].value = (e / 100) * n;
                }
              }
          }
          function a(e) {
            if (!isNaN(e))
              for (
                var t = document.querySelectorAll(
                    '.amplitude-song-played-progress[data-amplitude-playlist="' +
                      u.default.active_playlist +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-song-index");
                if (null == l) {
                  var n = t[a].max;
                  t[a].value = (e / 100) * n;
                }
              }
          }
          function l(e) {
            if (null == u.default.active_playlist && !isNaN(e))
              for (
                var t = document.querySelectorAll(
                    '.amplitude-song-played-progress[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                if (null == l) {
                  var n = t[a].max;
                  t[a].value = (e / 100) * n;
                }
              }
          }
          function n(e) {
            if (!isNaN(e))
              for (
                var t =
                    "" != u.default.active_playlist &&
                    null != u.default.active_playlist
                      ? u.default.playlists[u.default.active_playlist]
                          .active_index
                      : null,
                  a = document.querySelectorAll(
                    '.amplitude-song-played-progress[data-amplitude-playlist="' +
                      u.default.active_playlist +
                      '"][data-amplitude-song-index="' +
                      t +
                      '"]'
                  ),
                  l = 0;
                l < a.length;
                l++
              ) {
                var n = a[l].getAttribute("data-amplitude-playlist"),
                  i = a[l].getAttribute("data-amplitude-song-index");
                if (null != n && null != i) {
                  var d = a[l].max;
                  a[l].value = (e / 100) * d;
                }
              }
          }
          function i() {
            for (
              var e = document.getElementsByClassName(
                  "amplitude-song-played-progress"
                ),
                t = 0;
              t < e.length;
              t++
            )
              e[t].value = 0;
          }
          return { sync: e, resetElements: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              },
        n = a(0),
        i = l(n),
        d = a(1),
        s = l(d),
        o = a(17),
        f = l(o),
        r = a(6),
        c = l(r),
        p = a(4),
        v = l(p),
        y = a(5),
        g = l(y),
        m = a(13),
        _ = l(m),
        h = a(26),
        b = l(h),
        A = a(46),
        x = l(A),
        M = a(16),
        P = l(M),
        S = a(22),
        L = l(S),
        w = a(3),
        E = l(w),
        k = a(9),
        T = l(k),
        O = a(48),
        C = l(O),
        N = a(19),
        j = l(N),
        I = a(10),
        q = l(I),
        z = a(11),
        H = l(z),
        B = a(15),
        D = l(B),
        R = a(2),
        V = l(R),
        U = a(7),
        F = l(U),
        W = a(18),
        G = l(W),
        Y = a(8),
        X = l(Y),
        J = (function () {
          function e(e) {
            var t = !1;
            if (
              (c.default.resetConfig(),
              b.default.initialize(),
              T.default.initialize(),
              (i.default.debug = void 0 != e.debug && e.debug),
              l(e),
              e.songs
                ? 0 != e.songs.length
                  ? ((i.default.songs = e.songs), (t = !0))
                  : v.default.writeMessage(
                      "Please add some songs, to your songs object!"
                    )
                : v.default.writeMessage(
                    "Please provide a songs object for AmplitudeJS to run!"
                  ),
              x.default.webAudioAPIAvailable())
            ) {
              if (
                x.default.determineUsingAnyFX() &&
                (x.default.configureWebAudioAPI(),
                document.documentElement.addEventListener(
                  "mousedown",
                  function () {
                    "running" !== i.default.context.state &&
                      i.default.context.resume();
                  }
                ),
                document.documentElement.addEventListener(
                  "keydown",
                  function () {
                    "running" !== i.default.context.state &&
                      i.default.context.resume();
                  }
                ),
                document.documentElement.addEventListener("keyup", function () {
                  "running" !== i.default.context.state &&
                    i.default.context.resume();
                }),
                void 0 != e.waveforms &&
                  void 0 != e.waveforms.sample_rate &&
                  (i.default.waveforms.sample_rate = e.waveforms.sample_rate),
                L.default.init(),
                void 0 != e.visualizations && e.visualizations.length > 0)
              )
                for (var u = 0; u < e.visualizations.length; u++)
                  P.default.register(
                    e.visualizations[u].object,
                    e.visualizations[u].params
                  );
            } else
              v.default.writeMessage(
                "The Web Audio API is not available on this platform. We are using your defined backups!"
              );
            if ((o(), r(), t)) {
              (i.default.soundcloud_client =
                void 0 != e.soundcloud_client ? e.soundcloud_client : ""),
                (i.default.soundcloud_use_art =
                  void 0 != e.soundcloud_use_art ? e.soundcloud_use_art : "");
              var n = {};
              "" != i.default.soundcloud_client
                ? ((n = e), f.default.loadSoundCloud(n))
                : a(e);
            }
            v.default.writeMessage("Initialized With: "),
              v.default.writeMessage(i.default);
          }
          function t() {
            b.default.initialize(), F.default.displayMetaData();
          }
          function a(e) {
            e.playlists &&
              d(e.playlists) > 0 &&
              C.default.initialize(e.playlists),
              void 0 == e.start_song || e.starting_playlist
                ? E.default.changeSong(i.default.songs[0], 0)
                : g.default.isInt(e.start_song)
                ? E.default.changeSong(
                    i.default.songs[e.start_song],
                    e.start_song
                  )
                : v.default.writeMessage(
                    "You must enter an integer index for the start song."
                  ),
              void 0 != e.shuffle_on &&
                e.shuffle_on &&
                ((i.default.shuffle_on = !0),
                _.default.shuffleSongs(),
                E.default.changeSong(i.default.shuffle_list[0], 0)),
              (i.default.continue_next =
                void 0 == e.continue_next || e.continue_next),
              (i.default.playback_speed =
                void 0 != e.playback_speed ? e.playback_speed : 1),
              s.default.setPlaybackSpeed(i.default.playback_speed),
              (i.default.audio.preload =
                void 0 != e.preload ? e.preload : "auto"),
              (i.default.callbacks = void 0 != e.callbacks ? e.callbacks : {}),
              (i.default.bindings = void 0 != e.bindings ? e.bindings : {}),
              (i.default.volume = void 0 != e.volume ? e.volume : 50),
              (i.default.delay = void 0 != e.delay ? e.delay : 0),
              (i.default.volume_increment =
                void 0 != e.volume_increment ? e.volume_increment : 5),
              (i.default.volume_decrement =
                void 0 != e.volume_decrement ? e.volume_decrement : 5),
              s.default.setVolume(i.default.volume),
              l(e),
              n(),
              void 0 != e.starting_playlist &&
                "" != e.starting_playlist &&
                ((i.default.active_playlist = e.starting_playlist),
                void 0 != e.starting_playlist_song &&
                "" != e.starting_playlist_song
                  ? void 0 !=
                    u(
                      e.playlists[e.starting_playlist].songs[
                        parseInt(e.starting_playlist_song)
                      ]
                    )
                    ? E.default.changeSongPlaylist(
                        i.default.active_playlist,
                        e.playlists[e.starting_playlist].songs[
                          parseInt(e.starting_playlist_song)
                        ],
                        parseInt(e.starting_playlist_song)
                      )
                    : (E.default.changeSongPlaylist(
                        i.default.active_playlist,
                        e.playlists[e.starting_playlist].songs[0],
                        0
                      ),
                      v.default.writeMessage(
                        "The index of " +
                          e.starting_playlist_song +
                          " does not exist in the playlist " +
                          e.starting_playlist
                      ))
                  : E.default.changeSong(
                      i.default.active_playlist,
                      e.playlists[e.starting_playlist].songs[0],
                      0
                    ),
                V.default.sync()),
              T.default.run("initialized");
          }
          function l(e) {
            void 0 != e.default_album_art
              ? (i.default.default_album_art = e.default_album_art)
              : (i.default.default_album_art = ""),
              void 0 != e.default_playlist_art
                ? (i.default.default_playlist_art = e.default_playlist_art)
                : (i.default.default_playlist_art = "");
          }
          function n() {
            j.default.syncMain(),
              q.default.setMuted(0 == i.default.volume),
              H.default.sync(),
              G.default.sync(),
              D.default.resetCurrentTimes(),
              V.default.syncToPause(),
              F.default.syncMetaData(),
              X.default.syncRepeatSong();
          }
          function d(e) {
            var t = 0,
              a = void 0;
            for (a in e) e.hasOwnProperty(a) && t++;
            return (
              v.default.writeMessage(
                "You have " + t + " playlist(s) in your config"
              ),
              t
            );
          }
          function o() {
            for (var e = 0; e < i.default.songs.length; e++)
              void 0 == i.default.songs[e].live &&
                (i.default.songs[e].live = !1);
          }
          function r() {
            for (var e = 0; e < i.default.songs.length; e++)
              i.default.songs[e].index = e;
          }
          return { initialize: e, setConfig: a, rebindDisplay: t };
        })();
      (t.default = J), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            c = u.default.waveforms.sample_rate;
            var e = document.querySelectorAll(".amplitude-wave-form");
            if (e.length > 0)
              for (var t = 0; t < e.length; t++) {
                e[t].innerHTML = "";
                var a = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "svg"
                );
                a.setAttribute("viewBox", "0 -1 " + c + " 2"),
                  a.setAttribute("preserveAspectRatio", "none");
                var l = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "g"
                );
                a.appendChild(l);
                var n = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "path"
                );
                n.setAttribute("d", ""),
                  n.setAttribute("id", "waveform"),
                  l.appendChild(n),
                  e[t].appendChild(a);
              }
          }
          function t() {
            if (u.default.web_audio_api_available)
              if (
                void 0 ==
                u.default.waveforms.built[
                  Math.abs(
                    u.default.audio.src.split("").reduce(function (e, t) {
                      return (e = (e << 5) - e + t.charCodeAt(0)) & e;
                    }, 0)
                  )
                ]
              ) {
                var e = new XMLHttpRequest();
                e.open("GET", u.default.audio.src, !0),
                  (e.responseType = "arraybuffer"),
                  (e.onreadystatechange = function (t) {
                    4 == e.readyState &&
                      200 == e.status &&
                      u.default.context.decodeAudioData(
                        e.response,
                        function (e) {
                          (r = e), (p = l(c, r)), a(c, r, p);
                        }
                      );
                  }),
                  e.send();
              } else
                n(
                  u.default.waveforms.built[
                    Math.abs(
                      u.default.audio.src.split("").reduce(function (e, t) {
                        return (e = (e << 5) - e + t.charCodeAt(0)) & e;
                      }, 0)
                    )
                  ]
                );
          }
          function a(e, t, a) {
            if (t) {
              for (var l = a.length, i = "", d = 0; d < l; d++)
                i +=
                  d % 2 == 0
                    ? " M" + ~~(d / 2) + ", " + a.shift()
                    : " L" + ~~(d / 2) + ", " + a.shift();
              (u.default.waveforms.built[
                Math.abs(
                  u.default.audio.src.split("").reduce(function (e, t) {
                    return (e = (e << 5) - e + t.charCodeAt(0)) & e;
                  }, 0)
                )
              ] = i),
                n(
                  u.default.waveforms.built[
                    Math.abs(
                      u.default.audio.src.split("").reduce(function (e, t) {
                        return (e = (e << 5) - e + t.charCodeAt(0)) & e;
                      }, 0)
                    )
                  ]
                );
            }
          }
          function l(e, t) {
            for (
              var a = t.length / e,
                l = ~~(a / 10) || 1,
                u = t.numberOfChannels,
                n = [],
                i = 0;
              i < u;
              i++
            )
              for (var d = [], s = t.getChannelData(i), o = 0; o < e; o++) {
                for (
                  var f = ~~(o * a), r = ~~(f + a), c = s[0], p = s[0], v = f;
                  v < r;
                  v += l
                ) {
                  var y = s[v];
                  y > p && (p = y), y < c && (c = y);
                }
                (d[2 * o] = p),
                  (d[2 * o + 1] = c),
                  (0 === i || p > n[2 * o]) && (n[2 * o] = p),
                  (0 === i || c < n[2 * o + 1]) && (n[2 * o + 1] = c);
              }
            return n;
          }
          function n(e) {
            for (
              var t = document.querySelectorAll(".amplitude-wave-form"), a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && i(t[a], e),
                null != l && null == u && d(t[a], e, l),
                null == l && null != u && s(t[a], e, u),
                null != l && null != u && o(t[a], e, l, u);
            }
          }
          function i(e, t) {
            e.querySelector("svg g path").setAttribute("d", t);
          }
          function d(e, t, a) {
            if (u.default.active_playlist == a) {
              e.querySelector("svg g path").setAttribute("d", t);
            }
          }
          function s(e, t, a) {
            if (u.default.active_index == a) {
              e.querySelector("svg g path").setAttribute("d", t);
            }
          }
          function o(e, t, a, l) {
            if (
              u.default.active_playlist == a &&
              u.default.playlists[u.default.active_playlist].active_index == l
            ) {
              e.querySelector("svg g path").setAttribute("d", t);
            }
          }
          function f() {
            return document.querySelectorAll(".amplitude-wave-form").length > 0;
          }
          var r = "",
            c = "",
            p = "";
          return { init: e, build: t, determineIfUsingWaveforms: f };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            var e = {},
              t =
                (Math.floor(u.default.audio.currentTime % 60) < 10 ? "0" : "") +
                Math.floor(u.default.audio.currentTime % 60),
              a = Math.floor(u.default.audio.currentTime / 60),
              l = "00";
            return (
              a < 10 && (a = "0" + a),
              a >= 60 &&
                ((l = Math.floor(a / 60)), (a %= 60) < 10 && (a = "0" + a)),
              (e.seconds = t),
              (e.minutes = a),
              (e.hours = l),
              e
            );
          }
          function t() {
            var e = {},
              t =
                (Math.floor(u.default.audio.duration % 60) < 10 ? "0" : "") +
                Math.floor(u.default.audio.duration % 60),
              a = Math.floor(u.default.audio.duration / 60),
              l = "00";
            return (
              a < 10 && (a = "0" + a),
              a >= 60 &&
                ((l = Math.floor(a / 60)), (a %= 60) < 10 && (a = "0" + a)),
              (e.seconds = isNaN(t) ? "00" : t),
              (e.minutes = isNaN(a) ? "00" : a),
              (e.hours = isNaN(l) ? "00" : l.toString()),
              e
            );
          }
          function a() {
            return (
              (u.default.audio.currentTime / u.default.audio.duration) * 100
            );
          }
          function l(e) {
            u.default.active_metadata.live ||
              (isFinite(e) && (u.default.audio.currentTime = e));
          }
          return {
            computeCurrentTimes: e,
            computeSongDuration: t,
            computeSongCompletionPercentage: a,
            setCurrentTime: l,
          };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            t(), a(), l(), n();
          }
          function t() {
            for (
              var e = document.getElementsByClassName(
                  "amplitude-buffered-progress"
                ),
                t = 0;
              t < e.length;
              t++
            ) {
              var a = e[t].getAttribute("data-amplitude-playlist"),
                l = e[t].getAttribute("data-amplitude-song-index");
              null != a ||
                null != l ||
                isNaN(u.default.buffered) ||
                (e[t].value = parseFloat(parseFloat(u.default.buffered) / 100));
            }
          }
          function a() {
            for (
              var e = document.querySelectorAll(
                  '.amplitude-buffered-progress[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                t = 0;
              t < e.length;
              t++
            ) {
              null != e[t].getAttribute("data-amplitude-song-index") ||
                isNaN(u.default.buffered) ||
                (e[t].value = parseFloat(parseFloat(u.default.buffered) / 100));
            }
          }
          function l() {
            for (
              var e = document.querySelectorAll(
                  '.amplitude-buffered-progress[data-amplitude-song-index="' +
                    u.default.active_index +
                    '"]'
                ),
                t = 0;
              t < e.length;
              t++
            ) {
              null != e[t].getAttribute("data-amplitude-playlist") ||
                isNaN(u.default.buffered) ||
                (e[t].value = parseFloat(parseFloat(u.default.buffered) / 100));
            }
          }
          function n() {
            for (
              var e =
                  null != u.default.active_playlist &&
                  "" != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                t = document.querySelectorAll(
                  '.amplitude-buffered-progress[data-amplitude-song-index="' +
                    e +
                    '"][data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            )
              isNaN(u.default.buffered) ||
                (t[a].value = parseFloat(parseFloat(u.default.buffered) / 100));
          }
          function i() {
            for (
              var e = document.getElementsByClassName(
                  "amplitude-buffered-progress"
                ),
                t = 0;
              t < e.length;
              t++
            )
              e[t].value = 0;
          }
          return { sync: e, reset: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(3),
        d = l(i),
        s = a(1),
        o = l(s),
        f = a(2),
        r = l(f),
        c = (function () {
          function e() {
            setTimeout(function () {
              n.default.continue_next
                ? "" == n.default.active_playlist ||
                  null == n.default.active_playlist
                  ? d.default.setNext(!0)
                  : d.default.setNextPlaylist(n.default.active_playlist, !0)
                : n.default.is_touch_moving ||
                  (o.default.stop(), r.default.sync());
            }, n.default.delay);
          }
          return { handle: e };
        })();
      (t.default = c), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(27),
        d = l(i),
        s = a(42),
        o = l(s),
        f = a(25),
        r = l(f),
        c = a(35),
        p = l(c),
        v = a(31),
        y = l(v),
        g = a(30),
        m = l(g),
        _ = a(32),
        h = l(_),
        b = a(41),
        A = l(b),
        x = a(28),
        M = l(x),
        P = a(45),
        S = l(P),
        L = a(43),
        w = l(L),
        E = a(40),
        k = l(E),
        T = a(44),
        O = l(T),
        C = a(29),
        N = l(C),
        j = a(34),
        I = l(j),
        q = a(36),
        z = l(q),
        H = a(37),
        B = l(H),
        D = a(33),
        R = l(D),
        V = a(38),
        U = l(V),
        F = a(39),
        W = l(F),
        G = a(22),
        Y = l(G),
        X = a(4),
        J = l(X),
        $ = (function () {
          function e() {
            J.default.writeMessage(
              "Beginning initialization of event handlers.."
            ),
              document.addEventListener("touchmove", function () {
                n.default.is_touch_moving = !0;
              }),
              document.addEventListener("touchend", function () {
                n.default.is_touch_moving && (n.default.is_touch_moving = !1);
              }),
              t(),
              a(),
              l(),
              u(),
              i(),
              s(),
              f(),
              c(),
              v(),
              g(),
              _(),
              b(),
              x(),
              P(),
              L(),
              E(),
              T(),
              C(),
              j(),
              q(),
              H();
          }
          function t() {
            n.default.audio.removeEventListener("timeupdate", o.default.handle),
              n.default.audio.addEventListener("timeupdate", o.default.handle),
              n.default.audio.removeEventListener(
                "durationchange",
                o.default.handle
              ),
              n.default.audio.addEventListener(
                "durationchange",
                o.default.handle
              );
          }
          function a() {
            document.removeEventListener("keydown", d.default.handle),
              document.addEventListener("keydown", d.default.handle);
          }
          function l() {
            n.default.audio.removeEventListener("ended", r.default.handle),
              n.default.audio.addEventListener("ended", r.default.handle);
          }
          function u() {
            n.default.audio.removeEventListener("progress", p.default.handle),
              n.default.audio.addEventListener("progress", p.default.handle);
          }
          function i() {
            for (
              var e = document.getElementsByClassName("amplitude-play"), t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", y.default.handle),
                  e[t].addEventListener("touchend", y.default.handle))
                : (e[t].removeEventListener("click", y.default.handle),
                  e[t].addEventListener("click", y.default.handle));
          }
          function s() {
            for (
              var e = document.getElementsByClassName("amplitude-pause"), t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", m.default.handle),
                  e[t].addEventListener("touchend", m.default.handle))
                : (e[t].removeEventListener("click", m.default.handle),
                  e[t].addEventListener("click", m.default.handle));
          }
          function f() {
            for (
              var e = document.getElementsByClassName("amplitude-play-pause"),
                t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", h.default.handle),
                  e[t].addEventListener("touchend", h.default.handle))
                : (e[t].removeEventListener("click", h.default.handle),
                  e[t].addEventListener("click", h.default.handle));
          }
          function c() {
            for (
              var e = document.getElementsByClassName("amplitude-stop"), t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", A.default.handle),
                  e[t].addEventListener("touchend", A.default.handle))
                : (e[t].removeEventListener("click", A.default.handle),
                  e[t].addEventListener("click", A.default.handle));
          }
          function v() {
            for (
              var e = document.getElementsByClassName("amplitude-mute"), t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? /iPhone|iPad|iPod/i.test(navigator.userAgent)
                  ? J.default.writeMessage(
                      "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
                    )
                  : (e[t].removeEventListener("touchend", M.default.handle),
                    e[t].addEventListener("touchend", M.default.handle))
                : (e[t].removeEventListener("click", M.default.handle),
                  e[t].addEventListener("click", M.default.handle));
          }
          function g() {
            for (
              var e = document.getElementsByClassName("amplitude-volume-up"),
                t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? /iPhone|iPad|iPod/i.test(navigator.userAgent)
                  ? J.default.writeMessage(
                      "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
                    )
                  : (e[t].removeEventListener("touchend", S.default.handle),
                    e[t].addEventListener("touchend", S.default.handle))
                : (e[t].removeEventListener("click", S.default.handle),
                  e[t].addEventListener("click", S.default.handle));
          }
          function _() {
            for (
              var e = document.getElementsByClassName("amplitude-volume-down"),
                t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? /iPhone|iPad|iPod/i.test(navigator.userAgent)
                  ? J.default.writeMessage(
                      "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
                    )
                  : (e[t].removeEventListener("touchend", w.default.handle),
                    e[t].addEventListener("touchend", w.default.handle))
                : (e[t].removeEventListener("click", w.default.handle),
                  e[t].addEventListener("click", w.default.handle));
          }
          function b() {
            for (
              var e = window.navigator.userAgent,
                t = e.indexOf("MSIE "),
                a = document.getElementsByClassName("amplitude-song-slider"),
                l = 0;
              l < a.length;
              l++
            )
              t > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)
                ? (a[l].removeEventListener("change", k.default.handle),
                  a[l].addEventListener("change", k.default.handle))
                : (a[l].removeEventListener("input", k.default.handle),
                  a[l].addEventListener("input", k.default.handle));
          }
          function x() {
            for (
              var e = window.navigator.userAgent,
                t = e.indexOf("MSIE "),
                a = document.getElementsByClassName("amplitude-volume-slider"),
                l = 0;
              l < a.length;
              l++
            )
              /iPhone|iPad|iPod/i.test(navigator.userAgent)
                ? J.default.writeMessage(
                    "iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4"
                  )
                : t > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)
                ? (a[l].removeEventListener("change", O.default.handle),
                  a[l].addEventListener("change", O.default.handle))
                : (a[l].removeEventListener("input", O.default.handle),
                  a[l].addEventListener("input", O.default.handle));
          }
          function P() {
            for (
              var e = document.getElementsByClassName("amplitude-next"), t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", N.default.handle),
                  e[t].addEventListener("touchend", N.default.handle))
                : (e[t].removeEventListener("click", N.default.handle),
                  e[t].addEventListener("click", N.default.handle));
          }
          function L() {
            for (
              var e = document.getElementsByClassName("amplitude-prev"), t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", I.default.handle),
                  e[t].addEventListener("touchend", I.default.handle))
                : (e[t].removeEventListener("click", I.default.handle),
                  e[t].addEventListener("click", I.default.handle));
          }
          function E() {
            for (
              var e = document.getElementsByClassName("amplitude-shuffle"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].classList.remove("amplitude-shuffle-on"),
                e[t].classList.add("amplitude-shuffle-off"),
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                )
                  ? (e[t].removeEventListener("touchend", U.default.handle),
                    e[t].addEventListener("touchend", U.default.handle))
                  : (e[t].removeEventListener("click", U.default.handle),
                    e[t].addEventListener("click", U.default.handle));
          }
          function T() {
            for (
              var e = document.getElementsByClassName("amplitude-repeat"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].classList.remove("amplitude-repeat-on"),
                e[t].classList.add("amplitude-repeat-off"),
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                )
                  ? (e[t].removeEventListener("touchend", z.default.handle),
                    e[t].addEventListener("touchend", z.default.handle))
                  : (e[t].removeEventListener("click", z.default.handle),
                    e[t].addEventListener("click", z.default.handle));
          }
          function C() {
            for (
              var e = document.getElementsByClassName("amplitude-repeat-song"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].classList.remove("amplitude-repeat-on"),
                e[t].classList.add("amplitude-repeat-off"),
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                )
                  ? (e[t].removeEventListener("touchend", B.default.handle),
                    e[t].addEventListener("touchend", B.default.handle))
                  : (e[t].removeEventListener("click", B.default.handle),
                    e[t].addEventListener("click", B.default.handle));
          }
          function j() {
            for (
              var e = document.getElementsByClassName(
                  "amplitude-playback-speed"
                ),
                t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", R.default.handle),
                  e[t].addEventListener("touchend", R.default.handle))
                : (e[t].removeEventListener("click", R.default.handle),
                  e[t].addEventListener("click", R.default.handle));
          }
          function q() {
            for (
              var e = document.getElementsByClassName("amplitude-skip-to"),
                t = 0;
              t < e.length;
              t++
            )
              /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              )
                ? (e[t].removeEventListener("touchend", W.default.handle),
                  e[t].addEventListener("touchend", W.default.handle))
                : (e[t].removeEventListener("click", W.default.handle),
                  e[t].addEventListener("click", W.default.handle));
          }
          function H() {
            Y.default.determineIfUsingWaveforms() &&
              (n.default.audio.removeEventListener(
                "canplaythrough",
                Y.default.build
              ),
              n.default.audio.addEventListener(
                "canplaythrough",
                Y.default.build
              ));
          }
          return { initialize: e };
        })();
      (t.default = $), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = l(i),
        s = a(13),
        o = l(s),
        f = a(12),
        r = l(f),
        c = a(3),
        p = l(c),
        v = a(8),
        y = l(v),
        g = a(2),
        m = l(g),
        _ = (function () {
          function e(e) {
            t(e.which);
          }
          function t(e) {
            if (void 0 != n.default.bindings[e])
              switch (n.default.bindings[e]) {
                case "play_pause":
                  a();
                  break;
                case "next":
                  l();
                  break;
                case "prev":
                  u();
                  break;
                case "stop":
                  i();
                  break;
                case "shuffle":
                  s();
                  break;
                case "repeat":
                  f();
              }
          }
          function a() {
            n.default.audio.paused ? d.default.play() : d.default.pause(),
              m.default.sync();
          }
          function l() {
            "" == n.default.active_playlist || null == n.default.active_playlist
              ? p.default.setNext()
              : p.default.setNextPlaylist(n.default.active_playlist);
          }
          function u() {
            "" == n.default.active_playlist || null == n.default.active_playlist
              ? p.default.setPrevious()
              : p.default.setPreviousPlaylist(n.default.active_playlist);
          }
          function i() {
            m.default.syncToPause(), d.default.stop();
          }
          function s() {
            "" == n.default.active_playlist || null == n.default.active_playlist
              ? o.default.toggleShuffle()
              : o.default.toggleShufflePlaylist(n.default.active_playlist);
          }
          function f() {
            r.default.setRepeat(!n.default.repeat), y.default.syncRepeat();
          }
          return { handle: e };
        })();
      (t.default = _), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = l(i),
        s = a(10),
        o = l(s),
        f = a(11),
        r = l(f),
        c = (function () {
          function e() {
            n.default.is_touch_moving ||
              (0 == n.default.volume
                ? d.default.setVolume(n.default.pre_mute_volume)
                : ((n.default.pre_mute_volume = n.default.volume),
                  d.default.setVolume(0)),
              o.default.setMuted(0 == n.default.volume),
              r.default.sync());
          }
          return { handle: e };
        })();
      (t.default = c), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = (l(i), a(2)),
        s = (l(d), a(9)),
        o = (l(s), a(3)),
        f = l(o),
        r = a(4),
        c = l(r),
        p = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-playlist");
              null == e && t(), null != e && a(e);
            }
          }
          function t() {
            "" == n.default.active_playlist || null == n.default.active_playlist
              ? f.default.setNext()
              : f.default.setNextPlaylist(n.default.active_playlist);
          }
          function a(e) {
            e == n.default.active_playlist
              ? f.default.setNextPlaylist(e)
              : c.default.writeMessage(
                  "You can not go to the next song on a playlist that is not being played!"
                );
          }
          return { handle: e };
        })();
      (t.default = p), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(6),
        d = (l(i), a(1)),
        s = l(d),
        o = a(2),
        f = l(o),
        r = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-song-index"),
                i = this.getAttribute("data-amplitude-playlist");
              null == i && null == e && t(),
                null != i && null == e && a(i),
                null == i && null != e && l(e),
                null != i && null != e && u(i, e);
            }
          }
          function t() {
            s.default.pause(), f.default.sync();
          }
          function a(e) {
            n.default.active_playlist == e &&
              (s.default.pause(), f.default.sync());
          }
          function l(e) {
            ("" != n.default.active_playlist &&
              null != n.default.active_playlist) ||
              n.default.active_index != e ||
              (s.default.pause(), f.default.sync());
          }
          function u(e, t) {
            n.default.active_playlist == e &&
              n.default.playlists[e].active_index == t &&
              (s.default.pause(), f.default.sync());
          }
          return { handle: e };
        })();
      (t.default = r), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(6),
        d = (l(i), a(1)),
        s = l(d),
        o = a(5),
        f = l(o),
        r = a(3),
        c = l(r),
        p = a(2),
        v = l(p),
        y = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-song-index"),
                i = this.getAttribute("data-amplitude-playlist");
              null == i && null == e && t(),
                null != i && null == e && a(i),
                null == i && null != e && l(e),
                null != i && null != e && u(i, e);
            }
          }
          function t() {
            s.default.play(), v.default.sync();
          }
          function a(e) {
            f.default.newPlaylist(e) &&
              (c.default.setActivePlaylist(e),
              n.default.playlists[e].shuffle
                ? c.default.changeSongPlaylist(
                    e,
                    n.default.playlists[e].shuffle_list[0],
                    0
                  )
                : c.default.changeSongPlaylist(
                    e,
                    n.default.playlists[e].songs[0],
                    0
                  )),
              s.default.play(),
              v.default.sync();
          }
          function l(e) {
            f.default.newPlaylist(null) &&
              (c.default.setActivePlaylist(null),
              c.default.changeSong(n.default.songs[e], e)),
              f.default.newSong(null, e) &&
                c.default.changeSong(n.default.songs[e], e),
              s.default.play(),
              v.default.sync();
          }
          function u(e, t) {
            f.default.newPlaylist(e) &&
              (c.default.setActivePlaylist(e),
              c.default.changeSongPlaylist(
                e,
                n.default.playlists[e].songs[t],
                t
              )),
              f.default.newSong(e, t) &&
                c.default.changeSongPlaylist(
                  e,
                  n.default.playlists[e].songs[t],
                  t
                ),
              s.default.play(),
              v.default.sync();
          }
          return { handle: e };
        })();
      (t.default = y), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(6),
        d = (l(i), a(1)),
        s = l(d),
        o = a(5),
        f = l(o),
        r = a(3),
        c = l(r),
        p = a(2),
        v = l(p),
        y = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-playlist"),
                i = this.getAttribute("data-amplitude-song-index");
              null == e && null == i && t(),
                null != e && null == i && a(e),
                null == e && null != i && l(i),
                null != e && null != i && u(e, i);
            }
          }
          function t() {
            n.default.audio.paused ? s.default.play() : s.default.pause(),
              v.default.sync();
          }
          function a(e) {
            f.default.newPlaylist(e) &&
              (c.default.setActivePlaylist(e),
              n.default.playlists[e].shuffle
                ? c.default.changeSongPlaylist(
                    e,
                    n.default.playlists[e].shuffle_list[0],
                    0,
                    !0
                  )
                : c.default.changeSongPlaylist(
                    e,
                    n.default.playlists[e].songs[0],
                    0
                  )),
              n.default.audio.paused ? s.default.play() : s.default.pause(),
              v.default.sync();
          }
          function l(e) {
            f.default.newPlaylist(null) &&
              (c.default.setActivePlaylist(null),
              c.default.changeSong(n.default.songs[e], e, !0)),
              f.default.newSong(null, e) &&
                c.default.changeSong(n.default.songs[e], e, !0),
              n.default.audio.paused ? s.default.play() : s.default.pause(),
              v.default.sync();
          }
          function u(e, t) {
            f.default.newPlaylist(e) &&
              (c.default.setActivePlaylist(e),
              c.default.changeSongPlaylist(
                e,
                n.default.playlists[e].songs[t],
                t,
                !0
              )),
              f.default.newSong(e, t) &&
                c.default.changeSongPlaylist(
                  e,
                  n.default.playlists[e].songs[t],
                  t,
                  !0
                ),
              n.default.audio.paused ? s.default.play() : s.default.pause(),
              v.default.sync();
          }
          return { handle: e };
        })();
      (t.default = y), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = l(i),
        s = a(18),
        o = l(s),
        f = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              switch (n.default.playback_speed) {
                case 1:
                  d.default.setPlaybackSpeed(1.5);
                  break;
                case 1.5:
                  d.default.setPlaybackSpeed(2);
                  break;
                case 2:
                  d.default.setPlaybackSpeed(1);
              }
              o.default.sync();
            }
          }
          return { handle: e };
        })();
      (t.default = f), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(3),
        d = l(i),
        s = a(4),
        o = l(s),
        f = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-playlist");
              null == e && t(), null != e && a(e);
            }
          }
          function t() {
            "" == n.default.active_playlist || null == n.default.active_playlist
              ? d.default.setPrevious()
              : d.default.setPreviousPlaylist(n.default.active_playlist);
          }
          function a(e) {
            e == n.default.active_playlist
              ? d.default.setPreviousPlaylist(n.default.active_playlist)
              : o.default.writeMessage(
                  "You can not go to the previous song on a playlist that is not being played!"
                );
          }
          return { handle: e };
        })();
      (t.default = f), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(24),
        d = l(i),
        s = (function () {
          function e() {
            if (n.default.audio.buffered.length - 1 >= 0) {
              var e = n.default.audio.buffered.end(
                  n.default.audio.buffered.length - 1
                ),
                t = n.default.audio.duration;
              n.default.buffered = (e / t) * 100;
            }
            d.default.sync();
          }
          return { handle: e };
        })();
      (t.default = s), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(12),
        d = l(i),
        s = a(8),
        o = l(s),
        f = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-playlist");
              null == e && t(), null != e && a(e);
            }
          }
          function t() {
            d.default.setRepeat(!n.default.repeat), o.default.syncRepeat();
          }
          function a(e) {
            d.default.setRepeatPlaylist(!n.default.playlists[e].repeat, e),
              o.default.syncRepeatPlaylist(e);
          }
          return { handle: e };
        })();
      (t.default = f), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(12),
        d = l(i),
        s = a(8),
        o = l(s),
        f = (function () {
          function e() {
            n.default.is_touch_moving ||
              (d.default.setRepeatSong(!n.default.repeat_song),
              o.default.syncRepeatSong());
          }
          return { handle: e };
        })();
      (t.default = f), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(13),
        d = l(i),
        s = a(19),
        o = l(s),
        f = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-playlist");
              null == e ? t() : a(e);
            }
          }
          function t() {
            d.default.toggleShuffle(), o.default.syncMain(n.default.shuffle_on);
          }
          function a(e) {
            d.default.toggleShufflePlaylist(e), o.default.syncPlaylist(e);
          }
          return { handle: e };
        })();
      (t.default = f), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(4),
        d = l(i),
        s = a(3),
        o = l(s),
        f = a(5),
        r = l(f),
        c = a(1),
        p = l(c),
        v = a(2),
        y = l(v),
        g = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = this.getAttribute("data-amplitude-playlist"),
                l = this.getAttribute("data-amplitude-song-index"),
                u = this.getAttribute("data-amplitude-location");
              null == u &&
                d.default.writeMessage(
                  "You must add an 'data-amplitude-location' attribute in seconds to your 'amplitude-skip-to' element."
                ),
                null == l &&
                  d.default.writeMessage(
                    "You must add an 'data-amplitude-song-index' attribute to your 'amplitude-skip-to' element."
                  ),
                null != u &&
                  null != l &&
                  (null == e
                    ? t(parseInt(l), parseInt(u))
                    : a(e, parseInt(l), parseInt(u)));
            }
          }
          function t(e, t) {
            o.default.changeSong(n.default.songs[e], e),
              p.default.play(),
              y.default.syncGlobal(),
              y.default.syncSong(),
              p.default.skipToLocation(t);
          }
          function a(e, t, a) {
            r.default.newPlaylist(e) && o.default.setActivePlaylist(e),
              o.default.changeSongPlaylist(
                e,
                n.default.playlists[e].songs[t],
                t
              ),
              p.default.play(),
              y.default.syncGlobal(),
              y.default.syncPlaylist(),
              y.default.syncSong(),
              p.default.skipToLocation(a);
          }
          return { handle: e };
        })();
      (t.default = g), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(23),
        d = l(i),
        s = a(14),
        o = l(s),
        f = (function () {
          function e() {
            var e = this.value,
              i = n.default.audio.duration * (e / 100),
              d = this.getAttribute("data-amplitude-playlist"),
              s = this.getAttribute("data-amplitude-song-index");
            null == d && null == s && t(i, e),
              null != d && null == s && a(i, e, d),
              null == d && null != s && l(i, e, s),
              null != d && null != s && u(i, e, d, s);
          }
          function t(e, t) {
            n.default.active_metadata.live ||
              (d.default.setCurrentTime(e),
              o.default.sync(
                t,
                n.default.active_playlist,
                n.default.active_index
              ));
          }
          function a(e, t, a) {
            n.default.active_playlist == a &&
              (n.default.active_metadata.live ||
                (d.default.setCurrentTime(e),
                o.default.sync(t, a, n.default.active_index)));
          }
          function l(e, t, a) {
            n.default.active_index == a &&
              null == n.default.active_playlist &&
              (n.default.active_metadata.live ||
                (d.default.setCurrentTime(e),
                o.default.sync(t, n.default.active_playlist, a)));
          }
          function u(e, t, a, l) {
            n.default.playlists[a].active_index == l &&
              n.default.active_playlist == a &&
              (n.default.active_metadata.live ||
                (d.default.setCurrentTime(e), o.default.sync(t, a, l)));
          }
          return { handle: e };
        })();
      (t.default = f), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(6),
        d = (l(i), a(2)),
        s = l(d),
        o = a(1),
        f = l(o),
        r = (function () {
          function e() {
            n.default.is_touch_moving ||
              (s.default.syncToPause(), f.default.stop());
          }
          return { handle: e };
        })();
      (t.default = r), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(24),
        d = l(i),
        s = a(15),
        o = l(s),
        f = a(14),
        r = l(f),
        c = a(20),
        p = l(c),
        v = a(23),
        y = l(v),
        g = a(9),
        m =
          (l(g),
          (function () {
            function e() {
              t(), d.default.sync(), a(), l();
            }
            function t() {
              if (n.default.audio.buffered.length - 1 >= 0) {
                var e = n.default.audio.buffered.end(
                    n.default.audio.buffered.length - 1
                  ),
                  t = n.default.audio.duration;
                n.default.buffered = (e / t) * 100;
              }
            }
            function a() {
              if (!n.default.active_metadata.live) {
                var e = y.default.computeCurrentTimes(),
                  t = y.default.computeSongCompletionPercentage(),
                  a = y.default.computeSongDuration();
                o.default.syncCurrentTimes(e),
                  r.default.sync(
                    t,
                    n.default.active_playlist,
                    n.default.active_index
                  ),
                  p.default.sync(t),
                  o.default.syncDurationTimes(e, a);
              }
            }
            function l() {
              var e = Math.floor(n.default.audio.currentTime);
              if (
                void 0 != n.default.active_metadata.time_callbacks &&
                void 0 != n.default.active_metadata.time_callbacks[e]
              )
                n.default.active_metadata.time_callbacks[e].run ||
                  ((n.default.active_metadata.time_callbacks[e].run = !0),
                  n.default.active_metadata.time_callbacks[e]());
              else
                for (var t in n.default.active_metadata.time_callbacks)
                  n.default.active_metadata.time_callbacks.hasOwnProperty(t) &&
                    (n.default.active_metadata.time_callbacks[t].run = !1);
            }
            return { handle: e };
          })());
      (t.default = m), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = l(i),
        s = a(10),
        o = l(s),
        f = a(11),
        r = l(f),
        c = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = null;
              (e =
                n.default.volume - n.default.volume_increment > 0
                  ? n.default.volume - n.default.volume_increment
                  : 0),
                d.default.setVolume(e),
                o.default.setMuted(0 == n.default.volume),
                r.default.sync();
            }
          }
          return { handle: e };
        })();
      (t.default = c), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = l(i),
        s = a(10),
        o = l(s),
        f = a(11),
        r = l(f),
        c = (function () {
          function e() {
            d.default.setVolume(this.value),
              o.default.setMuted(0 == n.default.volume),
              r.default.sync();
          }
          return { handle: e };
        })();
      (t.default = c), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(1),
        d = l(i),
        s = a(10),
        o = l(s),
        f = a(11),
        r = l(f),
        c = (function () {
          function e() {
            if (!n.default.is_touch_moving) {
              var e = null;
              (e =
                n.default.volume + n.default.volume_increment <= 100
                  ? n.default.volume + n.default.volume_increment
                  : 100),
                d.default.setVolume(e),
                o.default.setMuted(0 == n.default.volume),
                r.default.sync();
            }
          }
          return { handle: e };
        })();
      (t.default = c), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e() {
            var e =
              window.AudioContext ||
              window.webkitAudioContext ||
              window.mozAudioContext ||
              window.oAudioContext ||
              window.msAudioContext;
            e
              ? ((u.default.context = new e()),
                (u.default.analyser = u.default.context.createAnalyser()),
                (u.default.audio.crossOrigin = "anonymous"),
                (u.default.source = u.default.context.createMediaElementSource(
                  u.default.audio
                )),
                u.default.source.connect(u.default.analyser),
                u.default.analyser.connect(u.default.context.destination))
              : AmplitudeHelpers.writeDebugMessage(
                  "Web Audio API is unavailable! We will set any of your visualizations with your back up definition!"
                );
          }
          function t() {
            var e =
              window.AudioContext ||
              window.webkitAudioContext ||
              window.mozAudioContext ||
              window.oAudioContext ||
              window.msAudioContext;
            return (
              (u.default.web_audio_api_available = !1),
              e
                ? ((u.default.web_audio_api_available = !0), !0)
                : ((u.default.web_audio_api_available = !1), !1)
            );
          }
          function a() {
            var e = document.querySelectorAll(".amplitude-wave-form"),
              t = document.querySelectorAll(".amplitude-visualization");
            return e.length > 0 || t.length > 0;
          }
          return {
            configureWebAudioAPI: e,
            webAudioAPIAvailable: t,
            determineUsingAnyFX: a,
          };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(21),
        n = l(u),
        i = a(0),
        d = l(i),
        s = a(1),
        o = l(s),
        f = a(13),
        r = l(f),
        c = a(6),
        p = (l(c), a(3)),
        v = l(p),
        y = a(12),
        g = l(y),
        m = a(5),
        _ = l(m),
        h = a(16),
        b = l(h),
        A = a(19),
        x = l(A),
        M = a(8),
        P = l(M),
        S = a(14),
        L = l(S),
        w = a(20),
        E = l(w),
        k = a(15),
        T = l(k),
        O = a(2),
        C = l(O),
        N = a(7),
        j = l(N),
        I = a(18),
        q = l(I),
        z = a(4),
        H = l(z),
        B = a(17),
        D = l(B),
        R = (function () {
          function e(e) {
            n.default.initialize(e);
          }
          function t() {
            return d.default;
          }
          function a() {
            n.default.rebindDisplay();
          }
          function l() {
            return d.default.active_playlist;
          }
          function u() {
            return d.default.playback_speed;
          }
          function i(e) {
            o.default.setPlaybackSpeed(e), q.default.sync();
          }
          function s() {
            return d.default.repeat;
          }
          function f(e) {
            return d.default.playlists[e].repeat;
          }
          function c() {
            return d.default.shuffle_on;
          }
          function p(e) {
            return d.default.playlists[e].shuffle;
          }
          function y(e) {
            r.default.setShuffle(e), x.default.syncMain();
          }
          function m(e, t) {
            r.default.setShufflePlaylist(e, t),
              x.default.syncMain(),
              x.default.syncPlaylist(e);
          }
          function h(e) {
            g.default.setRepeat(e), P.default.syncRepeat();
          }
          function A(e, t) {
            g.default.setRepeatPlaylist(t, e), P.default.syncRepeatPlaylist(e);
          }
          function M(e) {
            d.default.is_touch_moving ||
              (g.default.setRepeatSong(!d.default.repeat_song),
              P.default.syncRepeatSong());
          }
          function S() {
            return d.default.default_album_art;
          }
          function w() {
            return d.default.default_playlist_art;
          }
          function k(e) {
            d.default.default_album_art = e;
          }
          function O(e) {
            d.default.default_plalist_art = e;
          }
          function N() {
            return (
              (d.default.audio.currentTime / d.default.audio.duration) * 100
            );
          }
          function I() {
            return d.default.audio.currentTime;
          }
          function z() {
            return d.default.audio.duration;
          }
          function B(e) {
            "number" == typeof e &&
              e > 0 &&
              e < 100 &&
              (d.default.audio.currentTime =
                d.default.audio.duration * (e / 100));
          }
          function R(e) {
            d.default.debug = e;
          }
          function V() {
            return d.default.active_metadata;
          }
          function U() {
            return d.default.playlists[d.default.active_playlist];
          }
          function F(e) {
            return d.default.songs[e];
          }
          function W(e, t) {
            return d.default.playlists[e].songs[t];
          }
          function G(e) {
            return (
              void 0 == d.default.songs && (d.default.songs = []),
              d.default.songs.push(e),
              d.default.shuffle_on && d.default.shuffle_list.push(e),
              D.default.isSoundCloudURL(e.url) &&
                D.default.resolveIndividualStreamableURL(
                  e.url,
                  null,
                  d.default.songs.length - 1,
                  d.default.shuffle_on
                ),
              d.default.songs.length - 1
            );
          }
          function Y(e) {
            return (
              void 0 == d.default.songs && (d.default.songs = []),
              d.default.songs.unshift(e),
              d.default.shuffle_on && d.default.shuffle_list.unshift(e),
              D.default.isSoundCloudURL(e.url) &&
                D.default.resolveIndividualStreamableURL(
                  e.url,
                  null,
                  d.default.songs.length - 1,
                  d.default.shuffle_on
                ),
              0
            );
          }
          function X(e, t) {
            return void 0 != d.default.playlists[t]
              ? (d.default.playlists[t].songs.push(e),
                d.default.playlists[t].shuffle &&
                  d.default.playlists[t].shuffle_list.push(e),
                D.default.isSoundCloudURL(e.url) &&
                  D.default.resolveIndividualStreamableURL(
                    e.url,
                    t,
                    d.default.playlists[t].songs.length - 1,
                    d.default.playlists[t].shuffle
                  ),
                d.default.playlists[t].songs.length - 1)
              : (H.default.writeMessage("Playlist doesn't exist!"), null);
          }
          function J(e, t, a) {
            if (void 0 == d.default.playlists[e]) {
              d.default.playlists[e] = {};
              var l = ["repeat", "shuffle", "shuffle_list", "songs", "src"];
              for (var u in t)
                l.indexOf(u) < 0 && (d.default.playlists[e][u] = t[u]);
              return (
                (d.default.playlists[e].songs = a),
                (d.default.playlists[e].active_index = null),
                (d.default.playlists[e].repeat = !1),
                (d.default.playlists[e].shuffle = !1),
                (d.default.playlists[e].shuffle_list = []),
                d.default.playlists[e]
              );
            }
            return (
              H.default.writeMessage(
                "A playlist already exists with that key!"
              ),
              null
            );
          }
          function $(e) {
            d.default.songs.splice(e, 1);
          }
          function Q(e, t) {
            void 0 != d.default.playlists[t] &&
              d.default.playlists[t].songs.splice(e, 1);
          }
          function K(e) {
            e.url
              ? ((d.default.audio.src = e.url),
                (d.default.active_metadata = e),
                (d.default.active_album = e.album))
              : H.default.writeMessage("The song needs to have a URL!"),
              o.default.play(),
              C.default.sync(),
              j.default.displayMetaData(),
              L.default.resetElements(),
              E.default.resetElements(),
              T.default.resetCurrentTimes(),
              T.default.resetDurationTimes();
          }
          function Z(e) {
            o.default.stop(),
              _.default.newPlaylist(null) &&
                (v.default.setActivePlaylist(null),
                v.default.changeSong(d.default.songs[e], e)),
              _.default.newSong(null, e) &&
                v.default.changeSong(d.default.songs[e], e),
              o.default.play(),
              C.default.sync();
          }
          function ee(e, t) {
            o.default.stop(),
              _.default.newPlaylist(t) &&
                (v.default.setActivePlaylist(t),
                v.default.changeSongPlaylist(
                  t,
                  d.default.playlists[t].songs[e],
                  e
                )),
              _.default.newSong(t, e) &&
                v.default.changeSongPlaylist(
                  t,
                  d.default.playlists[t].songs[e],
                  e
                ),
              C.default.sync(),
              o.default.play();
          }
          function te() {
            o.default.play();
          }
          function ae() {
            o.default.pause();
          }
          function le() {
            o.default.stop();
          }
          function ue() {
            return d.default.audio;
          }
          function ne() {
            return d.default.analyser;
          }
          function ie() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            "" == e || null == e
              ? null == d.default.active_playlist ||
                "" == d.default.active_playlist
                ? v.default.setNext()
                : v.default.setNextPlaylist(d.default.active_playlist)
              : v.default.setNextPlaylist(e);
          }
          function de() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            "" == e || null == e
              ? null == d.default.active_playlist ||
                "" == d.default.active_playlist
                ? v.default.setPrevious()
                : v.default.setPreviousPlaylist(d.default.active_playlist)
              : v.default.setPreviousPlaylist(e);
          }
          function se() {
            return d.default.songs;
          }
          function oe(e) {
            return d.default.playlists[e].songs;
          }
          function fe() {
            return d.default.shuffle_on
              ? d.default.shuffle_list
              : d.default.songs;
          }
          function re(e) {
            return d.default.playlists[e].shuffle
              ? d.default.playlists[e].shuffle_list
              : d.default.playlists[e].songs;
          }
          function ce() {
            return parseInt(d.default.active_index);
          }
          function pe() {
            return d.default.version;
          }
          function ve() {
            return d.default.buffered;
          }
          function ye(e, t) {
            var a =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (e = parseInt(e)),
              null != a
                ? (_.default.newPlaylist(a) && v.default.setActivePlaylist(a),
                  v.default.changeSongPlaylist(
                    a,
                    d.default.playlists[a].songs[t],
                    t
                  ),
                  o.default.play(),
                  C.default.syncGlobal(),
                  C.default.syncPlaylist(),
                  C.default.syncSong(),
                  o.default.skipToLocation(e))
                : (v.default.changeSong(d.default.songs[t], t),
                  o.default.play(),
                  C.default.syncGlobal(),
                  C.default.syncSong(),
                  o.default.skipToLocation(e));
          }
          function ge(e, t) {
            var a =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            if ("" != a && null != a && void 0 != d.default.playlists[a])
              for (var l in t)
                t.hasOwnProperty(l) &&
                  "url" != l &&
                  "URL" != l &&
                  "live" != l &&
                  "LIVE" != l &&
                  (d.default.playlists[a].songs[e][l] = t[l]);
            else
              for (var l in t)
                t.hasOwnProperty(l) &&
                  "url" != l &&
                  "URL" != l &&
                  "live" != l &&
                  "LIVE" != l &&
                  (d.default.songs[e][l] = t[l]);
            j.default.displayMetaData(), j.default.syncMetaData();
          }
          function me(e, t) {
            if (void 0 != d.default.playlists[e]) {
              var a = ["repeat", "shuffle", "shuffle_list", "songs", "src"];
              for (var l in t)
                t.hasOwnProperty(l) &&
                  a.indexOf(l) < 0 &&
                  (d.default.playlists[e][l] = t[l]);
              j.default.displayPlaylistMetaData();
            } else
              H.default.writeMessage("You must provide a valid playlist key!");
          }
          function _e(e) {
            d.default.delay = e;
          }
          function he() {
            return d.default.delay;
          }
          function be() {
            return d.default.player_state;
          }
          function Ae(e, t) {
            b.default.register(e, t);
          }
          function xe(e, t) {
            void 0 != d.default.playlists[e]
              ? void 0 != d.default.visualizations.available[t]
                ? (d.default.playlists[e].visualization = t)
                : H.default.writeMessage(
                    "A visualization does not exist for the key provided."
                  )
              : H.default.writeMessage(
                  "The playlist for the key provided does not exist"
                );
          }
          function Me(e, t) {
            d.default.songs[e]
              ? void 0 != d.default.visualizations.available[t]
                ? (d.default.songs[e].visualization = t)
                : H.default.writeMessage(
                    "A visualization does not exist for the key provided."
                  )
              : H.default.writeMessage("A song at that index is undefined");
          }
          function Pe(e, t, a) {
            void 0 != d.default.playlists[e].songs[t]
              ? void 0 != d.default.visualizations.available[a]
                ? (d.default.playlists[e].songs[t].visualization = a)
                : H.default.writeMessage(
                    "A visualization does not exist for the key provided."
                  )
              : H.default.writeMessage(
                  "The song in the playlist at that key is not defined"
                );
          }
          function Se(e) {
            void 0 != d.default.visualizations.available[e]
              ? (d.default.visualization = e)
              : H.default.writeMessage(
                  "A visualization does not exist for the key provided."
                );
          }
          function Le(e) {
            o.default.setVolume(e);
          }
          function we() {
            return d.default.volume;
          }
          return {
            init: e,
            getConfig: t,
            bindNewElements: a,
            getActivePlaylist: l,
            getPlaybackSpeed: u,
            setPlaybackSpeed: i,
            getRepeat: s,
            getRepeatPlaylist: f,
            getShuffle: c,
            getShufflePlaylist: p,
            setShuffle: y,
            setShufflePlaylist: m,
            setRepeat: h,
            setRepeatSong: M,
            setRepeatPlaylist: A,
            getDefaultAlbumArt: S,
            setDefaultAlbumArt: k,
            getDefaultPlaylistArt: w,
            setDefaultPlaylistArt: O,
            getSongPlayedPercentage: N,
            setSongPlayedPercentage: B,
            getSongPlayedSeconds: I,
            getSongDuration: z,
            setDebug: R,
            getActiveSongMetadata: V,
            getActivePlaylistMetadata: U,
            getSongAtIndex: F,
            getSongAtPlaylistIndex: W,
            addSong: G,
            prependSong: Y,
            addSongToPlaylist: X,
            removeSong: $,
            removeSongFromPlaylist: Q,
            playNow: K,
            playSongAtIndex: Z,
            playPlaylistSongAtIndex: ee,
            play: te,
            pause: ae,
            stop: le,
            getAudio: ue,
            getAnalyser: ne,
            next: ie,
            prev: de,
            getSongs: se,
            getSongsInPlaylist: oe,
            getSongsState: fe,
            getSongsStatePlaylist: re,
            getActiveIndex: ce,
            getVersion: pe,
            getBuffered: ve,
            skipTo: ye,
            setSongMetaData: ge,
            setPlaylistMetaData: me,
            setDelay: _e,
            getDelay: he,
            getPlayerState: be,
            addPlaylist: J,
            registerVisualization: Ae,
            setPlaylistVisualization: xe,
            setSongVisualization: Me,
            setSongInPlaylistVisualization: Pe,
            setGlobalVisualization: Se,
            getVolume: we,
            setVolume: Le,
          };
        })();
      (t.default = R), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = a(0),
        n = l(u),
        i = a(4),
        d = l(i),
        s = a(5),
        o = l(s),
        f = a(7),
        r = l(f),
        c = a(17),
        p = l(c),
        v = (function () {
          function e(e) {
            (n.default.playlists = e), a(), l(), t(), u(), i(), s(), f();
          }
          function t() {
            for (var e in n.default.playlists)
              n.default.playlists[e].active_index = null;
          }
          function a() {
            for (var e in n.default.playlists)
              if (
                n.default.playlists.hasOwnProperty(e) &&
                n.default.playlists[e].songs
              )
                for (var t = 0; t < n.default.playlists[e].songs.length; t++)
                  o.default.isInt(n.default.playlists[e].songs[t]) &&
                    ((n.default.playlists[e].songs[t] =
                      n.default.songs[n.default.playlists[e].songs[t]]),
                    (n.default.playlists[e].songs[t].index = t)),
                    o.default.isInt(n.default.playlists[e].songs[t]) &&
                      !n.default.songs[n.default.playlists[e].songs[t]] &&
                      d.default.writeMessage(
                        "The song index: " +
                          n.default.playlists[e].songs[t] +
                          " in playlist with key: " +
                          e +
                          " is not defined in your songs array!"
                      ),
                    o.default.isInt(n.default.playlists[e].songs[t]) ||
                      (n.default.playlists[e].songs[t].index = t);
          }
          function l() {
            for (var e in n.default.playlists)
              if (n.default.playlists.hasOwnProperty(e))
                for (var t = 0; t < n.default.playlists[e].songs.length; t++)
                  p.default.isSoundCloudURL(
                    n.default.playlists[e].songs[t].url
                  ) &&
                    void 0 == n.default.playlists[e].songs[t].soundcloud_data &&
                    p.default.resolveIndividualStreamableURL(
                      n.default.playlists[e].songs[t].url,
                      e,
                      t
                    );
          }
          function u() {
            for (var e in n.default.playlists)
              n.default.playlists[e].shuffle = !1;
          }
          function i() {
            for (var e in n.default.playlists)
              n.default.playlists[e].repeat = !1;
          }
          function s() {
            for (var e in n.default.playlists)
              n.default.playlists[e].shuffle_list = [];
          }
          function f() {
            for (var e in n.default.playlists)
              r.default.setFirstSongInPlaylist(
                n.default.playlists[e].songs[0],
                e
              );
          }
          return { initialize: e };
        })();
      (t.default = v), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            for (
              var t = document.getElementsByClassName(
                  "amplitude-song-container"
                ),
                a = 0;
              a < t.length;
              a++
            )
              t[a].classList.remove("amplitude-active-song-container");
            if (
              "" == u.default.active_playlist ||
              null == u.default.active_playlist
            ) {
              var l = "";
              if (
                ((l = e
                  ? u.default.active_index
                  : u.default.shuffle_on
                  ? u.default.shuffle_list[u.default.active_index].index
                  : u.default.active_index),
                document.querySelectorAll(
                  '.amplitude-song-container[data-amplitude-song-index="' +
                    l +
                    '"]'
                ))
              )
                for (
                  var n = document.querySelectorAll(
                      '.amplitude-song-container[data-amplitude-song-index="' +
                        l +
                        '"]'
                    ),
                    i = 0;
                  i < n.length;
                  i++
                )
                  n[i].hasAttribute("data-amplitude-playlist") ||
                    n[i].classList.add("amplitude-active-song-container");
            } else {
              if (
                (null != u.default.active_playlist &&
                  "" != u.default.active_playlist) ||
                e
              )
                var d =
                  u.default.playlists[u.default.active_playlist].active_index;
              else {
                var d = "";
                d = u.default.playlists[u.default.active_playlist].shuffle
                  ? u.default.playlists[u.default.active_playlist].shuffle_list[
                      u.default.playlists[u.default.active_playlist]
                        .active_index
                    ].index
                  : u.default.playlists[u.default.active_playlist].active_index;
              }
              if (
                document.querySelectorAll(
                  '.amplitude-song-container[data-amplitude-song-index="' +
                    d +
                    '"][data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                )
              )
                for (
                  var s = document.querySelectorAll(
                      '.amplitude-song-container[data-amplitude-song-index="' +
                        d +
                        '"][data-amplitude-playlist="' +
                        u.default.active_playlist +
                        '"]'
                    ),
                    o = 0;
                  o < s.length;
                  o++
                )
                  s[o].classList.add("amplitude-active-song-container");
            }
          }
          return { setActive: e };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-current-hours"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-current-hours[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-current-hours[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-current-hours[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-current-hours"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00";
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-current-minutes"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-current-minutes[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-current-minutes[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-current-minutes[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-current-minutes"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00";
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-current-seconds"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-current-seconds[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-current-seconds[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-current-seconds[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-current-seconds"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00";
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            var t = document.querySelectorAll(".amplitude-current-time"),
              a = e.minutes + ":" + e.seconds;
            e.hours > 0 && (a = e.hours + ":" + a);
            for (var l = 0; l < t.length; l++) {
              var u = t[l].getAttribute("data-amplitude-playlist"),
                n = t[l].getAttribute("data-amplitude-song-index");
              null == u && null == n && (t[l].innerHTML = a);
            }
          }
          function a(e) {
            var t = document.querySelectorAll(
                '.amplitude-current-time[data-amplitude-playlist="' +
                  u.default.active_playlist +
                  '"]'
              ),
              a = e.minutes + ":" + e.seconds;
            e.hours > 0 && (a = e.hours + ":" + a);
            for (var l = 0; l < t.length; l++) {
              null == t[l].getAttribute("data-amplitude-song-index") &&
                (t[l].innerHTML = a);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist) {
              var t = document.querySelectorAll(
                  '.amplitude-current-time[data-amplitude-song-index="' +
                    u.default.active_index +
                    '"]'
                ),
                a = e.minutes + ":" + e.seconds;
              e.hours > 0 && (a = e.hours + ":" + a);
              for (var l = 0; l < t.length; l++) {
                null == t[l].getAttribute("data-amplitude-playlist") &&
                  (t[l].innerHTML = a);
              }
            }
          }
          function n(e) {
            var t =
                "" != u.default.active_playlist &&
                null != u.default.active_playlist
                  ? u.default.playlists[u.default.active_playlist].active_index
                  : null,
              a = document.querySelectorAll(
                '.amplitude-current-time[data-amplitude-playlist="' +
                  u.default.active_playlist +
                  '"][data-amplitude-song-index="' +
                  t +
                  '"]'
              ),
              l = e.minutes + ":" + e.seconds;
            e.hours > 0 && (l = e.hours + ":" + l);
            for (var n = 0; n < a.length; n++) a[n].innerHTML = l;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-current-time"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00:00";
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e, u) {
            var i = d(e, u);
            t(i), a(i), l(i), n(i);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-time-remaining"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-time-remaining[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-time-remaining[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-time-remaining[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-time-remaining"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00";
          }
          function d(e, t) {
            var a = "00:00",
              l =
                parseInt(e.seconds) +
                60 * parseInt(e.minutes) +
                60 * parseInt(e.hours) * 60,
              u =
                parseInt(t.seconds) +
                60 * parseInt(t.minutes) +
                60 * parseInt(t.hours) * 60;
            if (!isNaN(l) && !isNaN(u)) {
              var n = u - l,
                i = Math.floor(n / 3600),
                d = Math.floor((n - 3600 * i) / 60),
                s = n - 3600 * i - 60 * d;
              (a = (d < 10 ? "0" + d : d) + ":" + (s < 10 ? "0" + s : s)),
                i > 0 && (a = i + ":" + a);
            }
            return a;
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-duration-hours"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-duration-hours[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-duration-hours[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-duration-hours[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-duration-hours"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00";
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-duration-minutes"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-duration-minutes[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-duration-minutes[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-duration-minutes[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-duration-minutes"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00";
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            t(e), a(e), l(e), n(e);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-duration-seconds"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-duration-seconds[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-duration-seconds[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data--amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-duration-seconds[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-duration-seconds"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00";
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l = a(0),
        u = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(l),
        n = (function () {
          function e(e) {
            var u = d(e);
            t(u), a(u), l(u), n(u);
          }
          function t(e) {
            for (
              var t = document.querySelectorAll(".amplitude-duration-time"),
                a = 0;
              a < t.length;
              a++
            ) {
              var l = t[a].getAttribute("data-amplitude-playlist"),
                u = t[a].getAttribute("data-amplitude-song-index");
              null == l && null == u && (t[a].innerHTML = e);
            }
          }
          function a(e) {
            for (
              var t = document.querySelectorAll(
                  '.amplitude-duration-time[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"]'
                ),
                a = 0;
              a < t.length;
              a++
            ) {
              null == t[a].getAttribute("data-amplitude-song-index") &&
                (t[a].innerHTML = e);
            }
          }
          function l(e) {
            if (null == u.default.active_playlist)
              for (
                var t = document.querySelectorAll(
                    '.amplitude-duration-time[data-amplitude-song-index="' +
                      u.default.active_index +
                      '"]'
                  ),
                  a = 0;
                a < t.length;
                a++
              ) {
                var l = t[a].getAttribute("data-amplitude-playlist");
                null == l && (t[a].innerHTML = e);
              }
          }
          function n(e) {
            for (
              var t =
                  "" != u.default.active_playlist &&
                  null != u.default.active_playlist
                    ? u.default.playlists[u.default.active_playlist]
                        .active_index
                    : null,
                a = document.querySelectorAll(
                  '.amplitude-duration-time[data-amplitude-playlist="' +
                    u.default.active_playlist +
                    '"][data-amplitude-song-index="' +
                    t +
                    '"]'
                ),
                l = 0;
              l < a.length;
              l++
            )
              a[l].innerHTML = e;
          }
          function i() {
            for (
              var e = document.querySelectorAll(".amplitude-duration-time"),
                t = 0;
              t < e.length;
              t++
            )
              e[t].innerHTML = "00:00";
          }
          function d(e) {
            var t = "00:00";
            return (
              isNaN(e.minutes) ||
                isNaN(e.seconds) ||
                ((t = e.minutes + ":" + e.seconds),
                !isNaN(e.hours) && e.hours > 0 && (t = e.hours + ":" + t)),
              t
            );
          }
          return { sync: e, resetTimes: i };
        })();
      (t.default = n), (e.exports = t.default);
    },
    function (e, t) {
      e.exports = {
        name: "amplitudejs",
        version: "5.3.2",
        description:
          "A JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required) https://521dimensions.com/open-source/amplitudejs",
        main: "dist/amplitude.js",
        devDependencies: {
          "babel-core": "^6.26.3",
          "babel-loader": "^7.1.5",
          "babel-plugin-add-module-exports": "0.2.1",
          "babel-polyfill": "^6.26.0",
          "babel-preset-es2015": "^6.18.0",
          husky: "^1.3.1",
          jest: "^23.6.0",
          prettier: "1.15.1",
          "pretty-quick": "^1.11.1",
          watch: "^1.0.2",
          webpack: "^2.7.0",
        },
        directories: { doc: "docs" },
        files: ["dist"],
        funding: {
          type: "opencollective",
          url: "https://opencollective.com/amplitudejs",
        },
        scripts: {
          build: "node_modules/.bin/webpack",
          prettier: "npx pretty-quick",
          preversion: "npx pretty-quick && npm run test",
          postversion: "git push && git push --tags",
          test: "jest",
          version: "npm run build && git add -A dist",
        },
        repository: {
          type: "git",
          url: "git+https://github.com/521dimensions/amplitudejs.git",
        },
        keywords: ["webaudio", "html5", "javascript", "audio-player"],
        author: "521 Dimensions (https://521dimensions.com)",
        license: "MIT",
        bugs: { url: "https://github.com/521dimensions/amplitudejs/issues" },
        homepage: "https://github.com/521dimensions/amplitudejs#readme",
      };
    },
  ]);
});
