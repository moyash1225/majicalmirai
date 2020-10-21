import { Player } from "textalive-app-api";

const animatePhrase = function (now, unit) {
    if (unit.contains(now)) {
        document.querySelector("#text").textContent = unit.text
    }
}

const p = new Player({
    app: true,
    mediaElement: document.querySelector("#media"),
});

const playBtns = document.querySelectorAll(".play");
const jumpBtn = document.querySelector("#jump");
const pauseBtn = document.querySelector("#jump");
const rewindBtn = document.querySelector("#rewind");
const positionEl = document.querySelector("#position strong")

p.addListener({
    onAppReady:(app) => {
        if (!app.managed){
            document.querySelector("#control").className = "block";

            playBtns.forEach((playBtn) =>
              playBtn.addEventListener("click", () => {
                p.video && p.requestPlay();
              })
            );

            jumpBtn.addEventListener(
                "click",
                () => player.video && player.requestMediaSeek(player.video.firstChar.startTime)
            );

            pauseBtn.addEventListener(
                "click",
                () => player.video && player.requestPause()
            );

            rewindBtn.addEventListener(
                "click",
                () => player.video && player.requestMediaSeek(0)
            );
        }
        if (!app.songUrl){
            p.createFromSongUrl("https://www.youtube.com/watch?v=XSLhsjepelI")
        }
    },

    onVideoReady(v) {
        let pr = p.video.firstPhrase;
        while (pr) {
            pr.animate = animatePhrase;
            pr = pr.next;
        }
    },

    onTimerReady(timer) {
        if (!p.app.managed) {
            document.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
        }

        jumpBtn.disabled = !p.video.findChar;
    },

    onThrottledTimeUpdate(position) {
        positionEl.textContent = String(Math.floor(position));
    },

    onPlay() {
        document.querySelector("#overlay").style.display = "none";
    },

    onPause() {
        document.querySelector("#text").textContent = "-";
    },

    onStop() {
        document.querySelector("#text").textContent = "-";
    },
})