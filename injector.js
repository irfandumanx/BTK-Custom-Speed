document.querySelectorAll("script").forEach((element) => {
  if (element.src.includes("cinema8.player.api.min.js")) element.remove();
});
var s = document.createElement("script");
s.setAttribute("type", "text/javascript");
s.setAttribute("charset", "utf-8");

chrome.storage.sync.get("speed", function (value) {
  s.innerHTML = `
(function() {
    function e(a) {
        return void 0 == a || null == a ? !0 : !1
    }
    function f() {
        this.length = 16;
        this.timestamp = +new Date;
        this.generate = function() {
            for (var a = this.timestamp.toString().split("").reverse(), c = "", b = 0; b < this.length; ++b) {
                var d;
                d = a.length - 1;
                d = Math.floor(Math.random() * (d - 0 + 1)) + 0;
                c += a[d]
            }
            return c
        }
    }
    $$cinema8PlayerVersion = "1.0.6";
    $$cinema8Conf = {
        instances: {},
        eventListenerCreated: !1
    };
    this.Cinema8Player = function(a, c) {
        this.options = c;
        if (e(a) || null == c)
            return this;
        this.setDefaults();
        this.element = a instanceof Element || a instanceof HTMLDocument ? a : document.querySelector(a);
        var b = this;
        if (!$$cinema8Conf.eventListenerCreated) {
            $$cinema8Conf.eventListenerCreated = !0;
            var d = window.addEventListener ? "addEventListener" : "attachEvent";
            (0,
            window[d])("attachEvent" == d ? "onmessage" : "message", function(a) {
                if ("function" === typeof a.data.substring && "ivideoapi://" == a.data.substring(0, 12)) {
                    a = JSON.parse(a.data.split("ivideoapi://")[1]);
                    var d = a.instance;
                    delete a.instance;
                    var e = Object.getOwnPropertyNames(a)[0];
                    null != d && (b = $$cinema8Conf.instances[d]);
                    switch (e) {
                    case "volume":
                        b._volume = a.volume;
                        break;
                    case "video":
                        b._video = a.video;
                        break;
                    case "currentTime":
                        b._currentTime = a.currentTime;
                        break;
                    case "subtitle":
                        b._subtitle = a.subtitle;
                        break;
                    case "subtitles":
                        b._subtitles = a.subtitles;
                        break;
                    case "audioTrack":
                        b._audioTrack = a.audioTrack;
                        break;
                    case "audioTracks":
                        b._audioTracks = a.audioTracks;
                        break;
                    case "paused":
                        b._paused = a.paused;
                        break;
                    case "watchTime":
                        b._watchTime = a.watchTime;
                        break;
                    case "totalWatchTime":
                        b._totalWatchTime = a.totalWatchTime;
                        break;
                    case "data":
                        b._sceneData = a.data;
                        b.name = b._sceneData.name;
                        break;
                    case "contextChanged":
                        b._context = a.contextChanged;
                        break;
                    case "event":
                        if ("play" == a.event)
                            if ("function" === typeof b.options.onPlay)
                                b.options.onPlay();
                            else {
                                if ("function" === typeof b.options.onplay)
                                    b.options.onplay()
                            }
                        else if ("pause" == a.event)
                            if ("function" === typeof b.options.onPause)
                                b.options.onPause();
                            else {
                                if ("function" === typeof b.options.onpause)
                                    b.options.onpause()
                            }
                        else if ("ended" == a.event)
                            if ("function" === typeof b.options.onEnd)
                                b.options.onEnd();
                            else {
                                if ("function" === typeof b.options.onend)
                                    b.options.onend()
                            }
                        else if ("timeupdate" == a.event)
                            if ("function" === typeof b.options.onProgress)
                                b.options.onProgress();
                            else {
                                if ("function" === typeof b.options.onprogress)
                                    b.options.onprogress()
                            }
                        else if ("onunload" == a.event)
                            if ("function" === typeof b.options.onUnload)
                                b.options.onUnload();
                            else {
                                if ("function" === typeof b.options.onunload)
                                    b.options.onunload()
                            }
                        else if ("onbeforeunload" == a.event)
                            if ("function" === typeof b.options.onBeforeUnload)
                                b.options.onBeforeUnload();
                            else {
                                if ("function" === typeof b.options.onbeforeunload)
                                    b.options.onbeforeunload()
                            }
                        else if ("canplay" == a.event)
                        {
                            if (c.connectSharesWithParent && (a = {
                                name: "parentPlayerUrl",
                                value: window.location.href
                            },	
                            b.sendMessage(a)),
                            "function" === typeof b.options.onReady)
                                b.options.onReady();
                            else {
                                if ("function" === typeof b.options.onready)
                                    b.options.onready()
                            }
                            b.sendMessage({name: "setPlaybackRate",value: ${value.speed}});
                        }
                        else if ("customcallback" == a.event)
                            if ("function" === typeof b.options.onCustomCallback)
                                b.options.onCustomCallback(a.params);
                            else {
                                if ("function" === typeof b.options.oncustomcallback)
                                    b.options.oncustomcallback(a.params)
                            }
                        else if ("webhookresponse" == a.event)
                            if ("function" === typeof b.options.onWebhookResponse)
                                b.options.onWebhookResponse(a.params);
                            else {
                                if ("function" === typeof b.options.onwebhookresponse)
                                    b.options.onwebhookresponse(a.params)
                            }
                        else if ("error" == a.event)
                            if ("function" === typeof b.options.onError)
                                b.options.onError(a.params);
                            else if ("function" === typeof b.options.onerror)
                                b.options.onerror(a.params)
                    }
                }
            }, !1)
        }
        this.init();
        this.sendMessage({
            name: "externalVideoUrl",
            value: c.externalVideoUrl
        })
    }
    ;
    this.Cinema8Player.prototype.init = function() {
        this.version = $$cinema8PlayerVersion;
        this.createIframe()
    }
    ;
    this.Cinema8Player.prototype.setDefaults = function() {
        void 0 == this.options.host && (this.options.host = "https://cinema8.com");
        void 0 == this.options.width && (this.options.width = "854px");
        void 0 == this.options.height && (this.options.height = "480px");
        void 0 == this.options.style && (this.options.style = "");
        "function" !== typeof this.options.onready && "function" !== typeof this.options.onReady && (this.options.onReady = function() {}
        );
        "function" !== typeof this.options.onplay && "function" !== typeof this.options.onPlay && (this.options.onPlay = function() {}
        );
        "function" !== typeof this.options.onpause && "function" !== typeof this.options.onPause && (this.options.onPause = function() {}
        );
        "function" !== typeof this.options.onprogress && "function" !== typeof this.options.onProgress && (this.options.onProgress = function() {}
        );
        "function" !== typeof this.options.onend && "function" !== typeof this.options.onEnd && (this.options.onEnd = function() {}
        );
        "function" !== typeof this.options.onunload && "function" !== typeof this.options.onUnload && (this.options.onUnload = function() {}
        );
        "function" !== typeof this.options.onbeforeunload && "function" !== typeof this.options.onBeforeUnload && (this.options.onBeforeUnload = function() {}
        );
        "function" !== typeof this.options.oncustomcallback && "function" !== typeof this.options.onCustomCallback && (this.options.onCustomCallback = function() {}
        );
        "function" !== typeof this.options.onwebhookresponse && "function" !== typeof this.options.onWebhookResponse && (this.options.onWebhookResponse = function() {}
        );
        "function" !== typeof this.options.onerror && "function" !== typeof this.options.onError && (this.options.onError = function() {}
        )
    }
    ;
    this.Cinema8Player.prototype.createIframe = function(a) {
        var c = new f;
        a = document.createElement("iframe");
        c = "cinema8-" + c.generate();
        a.setAttribute("id", c);
        a.setAttribute("name", c);
        a.setAttribute("allow", "autoplay; fullscreen; microphone; camera");
        $$cinema8Conf.instances[c] = this;
        this.iframeId = c;
        var b = "video";
        "RAW_VIDEO" == this.options.type && (b = "raw-video");
        b = this.options.host + "/" + b;
        b = null != this.options.id ? b + ("/" + this.options.id + "?c\x3djs-api") : b + "?external\x3d1";
        if (null != this.options.autoplay) {
            var d = 1;
            this.options.autoplay ? d = 1 : d = 0;
            b += "\x26autoplay\x3d" + d
        }
        null != this.options.raw && (d = 1,
        this.options.raw ? d = 1 : d = 0,
        b += "\x26raw\x3d" + d);
        null != this.options.subtitles && (b += "\x26sub\x3d" + this.options.subtitles);
        null != this.options.subtitle && (b += "\x26sub\x3d" + this.options.subtitle);
        null != this.options.defaultLang && (b += "\x26audio-track\x3d" + this.options.defaultLang);
        null != this.options.controls && (b += "\x26controls\x3d" + this.options.controls);
        null != this.options.externalVideoUrl && (b += "\x26externalVideoUrl\x3d" + encodeURIComponent(this.options.externalVideoUrl));
        null != this.options.authToken && (b += "\x26token\x3d" + this.options.authToken);
        null != this.options.externalUser && (d = encodeURIComponent(JSON.stringify(this.options.externalUser)),
        b += "\x26externalUser\x3d" + d);
        null != this.options.campaignParams && (b += "\x26" + this.options.campaignParams);
        null != this.options.time && (b += "\x26t\x3d" + this.options.time);
        this.options.resumeLastPosition && (b += "\x26resumeLastPosition\x3dtrue");
        a.setAttribute("src", b);
        a.setAttribute("width", this.options.width);
        a.setAttribute("height", this.options.height);
        a.setAttribute("style", this.options.style);
        a.setAttribute("position", "inherit");
        a.setAttribute("frameborder", "0");
        a.setAttribute("webkitallowfullscreen", "");
        a.setAttribute("mozallowfullscreen", "");
        a.setAttribute("allowfullscreen", "");
        a.setAttribute("allow", "autoplay; fullscreen; microphone; camera");
        this.element.appendChild(a);
        this.iframeReceiver = document.getElementById(c).contentWindow
    }
    ;
    this.Cinema8Player.prototype.play = function() {
        return this.sendMessage({
            name: "play"
        })
    }
    ;
    this.Cinema8Player.prototype.pause = function() {
        return this.sendMessage({
            name: "pause"
        })
    }
    ;
    this.Cinema8Player.prototype.duration = function() {
        return e(this._sceneData) || e(this._sceneData.mediaContent) ? null : this._sceneData.mediaContent.duration
    }
    ;
    this.Cinema8Player.prototype.watchTime = function() {
        return void 0 == this._watchTime ? 0 : this._watchTime
    }
    ;
    this.Cinema8Player.prototype.totalWatchTime = function() {
        return void 0 == this._totalWatchTime ? 0 : this._totalWatchTime
    }
    ;
    this.Cinema8Player.prototype.paused = function() {
        return this._paused
    }
    ;
    this.Cinema8Player.prototype.volume = function(a) {
        if (null == a)
            return this._volume;
        this.sendMessage({
            name: "setVolume",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.updateSkinProperty = function(a, c) {
        this.sendMessage({
            name: "updateSkinProperty",
            value: {
                name: a,
                value: c
            }
        })
    }
    ;
    this.Cinema8Player.prototype.video = function() {
        return this._video
    }
    ;
    this.Cinema8Player.prototype.currentTime = function(a) {
        if (null == a)
            return this._currentTime;
        this.sendMessage({
            name: "setCurrentTime",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.subtitle = function(a) {
        if (null == a)
            return this._subtitle;
        this.sendMessage({
            name: "setSubtitle",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.subtitles = function() {
        return this._subtitles
    }
    ;
    this.Cinema8Player.prototype.audioTrack = function(a) {
        if (null == a)
            return this._audioTrack;
        this.sendMessage({
            name: "setAudioTrack",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.audioTracks = function() {
        return this._audioTracks
    }
    ;
    this.Cinema8Player.prototype.sendMessage = function(a) {
        this.iframeReceiver.postMessage("ivideo://" + JSON.stringify(a), "*")
    }
    ;
    this.Cinema8Player.prototype.getContext = function() {
        return this._context
    }
    ;
    this.Cinema8Player.prototype.getVariables = function() {
        return this._context.projects[this._sceneData.hashId].context
    }
    ;
    this.Cinema8Player.prototype.getVariable = function(a) {
        return null != this._context.projects[this._sceneData.hashId].context[a] ? this._context.projects[this._sceneData.hashId].context[a] : null
    }
    ;
    this.Cinema8Player.prototype.setVariable = function(a, c) {
        this.sendMessage({
            name: "setVariable",
            value: {
                key: a,
                value: c
            }
        })
    }
    ;
    this.Cinema8Player.prototype.setPlaybackRate = function(a) {
        this.sendMessage({
            name: "setPlaybackRate",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.setLoop = function(a) {
        this.sendMessage({
            name: "setLoop",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.unload = function() {
        document.getElementById(this.iframeId).remove()
    }
    ;
    this.Cinema8Player.prototype.removeTrackEvent = function(a) {
        this.sendMessage({
            name: "removeTrackEvent",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.addTrackEvent = function(a) {
        this.sendMessage({
            name: "addTrackEvent",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.updateQuestionTemplate = function(a) {
        this.sendMessage({
            name: "updateQuestionTemplate",
            value: a
        })
    }
    ;
    this.Cinema8Player.prototype.simulateQuestionTemplateFeedback = function(a) {
        this.sendMessage({
            name: "simulateQuestionTemplateFeedback"
        })
    }
    ;
    return Cinema8Player
}
)();


`;
  document.head.appendChild(s);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  location.reload();
});

//https://static-01.cinema8.com/player/compiled/ivideo.engine.min.js
/*var script = fetch("https://www.btkakademi.gov.tr/portal/course/player/plugins/cinema8.player.api.min.js");
script.then((data) => {
	data.text().then((txt) => {
		txt = txt.replace("this.iframeReceiver = document.getElementById(c).contentWindow", "this.iframeReceiver = document.getElementById(c).contentWindow; console.log(this.iframeReceiver);")
		s.innerHTML = txt;
		console.log(txt);

		//document.head.appendChild(s);
	})
})*/

//s.innerHTML = data.modifiedScript;
//document.head.appendChild(s);
//var unmodified = document.querySelectorAll('[src="'+data.ogScriptSrc+'"]')
