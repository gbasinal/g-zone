var tracking = {
    insertTracking: function() {
        if (config.analytics.ga.enable) {
            var ga = "";
            ga += "<script>";
            ga += "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
            ga += "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
            ga += "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
            ga += "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
            ga += "ga('create', '" + config.analytics.ga.id + "', 'auto');";
            if (config.env === 'live') {
                ga += "ga('send', 'pageview');";
            }
            ga += "</script>";
            $('body').append(ga);
        }
    },
    trackingInit: function() {
        var _self = this;
        tracking.eventInit();
    },
    eventInit: function() {
        var _self = this,
            gaTracking = $('.js-tracking'),
            gaTrackingCustom = $('.js-tracking-custom');
        gaTracking.on('click', function() {
            var _this = $(this),
                _key = _this.attr('tracking').replace(/-/g, ''),
                _sectionTitle = _this.attr('section-title');
            if (config.tracking[_key]) {
                var _data = config.tracking[_key];
                var _value = _sectionTitle ? _data.value + '-' + _sectionTitle : _data.value;
                tracking.send(_data.event, _data.category, _data.label, _value);
            }
        });
        gaTrackingCustom.on('click', function() {
            var _this = $(this),
                _key = _this.attr('tracking').replace(/-/g, '');
            if (config.trackingCustom[_key]) {
                var _data = config.trackingCustom[_key];
                tracking.send(_data.event, _data.category, _data.label, _data.value);
            }
        });
    },
    changeSection: function(key, firstload) {
        if (config.trackingScroll[key]) {
            if (!firstload) {
                var _data = config.trackingScroll[key];
                tracking.send(_data.event, _data.category, _data.label, _data.value);
            }
            var _viewData = config.trackingCustom[key]
            tracking.send(_viewData.event, _viewData.category, _viewData.label, _viewData.value);
        }
    },
    send: function(event, category, label, value) {
        var _self = this;
        if (config.env === 'dev') {
            tracking.log(event, category, label, value);
        } else {
            ga('send', event, category, label, value);
        }
    },
    log: function(event, category, label, value) {
        console.log('--------');
        console.log('TRACKING');
        console.log('Event: ' + event);
        console.log('Category: ' + category);
        console.log('Label: ' + label);
        console.log('Value: ' + value);
        console.log('--------');
    }
}